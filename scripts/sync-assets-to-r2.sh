#!/bin/bash
# Incremental sync: finds petrapavaje.ro/wp-content/uploads URLs referenced in src/
# that aren't in the R2 manifest yet, downloads them, and uploads to the
# petra-pavaje-media R2 bucket. Safe to re-run anytime (e.g. after adding a
# new product) — only copies what's new. Never touches/deletes anything on
# the WordPress origin, only reads (curl GET) from it.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST="$REPO_ROOT/scripts/.r2-manifest.txt"
BUCKET="petra-pavaje-media"
TMPDIR="$(mktemp -d)"
trap 'rm -rf "$TMPDIR"' EXIT

touch "$MANIFEST"

grep -rohE "https://petrapavaje\.ro/wp-content/uploads/[^\"'\` )]+" "$REPO_ROOT/src" \
  | sort -u > "$TMPDIR/current_urls.txt"

new_count=0
fail_count=0

while IFS= read -r url; do
  key="${url#https://petrapavaje.ro/wp-content/uploads/}"
  if grep -qxF "$key" "$MANIFEST"; then
    continue
  fi
  localpath="$TMPDIR/$key"
  mkdir -p "$(dirname "$localpath")"
  if curl -sL -A "Mozilla/5.0" -f "$url" -o "$localpath"; then
    if npx wrangler r2 object put "$BUCKET/$key" --file="$localpath" --remote >/dev/null 2>&1; then
      echo "$key" >> "$MANIFEST"
      echo "NEW  $key"
      new_count=$((new_count + 1))
    else
      echo "UPLOAD FAILED  $key  ($url)"
      fail_count=$((fail_count + 1))
    fi
  else
    echo "DOWNLOAD FAILED  $key  ($url)"
    fail_count=$((fail_count + 1))
  fi
done < "$TMPDIR/current_urls.txt"

echo "---"
echo "Newly migrated: $new_count"
echo "Failed: $fail_count"
echo "Total in manifest: $(wc -l < "$MANIFEST" | tr -d ' ')"
