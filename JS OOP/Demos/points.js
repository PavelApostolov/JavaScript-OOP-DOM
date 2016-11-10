class Point {
    constructor (x, y){
        this._x = x;
        this._y = y;
    }

    rotate90(){
        let z = y;
        this._y = this._x;
        this._x = -z;
    }

    print(){
        console.log(`(${this._x}, ${this._y})`);
    }

    static centerPoint(){
        return new Point(0, 0);
    }

    static distance(p1, p2) {
        const x = p1._x - p2._x;
        const y = p1._y - p2._y;
        return Math.sqrt(x * x + y * y);
    }

    distanceTo(p) {
        const x = this._x - this._x;
        const y = this._y - this._y;
        return Math.sqrt(x * x + y * y);
    }
}

let p = new Point(3, -2);
p.print();
p.rotate90();
p.print();

let enemy = new Point(100, 10);
console.log(Point.distance(p.Point.centerPoint()));
console.log(Point.distance(p, new Point(5, 5)));
console.log(p.distanceTo(enemy));