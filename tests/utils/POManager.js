const { test, expect, page } = require('@playwright/test' );
const { EverguardMaterial } = require( '../everguardMaterials/everguardMaterials.utils');
const { InlineSecurityFence } = require( '../InlineSecurityFence/inlineSecurityFence.utils');
const { InlineFence } = require( '../InlineFence/inlineFence.utils');


class POManager  {
    
    constructor( page, url ) {
        this.page = page;

        // URls
        this.homePageURL = 'https://www.everguardmaterials.com';
        this.everguardMaterial = new EverguardMaterial( page, url);
        this.inlineSecurityFence = new InlineSecurityFence( page, url);
        this.inlineFence = new InlineFence( page, url);
    }

    getEverguardMaterialUtils(){
        return this.everguardMaterial;
    };

    getInlineSecurityFenceUtils(){
        return this.inlineSecurityFence;
    }

    getInlineFenceUtils(){
        return this.inlineFence;
    }
}

module.exports = { POManager };