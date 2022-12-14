const { test, expect } = require('@playwright/test');
//const testData = require(JSON.stringify(JSON.parse('./inlineFence.data.json')));

test('Learn More About Home Renovation button works', async ({ page }) => {
    //Step 1 - Open the page
    await page.goto( 'https://wisechoicegc.com/' , {waitUntil : 'load'});

    //Step 2 - click on "Learn More About Home Renovation" button
    await page.locator('.elementor-nav-menu--main #menu-1-371b6a44 .menu-item-665 a').click();



    //Selector for Learn more about home renovations
    page.locator('text=Learn More About Home Renovation')

    //Selector for Portfolio link in the header 
    page.locator('header.elementor-top-section >> text=Portfolio')
});

