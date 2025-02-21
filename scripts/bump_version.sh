#!/bin/bash
set -e # Exit on error

. ./scripts/semantic_version.sh

# Get the latest release tag from GitHub
current_release="1.25.0" #$(gh release list --limit 1 --json tagName --jq '.[0].tagName')

# Check if a new release is needed
needs_release() {
  latest_commits "$current_release" | grep -qE '^(feat:|fix:)|^.*!:'
}

# Calculate the next semantic version based on commit messages
calculate_next_version() {
  local current_version="$1"
  IFS='.' read -r major minor patch <<<"$current_version"

  commit_messages=$(latest_commits "$current_version")

  if echo "$commit_messages" | grep -q '^.*!:'; then
    major=$((major + 1))
    minor=0
    patch=0
  elif echo "$commit_messages" | grep -q '^feat:'; then
    minor=$((minor + 1))
    patch=0
  elif echo "$commit_messages" | grep -q '^fix:'; then
    patch=$((patch + 1))
  fi

  echo "$major.$minor.$patch"
}

# Generate changelog for the new release
generate_changelog() {
  local changelog="docs/changelogs/$next_release.md"
  scripts/generate_changelog.sh "$(gh repo view --json owner,name -q '"\(.owner.login)/\(.name)"')" "$current_release" "$next_release" >"$changelog"
  git add "$changelog"
}

# Update Android versioning in properties file
update_android_version() {
  echo "Updating Android version name and code..."

  local version_file="android/version.properties"
  local version_code

  version_code=$(get_property "$version_file" "versionCode") || {
    echo "Failed to get version code"
    exit 1
  }
  version_code=$((version_code + 1))

  update_property "$version_file" versionName "$next_release"
  update_property "$version_file" versionCode "$version_code"

  git add "$version_file"
}

# Main script logic
if needs_release; then
  next_release=$(calculate_next_version "$current_release")

  echo "New release required! $current_release -> $next_release"
  generate_changelog
  update_android_version

  git commit -m "chore: bump version to $next_release"
  git push

  gh release create "$next_release" --title "$next_release" --notes-file "docs/changelogs/$next_release.md" --prerelease
else
  echo "No release necessary"
fi
