const { expect } = require( '@playwright/test' );

class EverguardMaterial {
    constructor ( page) {
        this.page = page;
        this.header = this.page.locator( '[data-id="a6fb2f5"]' );
        this.headerSelector = '[data-id="a6fb2f5"]';
        this.mobileHeader = this.page.locator( '[data-id="806ffe4"]' );
        this.mobileHeaderSelector = '[data-id="806ffe4"]';
        this.footer = this.page.locator( '.elementor-location-footer' )
        this.footerSelector = '.elementor-location-footer';
        this.heroTitle = this.page.locator( 'body h1' );
        this.heroTitleSelector = 'body h1';
        this.mobileHeroTitle = this.page.locator( '[data-id="518ead9"] h2' )
        this.mobileHeroTitleSelector = '[data-id="518ead9"] h2'
        this.aboutUsSection = this.page.locator( '[data-id="7d89633"] h2' );
        this.aboutUsSelector = '[data-id="7d89633"] h2';
        this.contactUsSubmitButton = this.page.locator( '[name="Contact Form"] button[type="submit"]' );
        this.contactUsSubmitButtonSelector = '[name="Contact Form"] button[type="submit"]';
        this.seeInventoryButton = this.page.locator('[aria-label="See Inventory"]');

        // Material Calculator
        this.pageTitleSectionSelector = 'body h1';
        this.pageTitleSection = this.page.locator('body h1');
        this.fenceStyleField = this.page.locator('#fieldname1_1');
        this.approximateLinealFeet = this.page.locator( '#fieldname4_1');
        this.emailField = this.page.locator( '#fieldname30_1' );
        this.emailMaterialsButton = this.page.locator('.pbSubmit[tabindex="0"]');

        // PDP
        this.addToCartButtonSelector = '[name="add-to-cart"]';
        this.addToCartButton = this.page.locator( '[name="add-to-cart"]' );
        this.productImageSelector = '.woocommerce-product-gallery.woocommerce-product-gallery--with-images';
        this.productImage = this.page.locator('.woocommerce-product-gallery.woocommerce-product-gallery--with-images');

        // URls
        this.homePageURL = 'https://www.everguardmaterials.com';
        this.contactPageURL = 'https://everguardmaterials.com/contact/';
        this.materialCalculatorURL = 'https://everguardmaterials.com/fence-material-calculator/';
        this.productDetailPageURL = 'https://everguardmaterials.com/product/pressure-treated-post-on-pipe-8/';

    }

    async checkButtons(page, url){
        let linkSelector = this.page.locator( 'a.elementor-button-link:not( [data-elementor-type="popup"] *)' );
        await this.page.goto(url, {waitUntil : "domcontentloaded"});
        let buttonCount = await linkSelector.count();
        for (let i =0; i < buttonCount; i++ ){
            await expect(await linkSelector.nth(i).getAttribute("href"), `Link: ${await linkSelector.nth(i).innerHTML()} is missing the href address` ).not.toEqual( '' );
            //await expect(await linkSelector.nth(i).getAttribute("href"), `Link: ${await linkSelector.nth(i).innerHTML()} accidently contains a placeholder` ).not.toEqual( '#' );
            let link = await linkSelector.nth(i).getAttribute("href");
            if(await linkSelector.nth(i).getAttribute("target") === null){;
                if(await linkSelector.nth(i).getAttribute("href") == null || (await linkSelector.nth(i).getAttribute("href")).length >= 1 || (await linkSelector.nth(i).getAttribute("href")).includes( '.zip' ) || (await linkSelector.nth(i).getAttribute("href")).includes( 'mailto:' ) || (await linkSelector.nth(i).getAttribute("href")).includes( 'tel:' ) ){
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
                await this.page.goto(url, {waitUntil : "domcontentloaded"})
            };
        };
    }
    
    // Home Page
    async closePopup() {
        await this.page.locator('[aria-label="Close"]').waitFor({state: 'visible'});
        await this.page.locator('[aria-label="Close"]').click();
        await this.page.waitForTimeout(4000)
    }
    
    async checkHeader() {
        if(await this.page.locator( this.mobileHeaderSelector ).isVisible()){
            await this.page.waitForSelector( this.mobileHeaderSelector );
            await expect(this.mobileHeader).toHaveScreenshot( 'mobileheader.png', { maxDiffPixels: 200 });
        } else {
            await this.page.waitForSelector( this.headerSelector );
            await expect(this.header).toHaveScreenshot( 'header.png', { maxDiffPixels: 200 });
        }
    }

    async checkFooter() {
        await this.page.waitForSelector( this.footerSelector );
        await expect(this.footer).toHaveScreenshot( 'footer.png', { maxDiffPixels: 200 });
    }

    async checkHeroTitle() {
        if(await this.page.locator( this.heroTitleSelector ).isVisible()){
            await this.page.waitForSelector( this.heroTitleSelector );
            await expect(this.heroTitle).toHaveScreenshot( 'homePageHeroTitle.png', { maxDiffPixels: 200 });
        } else {
            await this.page.waitForSelector( this.mobileHeroTitleSelector );
            await expect(this.mobileHeroTitle).toHaveScreenshot( 'homePageHeroMobileTitle.png', { maxDiffPixels: 200 });
        }
    }

    async checkAboutUsSection() {
        await this.page.waitForSelector( this.aboutUsSelector );
        await expect(this.aboutUsSection).toHaveScreenshot( 'aboutUs.png', { maxDiffPixels: 200 })
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

    async checkContactFormSubmitButton() {
        await this.page.waitForSelector( this.contactUsSubmitButtonSelector );
        await expect(this.contactUsSubmitButton).toHaveScreenshot( 'contactFormSubmitButton.png', { maxDiffPixels: 200 })
    }

    // Home Page
    async checkPageTitleSection() {
        await this.page.waitForSelector( this.pageTitleSectionSelector );
        await expect(this.pageTitleSection).toHaveScreenshot( 'CalculatorPageTitle.png', { maxDiffPixels: 200 });
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
}

module.exports = { EverguardMaterial };