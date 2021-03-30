path = $(INIT_CWD)
YARN = yarn
NODE = $(YARN) node

.PHONY: lint format test build build-* watch watch-* analyze analyze-*

analyze:
	@./أوامر/عنوان-الأمر analyzing "$(path)"
	$(YARN) webpack --profile \
		--json="$(path)"/webpack.stats.json \
		--config "$(path)"/webpack.config.js

build:
	@./أوامر/عنوان-الأمر building "$(path)"
	$(YARN) webpack --mode development \
		--config "$(path)"/webpack.config.js

build-examples:
	$(YARN) workspaces foreach --include '@arabi/example*' -pt run build

watch:
	@./أوامر/عنوان-الأمر watching "$(path)"
	$(YARN) webpack --watch --mode development \
		--config "$(path)"/webpack.config.js

watch-core:
	$(MAKE) path="حزم/لب" watch

watch-parser:
	$(MAKE) path="حزم/محلل" watch

lint:
	@./أوامر/عنوان-الأمر linting "$(path)"
	$(YARN) eslint --fix --format=codeframe "$(path)"

format:
	@./أوامر/عنوان-الأمر formatting "$(path)"
	$(YARN) prettier --write "$(path)"

test:
	$(YARN) jest
