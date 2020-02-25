const playwright = require('playwright');

(async () => {
    for (const browserType of ['chromium', 'firefox', 'webkit']) {
        const browser = await playwright[browserType].launch(({headless: false}));
        const context = await browser.newContext();
        const page = await browser.newPage();
        await page.goto('https://habr.com');

        await page.screenshot({ path: `screenshots/example-${browserType}.png` });
        await browser.close();
    }
})();
