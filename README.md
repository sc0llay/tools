# Jake's Tools

Small, self-contained browser tools, hosted with GitHub Pages at **https://sc0llay.github.io/tools/**.

Each tool is a single HTML page that runs entirely in the browser: no server, no accounts, and nothing you type leaves your device. Every tool can be added to an iPhone Home Screen (Safari → Share → Add to Home Screen) and works offline once opened.

| Tool | Address |
|---|---|
| VO₂max Estimator | https://sc0llay.github.io/tools/vo2max/ |
| EV Charge Planner | https://sc0llay.github.io/tools/ev-charge/ |
| GEM Blend Calculator | https://sc0llay.github.io/tools/gem-blend/ |
| Turbo Match Bench | https://sc0llay.github.io/tools/turbo-toolkit/ |
| Engine Simulator | https://sc0llay.github.io/tools/engine-sim/ |
| Elements Explorer | https://sc0llay.github.io/tools/periodic/ |

## Adding a tool

1. Create a folder named after the tool with an `index.html` and a `manifest.webmanifest` (copy `vo2max/` as a starting point).
2. Add icons to `icons/` (180, 192 and 512 px PNGs).
3. Add a row for it to the home page, `index.html`.
4. Add its files to `FILES` in `sw.js` and bump `VERSION`, so it works offline.
