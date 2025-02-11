#!/usr/bin/env bash
set -eu

. ./scripts/semantic_version.sh

check_working_directory

if [ $(is_releasable) == "true" ]; then

  log_success "A new version is available to be released."

  log_info "Getting latest version"
  TAG=$(latest_version)
  log_success "Latest version: $TAG."

  VERSION=$(new_version)
  log_success "New version: $VERSION."
  log_info "Generating changelog for version $VERSION"
  CHANGELOG=$(build_changelog "$TAG")
  log_success "New changelog: $CHANGELOG."

  log_info "Updating latest version shield"
  SHIELD=$(generate_version_shield "$VERSION")
  log_success "Latest version shield updated: $SHIELD."

  CURRENT_BRANCH_NAME=${CURRENT_BRANCH_NAME:-$(git rev-parse --abbrev-ref HEAD)}

  log_info "Checking out branch $(echo $CURRENT_BRANCH_NAME)"
  git checkout "$CURRENT_BRANCH_NAME"
  git pull
  log_success "You're now on branch $CURRENT_BRANCH_NAME"

  log_info "Updating Android version name and code"
  VERSION_CODE=$(get_property "version.properties" "versionCode")
  VERSION_CODE=$((VERSION_CODE + 1))
  update_property version.properties versionName $VERSION
  update_property version.properties versionCode $VERSION_CODE

  log_success "Version name updated to $VERSION and code bumped to $VERSION_CODE"
  log_info "Committing changelog files"
  git add version.properties
  git add $SHIELD
  git add $CHANGELOG
  git commit -m "chore: Bump version up to $VERSION"

  log_info "Create and merge the pull request"
  BUMP_BRANCH_NAME="bump-version/$VERSION_CODE"
  git checkout -b "$BUMP_BRANCH_NAME"
  git push -u origin "$BUMP_BRANCH_NAME"
  PR_URL=$(gh pr create --title "Bump build version: $VERSION($VERSION_CODE)" --body "Bump build VERSION_CODE and VERSION_NAME." | tail -n 1)
  echo "Pull request created: $PR_URL"
  SUBJECT="chore: Bump build version: $VERSION_CODE"
  gh pr merge "$BUMP_BRANCH_NAME" --squash --subject "$SUBJECT" --delete-branch
  echo "Pull request merged!"

  # git checkout $CURRENT_BRANCH_NAME
  # git pull origin "$CURRENT_BRANCH_NAME"
  log_success "Done"
else
  log_warning "Nothing to release yet. Commit you changes using fix or feat prefix or add the breaking change message."
  log_warning "See: https://www.conventionalcommits.org/en/v1.0.0/"
fi
