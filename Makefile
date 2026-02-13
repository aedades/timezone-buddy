.PHONY: help serve test install clean

help: ## Show this help
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-12s %s\n", $$1, $$2}'

serve: ## Run site locally at http://localhost:8890
	@echo "Starting server at http://localhost:8890"
	python3 -m http.server 8890

test: install ## Run Playwright tests
	npm test

install: ## Install dependencies
	npm install
	npx playwright install chromium

clean: ## Clean build artifacts
	rm -rf node_modules playwright-report test-results
