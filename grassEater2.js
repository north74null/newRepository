var LivingCreature = require("./livingCreature.js");

class GrassEater2 extends LivingCreature { /* eats grass and grassCreator*/
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 30
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character);
    }

    eatGrass() {
        let newCell = random(this.chooseCell(1));
        if (newCell) {
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[newCell[1]][newCell[0]] = 4
            this.multiply += 5
            for (let i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }


    }
    eatGrassCreator() {
        let newCell = random(this.chooseCell(3));
        if (newCell) {
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[newCell[1]][newCell[0]] = 4
            this.multiply += 5
            for (let i in grassArr) {
                if (newCell[0] == grassCreatorArr[i].x && newCell[1] == grassCreatorArr[i].y) {
                    grassCreatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }

    mul() {
        let newCell = random(this.chooseCell(0))

        if (this.multiply > 40 && newCell) {
            let newGrassEater2 = new GrassEater2(newCell[0], newCell[1], 4)
            grassEater2Arr.push(newGrassEater2)
            matrix[newCell[1]][newCell[0]] = 4
            this.multiply = 30
        }

    }

    move() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[newCell[1]][newCell[0]] = 4
            if (this.multiply <= 30) {
                this.multiply--
            } else if (this.multiply > 30) {
                this.multiply = 30
            }
        }
    }

    die() {
        if (this.multiply <= 0) {
            matrix[this.y][this.x] = 0;
            for (let i in grassEater2Arr) {
                if (this.x == grassEater2Arr[i].x && this.y == grassEater2Arr[i].y) {
                    grassEater2Arr.splice(i, 1);
                    break;
                }
            }
        }
    }
}


module.exports = GrassEater2;