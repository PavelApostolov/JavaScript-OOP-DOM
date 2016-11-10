/* globals module */

"use strict";

function solve() {
    class Product {
        constructor(productType, name, price) {
            this.productType = productType;
            this.name = name;
            this.price = price;
        }

        get productType() {
            return this._productType;
        }

        set productType(value) {
            if (typeof value !== 'string') {
                throw 'invalid product';
            }

            this._productType = value;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            if (typeof value !== 'string') {
                throw 'invalid name';
            }

            this._name = value;
        }

        get price() {
            return this._price;
        }

        set price(value) {
            if (typeof value !== 'number') {
                throw 'invalid price';
            }

            this._price = value;
        }

    }

    class ShoppingCart {
        constructor() {
            this.products = [];
        }

        add(product) {
            if (!(product instanceof Product)) {
                throw 'invalid product';
            }

            this.products.push(product);

            return this;
        }

        remove(product) {
            if (!(product instanceof Product)) {
                throw 'invalid product';
            }

            for (let i = 0; i < this.products.length; i += 1) {
                if (this.products[i].name === product.name &&
                    this.products[i].price === product.price &&
                    this.products[i].productType === product.productType) {

                    this.products.splice(i, 1);
                    return;
                }
            }

            throw 'product not founded';
        }

        showCost() {
            let sum = 0;

            for (let i = 0; i < this.products.length; i += 1) {
                sum += this.products[i].price;
            }

            return sum;
        }

        showProductTypes() {
            let uniqueTypes = {};

            for (let i = 0; i < this.products.length; i += 1) {
                uniqueTypes[this.products[i].productType] = true;
            }

            return Object.keys(uniqueTypes).sort(function(a, b) {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });
        }

        getInfo() {
            let info = {};

            info.totalPrice = this.showCost();

            info.products = [];

            let names = {};

            for (let i = 0; i < this.products.length; i += 1) {
                if (!names[this.products[i].name]) {
                    names[this.products[i].name] = {};
                    names[this.products[i].name].price = 0;
                    names[this.products[i].name].quantity = 0;
                }

                names[this.products[i].name].price += this.products[i].price;
                names[this.products[i].name].quantity += 1;
            }

            let props = Object.keys(names);

            for (let i = 0; i < props.length; i += 1) {
                info.products.push({
                    name: props[i],
                    totalPrice: names[props[i]].price,
                    quantity: names[props[i]].quantity
                });
            }

            return info;
        }
    }
    return {
        Product,
        ShoppingCart
    };
}

///////////////////

/* globals module */

"use strict";

function solve() {

    function* Ids() {
        let next = 0;
        while (true) {
            yield next += 1;
        }
    }

    function validateProduct(product) {
        const isProduct = product instanceof Product;
        const isProductLike = product.name && product.productType && product.price;

        if (!(isProduct || isProductLike)) {
            throw new Error();
        }
    }

    class Product {
        /* .... */
        constructor(productType, name, price) {
            this.productType = productType;
            this.name = name;
            this.price = price;
        }
    }

    class ShoppingCart {
        /* .... */
        constructor() {
            this.products = [];
        }

        add(product) {
            validateProduct(product);
            this.products.push(product);
            return this;
        }

        remove(product) {
            validateProduct(product);

            if (this.products.length === 0) {
                throw new Error();
            }

            const indexToRemove = this.products.findIndex(item => {
                const names = item.name === product.name;
                const type = item.productType === product.productType;
                const prices = item.price === product.price;

                return names && type && prices;
            });

            if (indexToRemove < 0) {
                throw new Error();
            }

            this.products.splice(indexToRemove, 1);
            return this;
        }

        showCost() {
            let sum = 0;

            if (this.products.length === 0) {
                return sum;
            }

            for (const item of this.products) {
                sum += item.price;
            }

            return sum;
        }

        showProductTypes() {
            const types = [];

            if (this.products.length === 0) {
                return types;
            }

            for (const item of this.products) {
                if (types.indexOf(item.productType) < 0) {
                    types.push(item.productType);
                }
            }

            // Sort ignore case ?
            types.sort();

            return types;
        }

        getInfo() {
            const info = {
                products: [],
                totalPrice: 0
            };

            if (this.products.length === 0) {
                return info;
            }

            this.products.forEach(item => {
                const indexOfElement = info.products.findIndex(el => el.name === item.name);
                if (indexOfElement < 0) {
                    info.products.push({
                        name: item.name,
                        quantity: 1,
                        totalcost: item.price
                    });
                } else {
                    info.products[indexOfElement].quantity += 1;
                    info.products[indexOfElement].totalcost += item.price;
                }
            });

            info.products.forEach(pr => {
                info.totalPrice += pr.totalcost;
            });

            return info;
        }
    }

    return {
        Product,
        ShoppingCart
    };
}

module.exports = solve;