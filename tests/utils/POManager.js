const { EverguardMaterial } = require( '../everguardMaterials/everguardMaterials.utils');
const { InlineSecurityFence } = require( '../InlineSecurityFence/inlineSecurityFence.utils');

class POManager  {
    
    constructor( page, url ) {
        this.page = page;

        // URls
        this.homePageURL = 'https://www.everguardmaterials.com';
        this.everguardMaterial = new EverguardMaterial( page, url);
        this.inlineSecurityFence = new InlineSecurityFence( page, url);

    }

    getEverguardMaterialUtils(){
        return this.everguardMaterial;
    };

    getInlineSecurityFenceUtils(){
        return this.inlineSecurityFence;
    }
}

module.exports = { POManager };