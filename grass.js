var LivingCreature = require("./livingCreature.js");

class Grass extends LivingCreature {
    mul() {

        let newCell = random(this.chooseCell(0))
        if (this.multiply >= 5 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1], 1)
            grassArr.push(newGrass)
            matrix[newCell[1]][newCell[0]] = 1
        }

        this.multiply++

    }
}

module.exports = Grass;