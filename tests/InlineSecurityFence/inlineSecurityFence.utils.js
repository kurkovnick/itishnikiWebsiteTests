const { expect } = require( '@playwright/test' );

class InlineSecurityFence {
    constructor (page) {
        this.page = page;
        this.heroGetAFreeQuoteButton = this.page.locator( '[data-id="190d943"] [aria-label="Get a Free Quote"]' );
        this.headerSelector = '[data-elementor-type="header"]';
        this.header = this.page.locator('[data-elementor-type="header"]');
        this.heroTextSectionSelector = 'h1.elementor-heading-title';
        this.heroTextSection = this.page.locator('h1.elementor-heading-title');


        //Quote Page
        this.quotePageHeroSectionSelector = '[data-id="7c95b7b2"]';
        this.quotePageHeroSection = this.page.locator('[data-id="7c95b7b2"]');
        this.quotePageFormTitleSectionSelector = '[data-id="7ad8e196"] h2';
        this.quotePageFormTitleSection = this.page.locator('[data-id="7ad8e196"] h2');
    }

    async checkButtons(page, url){
        let linkSelector = this.page.locator( 'a.elementor-button:not( [data-id="1f1ef0c"] *)' );
        await this.page.goto(url, {waitUntil : "domcontentloaded"});
        let buttonCount = await linkSelector.count();
        for (let i =0; i < buttonCount; i++ ){
            await expect(await linkSelector.nth(i).getAttribute("href"), `Link: ${await linkSelector.nth(i).innerHTML()} is missing the href address` ).not.toEqual( '' );
            await expect(await linkSelector.nth(i).getAttribute("href"), `Link: ${await linkSelector.nth(i).innerHTML()} accidently contains a placeholder` ).not.toEqual( '#' );
            let link = await linkSelector.nth(i).getAttribute("href");
            if(await linkSelector.nth(i).getAttribute("target") === null){;
                if(await linkSelector.nth(i).getAttribute("href") == null || (await linkSelector.nth(i).getAttribute("href")).includes( '#' ) && (await linkSelector.nth(i).getAttribute("href")).length >= 1 || (await linkSelector.nth(i).getAttribute("href")).includes( '.zip' ) || (await linkSelector.nth(i).getAttribute("href")).includes( 'mailto:' ) || (await linkSelector.nth(i).getAttribute("href")).includes( 'tel:' )){
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
    
    async checkHeader() {
        await this.page.waitForSelector( this.headerSelector );
        await expect(this.header).toHaveScreenshot( 'header.png', { maxDiffPixels: 100 });
    }

    
    // Home Page
    async checkHeroTextSection() {
        await this.page.waitForSelector( this.heroTextSectionSelector );
        await expect(this.heroTextSection).toHaveScreenshot( 'heroTextSection.png', { maxDiffPixels: 100 });
    }

    


    // Quote Page
    async checkQuotePageHeroTextSection() {
        await this.page.waitForSelector( this.quotePageHeroSectionSelector );
        await expect(this.quotePageHeroSection).toHaveScreenshot( 'quotePageHeroSection.png', { maxDiffPixels: 100 });
    }

    async checkQuotePageFormTitleSection() {
        await this.page.waitForSelector( this.quotePageFormTitleSectionSelector );
        await expect(this.quotePageFormTitleSection).toHaveScreenshot( 'quotePageFormTitle.png', { maxDiffPixels: 100 });
    }
    
    
    
    //Helper Functions 
    async goToPageAndCheckCSS(url){
        let requestFailed = []
        this.page.on( 'request' , async request => {
            if( request.failure() !== null && request.url().includes( '.css' ) ){requestFailed.push(request.url())}
        });
      
        //Go to the URL and scroll to the bottom so that the network can idle on the whole pages
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        await this.page.waitForTimeout( 2000 );
        
        //Validate Broken CSS Requests
        await expect(requestFailed, `Failed Assets: ${requestFailed.toString()}` ).toEqual( [] )
    };
}

module.exports = { InlineSecurityFence };