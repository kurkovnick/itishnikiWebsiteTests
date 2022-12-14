const { expect } = require( '@playwright/test' );

class EverguardMaterial {
    constructor ( page) {
        this.page = page;
        this.header = this.page.locator( '[data-id="32c0b7e"]' );
        this.heroSection = this.page.locator( '[data-id="1c1a1ad"]' );
        this.aboutUsSection = this.page.locator( '[data-id="67e0f15"]' );


        // URls
        this.homePageURL = 'https://www.everguardmaterials.com';

    }

    async gotoHomePage() {
        await this.page.goto(this.homePageURL, {waitUntil: 'networkidle'});
    }

    
    // Desktop
    async checkdesktopHeader() {
        await expect(this.header).toHaveScreenshot( 'header.png');
    }

    async checkdesktopHeroSection() {
        await expect(this.heroSection).toHaveScreenshot( 'homePageHero.png');
    }

    async checkAboutUsSection() {
        await expect(this.aboutUsSection).toHaveScreenshot( 'aboutUs.png')
    }
}

module.exports = { EverguardMaterial };