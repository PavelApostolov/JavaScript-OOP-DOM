/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [];
		var categories = [];
		function listBooks(param) {
			if (param) {
				if (books.find(x => x.author === param)) {
					return books.filter(x => x.author === param);
				}
				else if (books.filter(x => x.category === param)) {
					return books.filter(x => x.category === param.category);
				}
				else {
					return [];
				}
			}

			return books.sort(x => x.ID);
		}

		function addBook(book) {

			if (book.title.length < 2 || book.title.length > 100) {
				throw Error();
			}

			if (book.category.length < 2 || book.category.length > 100) {
				throw Error();
			}

			if(book.isbn.length !== 10 && book.isbn.length !== 13){
				throw Error();
			}

			if (book.author === '') {
				throw Error();
			}

			if (books.find(x => x.title === book.title)) {
				throw Error();
			}

			if(books.find(x => x.isbn === book.isbn)){ //Attention
				throw Error();
			}

			book.ID = books.length + 1;
			books.push(book);

			if (categories.indexOf(book.category) < 0) {
				categories.push(book.category);
			}

			return book;
		}

		function listCategories() {
			return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;

///////////////////////////////////////////////

function solve() {
	var library = (function () {
		var books = [];
		var categories = [];
		function listBooks(categotyToList) {
            if(!categotyToList){
			    return books;
            } else {
                var mathedBooks = [];
                books.map(function(b) {
                    if (b.category === categotyToList.category) {
                        mathedBooks.push(Object.create(b));
                    }
                });

                return mathedBooks;
            }
		}

		function addBook(book) {
            if (book.title.length < 2 || book.title.length > 100) {
                throw new Error('Invalid Book Title!');
            }
            if (book.category.length < 2 || book.category.length > 100) {
                throw new Error('Invalid Book Category!');
            }
            if(book.isbn.length < 10 || book.isbn.length > 13) {
                throw new Error('Invalid ISKB length!');
            }

            books.map(function(b) {
                if (b.title === book.title || b.isbn === book.isbn) {
                    throw new Error('This book is already exist!');
                }
            });

			book.ID = books.length + 1;
			books.push(book);

            var existCategory = false;
            categories.map(function (c) {
                if(c === book.category) {
                    existCategory = true;
                }
              });

            if (!existCategory) {
                categories.push(book.category);
            }
            
			return book;
		}

		function listCategories() {
			return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;


//////////////////////////

function solve() {
	var library = (function () {
		var books = [];
		var categories = [];

		function listBooks(obj) {
			var listedBooks = books,
				paramName,
				param;

			if (typeof (obj) === 'undefined') {
				return books;
			}
			else {
				if (obj.category) {
					param = obj.category;

					listedBooks = listedBooks.filter(function (book) {
						return book.category === param;
					});
				}

				if (obj.author) {
					param = obj.author;

					listedBooks = listedBooks.filter(function (book) {
						return book.author === param;
					});
				}

				return listedBooks;
			}
		}

		function addCategory(category) {
			// validateLength(category);
			// categories.push(category);
			var newCategory = {};

			validateLength(category);

			newCategory.name = category;
			newCategory.id = categories.length + 1;

			categories.push(newCategory);
			return newCategory;
		}

		function validateBook(book) {
			var bTitle = book.title,
				bCategory = book.category,
				bAuthor = book.author,
				bISBN = book.isbn;

			validateLength(bTitle);
			checkBookTitleAppear(bTitle);

			checkCategoryAppear(bCategory);
			validateAuthor(bAuthor);

			validateISBN(bISBN);
			checkBookISBNAppear(bISBN);

		}

		function checkBookISBNAppear(bISBN) {
			var isAppear = books.some(function (book) {
				return book.isbn === bISBN;
			});

			if (isAppear) {
				throw new Error();
			}
		}

		function validateAuthor(bAuthor) {
			if (!bAuthor) {
				throw new Error();
			}
		}

		function checkBookTitleAppear(bTitle) {
			var isAppear = books.some(function (book) {
				return book.title === bTitle;
			});

			if (isAppear) {
				throw new Error();
			}
		}

		function checkCategoryAppear(categoryname) {
			//var isAppear = categories.indexOf(categoryname) >= 0;
			var isAppear = categories.some(function (category) {
				return category.name === categoryname;
			});

			if (!isAppear) {
				addCategory(categoryname);
			}
		}

		function validateISBN(ISBN) {
			var isbnLength;

			if (typeof (ISBN) === 'undefined') {
				throw new Error();
			}

			isbnLength = ISBN.length;
			if (isbnLength === 10 || isbnLength === 13) {
				return true;
			}
			else {
				throw new Error();
			}

		}

		function validateLength(title) {
			var titleLength;

			if (typeof (title) === 'undefined') {
				throw new Error();
			}

			titleLength = title.length;
			if (titleLength < 3 || 100 < titleLength) {
				throw new Error();
			}
		}

		function addBook(book) {
			validateBook(book);
			book.ID = books.length + 1;
			books.push(book);
			return book;
		}

		function listCategories() {
			return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}


module.exports = solve;