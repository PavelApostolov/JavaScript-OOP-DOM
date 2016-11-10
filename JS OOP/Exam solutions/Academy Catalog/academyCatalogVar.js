function solve() {
    let currentItemId = 0,
        currentCatalogId = 0;

    String.prototype.isNumber = function () {
        return /^\d+$/.test(this);
    };

    function mySort(a, b) {
        if (a > b) {
            return 1;
        }
        else if (a < b) {
            return -1;
        }
        else {
            return 0;
        }
    }

    class Validator {
        static checkIfUndefined(value, name) {
            name = name || 'Value';
            if (value === undefined) {
                throw new Error(`${name} cannot be undefined!`);
            }
        }

        static checkString(str, name, minLength, maxLength) {
            name = name || 'Value';
            minLength = minLength || 1;
            maxLength = maxLength || Math.max;

            Validator.checkIfUndefined(str, name);

            if (typeof str !== 'string') {
                throw new Error(`${name} must be a string!`);
            }

            if (str.length < minLength || maxLength < str.length) {
                throw new Error(`${name} must be between ${minLength} and ${maxLength} symbols!`);
            }
        }

        static chekISBN(value) {
            Validator.checkString(value, 'ISBN');

            if (!(value.isNumber())) {
                throw new Error('ISBN can contain only digits!');
            }

            if (value.length !== 10 && value.length !== 13) {
                throw new Error('ISBN length must be exactly 10 or 13!');
            }
        }

        static checkNumber(value, name, min, max) {
            name = name || 'Value';
            min = min || -Math.max;
            max = max || Math.max;

            Validator.checkIfUndefined(value, name);

            if (typeof value !== 'number') {
                throw new Error(`${name} must be a number!`)
            }

            if (value < min || max < value) {
                throw new Error(`${name} must be between ${min} and ${max}!`);
            }
        }
    }

    class Item {
        constructor(description, name) {
            this.id = ++currentItemId;
            this.description = description;
            this.name = name;
        }

        get description() {
            return this._description;
        }

        set description(value) {
            Validator.checkString(value, 'Description');
            this._description = value;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            Validator.checkString(value, 'Item name', 2, 40);
            this._name = value;
        }
    }

    class Book extends Item {
        constructor(name, isbn, genre, description) {
            super(description, name);
            this.isbn = isbn;
            this.genre = genre;
        }

        get isbn() {
            return this._isbn;
        }

        set isbn(value) {
            Validator.chekISBN(value);
            this._isbn = value;
        }

        get genre() {
            return this._genre;
        }

        set genre(value) {
            Validator.checkString(value, 'Genre', 2, 20);
            this._genre = value;
        }
    }

    class Media extends Item {
        constructor(name, rating, duration, description) {
            super(description, name);
            this.rating = rating;
            this.duration = duration;
        }

        get rating() {
            return this._rating;
        }

        set rating(value) {
            Validator.checkNumber(value, 'Rating', 1, 5);
            this._rating = value;
        }

        get duration() {
            return this._duration;
        }

        set duration(value) {
            Validator.checkNumber(value, 'Duration', 1);
            this._duration = value;
        }
    }

    class Catalog {
        constructor(name) {
            this.id = ++currentCatalogId;
            this.name = name;
            this.items = [];
        }

        get name() {
            return this._name;
        }

        set name(value) {
            Validator.checkString(value, 'Catalog name', 2, 40);
            this._name = value;
        }

        add(...items) {
            if (items[0].length === 0 || items[0][0] === null) {
                throw new Error('No items are passed!');
            }

            if (Array.isArray(items[0])) {
                items = items[0];
            }

            items.forEach(i => function (i) {
                if (!(i instanceof Item)) {
                    throw new Error('Any of the items is not an Item instance or not an Item-like object!');
                }
            });

            this.items.push(...items);

            return this;
        }

        _findById(id) {
            Validator.checkNumber(id, 'Id');

            let item = this.items.find(i => i.id === id);
            item = item || null;

            return item;
        }

        _findByOptions(options) {
            let items = [];

            for (let item of this.items) {
                let isEqual = true;

                for (let prop in options) {
                    let optionsProperty = options[prop],
                        itemProperty = item[prop];

                    if (prop === 'name') {
                        optionsProperty = optionsProperty.toLowerCase();
                        itemProperty = itemProperty.toLowerCase();
                    }

                    if (optionsProperty !== itemProperty) {
                        isEqual = false;
                    }
                }

                if (isEqual) {
                    items.push(item);
                }
            }

            return items;
        }

        find(keys) {
            let id,
                options,
                result = [];

            if (typeof keys !== 'object' || keys === null) {
                id = keys;
            }
            else {
                options = keys;
            }

            if (id) {
                result = this._findById(id);
            }
            else if (options) {
                result = this._findByOptions(options);
            }
            else {
                throw new Error('No arguments are passed!');
            }

            return result;
        }

        search(pattern) {
            let result = [];

            Validator.checkString(pattern, 'Pattern', 1);

            for (let item of this.items) {
                let isContain = false;

                if (item.name.toLowerCase().indexOf(pattern.toLowerCase()) >= 0) {
                    isContain = true;
                }
                else if (item.description.toLowerCase().indexOf(pattern.toLowerCase()) >= 0) {
                    isContain = true;
                }

                if (isContain) {
                    result.push(item);
                }
            }

            return result;
        }
    }

    class BookCatalog extends Catalog {
        constructor(name) {
            super(name);
        }

        add(...books) {
            if (Array.isArray(books[0])) {
                books = books[0];
            }

            if (books.find(b => !(b instanceof Book))) {
                throw new Error('All of items must are instance of Book!');
            }

            super.add(books);

            return this;
        }

        getGenres() {
            let genres = [];

            for (let book of this.items) {
                let genre = book.genre.toLowerCase();

                if (genres.indexOf(genre) < 0) {
                    genres.push(genre);
                }
            }

            return genres;
        }
    }

    class MediaCatalog extends Catalog {
        constructor(name) {
            super(name);
        }

        add(...media) {
            if (Array.isArray(media[0])) {
                media = media[0];
            }

            if (media.find(m => !(m instanceof Media))) {
                throw new Error('All of items must are instance of Book!');
            }

            super.add(media);

            return this;
        }

        getTop(count) {
            Validator.checkNumber(count, 'Count', 1);

            let result = [],
                sortedMedia = this.items.sort((a, b) => b.rating - a.rating);

            for (let i = 0; i < count; i += 1) {
                if (!(sortedMedia[i])) {
                    break;
                }

                let obj = {
                    id: sortedMedia[i].id,
                    name: sortedMedia[i].name
                };

                result.push(obj);
            }

            return result;
        }

        getSortedByDuration() {
            return this.items.sort((a, b) => mySort(b.duration, a.duration) || mySort(a.id, b.id));
        }
    }

    return {
        getBook: function (name, isbn, genre, description) {
            return new Book(name, isbn, genre, description);
        },
        getMedia: function (name, rating, duration, description) {
            return new Media(name, rating, duration, description)
        },
        getBookCatalog: function (name) {
            return new BookCatalog(name);
        },
        getMediaCatalog: function (name) {
            return new MediaCatalog(name);
        },
    };
}

module.exports = solve;

/////////////////

function solve() {

    let validator = (() => {
        let uniqueStudentsID = 0,
            uniqueCatalogID = 0;
        return {
            uniqueStudentsID,
            uniqueCatalogID,
            validateName(name) {
                if (name.length < 2 || name.length > 40) {
                    throw new Error('Name length is invalid!');
                }
            },
            validateISBN(isbn) {
                let characters = [...isbn];

                if (characters.length !== 10 && characters.length !== 13) {
                    throw new Error('ISBN is not in the required format!');
                }

                characters.forEach(function (c) {
                    if (!isFinite(c)) {
                        throw new Error('ISBN contains non digit character!');
                    }
                });

            },
            validateGenre(genre) {
                if (genre.length < 2 || genre.length > 20) {
                    throw new Error('Genre length is invalid!');
                }
            },
            validateRating(rating) {
                if (!rating || rating < 1 || rating > 5) {
                    throw new Error('Rating should be between 1 and 5');
                }
            },
            validateDuration(duration) {
                if (!duration || duration < 1) {
                    throw new Error('Duration should be greater than one!');
                }
            },
            validateCount(count) {
                if (count < 1 || typeof count != 'number') {
                    throw new Error('Count is not in the required format!');
                }
            },
            isEmpty(value) {
                if (!value || value.length === 0) {
                    throw new Error('Data cannot be left empty!');
                }
            },
            isNumber(value) {
                if (typeof value !== 'number') {
                    throw new Error('Data is not a number!');
                }
            }

        };
    })();

    class Item {
        constructor(name, description) {
            this.name = name;
            this.description = description;
            this._id = ++validator.uniqueStudentsID;
        }

        get id() {
            return this._id;
        }

        get name() {
            return this._name;
        }
        set name(value) {
            validator.validateName(value);
            this._name = value;
        }

        get description() {
            return this._description;
        }
        set description(value) {
            validator.isEmpty(value);
            this._description = value;
        }
    }

    class Book extends Item {
        constructor(name, isbn, genre, descrption) {
            super(name, descrption);
            this.genre = genre;
            this.isbn = isbn;
        }

        get genre() {
            return this._genre;
        }
        set genre(value) {
            validator.validateGenre(value);
            this._genre = value;
        }

        get isbn() {
            return this._isbn;
        }
        set isbn(value) {
            validator.validateISBN(value);
            this._isbn = value;
        }
    }

    class Media extends Item {
        constructor(name, rating, duration, description) {
            super(name, description);

            this.duration = duration;
            this.rating = rating;
        }

        get duration() {
            return this._duration;
        }
        set duration(value) {
            validator.validateDuration(value);
            this._duration = value;
        }

        get rating() {
            return this._rating;
        }
        set rating(value) {
            validator.validateRating(value);
            this._rating = value;
        }
    }

    function findElements(obj, items) {
        let foundElements = items;

        for (let prop of Object.keys(obj)) {
            foundElements = foundElements.filter(x => x[prop] === obj[prop]);
        }

        return foundElements;
    }

    class Catalog {
        constructor(name) {
            this.name = name;
            this.items = [];
            this._id = ++validator.uniqueCatalogID;
        }

        get id() {
            return this._id;
        }

        get name() {
            return this._name;
        }
        set name(value) {
            validator.validateName(value);
            this._name = value;
        }

        add(...items) {
            if (Array.isArray(items[0])) {
                items = items[0];
            }

            if (items.length === 0) {
                throw new Error('No items');
            }

            this.items.push(...items);
            return this;
        }

        find(obj) {
            validator.isEmpty(obj);
            let foundObjects = null;

            if (typeof obj === 'object') {
                foundObjects = findElements(obj, this.items);
            } else {
                validator.isNumber(obj);
                foundObjects = this.items.filter(x => x.id === obj)[0] || null;
            }

            return foundObjects;
        }

        search(pattern) {
            validator.isEmpty(pattern);
            let matchingItems = this.items.filter(x => x.name.includes(pattern) || x.description.includes(pattern));

            return matchingItems;
        }
    }

    class BookCatalog extends Catalog {
        constructor(name) {
            super(name);
        }

        add(...items) {
            if (Array.isArray(items[0])) {
                items = items[0];
            }

            items.forEach(function (item) {
                if (!(item instanceof Book)) {
                    throw new Error('You must add only books!');
                }
            });

            return super.add(...items);
        }

        getGenres() {
            let genres = this.items.map(x => x.genre.toLowerCase()),
                uniqueGenres = new Set(genres);

            return Array.from(uniqueGenres);
        }
    }

    class MediaCatalog extends Catalog {
        constructor(name) {
            super(name);
        }

        add(...items) {
            if (Array.isArray(items[0])) {
                items = items[0];
            }

            items.forEach(function (item) {
                if (!(item instanceof Media)) {
                    throw new Error('You must add only medias!');
                }
            });

            return super.add(...items);
        }

        getTop(count) {
            validator.validateCount(count);

            count = count > this.items.length ? this.items.length : count;

            let sortedItems = this.items
            .sort((a, b) => a.rating - b.rating)
            .map((item) => {
                return {
                    name: item.name,
                    id: item.id
                };
            });

            let topMedia = new Set();

            for (var i = 0; i < count; i += 1) {

                topMedia.add(sortedItems[i]);
            }

            return Array.from(topMedia);
        }

        getSortedByDuration() {
            let sortedMedia = this.items
                .sort((a, b) => b.duration - a.duration)
                .sort((a, b) => a.id - b.id);

            return sortedMedia;
        }
    }

    return {
        getBook: function (name, isbn, genre, description) {
            let book = new Book(name, isbn, genre, description);
            return book;
        },
        getMedia: function (name, rating, duration, description) {
            let media = new Media(name, rating, duration, description);
            return media;
        },
        getBookCatalog: function (name) {
            let bookCatalog = new BookCatalog(name);
            return bookCatalog;
        },
        getMediaCatalog: function (name) {
            let mediaCatalog = new MediaCatalog(name);
            return mediaCatalog;
        }
    };
}

// let func = solve();

// let catalog = func.getBookCatalog('Catalogone');

// let book = func.getBook('Bambi', '3454565676654', 'Bullshit', 'Nz kakvo da kaja');
// let secondBook = func.getBook('Mocho', '3454565111654', 'Shit', 'Nz kakvo da kaja');


// catalog.add({});


module.exports = solve;