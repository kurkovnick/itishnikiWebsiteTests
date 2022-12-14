const { test, expect } = require('@playwright/test' );
const { POManager } = require( '../utils/POManager' );
//const testData = require(JSON.stringify(JSON.parse('./inlineFence.data.json')));

let poManager = {};
let helper = {};

test.beforeEach( async ( {page} ) => {
    poManager = new POManager( page );
    helper = poManager.getEverguardMaterialUtils( page );
} );


test.only('Header Looks Good', async () => {
    await helper.gotoHomePage();
    await helper.checkHeader();
} );

test.only('Footer Looks Good', async () => {
    await helper.gotoHomePage();
    await helper.checkHeader();
} );

test.only('Hero Section Looks Good', async () => {
    await helper.gotoHomePage();
    await helper.checkHeroSection();
} );

test.only('About Us Section Looks Good', async () => {
    await helper.gotoHomePage();
    await helper.checkAboutUsSection();
} );



