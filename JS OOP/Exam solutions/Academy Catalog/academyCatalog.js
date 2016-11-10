function solve() {
    let uniqueItemID = 0,
        uniqueCatalogID = 0;

    class Validation {
        constructor() { }

        static validateName(value) {
            if (!value || value.length < 2 || value.length > 40) {
                throw new Error('Item name doesnt meet the conditions!');
            }
        }

        static validateDescription(value) {
            if (!value) {
                throw new Error('Item description cannot be left empty!');
            }
        }

        static validateISBN(value) {
            let hasOnlyDigits = true;
            value = value.split('');

            for (let char of value) {
                if (!isFinite(char)) {
                    hasOnlyDigits = false;
                    break;
                }
            }

            let hasProperLength = value.length == 10 || value.length == 13;
            if (!hasOnlyDigits || !hasProperLength) {
                throw new Error('ISBN doesnt match criteria!');
            }
        }

        static validateGenre(value) {
            if (value.length < 2 || value.length > 20) {
                throw new Error('Genre doesnt match the name conditions!');
            }
        }

        static validateDuration(value) {
            if (!value || value < 1) {
                throw new Error('Duration cannot be less than 1!');
            }
        }

        static validateRating(value) {
            if (!value || value < 1 || value > 5) {
                throw new Error('Rating must be from 1 to 5');
            }
        }

        static itemsToAddValidation(items, classType) {
            if (!items || items.length === 0) {
                throw new Error('No items provided!');
            }

            for (let item of items) {
                if (classType instanceof BookCatalog) {
                    if (!(item instanceof Book)) {
                        throw new Error('Element is not of type Book');
                    }
                } else if (classType instanceof MediaCatalog) {
                    if (!(item instanceof Media)) {
                        throw new Error('Element is not of type Media');
                    }
                }
            }
        }

        static validateItemsArray(items) {
            var itemsArray;

            if (Array.isArray(items[0])) {
                itemsArray = items[0];
            } else {
                itemsArray = items;
            }
            return itemsArray;
        }

        static validateMediaTopCount(value) {
            if (typeof value != 'number' || value < 1) {
                throw new Error('Top count is not matching criteria');
            }
        }

        static validateSearchPattern(value) {
            if (value.length < 1) {
                throw new Error('Pattern must contain at least one character!');
            }
        }

        static validateSearchID(value) {
            if (!value || typeof value != 'number') {
                throw new Error('Item id to search for is not in the correct format!');
            }
        }
    }

    class Item {
        constructor(name, description) {
            this.name = name;

            this.description = description;
            this._id = ++uniqueItemID;
        }

        get id() {
            return this._id;
        }

        get name() {
            return this._name;
        }
        set name(value) {
            Validation.validateName(value);
            this._name = value;
        }

        get description() {
            return this._description;
        }
        set description(value) {
            Validation.validateDescription(value);
            this._description = value;
        }
    }

    class Book extends Item {
        constructor(name, isbn, genre, description) {
            super(name, description);

            this.isbn = isbn;
            this.genre = genre;
        }

        get isbn() {
            return this._isbn;
        }
        set isbn(value) {
            Validation.validateISBN(value);
            this._isbn = value;
        }

        get genre() {
            return this._genre;
        }
        set genre(value) {
            Validation.validateGenre(value);
            this._genre = value;
        }
    }

    class Media extends Item {
        constructor(name, description, duration, rating) {
            super(name, description);
            this.duration = duration;
            this.rating = rating;
        }

        get duration() {
            return this._duration;
        }
        set duration(value) {
            Validation.validateDuration(value);
            this._duration = value;
        }

        get rating() {
            return this._rating;
        }
        set rating(value) {
            Validation.validateRating(value);
            this._rating = value;
        }
    }

    class Catalog {
        constructor(name) {
            this.name = name;
            this._items = [];
            this._id = ++uniqueCatalogID;
        }

        get id() {
            return this._id;
        }

        get name() {
            return this._name;
        }
        set name(value) {
            Validation.validateName(value);
            this._name = value;
        }

        get items() {
            return this._items;
        }

        add(...items) {
            let type = this;
            var itemArray = Validation.validateItemsArray(items);

            Validation.itemsToAddValidation(itemArray, type);

            for (let item of itemArray) {
                this._items.push(item);
            }

            return this;
        }

        find(param) {
            if (typeof param === 'object') {
                let catalogItems = this.items,
                    props = Object.keys(param);

                for (let prop of props) {
                    catalogItems = catalogItems.filter(x => x[prop] === param[prop]);
                }

                return catalogItems;
            } else {
                Validation.validateSearchID(param);

                for (let item of this.items) {
                    if (item.id === param) {
                        return item;
                    }
                }
                return null;
            }
        }

        search(pattern) {
            Validation.validateSearchPattern(pattern);

            let filteredArray = [];

            pattern = pattern.toLowerCase();

            for (let item of this.items) {
                let containsInName = item.name.toLowerCase().includes(pattern),
                    containsInDescription = item.description.toLowerCase().includes(pattern);

                if (containsInName || containsInDescription) {
                    filteredArray.push(item);
                }
            }
            return filteredArray;
        }
    }

    class BookCatalog extends Catalog {
        constructor(name) {
            super(name);
        }

        getGenres() {
            let uniqueGenres = new Set();

            for (let book of this.items) {
                uniqueGenres.add(book.genre);
            }

            return Array.from(uniqueGenres);
        }
    }

    class MediaCatalog extends Catalog {
        constructor(name) {
            super(name);
        }

        getTop(count) {
            Validation.validateMediaTopCount(count);

            let medias = this.items.sort((a, b) => a.rating - b.rating),
                topMedia = new Set();

            count = count > medias.length ? medias.length : count;

            for (var i = 0; i < count; i += 1) {
                let mediaItem = {};
                mediaItem.id = medias[i].id;
                mediaItem.name = medias[i].name;

                topMedia.add(mediaItem);
            }

            return Array.from(topMedia);
        }

        getSortedByDuration() {
            let sortedMedia = this.items.sort((a, b) => b.duration - a.duration).sort((a, b) => a.id - b.id);
            return sortedMedia;
        }
    }

    return {
        getBook: function (name, isbn, genre, description) {
            let book = new Book(name, isbn, genre, description);

            return book;
        },
        getMedia: function (name, rating, duration, description) {
            let media = new Media(name, description, duration, rating);

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

module.exports = solve; 