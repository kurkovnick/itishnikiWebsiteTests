import { expect, Page, test } from '@playwright/test';
const { POManager } = require( '../utils/POManager' );
const data = JSON.parse(JSON.stringify(require('./inlineSecurityFence.data.json')))

let poManager = {};
let helper = {};

test.beforeEach( async ( {page} ) => {
    poManager = new POManager( page );
    helper = poManager.getInlineSecurityFenceUtils( page );
} );

    test('Hero Get a Free Quote Button works', async ( { page } ) => {
        await page.goto('https:www.itishniki.com');
        await expect(page).toHaveURL('itishniki.org')
    } );




