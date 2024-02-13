const { test, expect, page } = require( '@playwright/test' );
//const { projects } = require('../../playwright.config');
const { POManager } = require( '../utils/POManager' );
const data = JSON.parse(JSON.stringify(require('./everGuardMaterials.data.json')));
import { defineConfig } from '@playwright/test';

let poManager = {};
let helper = {};

test.beforeEach( async ( {page} ) => {
    poManager = new POManager( page );
    helper = poManager.getEverguardMaterialUtils( page );
} );

test.describe('Home Page Tests', () => {
    test.only('Header Looks Good', async () => {
        await helper.goToPage(helper.homePageURL);
        await helper.checkHeader();
    } );

    // test('Footer Looks Good', async () => {
    //     await helper.goToPage(helper.materialCalculatorURL);
    //     await helper.checkFooter();
    // } );

    test('Hero Section Title Looks Good', async () => {
        await helper.goToPage(helper.homePageURL);
        await helper.checkHeroTitle();
    } );

    test('About Us Section Looks Good ', async ( {page} ) => {
        await helper.goToPage(helper.homePageURL);
        await page.waitForTimeout(5000)
        await helper.checkAboutUsSection();
    } );
} );


test.describe('Contact Page Tests', () => {
    test('Contact Form Looks Good', async () => {
        await helper.goToPage(helper.contactPageURL);
        await helper.checkContactFormSubmitButton();
    } );
} );

test.describe('Material Calulator Page', () => {
    test('Material Calculator Page Title Section Looks Good', async () => {
        await helper.goToPage(helper.materialCalculatorURL);
        await helper.checkPageTitleSection();
    } );

    test('User is able to fill out the form enough to see the "Email Materials" button', async ( { page } ) => {
        await helper.goToPage(helper.materialCalculatorURL);
        await helper.fenceStyleField.selectOption('Hog Wire')
        await helper.approximateLinealFeet.type('85');
        await helper.emailField.type( 'tester@testing.com' );
        await expect(helper.emailMaterialsButton).toHaveCSS('opacity', '1');
    } );
} );


test.describe('Check CTA Buttons Page Tests', () => {
    
    for(let i = 0; i < Object.keys(data.pageURLs).length; i++){
        test(`${Object.keys(data.pageURLs)[i]}`, async ({ page, }) => {
            await helper.checkButtons(page, Object.values(data.pageURLs)[i]);
        });
    };
} );

test.describe('PDP Tests ', () => {
    test.only(`Product Page Add to Cart Button looks good`, async ({ page, }) => {
        await helper.goToPage(helper.productDetailPageURL);
        await helper.checkAddToCartPDP();
    }); 

    test(`Product Images looks good`, async ({ page, }) => {
        await helper.goToPage(helper.productDetailPageURL);
        await page.waitForTimeout(3000);
        await helper.checkProductImage();
    });
} );




