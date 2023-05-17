import { expect, Page, test } from '@playwright/test';
const { POManager } = require( '../utils/POManager' );
const data = JSON.parse(JSON.stringify(require('./inlineSecurityFence.data.json')))

let poManager = {};
let helper = {};

test.beforeEach( async ( {page} ) => {
    poManager = new POManager( page );
    helper = poManager.getInlineSecurityFenceUtils( page );
} );

test.describe('Check CTA Buttons Page Tests', () => {
    
    for(let i = 0; i < Object.keys(data.pageURLs).length; i++){
        test(`${Object.keys(data.pageURLs)[i]}`, async ({ page, }) => {
            await helper.checkButtons(page, Object.values(data.pageURLs)[i]);
        });
    };
} );




