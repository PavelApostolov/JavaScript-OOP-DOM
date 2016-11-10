/* Task Description */
/*
* Create an object domElement, that has the following properties and methods:
  * use prototypal inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`
  * property type that is the type of the domElement
    * a valid type is any non-empty string that contains only Latin letters and digits
  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
      * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
  * property children
    * each child is a domElement or a string
  * property parent
    * parent is a domElement
  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
  * method removeAttribute(attribute)
    * throw Error if attribute does not exist in the domElement
*/


/* Example
var meta = Object.create(domElement)
	.init('meta')
	.addAttribute('charset', 'utf-8');
var head = Object.create(domElement)
	.init('head')
	.appendChild(meta)
var div = Object.create(domElement)
	.init('div')
	.addAttribute('style', 'font-size: 42px');
div.content = 'Hello, world!';
var body = Object.create(domElement)
	.init('body')
	.appendChild(div)
	.addAttribute('id', 'cuki')
	.addAttribute('bgcolor', '#012345');
var root = Object.create(domElement)
	.init('html')
	.appendChild(head)
	.appendChild(body);
console.log(root.innerHTML);
Outputs:
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
*/


function solve() {
	var domElement = (function () {
		var domElement = {
			init: function (type) {
				if (!type) {
					throw new Error('Missing type!');
				}
				if (typeof type !== 'string') {
					throw new Eror('Invalid type!');
				}
				if (/[!@#$%&*-., ]/.test(type)) {
					throw new Error('Incorect type!');
				}

				this.type = type;
				this.content = '';
				this.children = [];
				this.parent = null;

				return this;
			},
			appendChild: function (child) {
				this.children.push(child);
				child.parent = this;

				return this;
			},
			addAttribute: function (name, value) {
				this.attributes = this.attributes || [];
				value = value || '';
				if (!name) {
					throw new Error('Missing parameters!');
				}
				if (/[!@#$%&*., ]/.test(name)) {
					throw new Error('Name contains invalid symbols!');
				}

				this.attributes[name] = value;
				return this;
			},
			removeAttribute: function (attribute) {
				if (this.attributes[attribute] !== undefined) {
					delete this.attributes[attribute];
				} else {
					throw new Error('This attribute don`t exist!');
				}

				return this;
			},
			get innerHTML() {
				var html = '<' + this.type;
				if (this.attributes) {
					html += sortAttributes(this.attributes);
				}

				html += '>';
				if (this.children.length) {
					this.children.forEach(function (child) {
						if (typeof child === 'string') {
							html += child;
						} else {
							html += child.innerHTML;
						}
					});
					this.content = '';
				}

				html += this.content;
				html += '</' + this.type + '>';

				return html;
      },
			get content() {
				return this._content;
			},
			set content(value) {
				this._content = value;
			}
		};

		var sortAttributes = function (attributesArr) {
			var sortedKeys = [];
			for (var key in attributesArr) {
				sortedKeys.push(key);
			}

			sortedKeys.sort();
			var result = '';
			for (var i = 0, len = sortedKeys.length; i < len; i += 1) {
				var attr = sortedKeys[i];
				result += ' ' + attr + '="' + attributesArr[attr] + '"';
			}

			return result;

		};
		return domElement;
	} ());
	return domElement;
}

module.exports = solve;