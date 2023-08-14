//The Key will be the aria-label and the value will be the product ID
//This is using Estate fence with 1x5.5x6 board size 

//dropdown will have 2 or 3 options


//Premium 
//Modern
//Cost-Effective 


let productList = {
    "Boards: 1x5.5x6 " :  {
        Premium: "348",
        Modern: "555", 
        CostEffective : "654"
    },
    "Posts: 4x4x8" : {
        Premium : "321",
        Modern : 'Jumbo Posts',
        CostEffective : "Standard Posts"
    },
    "Rails: 2x4x8" : "1787",
    "Post Caps: (6x6)" : "129",
    "Concrete: 60lb High Strength " : "76",
    "Galvanized Nail Count:  " : {
        Premium: "stainlessSteel : 80",
        Modern : "stainlessSteel",
        CostEffective : "Galvanized"
    },
    "Screw Count:  " : "1074"
}

let link = 'https://everguardmaterials.com/?'

let fieldSelector = '.fields:not([style*="display"]) input.codepeoplecalculatedfield.field.large';
let arrLength = document.querySelectorAll(fieldSelector).length

for( let i = 0; i < arrLength; i++){
    if(document.querySelectorAll(fieldSelector)[i].value != 0){
        link += `add-to-cart=${productList[document.querySelectorAll(fieldSelector)[i].ariaLabel]}&`;
        link += `quantity=${document.querySelectorAll(fieldSelector)[i].value}&`
    };
}
console.log(link)
link.click()




// The URL to Mimic: 'https://everguardmaterials.com/?add-to-cart=2266&quantity=4&add-to-cart=1454&quantity=4'
// https://everguardmaterials.com/?add-to-cart[]=348&quantity[]=219&add-to-cart[]=321&quantity[]=14&add-to-cart[]=1787&quantity[]=25&add-to-cart[]=129&quantity[]=14
// https://everguardmaterials.com/?add-to-cart=348&quantity=44&add-to-cart=321&quantity=3&add-to-cart=1787&quantity=4&add-to-cart=129&quantity=3&add-to-cart=76&quantity=4&add-to-cart=80&quantity=182