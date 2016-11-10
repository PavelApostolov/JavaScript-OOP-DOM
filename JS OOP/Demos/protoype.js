var Point = (function(){
    var constructor = function (x, y) {
        this._x = x;
        this._y = y;
    };

    constructor.prototype.distanceTo = function(p){
        const x = this._x - p._x;
        const y = this._y - p._y;
        return Math.sqrt(x*x + y*y);
    };

    constructor.prototype.print = function(){
        console.log(`(${this._x}, ${this._y})`);
    };

    constructor.distance = function(a, b){
        return a.distanceTo(b);
    }

    return constructor;
}());

var p1 = new Point(3, 2);
var p2 = new Point(4, 6);

console.log(p1.distanceTo(p2));
console.log(Point.distance(p1, p2));

p1.print();