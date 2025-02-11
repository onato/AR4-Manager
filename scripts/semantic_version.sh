log_success() {
  msg=$1

  GRAY='\033[1;37m'
  WHITE='\033[1;37m'
  GREEN='\033[0;32m'
  NC='\033[0m' # No Color

  printf "${GRAY}[$(date)]${NC} ${GREEN}[success]${NC} - ${WHITE}$msg${NC}\n"
}

export log_success

log_error() {
  msg=$1

  GRAY='\033[1;37m'
  WHITE='\033[1;37m'
  RED='\033[0;31m'
  NC='\033[0m' # No Color

  printf "${GRAY}[$(date)]${NC} ${RED}[error]${NC} - ${WHITE}$msg${NC}\n"
}

export log_error

log_info() {
  msg=$1

  GRAY='\033[0;37m'
  WHITE='\033[1;37m'
  NC='\033[0m' # No Color

  printf "${GRAY}[$(date)]${NC} ${GRAY}[info]${NC} - ${WHITE}$msg${NC}\n"
}

export log_info

log_warning() {
  msg=$1

  GRAY='\033[0;37m'
  WHITE='\033[1;37m'
  YELLOW='\033[1;33m'
  NC='\033[0m' # No Color

  printf "${GRAY}[$(date)]${NC} ${YELLOW}[warning]${NC} - ${WHITE}$msg${NC}\n"
}

export log_warning

is_releasable() {
  latest_version=$(latest_version)
  new_version=${1:-$(new_version)}

  major=$(echo "$latest_version" | awk -F. '{print $1}')
  new_major=$(echo "$new_version" | awk -F. '{print $1}')

  minor=$(echo "$latest_version" | awk -F. '{print $2}')
  new_minor=$(echo "$new_version" | awk -F. '{print $2}')

  patch=$(echo "$latest_version" | awk -F. '{print $3}')
  new_patch=$(echo "$new_version" | awk -F. '{print $3}')

  if [ $new_major -gt $major ]; then
    echo "true"
  elif [ $new_major -eq $major -a $new_minor -gt $minor ]; then
    echo "true"
  elif [ $new_major -eq $major -a $new_minor -eq $minor -a $new_patch -gt $patch ]; then
    echo "true"
  else
    echo "false"
  fi

}

export is_releasable

latest_version() {
  git fetch --tags

  tag=$(git describe --tags --abbrev=0)

  echo "$tag"
}

export latest_version

generate_item() {
  repo=$2

  full_hash=$(echo "$1" | awk -F'|' '{print $1}')
  hash=$(echo "$1" | awk -F'|' '{print $2}')
  author=$(echo "$1" | awk -F'|' '{print $4}')
  prefix=$(echo "$1" | awk -F'|' '{print $5}' | awk '{print $1}' | sed -e 's/://')
  title=$(echo "$1" | awk -F'|' '{print $5}' | awk '{$1=""; print $0}' | sed -e 's/^[[:space:]]*//')
  body=$(echo "$1" | awk -F'|' '{print $6}' | sed -e 's/^[[:space:]]*//')

  echo "- $title ([$hash](https://github.com/$repo/commit/$full_hash)) - $author"
}

generate_version_shield() {
  version=$1

  if [ "$version" == "" ]; then
    log_error "No version was provided."
    exit 1
  fi

  output_dir=docs/images
  filename=$output_dir/latest_version.svg

  [ -d $output_dir ] || mkdir -p $output_dir

  touch $filename

  url="https://img.shields.io/badge/latest%20version-$version-%234c1"
  curl -s "$url" -o $filename

  echo "$filename"
}

export generate_version_shield

write_env() {
  output_dir=/tmp/mobile-core
  filename="$output_dir/create-tag.env"

  [ -d $output_dir ] || mkdir -p $output_dir

  touch $filename

  echo "$1=$2" >>$filename
}

new_version() {
  tag=$(latest_version)

  major=$(echo "$tag" | awk -F. '{print $1}')
  new_major=$major

  minor=$(echo "$tag" | awk -F. '{print $2}')
  new_minor=$minor

  patch=$(echo "$tag" | awk -F. '{print $3}')
  new_patch=$patch

  log=$(git rev-list --pretty='%H|%h|%cs|%cN <%cE>|%s|%b|%(trailers)' HEAD..."$tag" --reverse --no-commit-header)
  num=$(echo "$log" | wc -l | sed -e 's/^[[:space:]]*//')

  if [ "$num" -lt 1 ]; then
    log_error "No commits were found."
    exit 1
  fi

  while IFS= read -r line; do
    prefix=$(echo "$line" | awk -F'|' '{print $5}' | awk '{print $1}' | sed -e 's/://')
    body=$(echo "$line" | awk -F'|' '{print $6}' | sed -e 's/^[[:space:]]*//')

    case "$prefix" in

    "feat" | "feature")
      new_minor=$((new_minor + 1))
      new_patch=0
      ;;

    "fix")
      new_patch=$((new_patch + 1))
      ;;
    esac

    if [ "$prefix" == *"!"* -o "$body" == *"BREAKING CHANGE:"* ]; then
      new_major=$((new_major + 1))
      new_minor=0
      new_patch=0
    fi

  done <<<"$log"

  echo "$new_major.$new_minor.$new_patch"
}

export new_version

build_changelog() {
  tag=$1
  repo=$(gh repo view | grep 'name' | awk -F'name:' '{print $2}' | sed -e 's/^[[:space:]]*//')

  if [ "$tag" == "" ]; then
    log_error "No tag was provided."
    exit 1
  fi

  major=$(echo "$tag" | awk -F. '{print $1}')
  new_major=$major

  minor=$(echo "$tag" | awk -F. '{print $2}')
  new_minor=$minor

  patch=$(echo "$tag" | awk -F. '{print $3}')
  new_patch=$patch

  log=$(git rev-list --pretty='%H|%h|%cs|%cN <%cE>|%s|%b|%(trailers)' HEAD..."$tag" --reverse --no-commit-header)
  num=$(echo "$log" | wc -l | sed -e 's/^[[:space:]]*//')

  if [ "$num" -lt 1 ]; then
    log_error "No commits were found."
    exit 1
  fi

  local breaking=() features=() patches=() ci=() docs=() tests=() chores=() others=()

  while IFS= read -r line; do
    prefix=$(echo "$line" | awk -F'|' '{print $5}' | awk '{print $1}' | sed -e 's/://')
    body=$(echo "$line" | awk -F'|' '{print $6}' | sed -e 's/^[[:space:]]*//')

    case "$prefix" in

    "feat" | "feature")
      features+=("$(generate_item "$line" "$repo")")
      new_minor=$((new_minor + 1))
      new_patch=0
      ;;

    "fix")
      patches+=("$(generate_item "$line" "$repo")")
      new_patch=$((new_patch + 1))
      ;;

    "ci")
      ci+=("$(generate_item "$line" "$repo")")
      ;;

    "doc" | "docs")
      docs+=("$(generate_item "$line" "$repo")")
      ;;

    "test" | "tests")
      tests+=("$(generate_item "$line" "$repo")")
      ;;

    "chore")
      chores+=("$(generate_item "$line" "$repo")")
      ;;

    *)
      title=$(echo "$1" | awk -F'|' '{print $5}' | awk '{$1=""; print $0}' | sed -e 's/^[[:space:]]*//')
      hash=$(echo "$1" | awk -F'|' '{print $2}')
      full_hash=$(echo "$1" | awk -F'|' '{print $1}')
      author=$(echo "$1" | awk -F'|' '{print $4}')

      if [ "$title" != "" ]; then
        others+=("- $title ([$hash](https://github.com/$repo/commit/$full_hash)) - $author")
      fi
      ;;
    esac

    if [ "$prefix" == *"!"* -o "$body" == *"BREAKING CHANGE:"* ]; then
      breaking+=("$(generate_item "$line" "$repo")")
      new_major=$((new_major + 1))
      new_minor=0
      new_patch=0
    fi

  done <<<"$log"

  version="$new_major.$new_minor.$new_patch"
  output_dir=docs/changelogs
  filename=$output_dir/$version.md

  [ -d $output_dir ] || mkdir -p $output_dir && chmod 755 $output_dir

  touch $filename

  printf "# %s (%s)\n\n" $version "$(date +'%m/%d/%Y')" >$filename

  IFS=$'\n'
  if [ ${#breaking[@]} -gt 0 ]; then
    printf "### BREAKING CHANGES:\n%s\n\n" "${breaking[*]}" >>$filename
  fi

  if [ ${#features[@]} -gt 0 ]; then
    printf "### Features:\n%s\n\n" "${features[*]}" >>$filename
  fi

  if [ ${#patches[@]} -gt 0 ]; then
    printf "### Bug fixes:\n%s\n\n" "${patches[*]}" >>$filename
  fi

  if [ ${#tests[@]} -gt 0 ]; then
    printf "### Tests:\n%s\n\n" "${tests[*]}" >>$filename
  fi

  if [ ${#docs[@]} -gt 0 ]; then
    printf "### Documentation:\n%s\n\n" "${docs[*]}" >>$filename
  fi

  if [ ${#ci[@]} -gt 0 ]; then
    printf "### Continuous integration:\n%s\n\n" "${ci[*]}" >>$filename
  fi

  if [ ${#chores[@]} -gt 0 ]; then
    printf "### Building system:\n%s\n\n" "${chores[*]}" >>$filename
  fi

  if [ ${#others[@]} -gt 0 ]; then
    printf "### Others:\n%s\n\n" "${others[*]}" >>$filename
  fi

  printf "> Compare with previous version: https://github.com/$repo/compare/%s...%s" "$tag" "$version" >>$filename

  printf "$output_dir/$version.md"
}

export build_changelog

get_property() {
  while IFS= read -r line; do
    key=$(echo $line | awk -F'=' '{print $1}')
    value=$(echo $line | awk -F'=' '{print $2}')

    if [ "$2" == "$key" ]; then
      echo "$value"
      break
    fi
  done <"$1"
}

export get_property

update_property() {
  file=$1
  replaceable=""
  while IFS= read -r line; do
    key=$(echo $line | awk -F'=' '{print $1}')
    value=$(echo $line | awk -F'=' '{print $2}')

    if [ "$2" == "$key" ]; then
      replaceable=$line
      break
    fi

  done <"$file"

  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' -e "s/^"$line"/"$2"="$3"/g" "$file"
  else
    sed -i -e "s/^"$line"/"$2"="$3"/g" "$file"
  fi
}

export update_property

check_working_directory() {
  IS_CI=${CI:-}
  if [[ $IS_CI == true ]]; then
    log_info "Check working directory"
    git diff-index --quiet HEAD -- || (log_error "Working directory is not clean" && exit 1)
    log_success "Working directory is clean"
  else
    log_info "Skip check on working directory"
  fi

}
export check_working_directory

is_ci() {
  IS_CI=${CI:-}
  if [[ $IS_CI == true ]]; then
    echo "true"
  else
    echo "false"
  fi
}

export is_ci
