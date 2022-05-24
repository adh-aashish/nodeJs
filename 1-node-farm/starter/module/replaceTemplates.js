//module is predefined obj in node.js that helps us to export

module.exports = (temp,product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);//the syntax /{%%}/g is regex, replaces globally
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%ID%}/g,product.id);
    output = output.replace(/{%PRODUCTNUTRIENTS%}/g,product.nutrients);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');

    return output;
}