.PHONY: serve test install clean

# Run site locally
serve:
	@echo "Starting server at http://localhost:8890"
	python3 -m http.server 8890

# Run tests
test: install
	npm test

# Install dependencies
install:
	npm install
	npx playwright install chromium

# Clean build artifacts
clean:
	rm -rf node_modules playwright-report test-results
