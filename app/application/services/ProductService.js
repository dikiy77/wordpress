"use strict";

export default class ProductService{

    constructor(
        $http ,
        PASS
    ){

        this._$http = $http;
        this._PASS = PASS;

    }//constructor

    async getProducts(limit=10, offset=0, categoryName='all'){

        try{

            let response = await this._$http({
                method: 'POST',
                url: this._PASS.HOST_WP,
                data:{
                    limit: limit,
                    offset: offset,
                    categoryName: categoryName,
                    action: 'getProductList'
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            });


            let products = response.data.products;



            products.forEach( p => {
                p.amount = 1;
            } );

            if(categoryName === 'all'){
                return products;
            }
            else{
                let categoriesProduct = {
                    products: response.data.products,
                    name: response.data.categoryName
                };

                return categoriesProduct;
            }


        }//try
        catch( ex ){

            console.log('EX: ' , ex);

        }//catch


    }//getProducts

    async getCategory(){

        try{

            let response = await this._$http({
                method: 'POST',
                url: this._PASS.HOST_WP,
                data:{
                    'action': 'getCategoriesMy',
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            });



            let categories = response.data;

            return categories;

        }//try
        catch( ex ){

            console.log('EX: ' , ex);

        }//catch
    }//getCategory

    async getSingleProduct(productID){

        try{

            let response = await this._$http({
                method: 'POST',
                url: this._PASS.HOST_WP,
                data:{
                    'id': productID,
                    'action': 'getSingleProduct',
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            });



            let product = response.data;

            console.log('RESPONSE sungle', response.data);

            return  product;

        }//try
        catch( ex ){

            console.log('EX: ' , ex);

        }//catch

    }//getSingleProduct

    async getDelivery(){


        try{

            let response = await this._$http({
                method: 'POST',
                url: this._PASS.HOST_WP,
                data:{
                    'action': 'getDelivery',
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            });




            let delivery = response.data;

            return delivery;

        }//try
        catch( ex ){

            console.log('EX: ' , ex);

        }//catch
    }

}