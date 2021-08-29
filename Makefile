YARN := yarn
NODE := $(YARN) node

.PHONY: generate-tsconfig

generate-tsconfig:
	$(NODE) scripts/generators/tsconfig.js
