path = $(INIT_CWD)
YARN = yarn
NODE = $(YARN) node

.PHONY: lint format test build build-* watch watch-* analyze analyze-*

analyze:
	@./أوامر/عنوان-الأمر analyzing
	$(YARN) webpack --profile \
		--json="$(path)"/webpack.stats.json \
		--config "$(path)"/webpack.config.js

build:
	@./أوامر/عنوان-الأمر building
	$(YARN) webpack --mode development \
		--config "$(path)"/webpack.config.js

build-examples:
	$(YARN) workspaces foreach --include '@arabi/example*' -pt run build

watch:
	@./أوامر/عنوان-الأمر watching
	$(YARN) webpack --watch --mode development \
		--config "$(path)"/webpack.config.js

watch-core:
	$(MAKE) INIT_CWD="حزم/لب" watch

watch-parser:
	$(MAKE) INIT_CWD="حزم/محلل" watch

lint:
	@./أوامر/عنوان-الأمر linting
	$(YARN) eslint --fix --format=codeframe "$(path)"

format:
	@./أوامر/عنوان-الأمر formatting
	$(YARN) prettier --write --ignore-path .eslintignore "$(path)"

test:
	$(YARN) jest
