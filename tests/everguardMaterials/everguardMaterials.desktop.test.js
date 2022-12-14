const { test, expect } = require('@playwright/test' );
const { POManager } = require( '../utils/POManager' );
//const testData = require(JSON.stringify(JSON.parse('./inlineFence.data.json')));

let poManager = {};
let helper = {};

test.beforeEach( async ( {page} ) => {
    poManager = new POManager( page );
    helper = poManager.getEverguardMaterialUtils( page );
} );

test.describe('Home Page Tests', () => {
    test('Header Looks Good', async () => {
        await helper.gotoHomePage();
        await helper.checkHeader();
    } );

    test('Footer Looks Good', async () => {
        await helper.gotoHomePage();
        await helper.checkHeader();
    } );

    test('Hero Section Looks Good', async () => {
        await helper.gotoHomePage();
        await helper.checkHeroSection();
    } );

    test('About Us Section Looks Good', async () => {
        await helper.gotoHomePage();
        await helper.checkAboutUsSection();
    } );
} );


test.describe('Contact Page Tests', () => {
    test('Contact Form Looks Good', async () => {
        await helper.goToContactPage();
        await helper.checkContactForm();
    } );
} );



