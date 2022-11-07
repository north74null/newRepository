class Grass {
    constructor(x, y, index) {
        this.x = x
        this.y = y
        this.index = index
        this.multiplay = 0
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
        let found = []
        for (let i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    mul() {

        let newCell = random(this.chooseCell(0))
        if (this.multiplay >= 5 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1], 1)
            grassArr.push(newGrass)
            matrix[newCell[1]][newCell[0]] = 1
        }

        this.multiplay++

    }
}

class GrassEater {
    constructor(x, y, index) {
        this.x = x
        this.y = y
        this.index = index
        this.multiplay = 20
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
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }

    eat() {
        let newCell = random(this.chooseCell(1));
        if (newCell) {
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[newCell[1]][newCell[0]] = 2
            this.multiplay += 5
            for (let i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }


    }

    mul() {
        let newCell = random(this.chooseCell(0))

        if (this.multiplay > 40 && newCell) {
            let newGrassEater = new GrassEater(newCell[0], newCell[1], 1)
            grassEaterArr.push(newGrassEater)
            matrix[newCell[1]][newCell[0]] = 2
            this.multiplay = 20
        }

    }

    move() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[newCell[1]][newCell[0]] = 2
            if (this.multiplay <= 20) {
                this.multiplay -= 4
            } else if (this.multiplay > 20) {
                this.multiplay = 20
            }
        }
    }

    die() {
        if (this.multiplay <= 0) {
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

class GrassCreator { /* eats grassEater, creates grass before moveing*/
    constructor(x, y, index) {
        this.x = x
        this.y = y
        this.index = index
        this.multiplay = 30
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
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    eat() {
        let newCell = random(this.chooseCell(2));
        if (newCell) {
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[newCell[1]][newCell[0]] = 3
            this.multiplay += 5
            for (let i in grassEaterArr) {
                if (newCell[0] == grassEaterArr[i].x && newCell[1] == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }


    }
    move(){
        let newCell = random(this.chooseCell(0))
        if(newCell){
            matrix[this.y][this.x] = 1
            let newGrass = new Grass(this.x, this.y, 1)
            grassArr.push(newGrass)
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[newCell[1]][newCell[0]] = 3
            if (this.multiplay <= 30) {
                this.multiplay --
            } else if (this.multiplay > 30) {
                this.multiplay = 30
            }
        }
    }
    die() {
        if (this.multiplay <= 0) {
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

class GrassEater2 { /* eats grass and grassCreator*/
    constructor(x, y, index) {
        this.x = x
        this.y = y
        this.index = index
        this.multiplay = 30
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
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }

    eatGrass() {
        let newCell = random(this.chooseCell(1));
        if (newCell) {
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[newCell[1]][newCell[0]] = 4
            this.multiplay += 5
            for (let i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }


    }
    eatGrassCreator(){
        let newCell = random(this.chooseCell(3));
        if (newCell) {
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[newCell[1]][newCell[0]] = 4
            this.multiplay += 5
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

        if (this.multiplay > 40 && newCell) {
            let newGrassEater2 = new GrassEater2(newCell[0], newCell[1], 4)
            grassEater2Arr.push(newGrassEater2)
            matrix[newCell[1]][newCell[0]] = 4
            this.multiplay = 30
        }

    }

    move() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            matrix[this.y][this.x] = 0
            this.x = newCell[0]
            this.y = newCell[1]
            matrix[newCell[1]][newCell[0]] = 4
            if (this.multiplay <= 30) {
                this.multiplay --
            } else if (this.multiplay > 30) {
                this.multiplay = 30
            }
        }
    }

    die() {
        if (this.multiplay <= 0) {
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