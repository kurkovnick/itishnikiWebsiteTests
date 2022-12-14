const { test, expect } = require('@playwright/test' );
const { projects } = require('../../playwright.config');
const { POManager } = require( '../utils/POManager' );
const testURLList = JSON.parse(JSON.stringify(require('./everGuardMaterials.data.json')))

let poManager = {};
let helper = {};

test.beforeEach( async ( {page} ) => {
    poManager = new POManager( page );
    helper = poManager.getEverguardMaterialUtils( page );
} );

test.describe('Home Page Tests', () => {
    test('Header Looks Good', async () => {
        await helper.goToPage(helper.homePageURL);
        await helper.checkHeader();
    } );

    test('Footer Looks Good', async () => {
        await helper.goToPage(helper.homePageURL);
        await helper.checkHeader();
    } );

    test('Hero Section Looks Good', async () => {
        await helper.goToPage(helper.homePageURL);
        await helper.checkHeroSection();
    } );

    test('About Us Section Looks Good', async () => {
        await helper.goToPage(helper.homePageURL);
        await helper.checkAboutUsSection();
    } );
} );


test.describe('Contact Page Tests', () => {
    test('Contact Form Looks Good', async () => {
        await helper.goToPage(helper.contactPageURL);
        await helper.checkContactForm();
    } );
} );


test.describe('Check CTA Buttons Page Tests', () => {
    
    for(let i = 0; i < Object.keys(testURLList.pageURLs).length; i++){
        test(`${Object.keys(testURLList.pageURLs)[i]}`, async ({ page, }) => {
            await helper.checkButtons(page, Object.values(testURLList.pageURLs)[i]);
        });
      };
} );




