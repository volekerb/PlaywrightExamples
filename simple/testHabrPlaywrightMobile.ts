const { webkit, devices } = require('playwright');
const deviceType = devices['iPhone 8'];

(async () => {
    const browser = await webkit.launch();
    const context = await browser.newContext({
        viewport: deviceType.viewport,
        userAgent: deviceType.userAgent
    });
    const page = await context.newPage('http://habr.com');
    await delay(2000);
    await page.screenshot({ path: `example-${deviceType.name}.png`});
    await browser.close();
})();

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}
