echo "┏━━━ 🔍 Linting $(pwd) ━━━━━━━━━━━━━━━━━━━"
yarn eslint --cache --fix --format=codeframe "$@"