## Installation

```sh
npm i
npm run build
npm run start -- -d https://example.com
```

### M1/M2 Mac

Chromium will install on a M1/M2 Mac via the Puppeteer package. However, it will be stuck in a quarantine state and unable to run. The work around is to install Chromium with Homebrew and pass the `--no-quarantine` flag. The .env file will fetch the correct executable path for Chromium and set environment variables which are read in by the script. Work around provided by [https://dev.to/tnzk/install-puppeteer-on-macbook-pro-with-apple-silicon-m1-3kc](https://dev.to/tnzk/install-puppeteer-on-macbook-pro-with-apple-silicon-m1-3kc)

```sh
brew install --cask chromium --no-quarantine
source .env
```