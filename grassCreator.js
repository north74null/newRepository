var LivingCreature = require("./livingCreature.js");

class GrassCreator extends LivingCreature { /* eats grassEater, creates grass before moving*/
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 30
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
    eat() {
        let newCell = random(this.chooseCell(2));
        if (newCell) {
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[newCell[1]][newCell[0]] = 3
            this.multiply += 5
            for (let i in grassEaterArr) {
                if (newCell[0] == grassEaterArr[i].x && newCell[1] == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
    move() {
        let newCell = random(this.chooseCell(0))
        if (newCell) {
            matrix[this.y][this.x] = 1
            let newGrass = new Grass(this.x, this.y, 1)
            grassArr.push(newGrass)
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[newCell[1]][newCell[0]] = 3
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
            for (let i in grassCreatorArr) {
                if (this.x == grassCreatorArr[i].x && this.y == grassCreatorArr[i].y) {
                    grassCreatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}


module.exports = GrassCreator;