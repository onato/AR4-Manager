#!/usr/bin/env bash
set -eu

. ./scripts/semantic_version.sh

check_working_directory

log_info "Getting latest tag"
TAG=$(latest_version)
log_success "Latest tag: $TAG"

log_info "Check if release $TAG already exists"
RELEASE_TAG=$(gh release view $TAG | grep 'tag:' | grep $TAG | awk -F'tag:' '{print $2}' | sed -e 's/^[[:space:]]*//')
if [ "$RELEASE_TAG" == "$TAG" ]; then
  log_warning "Release $TAG already exists"
  RELEASE_URL=$(gh release view $TAG | grep 'url' | awk -F'url:' '{print $2}' | sed -e 's/^[[:space:]]*//')
  log_warning "See: $RELEASE_URL"
else
  log_success "No release was found. We're good to go."
  build_changelog "$TAG"

  log_info "Create new release for tag $TAG"
  gh release create "$TAG" --title "$TAG" --notes-file docs/changelogs/"$TAG".md --prerelease || (
    log_error "\n%s Can't create release"
    exit 1
  )
  log_success "Release created successfully"
fi
