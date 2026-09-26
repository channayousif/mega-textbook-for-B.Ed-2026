#!/usr/bin/env node
/** Heartbeat contract. Run only on the trusted host with service-role and gh credentials. */
import { createClient } from '@supabase/supabase-js';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { draftPrAction } from './lib/agent-job-pr.mjs';
import { degreeCourseCodes } from './lib/review-catalog.mjs';

const [command, id, token, inputFile] = process.argv.slice(2);
const url = process.env.SUPABASE_URL || process.env.DOCUSAURUS_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required on the heartbeat host');
const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

function hostConfigurations() {
  const file = process.env.AGENT_HOST_CONFIGS_FILE;
  if (!file) return [];
  const configs = JSON.parse(readFileSync(file, 'utf8'));
  if (!Array.isArray(configs) || configs.some(c => !['claude','codex','antigravity','opencode'].includes(c.provider) || !/^[a-zA-Z0-9_.-]{1,64}$/.test(c.host_config_name))) {
    throw new Error('AGENT_HOST_CONFIGS_FILE must be an array of provider and host_config_name pairs');
  }
  return configs;
}

function run(bin, args) {
  const result = spawnSync(bin, args, { encoding: 'utf8' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${bin} ${args[0]} failed: ${result.stderr.trim()}`);
  return result.stdout.trim();
}
function readResult(path) {
  const value = JSON.parse(readFileSync(path, 'utf8'));
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('result file must contain a JSON object');
  return value;
}
async function report(jobId, claimToken, status, result = {}) {
  const { error } = await db.rpc('report_agent_job', {
    p_id: jobId, p_token: claimToken, p_status: status,
    p_diff: result.diff_summary ?? null, p_checks: result.checks ?? null,
    p_error: result.error_text ?? null, p_pr_url: result.pr_url ?? null,
  });
  if (error) throw new Error(error.message);
}

if (command === 'sync-catalog') {
  const catalog = JSON.parse(readFileSync('catalog/courses.json', 'utf8'));
  const codes = degreeCourseCodes(catalog);
  const { error } = await db.rpc('sync_review_course_scopes', { p_codes: codes });
  if (error) throw new Error(error.message);
  process.stdout.write(`Reported ${codes.length} B.Ed course scope(s)\n`);
} else if (command === 'sync-configs') {
  if (!process.env.AGENT_HOST_CONFIGS_FILE) throw new Error('AGENT_HOST_CONFIGS_FILE is required');
  const configs = hostConfigurations();
  const { error } = await db.rpc('sync_agent_host_configurations', { p_configs: configs });
  if (error) throw new Error(error.message);
  process.stdout.write(`Reported ${configs.length} host configuration(s)\n`);
} else if (command === 'claim') {
  const configs = hostConfigurations();
  const { data, error } = await db.rpc('claim_agent_job');
  if (error) throw new Error(error.message);
  if (data && !configs.some(c => c.provider === data.provider && c.host_config_name === data.host_config_name)) {
    await report(data.id, data.claim_token, 'failed', { error_text: `Host configuration unavailable: ${data.provider}/${data.host_config_name}` });
    process.stdout.write(`${JSON.stringify({ status: 'failed', job_id: data.id })}\n`);
  } else {
    // Null means the queue is empty. The claim token is secret until this attempt ends.
    process.stdout.write(`${JSON.stringify(data)}\n`);
  }
} else if (command === 'report') {
  const status = inputFile;
  if (!['running', 'failed'].includes(status)) throw new Error('usage: agent-job report <id> <token> running|failed [result.json]');
  const result = process.argv[6] ? readResult(process.argv[6]) : {};
  await report(id, token, status, result);
  process.stdout.write(`${status}\n`);
} else if (command === 'publish') {
  if (!id || !token || !inputFile) throw new Error('usage: agent-job publish <id> <token> result.json');
  const result = readResult(inputFile);
  if (typeof result.diff_summary !== 'string' || !result.diff_summary.trim() || !result.checks || typeof result.checks !== 'object') {
    throw new Error('result.json requires diff_summary and checks');
  }
  const { data: job, error } = await db.from('agent_jobs').select('id,branch_name,status,claim_token').eq('id', id).single();
  if (error || !job || job.claim_token !== token || !['claimed','running'].includes(job.status)) throw new Error('stale job claim');
  const branch = run('git', ['branch', '--show-current']);
  if (branch !== job.branch_name) throw new Error(`checkout ${job.branch_name} before publishing`);
  run('git', ['push', '-u', 'origin', branch]);
  let prUrl;
  const existing = spawnSync('gh', ['pr', 'view', branch, '--json', 'url,isDraft'], { encoding: 'utf8' });
  if (existing.status === 0) {
    prUrl = draftPrAction(JSON.parse(existing.stdout), branch, id, '').url;
  } else {
    const temp = mkdtempSync(join(tmpdir(), 'agent-job-'));
    try {
      const bodyFile = join(temp, 'body.md');
      writeFileSync(bodyFile, `Agent job ${id}\n\n${result.diff_summary}\n\nChecks:\n\n\`\`\`json\n${JSON.stringify(result.checks, null, 2)}\n\`\`\`\n`);
      prUrl = run('gh', draftPrAction(null, branch, id, bodyFile).args);
    } finally { rmSync(temp, { recursive: true, force: true }); }
  }
  await report(id, token, 'completed', { ...result, pr_url: prUrl });
  process.stdout.write(`${prUrl}\n`);
} else {
  throw new Error('usage: agent-job sync-catalog | sync-configs | claim | report <id> <token> running|failed [result.json] | publish <id> <token> result.json');
}
