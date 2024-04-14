const { test, expect, page } = require( '@playwright/test' );
//const { projects } = require('../../playwright.config');
const { POManager } = require( '../utils/POManager' );
const data = JSON.parse(JSON.stringify(require('./inlineFence.data.json')));
import { defineConfig } from '@playwright/test';

let poManager = {};
let helper = {};

test.beforeEach( async ( {page} ) => {
    poManager = new POManager( page );
    helper = poManager.getInlineFenceUtils( page );
} );

test.describe('Home Page Tests', () => {
    test('Header Looks Good', async () => {
        await helper.goToPage(data.pageURLs.homePage);
        await helper.checkHeader();
    } );

    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.homePage);
        await helper.checkFenceSpecialtiesSection();
    } );
} );

test.describe('About Page Tests', () => {
    test('Hero Section Text Looks Good', async () => {
        await helper.goToPage(data.pageURLs.aboutPage);
        await helper.aboutPageHeroSectionCheck();
    } );
} );

test.describe('Horizontal Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.horizontalFencePage);
        await helper.horizontalPageHeroSectionCheck();
    } );
} );

test.describe('Full Panel Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.fullPanelFencePage);
        await helper.fullPanelPageHeroSectionCheck();
    } );
} );

test.describe('Chainlink Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.chainlinkFencePage);
        await helper.chainlinkPageHeroSectionCheck();
    } );
} );

test.describe('Hog Wire Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.hogwireFencePage);
        await helper.hogWirePageHeroSectionCheck();
    } );
} );

test.describe('Vinyl Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.vinylFencePage);
        await helper.vinylPageHeroSectionCheck();
    } );
} );

test.describe('Ornamental Iron Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.ornamentalIronPage);
        await helper.ornamentalIronPageHeroSectionCheck();
    } );
} );

test.describe('Rambler Iron Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.ramblerFencePage);
        await helper.ramblerPageHeroSectionCheck();
    } );
} );


test.describe('Modified Full Panel Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.modifiedFullPanelFencePage);
        await helper.modifiedFullPanelPageHeroSectionCheck();
    } );
} );


test.describe('Wooden Fences Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.cedarWoodenFencesPage);
        await helper.woodenFencesPageHeroSectionCheck();
    } );
} );


test.describe('Addon Options Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.addonOptionsPage);
        await helper.addonOptionsPageHeroSectionCheck();
    } );
} );


test.describe('Warranty Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.warrantyPage);
        await helper.warrantyPageHeroSectionCheck();
    } );
} );


test.describe('Post On Pipe Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.postOnPipe);
        await helper.postOnPipePageHeroSectionCheck();
    } );
} );

test.describe('Careers Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.careersPage);
        await helper.careersPageHeroSectionCheck();
    } );
} );

test.describe('Quote Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.quotePage);
        await helper.quotePageHeroSectionCheck();
    } );
} );


//City Pages
test.describe('Kirkland Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.kirklandPage);
        await helper.kirklandPageHeroSectionCheck();
    } );
} );

test.describe('Bellevue Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.bellevuePage);
        await helper.bellevuePageHeroSectionCheck();
    } );
} );

test.describe('Bothell Page Tests', () => {
    test('Hero Section Looks Good', async () => {
        await helper.goToPage(data.pageURLs.bothellPage);
        await helper.bothellPageHeroSectionCheck();
    } );
} );





test.describe('Check CTA Buttons Page Tests', () => {
    for(let i = 0; i < Object.keys(data.pageURLs).length; i++){
        test(`${Object.keys(data.pageURLs)[i]}`, async ({ page, }) => {
            await helper.checkButtons(page, Object.values(data.pageURLs)[i], 'a.elementor-button-link:not(.elementor-hidden-desktop.elementor-hidden-tablet.elementor-hidden-mobile):visible');
        });
    };
} );



test.describe.only('Check Page HTML Heirarchy Tests', () => {
    
    for(let i = 0; i < Object.keys(data.pageURLs).length; i++){
        test(`${Object.keys(data.pageURLs)[i]}`, async ({ page, }) => {
            await helper.checkHTMLHeirarchy(page, Object.values(data.pageURLs)[i])
        });
    };
} );





