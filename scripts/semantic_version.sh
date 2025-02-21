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

latest_commits() {
  if [ -z "$1" ]; then
    echo "Error: Missing base commit or tag." >&2
    return 1
  fi
  git rev-list --pretty='%s' "$1"..HEAD --reverse --no-commit-header
}

latest_full_commits() {
  if [ -z "$1" ]; then
    echo "Error: Missing base commit or tag." >&2
    return 1
  fi
  git rev-list --pretty='%H|%h|%cs|%cN|%s' "$1"..HEAD --reverse --no-commit-header
}

export latest_commits
export latest_full_commits
