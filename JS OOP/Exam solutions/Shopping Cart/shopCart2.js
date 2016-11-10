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
            if (typeof(value) !== 'string') {
                throw new Error('Product type is not a string');
            }
            this._productType = value;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            if (typeof(value) !== 'string') {
                throw new Error('Name is not a string');
            }
            this._name = value;
        }

        get price() {
            return this._price;
        }

        set price(value) {
            if (typeof(value) !== 'number') {
                throw new Error('Price is not a number');
            }
            this._price = value;
        }
    }

    Array.prototype.getUnique = function () {
        var u = {}, a = [];
        for (var i = 0, l = this.length; i < l; ++i) {
            if (u.hasOwnProperty(this[i])) {
                continue;
            }
            a.push(this[i]);
            u[this[i]] = 1;
        }
        return a;
    }

    class ShoppingCart {
        constructor() {
            this.products = [];
        }

        add(product) {
            let isValid = false;

            if (product instanceof Product) {
                isValid = true;
            } else if (product.name && product.productType && product.price) {
                isValid = true;
            }

            if (isValid) {
                this.products.push(product);
                return this;
            } else {
                throw new Error('Not a instance of product or product-like object!');
            }
        }

        remove(product) {
            let isValid = false;

            if (product instanceof Product) {
                isValid = true;
            } else if (product.name && product.productType && product.price) {
                isValid = true;
            }

            if (isValid) {
                let contains = this.products.indexOf(product) > -1;

                if (!contains) {
                    throw new Error('The product does not exist!');
                } else if (this.products.length === 0) {
                    throw new Error('No products in the shopping cart!');
                } else {
                    let index = this.products.indexOf(product);
                    this.products.splice(index, 1);
                }
            } else {
                throw Error();
            }
        }

        showCost() {
            if (this.products.length === 0) {
                return 0;
            } else {
                let sum = 0;

                this.products.forEach(i => sum += i.price);
                return sum;
            }
        }

        showProductTypes() {
            if (this.products.length === 0) {
                return [];
            }

            let set = new Set();
            let result = this.products.getUnique();

            this.products.forEach(p => set.add(p.productType));

            return Array.from(set).sort((a, b) => {
                if (a > b) {
                    return 1;
                } else if (a < b) {
                    return -1;
                }

                return 0;
            });
        }

        getInfo() {
            if (this.products.length === 0) {
                return {totalPrice: 0, products: []}
            }

            let totalSum = 0;
            this.products.forEach(p => totalSum += p.price);
            let productsSortedByName = this.products.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                }

                return 0;
            });

            let groups = [];
            let current = {};
            current.name = this.products[0].name;
            current.price = this.products[0].price;
            current.productType = this.products[0].productType;

            for (let i = 1, len = this.products.length; i < len - 1; i += 1) {
                let product = this.products[i];

                if (product.name === current.name && product.productType === current.productType) {
                    current.name = product.name;
                    current.productType = product.productType;
                    current.price += product.price;
                } else if (i === len - 1 && product.name === current.name || product.productType === current.productType) {
                    current.price += product.price;
                    current.productType = product.productType;
                    groups.push(current);
                    continue;
                } else if (i === len - 1 && product.name !== current.name) {
                    groups.push({name: product.name, price: product.price, productType: product.productType});
                    continue;
                } else if (product.name !== current.name) {
                    groups.push(current);
                    current.name = '';
                    current.price = 0;
                    current.productType = '';
                }
            }

            groups.push({});
            return {products: groups, totalPrice: totalSum};
        }
    }
    return {
        Product, ShoppingCart
    };
}