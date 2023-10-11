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

        // About Page
        this.aboutPageHeroSectionText = this.page.locator('[data-id="5c890140"]');
        this.aboutPageHeroSectionTextSelector = '[data-id="5c890140"]';


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

        // Rambler Iron Page
        this.ramblerPageHeroSection = this.page.locator('[data-id="795b3fc"]');
        this.ramblerPageHeroSectionSelector = '[data-id="795b3fc"]';

        // Modified Full Panel Page
        this.modifiedFullPanelPageHeroSection = this.page.locator('[data-id="3c94634"]');
        this.modifiedFullPanelPageHeroSectionSelector = '[data-id="3c94634"]';

        //Wooden Fences Page
        this.woodenFencesPageHeroSection = this.page.locator('[data-id="ecbf7d5"]')
        this.woodenFencesPageHeroSectionSelector = '[data-id="ecbf7d5"]';


        this.h1TestFailedURLs = [
            "https://www.inline-fence.com/?internal_user=true",
            "https://inline-fence.com/hog-wire-fence/?internal_user=true",
            "https://inline-fence.com/financing/?internal_user=true",
            "https://inline-fence.com/vinyl-fence/?internal_user=true",
            "https://inline-fence.com/full-panel-fence/?internal_user=true",
            "https://inline-fence.com/chain-link-fencing/?internal_user=true"
        ]


        this.brokenH2H3H4HeirarchyURLs = [
            "https://www.inline-fence.com/?internal_user=true",
            "https://inline-fence.com/about-inline-fence/?internal_user=true",
            "https://inline-fence.com/horizontal-fence/?internal_user=true",
            "https://inline-fence.com/vinyl-fence/?internal_user=true",
            "https://inline-fence.com/hog-wire-fence/?internal_user=true",
            "https://inline-fence.com/chain-link-fencing/?internal_user=true",
            "https://inline-fence.com/wooden-cedar-fences/?internal_user=true",
            "https://inline-fence.com/full-panel-fence/?internal_user=true",
            "https://inline-fence.com/modified-full-panel/?internal_user=true",
            "https://inline-fence.com/ornamental-iron/?internal_user=true",
            "https://inline-fence.com/rambler-fence/?internal_user=true",
            "https://inline-fence.com/add-on-options/?internal_user=true",
            "https://inline-fence.com/financing/?internal_user=true",
            "https://inline-fence.com/warranty/?internal_user=true",
            "https://inline-fence.com/post-on-pipe/?internal_user=true",
            "https://inline-fence.com/careers/?internal_user=true",
            "https://inline-fence.com/quote/?internal_user=true",
            "https://inline-fence.com/commercial-residential-fence-kirkland/?internal_user=true",
            "https://inline-fence.com/commercial-residential-fence-bellevue/?internal_user=true",
            "https://inline-fence.com/commercial-residential-fence-bothell/?internal_user=true"
        ]

        
      
        //Addon Options Page
        this.addonOptionsPageHeroSection = this.page.locator('[data-id="798ff20"]')
        this.addonOptionsPageHeroSectionSelector = '[data-id="798ff20"]';

        //Warranty Options Page
        this.warrantyPageHeroSection = this.page.locator('[data-id="d5d3327"]')
        this.warrantyPageHeroSectionSelector = '[data-id="d5d3327"]';

        //Post On Pipe Options Page
        this.postOnPipePageHeroSection = this.page.locator('[data-id="20f4dfa"]')
        this.postOnPipePageHeroSectionSelector = '[data-id="20f4dfa"]';

        //Careers Page
        this.careersPageHeroSection = this.page.locator('[data-id="38d1870"]')
        this.careersPageHeroSectionSelector = '[data-id="38d1870"]';

        //Quote Page
        this.quotePageHeroSection = this.page.locator('[data-id="9c8bd99"]')
        this.quotePageHeroSectionSelector = '[data-id="9c8bd99"]';



        /*
            City Pages
        */

        //Kirkland Page
        this.kirklandPageHeroSection = this.page.locator('[data-id="2703a07"]')
        this.kirklandPageHeroSectionSelector = '[data-id="2703a07"]';

        //Bellevue Page
        this.bellevuePageHeroSection = this.page.locator('[data-id="2703a07"]')
        this.bellevuePageHeroSectionSelector = '[data-id="2703a07"]';

        //Bothell Page
        this.bothellPageHeroSection = this.page.locator('[data-id="2703a07"]')
        this.bothellPageHeroSectionSelector = '[data-id="2703a07"]';
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


    // About Page
    async aboutPageHeroSectionCheck() {
        await this.page.waitForSelector( this.aboutPageHeroSectionTextSelector );
        await expect(this.aboutPageHeroSectionText).toHaveScreenshot( 'aboutPageHeroSection.png', { maxDiffPixels: 200 })
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
    
    // Rambler Page
    async ramblerPageHeroSectionCheck() {
        await this.page.waitForSelector( this.ramblerPageHeroSectionSelector );
        await expect(this.ramblerPageHeroSection).toHaveScreenshot( 'ramblerPageHeroSection.png', { maxDiffPixels: 200 })
    }


    // Modified Full Page
    async modifiedFullPanelPageHeroSectionCheck() {
        await this.page.waitForSelector( this.modifiedFullPanelPageHeroSectionSelector );
        await expect(this.modifiedFullPanelPageHeroSection).toHaveScreenshot( 'modifiedFullPanelPageHeroSection.png', { maxDiffPixels: 200 })
    }
    
    // Wooden Fences Page
    async woodenFencesPageHeroSectionCheck() {
        await this.page.waitForSelector( this.woodenFencesPageHeroSectionSelector );
        await expect(this.woodenFencesPageHeroSection).toHaveScreenshot( 'woodenFencesPageHeroSection.png', { maxDiffPixels: 200 })
    }


    // Addon Options Fences Page
    async addonOptionsPageHeroSectionCheck() {
        await this.page.waitForSelector( this.addonOptionsPageHeroSectionSelector );
        await expect(this.addonOptionsPageHeroSection).toHaveScreenshot( 'addonOptionsPageHeroSection.png', { maxDiffPixels: 200 })
    }


    // Warranty Fences Page
    async warrantyPageHeroSectionCheck() {
        await this.page.waitForSelector( this.warrantyPageHeroSectionSelector );
        await expect(this.warrantyPageHeroSection).toHaveScreenshot( 'warrantyPageHeroSection.png', { maxDiffPixels: 200 })
    }


    // Post On Pipe Fences Page
    async postOnPipePageHeroSectionCheck() {
        await this.page.waitForSelector( this.postOnPipePageHeroSectionSelector );
        await expect(this.postOnPipePageHeroSection).toHaveScreenshot( 'postOnPipePageHeroSection.png', { maxDiffPixels: 200 })
    }


    // Careers Page
    async careersPageHeroSectionCheck() {
        await this.page.waitForSelector( this.careersPageHeroSectionSelector );
        await expect(this.careersPageHeroSection).toHaveScreenshot( 'careersPageHeroSection.png', { maxDiffPixels: 200 })
    }


    // Quote Page
    async quotePageHeroSectionCheck() {
        await this.page.waitForSelector( this.quotePageHeroSectionSelector );
        await expect(this.quotePageHeroSection).toHaveScreenshot( 'quotePageHeroSection.png', { maxDiffPixels: 200 })
    }

    
    
    /*

        City Pages

    */

    // Kirkland Page
    async kirklandPageHeroSectionCheck() {
        await this.page.waitForSelector( this.kirklandPageHeroSectionSelector );
        await expect(this.kirklandPageHeroSection).toHaveScreenshot( 'kirklandPageHeroSection.png', { maxDiffPixels: 200 })
    } 


    // Bellevue Page
    async bellevuePageHeroSectionCheck() {
        await this.page.waitForSelector( this.bellevuePageHeroSectionSelector );
        await expect(this.bellevuePageHeroSection).toHaveScreenshot( 'bellevuePageHeroSection.png', { maxDiffPixels: 200 })
    } 

    // Bothell Page
    async bothellPageHeroSectionCheck() {
        await this.page.waitForSelector( this.bothellPageHeroSectionSelector );
        await expect(this.bothellPageHeroSection).toHaveScreenshot( 'bothellPageHeroSection.png', { maxDiffPixels: 200 })
    } 



    async checkHTMLHeirarchy(page, url){
        if(!this.h1TestFailedURLs.includes(url)){
            await this.page.goto(url, {waitUntil : "networkidle"});
            await expect(await page.locator('body h1').count(), `The ${url} has a H1 count other then 1`).toEqual(1)
        };

        if(!this.brokenH2H3H4HeirarchyURLs.includes(url)){
            await this.page.goto(url, {waitUntil : "networkidle"});
            if(await page.locator('body h3').count() > 0){
                await expect(await page.locator('body h2').count(), `The ${url} includes an H3 tag while missing a H2`).toBeGreaterThan(0);
            }

            if(await page.locator('body h4').count() > 0){
                await expect(await page.locator('body h3').count(), `The ${url} includes an H4 tag while missing a H3`).toBeGreaterThan(0);
            }
        };
    };
}

module.exports = { InlineFence };