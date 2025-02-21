#!/usr/bin/env bash
set -eu

generate_changelog() {
  local repo=$1
  local version_from=$2
  local version_to=$3
  if [ -z "$repo" ]; then
    echo "Error: No repo provided."
    exit 1
  fi
  if [ -z "$version_from" ]; then
    echo "Error: No FROM version number provided."
    exit 1
  fi
  if [ -z "$version_to" ]; then
    echo "Error: No TO version number provided."
    exit 1
  fi

  local breaking=() features=() patches=() ci=() docs=() tests=() chores=() others=()

  while IFS='|' read -r full_hash short_hash date author message; do
    prefix=$(echo "$message" | awk '{print $1}' | sed -e 's/://')
    message=$(echo "$message" | sed -e 's/^[^ ]* //')
    case "$prefix" in
      "feat" | "feature")
        features+=("- $message ([${short_hash}](https://github.com/${repo}/commit/${full_hash})) - $author")
        ;;
      "fix")
        patches+=("- $message ([${short_hash}](https://github.com/${repo}/commit/${full_hash})) - $author")
        ;;
      "ci")
        ci+=("- $message ([${short_hash}](https://github.com/${repo}/commit/${full_hash})) - $author")
        ;;
      "doc" | "docs")
        docs+=("- $message ([${short_hash}](https://github.com/${repo}/commit/${full_hash})) - $author")
        ;;
      "test" | "tests")
        tests+=("- $message ([${short_hash}](https://github.com/${repo}/commit/${full_hash})) - $author")
        ;;
      "chore")
        chores+=("- $message ([${short_hash}](https://github.com/${repo}/commit/${full_hash})) - $author")
        ;;
      *)
        others+=("- $message ([${short_hash}](https://github.com/${repo}/commit/${full_hash})) - $author")
        ;;
    esac

    if [[ "$prefix" == *"!"* ]]; then
      breaking+=("- $message ([${short_hash}](https://github.com/${repo}/commit/${full_hash})) - $author")
    fi
  done

  if [ ${#breaking[@]} -gt 0 ]; then
    echo "### BREAKING CHANGES:"
    printf "%s\n" "${breaking[@]}"
    echo ""
  fi

  if [ ${#features[@]} -gt 0 ]; then
    echo "### Features:"
    printf "%s\n" "${features[@]}"
    echo ""
  fi

  if [ ${#patches[@]} -gt 0 ]; then
    echo "### Bug fixes:"
    printf "%s\n" "${patches[@]}"
    echo ""
  fi

  if [ ${#tests[@]} -gt 0 ]; then
    echo "### Tests:"
    printf "%s\n" "${tests[@]}"
    echo ""
  fi

  if [ ${#docs[@]} -gt 0 ]; then
    echo "### Documentation:"
    printf "%s\n" "${docs[@]}"
    echo ""
  fi

  if [ ${#ci[@]} -gt 0 ]; then
    echo "### Continuous integration:"
    printf "%s\n" "${ci[@]}"
    echo ""
  fi

  if [ ${#chores[@]} -gt 0 ]; then
    echo "### Building system:"
    printf "%s\n" "${chores[@]}"
    echo ""
  fi

  if [ ${#others[@]} -gt 0 ]; then
    echo "### Others:"
    printf "%s\n" "${others[@]}"
    echo ""
  fi

  echo "---"
  printf "Compare with previous version: https://github.com/$repo/compare/%s...%s" "$version_from" "$version_to"
}

generate_changelog $1 $2 $3
