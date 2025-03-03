#!/usr/bin/env bash
set -eu # Exit on error and treat unset variables as errors

latest_full_commits() {
  git rev-list --pretty='%H|%h|%cs|%cN|%s' "$1"..HEAD --reverse --no-commit-header
}

generate_playstore_changelog() {
  declare repo="$1" version_from="$2" version_to="$3"
  declare -A categories=(
    ["Features"]=""
    ["Bug fixes"]=""
  )

  # Validate input arguments
  for arg in "$repo" "$version_from" "$version_to"; do
    if [[ -z "$arg" ]]; then
      echo "Error: Missing required arguments." >&2
      exit 1
    fi
  done

  # Function to format commit messages with links
  format_commit() {
    declare message="$1"
    echo "- $message"
  }

  # Read commit history and categorize messages
  while IFS='|' read -r full_hash short_hash date author message; do
    # Skip empty or malformed lines
    [[ -z "$full_hash" || -z "$message" ]] && continue

    # Extract prefix and message
    IFS=':' read -r prefix remaining_message <<<"$message" || prefix=""
    remaining_message="${remaining_message#"${remaining_message%%[![:space:]]*}"}" # Trim leading spaces

    # Determine category
    case "$prefix" in
    "feat" | "feature") category="Features" ;;
    "fix") category="Bug fixes" ;;
    *) continue ;; # Skip other categories
    esac

    # Append formatted commit message
    categories["$category"]+=$(format_commit "$remaining_message" "$short_hash" "$full_hash" "$author")$'\n'
  done < <(latest_full_commits "$version_from")

  # Handle empty commit list
  if [[ -z "${categories["Features"]}" && -z "${categories["Bug fixes"]}" ]]; then
    echo "No relevant commits found between $version_from and HEAD."
    exit 0
  fi

  # Print changelog
  for category in "Features" "Bug fixes"; do
    if [[ -n "${categories[$category]}" ]]; then
      echo "### $category:"
      printf "%s\n" "${categories[$category]}"
      echo ""
    fi
  done

  echo "---"

  # Save changelog to file
  changelog_dir="android/fastlane/metadata/en-US/changelogs"
  mkdir -p "$changelog_dir"
  changelog_file="$changelog_dir/${version_to}.txt"
  {
    echo ""
    for category in "Features" "Bug fixes"; do
      if [[ -n "${categories[$category]}" ]]; then
        echo "### $category:"
        printf "%s\n" "${categories[$category]}"
        echo ""
      fi
    done
    echo "---"
  } >"$changelog_file"
}

# Ensure script is executed with exactly three arguments
if [[ $# -ne 3 ]]; then
  echo "Usage: $0 <repo> <version_from> <version_to>" >&2
  exit 1
fi

generate_playstore_changelog "$1" "$2" "$3"
