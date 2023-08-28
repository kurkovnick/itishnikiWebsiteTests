const { expect } = require( '@playwright/test' );

class InlineFence {
    constructor ( page) {
        this.page = page;
        this.header = this.page.locator( '[data-elementor-type="header"]' );
        this.headerSelector = '[data-elementor-type="header"]';
        this.footer = this.page.locator( '.elementor-location-footer' )
        this.footerSelector = '.elementor-location-footer';
        this.ourFenceSpecialtiesText = this.page.locator( '[data-id="39badd1"]' );
        this.ourFenceSpecialtiesTextSelector = '[data-id="39badd1"]';
        this.aboutUsSection = this.page.locator( '[data-id="67e0f15"]' );
        this.aboutUsSelector = '[data-id="67e0f15"]';
        this.contactUsSubmitButton = this.page.locator( '[name="Contact Form"] button[type="submit"]' );
        this.contactUsSubmitButtonSelector = '[name="Contact Form"] button[type="submit"]';
        this.seeInventoryButton = this.page.locator('[aria-label="See Inventory"]');

        // Horizontal Page
        this.horizontalPageHeroSection = this.page.locator('[data-id="0417232"]');
        this.horizontalPageHeroSectionSelector = '[data-id="0417232"]';

        // Full Panel Page
        this.fullPanelPageHeroSection = this.page.locator('[data-id="ab82c51"]');
        this.fullPanelPageHeroSectionSelector = '[data-id="ab82c51"]';

        // Chain Link Page
        this.chainlinkPageHeroSection = this.page.locator('[data-id="8899cad"]');
        this.chainlinkPageHeroSectionSelector = '[data-id="8899cad"]';

        // Hog Wire Page
        this.hogWirePageHeroSection = this.page.locator('[data-id="e274c3b"]');
        this.hogWirePageHeroSectionSelector = '[data-id="e274c3b"]';

        // Vinyl Page
        this.vinylPageHeroSection = this.page.locator('[data-id="c464796"]');
        this.vinylPageHeroSectionSelector = '[data-id="c464796"]';

        // Ornamental Iron Page
        this.ornamentalIronPageHeroSection = this.page.locator('[data-id="34e9211"]');
        this.ornamentalIronPageHeroSectionSelector = '[data-id="34e9211"]';

        //Wooden Fences Page
        this.woodenFencesPageHeroSection = this.page.locator('[data-id="ecbf7d5"]')
        this.woodenFencesPageHeroSectionSelector = '[data-id="ecbf7d5"]';

        this.brokenHTMLHeirarchyURLs = [
            "https://www.inline-fence.com",
            "https://inline-fence.com/hog-wire-fence/",
            "https://inline-fence.com/financing/",
            "https://inline-fence.com/vinyl-fence/",
            "https://inline-fence.com/full-panel-fence/",
            "https://inline-fence.com/chain-link-fencing/"
        ]
    }

    async checkButtons(page, url, selector){
        let linkSelector = this.page.locator( selector );
        await this.page.goto(url, {waitUntil : "networkidle"});
        let buttonCount = await linkSelector.count();
        for (let i =0; i < buttonCount; i++ ){
            await expect(await linkSelector.nth(i).getAttribute("href"), `Link: ${await linkSelector.nth(i).innerHTML()} is missing the href address` ).not.toEqual( '' );
            await expect(await linkSelector.nth(i).getAttribute("href"), `Link: ${await linkSelector.nth(i).innerHTML()} accidently contains a placeholder` ).not.toEqual( '#' );
            let link = await linkSelector.nth(i).getAttribute("href");
            if(await linkSelector.nth(i).getAttribute("target") === null){;
                if(await linkSelector.nth(i).getAttribute("href") == null || (await linkSelector.nth(i).getAttribute("href")).includes( '#' ) && (await linkSelector.nth(i).getAttribute("href")).length >= 1 || (await linkSelector.nth(i).getAttribute("href")).includes( '.zip' ) || (await linkSelector.nth(i).getAttribute("href")).includes( 'mailto:' ) || (await linkSelector.nth(i).getAttribute("href")).includes( 'tel:' ) ){
                    continue;
                } else {
                    let got404 = []
                    this.page.on( 'response' , response => {
                        if(response.status() == 404 && response.url() == link) Pages404.push(response.url(), response.status());
                    });
                    await linkSelector.nth(i).click();
                    await this.page.waitForLoadState( 'load' );
                    await expect(got404).toEqual( [] );
                    await this.page.goto(url, {waitUntil : "domcontentloaded"});
                };
            } else if(await linkSelector.nth(i).getAttribute("target") == '_blank' ){
                let got404 = []
                const [newTabPage] = await Promise.all([
                    this.page.on( 'response' , response => { 
                        if(response.status() == 404 && response.url() == link) Pages404.push(response.url());
                    }),                    
                    this.page.waitForEvent( 'popup' ),
                    linkSelector.nth(i).click(), // Opens a new tab
                ]);
                await newTabPage.waitForLoadState( 'load' );
                await expect(got404).toEqual( [] );
                await this.page.goto(url, {waitUntil : "domcontentloaded"});
            };
        };
    }
    
    // Home Page
    async checkHeader() {
        await this.page.waitForSelector( this.headerSelector );
        await expect(this.header).toHaveScreenshot( 'header.png', { maxDiffPixels: 200 });
    }

    async checkFooter() {
        await this.page.waitForSelector( this.footerSelector );
        await expect(this.footer).toHaveScreenshot( 'footer.png', { maxDiffPixels: 200 });
    }

    async checkFenceSpecialtiesSection() {
        await this.page.waitForSelector( this.ourFenceSpecialtiesTextSelector );
        await expect(this.ourFenceSpecialtiesText).toHaveScreenshot( 'ourFenceSpecialties.png', { maxDiffPixels: 200 });
    }

    async checkAboutUsSection() {
        await this.page.waitForSelector( this.aboutUsSelector );
        await expect(this.aboutUsSection).toHaveScreenshot( 'aboutUs.png', { maxDiffPixels: 200 })
    }

    async checkPageTitleSection() {
        await this.page.waitForSelector( this.pageTitleSectionSelector );
        await expect(this.pageTitleSection).toHaveScreenshot( 'CalculatorPageTitle.png', { maxDiffPixels: 200 });
    }


    // Contact Page
    async goToPage(url){
        let requestFailed = []
        this.page.on( 'request' , async request => {
            if( request.failure() !== null && request.url().includes( '.css' ) ){requestFailed.push(request.url())}
        });
      
        //Go to the URL and scroll to the bottom so that the network can idle on the whole pages
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        await this.page.waitForTimeout( 10000 );
        
        //Validate Broken CSS Requests
        await expect(requestFailed, `Failed Assets: ${requestFailed.toString()}` ).toEqual( [] )
    };

    //Quote Page
    async checkContactFormSubmitButton() {
        await this.page.waitForSelector( this.contactUsSubmitButtonSelector );
        await expect(this.contactUsSubmitButton).toHaveScreenshot( 'contactFormSubmitButton.png', { maxDiffPixels: 200 })
    }

    // Horizontal Page
    async horizontalPageHeroSectionCheck() {
        await this.page.waitForSelector( this.horizontalPageHeroSectionSelector );
        await expect(this.horizontalPageHeroSection).toHaveScreenshot( 'horizontalPageHeroSection.png', { maxDiffPixels: 200 })
    }
    
    
    // Full Panel Page
    async fullPanelPageHeroSectionCheck() {
        await this.page.waitForSelector( this.fullPanelPageHeroSectionSelector );
        await expect(this.fullPanelPageHeroSection).toHaveScreenshot( 'fullPanelPageHeroSection.png', { maxDiffPixels: 200 })
    }


    // Chain Link Page
    async chainlinkPageHeroSectionCheck() {
        await this.page.waitForSelector( this.chainlinkPageHeroSectionSelector );
        await expect(this.chainlinkPageHeroSection).toHaveScreenshot( 'chainlinkPageHeroSection.png', { maxDiffPixels: 200 })
    }

    // Hog Wire Page
    async hogWirePageHeroSectionCheck() {
        await this.page.waitForSelector( this.hogWirePageHeroSectionSelector );
        await expect(this.hogWirePageHeroSection).toHaveScreenshot( 'hogWirePageHeroSection.png', { maxDiffPixels: 200 })
    }

    // Vinyl Page
    async vinylPageHeroSectionCheck() {
        await this.page.waitForSelector( this.vinylPageHeroSectionSelector );
        await expect(this.vinylPageHeroSection).toHaveScreenshot( 'vinylPageHeroSection.png', { maxDiffPixels: 200 })
    }

    // Ornamental Iron Page
    async ornamentalIronPageHeroSectionCheck() {
        await this.page.waitForSelector( this.ornamentalIronPageHeroSectionSelector );
        await expect(this.ornamentalIronPageHeroSection).toHaveScreenshot( 'ornamentalIronPageHeroSection.png', { maxDiffPixels: 200 })
    }
    

    
    // Wooden Fences Page
    async woodenFencesPageHeroSectionCheck() {
        await this.page.waitForSelector( this.woodenFencesPageHeroSectionSelector );
        await expect(this.woodenFencesPageHeroSection).toHaveScreenshot( 'woodenFencesPageHeroSection.png', { maxDiffPixels: 200 })
    }

    
    

    // PDP
    async checkAddToCartPDP() {
        await this.page.waitForSelector( this.addToCartButtonSelector );
        await expect(this.addToCartButton).toHaveScreenshot( 'addToCartPDP.png', { maxDiffPixels: 200 });
    }

    async checkProductImage() {
        await this.page.waitForSelector( this.productImageSelector );
        await expect(this.productImage).toHaveScreenshot( 'productImage.png', { maxDiffPixels: 200 });
    } 



    async checkHTMLHeirarchy(page, url){
        if(!this.brokenHTMLHeirarchyURLs.includes(url)){
            await this.page.goto(url, {waitUntil : "networkidle"});
            await expect(await page.locator('body h1').count()).toEqual(1)
        };
    };
}

module.exports = { InlineFence };