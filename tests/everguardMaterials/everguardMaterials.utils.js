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


        // URls
        this.homePageURL = 'https://www.everguardmaterials.com';
        this.contactPageURL = 'https://everguardmaterials.com/contact/';

    }
    
    
    async checkHeader() {
        await this.page.waitForSelector( this.headerSelector );
        await expect(this.header).toHaveScreenshot( 'header.png');
    }

    async checkFooter() {
        await this.page.waitForSelector( this.footerSelector );
        await expect(this.footer).toHaveScreenshot( 'footer.png');
    }

    async checkHeroSection() {
        await this.page.waitForSelector( this.heroSectionSelector );
        await expect(this.heroSection).toHaveScreenshot( 'homePageHero.png');
    }

    async checkAboutUsSection() {
        await this.page.waitForSelector( this.aboutUsSelector );
        await expect(this.aboutUsSection).toHaveScreenshot( 'aboutUs.png')
    }


    // Contact Page
    async goToPage(url){
        let requestFailed = []
        this.page.on( 'request' , async request => {
            if( request.failure() !== null && request.url().includes( '.css' ) ){requestFailed.push(request.url())}
        });
      
        //Go to the URL and scroll to the bottom so that the network can idle on the whole pages
        await this.page.goto(url, { waitUntil: 'networkidle' });
        await this.page.waitForTimeout( 2000 );
        
        //Validate Broken CSS Requests
        await expect(requestFailed, `Failed Assets: ${requestFailed.toString()}` ).toEqual( [] )
    };

    async checkContactForm() {
        await this.page.waitForSelector( this.contactUsFormSelector );
        await expect(this.contactUsForm).toHaveScreenshot( 'contactForm.png')
    }
}

module.exports = { EverguardMaterial };