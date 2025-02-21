. ./scripts/semantic_version.sh

CURRENT_RELEASE=$(gh release list --limit 1 --json tagName --jq '.[0].tagName')

needs_release() {
  latest_commits $CURRENT_RELEASE | grep -Eq '^(feat:|fix:)|^.*!:'
}

calculate_next_version() {
  local current_version=$1
  local major=$(echo $current_version | cut -d. -f1)
  local minor=$(echo $current_version | cut -d. -f2)
  local patch=$(echo $current_version | cut -d. -f3)

  if latest_commits $current_version | grep -q '^.*!:'; then
    major=$((major + 1))
    minor=0
    patch=0
  elif latest_commits $current_version | grep -q '^feat:'; then
    minor=$((minor + 1))
    patch=0
  elif latest_commits $current_version | grep -q '^fix:'; then
    patch=$((patch + 1))
  fi

  echo "$major.$minor.$patch"
}

generate_changelog() {
  REPO=$(gh repo view --json owner,name -q '"\(.owner.login)/\(.name)"')
  latest_full_commits $CURRENT_RELEASE | scripts/generate_changelog.sh $REPO $CURRENT_RELEASE $NEXT_RELEASE >$CHANGELOG
}

update_android_version() {
  echo "Updating Android version name and code"
  VERSION_CODE=$(get_property "android/version.properties" "versionCode")
  VERSION_CODE=$((VERSION_CODE + 1))
  update_property android/version.properties versionName $NEXT_RELEASE
  update_property android/version.properties versionCode $VERSION_CODE

  git add android/version.properties
  # git add $SHIELD
  git add $CHANGELOG
}

if needs_release; then
  NEXT_RELEASE=$(calculate_next_version $CURRENT_RELEASE)

  echo "New Release Required! $CURRENT_RELEASE -> $NEXT_RELEASE"
  CHANGELOG=docs/changelogs/"$NEXT_RELEASE".md

  generate_changelog
  update_android_version

  git commit -m "chore: Bump version up to $NEXT_RELEASE"
  git push

  gh release create "$NEXT_RELEASE" --title "$NEXT_RELEASE" --notes-file docs/changelogs/"$NEXT_RELEASE".md --prerelease
else
  echo "No release necessary"
fi
