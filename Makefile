NPM := mise exec -- npm

SCRIPTS := dev build preview validate-schema lighthouse

.PHONY: install $(SCRIPTS) generate-favicons generate-presskit generate-placeholders

install:
	$(NPM) install

$(SCRIPTS):
	$(NPM) run $@

generate-%:
	$(NPM) run generate:$*
