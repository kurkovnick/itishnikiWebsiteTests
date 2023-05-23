const { expect } = require( '@playwright/test' );

class EverguardMaterial {
    constructor ( page) {
        this.page = page;
        this.header = this.page.locator( '[data-id="32c0b7e"]' );
        this.headerSelector = '[data-id="32c0b7e"]';
        this.footer = this.page.locator( '.elementor-location-footer' )
        this.footerSelector = '.elementor-location-footer';
        this.heroSection = this.page.locator( '[data-id="1c1a1ad"]' );
        this.heroSectionSelector = '[data-id="1c1a1ad"]';
        this.aboutUsSection = this.page.locator( '[data-id="67e0f15"]' );
        this.aboutUsSelector = '[data-id="67e0f15"]';
        this.contactUsForm = this.page.locator( 'form.elementor-form[name="Contact Form"]' );
        this.contactUsFormSelector = 'form.elementor-form[name="Contact Form"]';
        this.seeInventoryButton = this.page.locator('[aria-label="See Inventory"]')

        // Material Calculator
        this.pageTitleSectionSelector = '[data-id="4ca31c0"] h2';
        this.pageTitleSection = this.page.locator('[data-id="4ca31c0"] h2');
        this.fenceStyleField = this.page.locator('#fieldname1_1');
        this.approximateLinealFeet = this.page.locator( '#fieldname4_1');
        this.emailField = this.page.locator( '#fieldname30_1' );
        this.emailMaterialsButton = this.page.locator('.pbSubmit[tabindex="0"]');

        // PDP
        this.productDescriptionSelector = '[data-id="cf0eb31"]';
        this.productDescription = this.page.locator( '[data-id="cf0eb31"]' );
        this.productImageSelector = '.woocommerce-product-gallery.woocommerce-product-gallery--with-images';
        this.productImage = this.page.locator('.woocommerce-product-gallery.woocommerce-product-gallery--with-images');

        // URls
        this.homePageURL = 'https://www.everguardmaterials.com';
        this.contactPageURL = 'https://everguardmaterials.com/contact/';
        this.materialCalculatorURL = 'https://everguardmaterials.com/material-calculator/';
        this.productDetailPageURL = 'https://everguardmaterials.com/product/alta-1x4x4-clear/';

    }

    async checkButtons(page, url){
        let linkSelector = this.page.locator( 'a.elementor-button:not( [data-elementor-type="popup"] *)' );
        await this.page.goto(url, {waitUntil : "load"});
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
                    await this.page.goto(url, {waitUntil : "networkidle"});
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
                await this.page.goto(url, {waitUntil : "networkidle"})
            };
        };
    }
    
    // Home Page
    async checkHeader() {
        await this.page.waitForSelector( this.headerSelector );
        await expect(this.header).toHaveScreenshot( 'header.png', { maxDiffPixels: 100 });
    }

    async checkFooter() {
        await this.page.waitForSelector( this.footerSelector );
        await expect(this.footer).toHaveScreenshot( 'footer.png', { maxDiffPixels: 100 });
    }

    async checkHeroSection() {
        await this.page.waitForSelector( this.heroSectionSelector );
        await expect(this.heroSection).toHaveScreenshot( 'homePageHero.png', { maxDiffPixels: 100 });
    }

    async checkAboutUsSection() {
        await this.page.waitForSelector( this.aboutUsSelector );
        await expect(this.aboutUsSection).toHaveScreenshot( 'aboutUs.png', { maxDiffPixels: 100 })
    }


    // Contact Page
    async goToPage(url){
        let requestFailed = []
        this.page.on( 'request' , async request => {
            if( request.failure() !== null && request.url().includes( '.css' ) ){requestFailed.push(request.url())}
        });
      
        //Go to the URL and scroll to the bottom so that the network can idle on the whole pages
        await this.page.goto(url, { waitUntil: 'networkidle' });
        await this.page.waitForTimeout( 5000 );
        
        //Validate Broken CSS Requests
        await expect(requestFailed, `Failed Assets: ${requestFailed.toString()}` ).toEqual( [] )
    };

    async checkContactForm() {
        await this.page.waitForSelector( this.contactUsFormSelector );
        await expect(this.contactUsForm).toHaveScreenshot( 'contactForm.png', { maxDiffPixels: 100 })
    }

    // Home Page
    async checkPageTitleSection() {
        await this.page.waitForSelector( this.pageTitleSectionSelector );
        await expect(this.pageTitleSection).toHaveScreenshot( 'CalculatorPageTitle.png', { maxDiffPixels: 100 });
    }

    // PDP
    async checkProductDescription() {
        await this.page.waitForSelector( this.productDescriptionSelector );
        await expect(this.productDescription).toHaveScreenshot( 'productDescription.png', { maxDiffPixels: 100 });
    }

    async checkProductImage() {
        await this.page.waitForSelector( this.productImageSelector );
        await expect(this.productImage).toHaveScreenshot( 'productImage.png', { maxDiffPixels: 100 });
    } 
}

module.exports = { EverguardMaterial };