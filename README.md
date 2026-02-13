# 🌍 Timezone Buddy

See your team's local time at a glance. Perfect for remote workers coordinating across timezones.

## Features

- **Live clocks** — Real-time display of your local time and teammates' times
- **City search** — Just type a city name, no need to know IANA timezone codes
- **Time converter** — Input a specific time to see what it is for everyone
- **UTC toggle** — Quick reference for UTC time
- **Fully static** — No backend, works on GitHub Pages
- **Persistent** — Saves your team to localStorage

## Usage

Just open `index.html` in a browser, or visit the hosted version.

1. Add teammates by entering their name and city
2. See everyone's current local time
3. Use "Convert" mode to plan meetings across timezones

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Serve locally
npm run serve
# Open http://localhost:8890
```

## Deploy to GitHub Pages

1. Push to a GitHub repo
2. Go to Settings → Pages
3. Set source to "Deploy from branch" → `main`
4. Your site will be live at `username.github.io/repo-name`

## License

MIT
