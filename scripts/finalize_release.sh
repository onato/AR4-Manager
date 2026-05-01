#!/bin/bash
set -e # Exit on error

next_release="$1"

if [ -z "$next_release" ]; then
  echo "Usage: $0 <next_release>" >&2
  exit 1
fi

git add android/version.properties \
  "docs/changelogs/$next_release.md" \
  "android/fastlane/metadata/en-US/changelogs/$next_release.txt"

git commit -m "chore: bump version to $next_release"
git push

gh release create "$next_release" \
  --title "$next_release" \
  --notes-file "docs/changelogs/$next_release.md" \
  --prerelease
