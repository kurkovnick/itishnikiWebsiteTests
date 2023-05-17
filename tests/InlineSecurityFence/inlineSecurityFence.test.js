const { test, expect, page } = require('@playwright/test' );
const { projects } = require('../../playwright.config');
const { POManager } = require( '../utils/POManager' );
const data = JSON.parse(JSON.stringify(require('./inlineSecurityFence.data.json')))

let poManager = {};
let helper = {};

test.beforeEach( async ( {page} ) => {
    poManager = new POManager( page );
    helper = poManager.getInlineSecurityFenceUtils( page );
} );

test.describe('Home Page Tests', () => {
    test.only('Hero Get a Free Quote Button works', async () => {
        await helper.goToPageAndCheckCSS(data.pageURLs.homePage);
        await helper.heroGetAFreeQuoteButton.click();
        await expect(page).toHaveURL(data.pageURLs.quotePage);
    } );
} );




