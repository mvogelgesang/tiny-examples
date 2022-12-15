import { Point } from "./point";
import { LikeButton } from "./likeButton";
let log = (message: string) => {
  console.log(message);
};

let message;
message = "Hello world";
// using a type assertion here to declare the specific type. Note, the assertion must be wrapped in parens if you are running a function against it
log(<string>message);
log((<string>message).toUpperCase());
// you can also assert in this manner. Note, neither way changes the type of the variable
let alternateWay = (message as string).toUpperCase();

let myPoint = new Point(1, 2);
myPoint.draw();
// because x is a property, you can treat it as a getter and setter
myPoint.x = 5;

let btn = new LikeButton(5, false);
btn.click();
btn.click();
