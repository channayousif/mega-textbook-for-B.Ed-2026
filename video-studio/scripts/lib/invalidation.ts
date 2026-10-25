// Approval invalidation (VS-004 PI002, specs/004-production-integrity/dependency-graph.md).
// Each gate binds the digests of the inputs it covered. A gate is valid only while every bound
// digest still matches AND every upstream gate is valid. Mismatches fail closed.

export type Gate = 'script' | 'assets' | 'render';
export const GATES: Gate[] = ['script', 'assets', 'render'];

/** Digest names. `platform_pack` is deliberately bound by no gate: a hashtag change regenerates
 * the pack and voids nothing (acceptance test 2). */
export type Node =
  | 'source' | 'script' | 'voice_cards' | 'character' | 'brand'
  | 'assets' | 'captions' | 'cta' | 'final' | 'platform_pack';

export const GATE_INPUTS: Record<Gate, Node[]> = {
  script: ['source', 'script'],
  assets: ['script', 'assets', 'voice_cards', 'character', 'brand'],
  render: ['assets', 'captions', 'cta', 'brand', 'final'],
};

export const UPSTREAM: Record<Gate, Gate | null> = { script: null, assets: 'script', render: 'assets' };

export type Digests = Partial<Record<Node, string>>;
export interface ApprovalEvent {
  gate: Gate;
  decision: 'approve' | 'changes';
  by: string;
  at: string;
  digests: Digests;
  checklist?: string[];
  note?: string;
}

export interface GateState { gate: Gate; valid: boolean; reason: string }

/** Latest event per gate, in file order (the log is append-only). */
export function latestByGate(events: ApprovalEvent[]): Partial<Record<Gate, ApprovalEvent>> {
  const out: Partial<Record<Gate, ApprovalEvent>> = {};
  for (const e of events) out[e.gate] = e;
  return out;
}

export function evaluate(events: ApprovalEvent[], current: Digests): Record<Gate, GateState> {
  const latest = latestByGate(events);
  const state = {} as Record<Gate, GateState>;
  for (const gate of GATES) {
    const e = latest[gate];
    const up = UPSTREAM[gate];
    if (!e) { state[gate] = { gate, valid: false, reason: 'not approved' }; continue; }
    if (e.decision !== 'approve') { state[gate] = { gate, valid: false, reason: 'changes requested' }; continue; }
    if (e.by !== 'owner') { state[gate] = { gate, valid: false, reason: `approval by "${e.by}" is not an owner approval` }; continue; }
    if (up && !state[up].valid) { state[gate] = { gate, valid: false, reason: `upstream ${up} approval is ${state[up].reason}` }; continue; }
    const changed = GATE_INPUTS[gate].filter((n) => {
      const bound = e.digests[n];
      return bound === undefined || current[n] === undefined || bound !== current[n];
    });
    state[gate] = changed.length
      ? { gate, valid: false, reason: `stale: ${changed.join(', ')} changed since approval` }
      : { gate, valid: true, reason: 'valid' };
  }
  return state;
}

/** The digests a new approval of `gate` must bind. Throws if one is missing (fail closed). */
export function bindDigests(gate: Gate, current: Digests): Digests {
  const out: Digests = {};
  for (const n of GATE_INPUTS[gate]) {
    if (!current[n]) throw new Error(`cannot approve ${gate}: no current digest for ${n}`);
    out[n] = current[n];
  }
  return out;
}
