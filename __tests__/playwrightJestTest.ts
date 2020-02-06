const playwright = require('playwright');
const { webkit, devices } = require('playwright');

describe('Habrahabr', () => {
    let page, browser;

    beforeAll(async () => {
        for (const browserType of ['chromium']) {
            browser = await playwright[browserType].launch({headless:false});
            const context = await browser.newContext();
            page = await context.newPage('http://habr.com/');
        }
    });

    it('should be titled "Habr"', async () => {
        await expect(page.title()).resolves.toBe('Лучшие публикации за сутки / Хабр');
    });

    afterAll(async () => {
        await browser.close();
    })
});

describe('Geo location and navigation in yandex maps', () => {
    const iPhone11 = devices['iPhone 11 Pro'];
    let browser;
    it('should navigate and take a screenshot"', async () => {
        browser = await webkit.launch({headless:false});
        const context = await browser.newContext({
            viewport: iPhone11.viewport,
            userAgent: iPhone11.userAgent,
            geolocation: { longitude: 12.492507, latitude: 41.889938 },
            permissions: { 'https://yandex.ru/maps': ['geolocation'] }
        });

        const page = await context.newPage('https://yandex.ru/maps');
        await page.screenshot({ path: 'iphone.png' });
    });

    afterAll(async () => {
        await browser.close();
    })
});


