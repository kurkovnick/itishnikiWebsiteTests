const { EverguardMaterial } = require( '../everguardMaterials/everguardMaterials.utils');

class POManager  {
    
    constructor( page, url ) {
        this.page = page;

        // URls
        this.homePageURL = 'https://www.everguardmaterials.com';
        this.everguardMaterial = new EverguardMaterial( page, url);

    }

    getEverguardMaterialUtils(){
        return this.everguardMaterial;
    };
}

module.exports = { POManager };