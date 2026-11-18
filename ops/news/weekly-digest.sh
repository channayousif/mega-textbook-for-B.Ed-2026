#!/usr/bin/env bash
# Feature 028: trigger the weekly new-content email. Light job (one HTTPS call).
# Crontab (host clock is PKT): 0 10 * * 0 /home/a2ahs/deploy/mega_book/ops/news/weekly-digest.sh
# The secret lives outside the repo in a 0600 file and must match DIGEST_CRON_SECRET
# in the edge-runtime env. A repeat call in the same ISO week is a no-op server-side.
set -euo pipefail
SECRET_FILE="${DIGEST_SECRET_FILE:-$HOME/.config/textbook/digest-cron-secret}"
ENDPOINT="${DIGEST_ENDPOINT:-https://api.textbook.com.pk/functions/v1/weekly-digest}"
LOG="${DIGEST_LOG:-$HOME/deploy/weekly-digest.log}"

if [[ ! -r "$SECRET_FILE" ]]; then
  echo "$(date -Is) ABORT: $SECRET_FILE missing" >>"$LOG"
  exit 1
fi
secret=$(tr -d '\n' <"$SECRET_FILE")
response=$(curl -sS --max-time 600 -X POST -H "x-cron-secret: $secret" -w ' HTTP %{http_code}' "$ENDPOINT" || true)
echo "$(date -Is) $response" >>"$LOG"
