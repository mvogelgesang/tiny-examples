export class LikeButton {
  constructor(private _likeCount: number, private _liked: boolean) {}

  click() {
    this._likeCount += this._liked ? -1 : 1;
    this._liked = !this._liked;
    console.log("Button state: " + this._liked + " Count: " + this._likeCount);
  }

  get likesCount() {
    return this._likeCount;
  }

  get isLiked() {
    return this._liked;
  }
}
