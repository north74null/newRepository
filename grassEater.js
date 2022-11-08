class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = 20;
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
            [this.x + 1, this.y + 1],
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    eat() {
        let newCell = random(this.chooseCell(1));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[newCell[1]][newCell[0]] = 2;
            this.multiply += 5;
            for (let i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
    }

    mul() {
        let newCell = random(this.chooseCell(0));

        if (this.multiply > 40 && newCell) {
            let newGrassEater = new GrassEater(newCell[0], newCell[1], 1);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.multiply = 20;
        }
    }

    move() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            matrix[newCell[1]][newCell[0]] = 2;
            if (this.multiply <= 20) {
                this.multiply -= 4;
            } else if (this.multiply > 20) {
                this.multiply = 20;
            }
        }
    }

    die() {
        if (this.multiply <= 0) {
            matrix[this.y][this.x] = 0;
            for (let i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}
