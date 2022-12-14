const { test, expect } = require('@playwright/test');
//const testData = require(JSON.stringify(JSON.parse('./inlineFence.data.json')));

test('Go to cart button works', async ({ page }) => {
    //Step 1 - Open the amazon page
    await page.goto( 'https://www.amazon.com/' , {waitUntil : 'load'});
    
    //Selecting the cart icon
    await page.locator('#nav-cart').click();
    
    //Validating the cart to be empy
    await expect(page.locator('.sc-your-amazon-cart-is-empty h2')).toHaveText('Your Amazon Cart is empty')
});

test('Returns and Orders Button works', async ({ page }) => {
    //Step 1 - Open the amazon page
    await page.goto( 'https://www.amazon.com/' , {waitUntil : 'load'});
    
    //Selecting the cart icon
    await page.locator('#nav-orders').click();
    await page.waitForLoadState('load')
    
    //Validating the cart to be empy
    await expect(await page.title()).toBe('Amazon Sign-In')
});

