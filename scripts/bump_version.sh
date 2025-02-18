#!/usr/bin/env bash
set -eu

. ./scripts/semantic_version.sh

check_working_directory

git fetch --tags

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
  VERSION_CODE=$(get_property "android/version.properties" "versionCode")
  VERSION_CODE=$((VERSION_CODE + 1))
  update_property android/version.properties versionName $VERSION
  update_property android/version.properties versionCode $VERSION_CODE

  log_success "Version name updated to $VERSION and code bumped to $VERSION_CODE"
  log_info "Committing changelog files"
  git add android/version.properties
  git add $SHIELD
  git add $CHANGELOG
  git commit -m "chore: Bump version up to $VERSION"

  git push -u origin "$CURRENT_BRANCH_NAME"

  log_info "Create new release for tag $VERSION"
  gh release create "$VERSION" --title "$VERSION" --notes-file docs/changelogs/"$VERSION".md --prerelease || (
    log_error "\n%s Can't create release"
    exit 1
  )
  log_success "Release created successfully."

  log_success "Done"
else
  log_warning "Nothing to release yet. Commit you changes using fix or feat prefix or add the breaking change message."
  log_warning "See: https://www.conventionalcommits.org/en/v1.0.0/"
fi
