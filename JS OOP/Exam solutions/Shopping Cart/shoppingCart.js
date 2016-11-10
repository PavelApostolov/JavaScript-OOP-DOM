//Koce
function solve() {
    'use strict'

    class Product {
        constructor(productType, name, price) {
            this.productType = productType
            this.name = name
            this.price = Number(price)
        }
        equals(otherProduct) {
            return (this.name === otherProduct.name) &&
                (this.productType === otherProduct.productType) &&
                (this.price === otherProduct.price)
        }
    }

    class ShoppingCart {
        constructor() {
            this.products = []
        }

        add(product) {
            this.products.push(product)
            return this
        }

        remove(product) {
            const indexOfProduct = this.products.findIndex(p => p.equals(product))

            if (indexOfProduct === -1) {
                throw new Error('Cannot remove product that is not in the shopping cart!')
            }

            return this.products.splice(indexOfProduct, 1)
        }

        showCost() {
            return this.products.reduce((partialCost, currentProduct) => partialCost + currentProduct.price, 0)
        }

        showProductTypes() {
            const typesMap = {}

            for(const prod of this.products) {
                typesMap[prod.productType] = true
            }

            return Object.keys(typesMap).sort((first, second) => first.localeCompare(second))
        }

        getInfo() {
            const productMap = {}

            for (const p of this.products) {
                if (!productMap[p.name]) {
                    productMap[p.name] = {
                        name: p.name,
                        totalPrice: 0,
                        quantity: 0
                    }
                }

                productMap[p.name].totalPrice += p.price
                productMap[p.name].quantity += 1
            }

            const products = Object.keys(productMap).map(groupName => productMap[groupName]),
                totalPrice = products.reduce((partialPrice, currentProductGroup) => partialPrice + currentProductGroup.totalPrice, 0)

            return {
                products,
                totalPrice
            }
        }
    }
    return {
        Product,
        ShoppingCart
    }
}

module.exports = solve

//Author
/* globals module */

"use strict";

function solve() {
    class Product {
        constructor(productType, name, price) {
            this.productType = productType;
            this.name = name;
            this.price = +price;
        }
    }

    class ShoppingCart {
        constructor() {
            this.products = [];
        }

        add(product) {
            this.products.push(product);
            return this;
        }

        remove(product) {
            let index = this.products.findIndex(pr => pr.name === product.name && pr.cost === product.cost && pr.productType === product.productType);
            if (index < 0) {
                throw new Error("No such product");
            }

            this.products.splice(index, 1);
            return this;
        }

        showCost() {
            let cost = this.products.reduce((c, p) => c + p.price, 0);
            return cost;
        }

        showProductTypes() {
            let productTypesMap = {};
            this.products.forEach(pr => {
                productTypesMap[pr.productType] = 1;
            });

            return Object.keys(productTypesMap)
                .sort((x, y) => x.localeCompare(y));
        }

        getInfo() {
            let allProducts = {};
            this.products.forEach(pr => {
                if (!allProducts[pr.name]) {
                    allProducts[pr.name] = {
                        "name": pr.name,
                        "totalPrice": 0,
                        "quantity": 0
                    };
                }

                allProducts[pr.name].totalPrice += pr.price;
                allProducts[pr.name].quantity += 1;
            });

            let products = Object.keys(allProducts)
                .sort((k1, k2) => k1.localeCompare(k2))
                .map(key => allProducts[key]);

            let totalPrice = products.reduce((tp, pr) => tp + pr.totalPrice, 0);
            return {
                products,
                totalPrice
            };
        }
    }
    return {
        Product,
        ShoppingCart
    };
}

module.exports = solve;


/* globals module */

"use strict";

function solve() {

    class Product {
        constructor(productType, name, price) {
            this.productType = productType;
            this.name = name;
            this.price = price;
        }
    }

    class ShoppingCart {
        constructor() {
            this._products = [];
        }

        get products() {
            return this._products;
        }

        set products(value) {
            this._products = value;
        }

        add(product) {
            this._products.push(product);

            return this;
        }

        remove(product) {
            if (this._products.length === 0) {
                throw new Error('There are not products in the ShoppingCart instance!');
            }

            let productIndex = this._products.findIndex((x) =>
                x.name === product.name &&
                x.price === product.price &&
                x.productType === product.productType);

            if (productIndex < 0) {
                throw new Error('The ShoppingCart instance does not contain this product');
            }

            this._products.splice(productIndex, 1);
        }

        showCost() {
            let cost = 0;

            for (let product of this._products) {
                cost += product.price;
            }

            return cost;
        }

        showProductTypes() {
            let productTypes = [];

            for (let product of this._products) {
                if (productTypes.indexOf(product.productType) < 0) {
                    productTypes.push(product.productType);
                }
            }

            return productTypes.sort();
        }

        getInfo() {
            let info = {
                products: [],
                totalPrice: 0
            };

            for (let product of this._products) {
                let productIndex = info.products.findIndex(x => x.name === product.name);

                if (productIndex >= 0) {
                    info.products[productIndex].quantity += 1;
                    info.products[productIndex].totalCost += product.price;
                }
                else {
                    info.products.push({
                        name: product.name,
                        quantity: 1,
                        totalCost: product.price
                    });
                }

                info.totalPrice += product.price;
            }

            return info;
        }
    }
    return {
        Product, ShoppingCart
    };
}

module.exports = solve;

////////////////////////

/* globals module */

"use strict";

function solve() {
    class Product {
        constructor(productType, name, price) {
            this._productType = productType;
            this._name = name;
            this._price = price;
        }

        get productType() {
            return this._productType;
        }

        get name() {
            return this._name;
        }

        get price() {
            return this._price;
        }
    }

    class ShoppingCart {
        constructor() {
            this._products = [];
        }

        get products() {
            return this._products;
        }

        add(product) {
            this._products.push(product);

            return this;
        }

        remove(product) {
            let index = this._products.indexOf(product);

            if (this._products.length < 1 || index < 0) {
                throw new Error();
            }

            this._products.splice(index, 1);
        }

        showCost() {
            if (this._products.length < 1) {
                return 0;
            }
            return this._products.reduce((a, b) => a + b.price, 0);
        }

        showProductTypes() {
            let result = [];

            if (this._products.length < 1) {
                return result;
            }


            this._products.forEach(function(product) {
                if (result.indexOf(product.productType) < 0) {
                    result.push(product.productType);
                }
            });
            return result.sort((a, b) => a.localeCompare(b));

        }

        getInfo() {
            if (this._products.length < 1) {
                return { totalPrice: 0, products: [] }
            }

            let uniqueProducts = []
            this._products.forEach(function(product) {
                let index = 0;
                uniqueProducts.forEach(function(uniqueProduct) {
                    if (uniqueProduct.name === product.name) {
                        uniqueProduct.quantity += 1;
                        uniqueProduct.totalPrice += product.price;
                    } else if (index === uniqueProducts.length - 1) {
                        uniqueProducts.push({ name: product.name, quantity: 1, totalPrice: product.price })
                    }
                }, index)
                if (uniqueProducts.length < 1) {
                    uniqueProducts.push({ name: product.name, quantity: 1, totalPrice: product.price })
                }
            });

            return { totalPrice: this.showCost, products: uniqueProducts }
        }
    }
    return {
        Product,
        ShoppingCart
    };
}

module.exports = solve;