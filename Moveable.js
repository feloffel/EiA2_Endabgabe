"use strict";
var EisDealer;
(function (EisDealer) {
    class Moveable extends EisDealer.Drawable {
        x;
        y;
        constructor(x, y) {
            super();
            this.x = x;
            this.y = y;
        }
        move() {
            this.x += 1;
            this.y += 0;
        }
    }
    EisDealer.Moveable = Moveable;
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Moveable.js.map