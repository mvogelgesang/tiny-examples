// when you declare a function like draw(), the implementation exists somewhere else
export class Point {
  // if you want to make sure a property is not overwritten, you mark them as private
  // private x: number|undefined;
  // private y: number|undefined;

  // in typescript you cannot have multiple constructors. However, applying a ? to the var makes it optional
  // rather than having to write the vars twice, you can set the access modifiers on the constructor and you don't need this.blah
  // if they are meant to be public, you MUST declare as such
  constructor(private _x: number, private _y: number) {}
  // you can also make a method private if necessary
  draw() {
    console.log("x: " + this._x + " y: " + this._y);
  }
  // this is one means for accessing the private property
  getX() {
    return this._x;
  }
  setX(value:number) {
    if (value < 0) {
      throw new Error('Value cannot be less than 0');
    }
    this._x = value;
  }
  // however, you can use get/ set properties and simplify your code
  // you name the private vars with _ to allow for get/set to refer to x and not clash
  get x() {
    return this._x
  }
  set x(value:number) {
    if (value < 0) {
      throw new Error('Value cannot be less than 0');
    }
    this._x = value;
  }
  // from there, you can call the functions myPoint.X or myPoint.X = 10
  getDistance(another: Point) {
    // ...
  }
}

let myPoint = new Point(1, 2);
myPoint.draw();
// because x is a property, you can treat it as a getter and setter
myPoint.x = 5;