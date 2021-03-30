YARN = yarn
NODE = $(YARN) node

.PHONY: lint format test build build-examples watch watch-core watch-parser analyze

analyze:
	@./أوامر/عنوان-الأمر.sh analyzing "$(path)"
	$(YARN) webpack --profile \
		--json="$(path)"/webpack.stats.json \
		--config "$(path)"/webpack.config.js

build:
	@./أوامر/عنوان-الأمر.sh building "$(path)"
	$(YARN) webpack --mode development \
		--config "$(path)"/webpack.config.js

build-examples:
	$(YARN) workspaces foreach --include '@arabi/example*' -pt run build

watch:
	@./أوامر/عنوان-الأمر.sh watching "$(path)"
	$(YARN) webpack --watch --mode development \
		--config "$(path)"/webpack.config.js

watch-core:
	$(MAKE) path="حزم/لب" watch

watch-parser:
	$(MAKE) path="حزم/محلل" watch

lint:
	@./أوامر/عنوان-الأمر.sh linting "$(path)"
	$(YARN) eslint --fix --format=codeframe "$(path)"

format:
	@./أوامر/عنوان-الأمر.sh formatting "$(path)"
	$(YARN) prettier --write "$(path)"

test:
	$(YARN) jest
