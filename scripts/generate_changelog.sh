#!/usr/bin/env bash
set -eu # Exit on error and treat unset variables as errors

latest_full_commits() {
  git rev-list --pretty='%H|%h|%cs|%cN|%s' "$1"..HEAD --reverse --no-commit-header
}

generate_changelog() {
  categories_list=("Features" "Bug fixes" "Tests" "Documentation" "Continuous integration" "Building system" "Others")

  declare repo="$1" version_from="$2" version_to="$3"
  declare -a breaking_changes=()
  declare -A categories=()

  for category in "${categories_list[@]}"; do
    categories["$category"]=""
  done

  # Validate input arguments
  for arg in "$repo" "$version_from" "$version_to"; do
    if [[ -z "$arg" ]]; then
      echo "Error: Missing required arguments." >&2
      exit 1
    fi
  done

  # Function to format commit messages with links
  format_commit() {
    declare message="$1" short_hash="$2" full_hash="$3" author="$4"
    echo "- $message ([${short_hash}](https://github.com/${repo}/commit/${full_hash})) - $author"
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
    "ci") category="Continuous integration" ;;
    "doc" | "docs") category="Documentation" ;;
    "test" | "tests") category="Tests" ;;
    "chore") category="Building system" ;;
    *) category="Others" ;;
    esac

    # Append formatted commit message
    categories["$category"]+=$(format_commit "$remaining_message" "$short_hash" "$full_hash" "$author")$'\n'

    # Detect breaking changes (commits with `!` in the prefix)
    if [[ "$prefix" == *"!"* ]]; then
      breaking_changes+=("$(format_commit "$remaining_message" "$short_hash" "$full_hash" "$author")")
    fi
  done < <(latest_full_commits "$version_from")

  # Handle empty commit list
  if [[ ${#categories[@]} -eq 0 && ${#breaking_changes[@]} -eq 0 ]]; then
    echo "No commits found between $version_from and HEAD."
    exit 0
  fi

  # Print changelog
  if [[ ${#breaking_changes[@]} -gt 0 ]]; then
    echo "### BREAKING CHANGES:"
    printf "%s\n" "${breaking_changes[@]}"
    echo ""
  fi

  for category in "${categories_list[@]}"; do
    if [[ -n "${categories[$category]}" ]]; then
      echo "### $category:"
      printf "%s\n" "${categories[$category]}"
      echo ""
    fi
  done

  echo "---"
  printf "Compare with previous release: [View Changes](https://github.com/%s/compare/%s...%s)\n" "$repo" "$version_from" "$version_to"
}

# Ensure script is executed with exactly three arguments
if [[ $# -ne 3 ]]; then
  echo "Usage: $0 <repo> <version_from> <version_to>" >&2
  exit 1
fi

generate_changelog "$1" "$2" "$3"

# Example usage:
# git rev-list --pretty='%H|%h|%cs|%cN|%s' 1.20.1..HEAD --reverse --no-commit-header | generate_changelog onato/AR4-Manager 1.2.3 1.3.0
