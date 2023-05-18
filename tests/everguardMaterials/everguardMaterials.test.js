const { test, expect, page } = require( '@playwright/test' );
//const { projects } = require('../../playwright.config');
const { POManager } = require( '../utils/POManager' );
const data = JSON.parse(JSON.stringify(require('./everGuardMaterials.data.json')))

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

test.describe('Material Calulator Page', () => {
    test.only('Material Calculator Page Title Section Looks Good', async () => {
        await helper.goToPage(helper.materialCalculatorURL);
        await helper.checkPageTitleSection();
    } );

    test('User is able to fill out the form to see the "Email Materials" button', async ( { page } ) => {
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




