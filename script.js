var Grass = require("./grass.js");
var GrassEater = require("./grassEater.js");
var GrassCreator = require("./grassCreator.js");
var GrassEater2 = require("./grassEater2.js");

let newGrassForTest = new Grass(1,3,5);

console.log(newGrassForTest);

var matrix = []
var grassArr = []
var grassEaterArr = []
var grassCreatorArr = []
var grassEater2Arr = []
var side = 30;

function generator() {
    for (var i = 0; i < 32; i++) {
        matrix.push([])
        for (let j = 0; j < 32; j++) {
            var rN = Math.floor(Math.random() * 5)
            matrix[i].push(rN)
        }
    }
}
generator()


function setup() {
    frameRate(5)
    createCanvas(matrix[0].length * side, matrix.length * side)
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1))
            } else if (matrix[y][x] == 2) {
                grassEaterArr.push(new GrassEater(x, y, 2))
            } else if (matrix[y][x] == 3){
                grassCreatorArr.push(new GrassCreator(x, y, 3))
            }else if (matrix[y][x] == 4){
                grassCreatorArr.push(new GrassEater2(x, y, 3))
            }
        }

    }
}

function draw () {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("forestgreen")
            } else if (matrix[y][x] == 2) {
                fill("gold")
            } else if(matrix[y][x] == 3){
                fill("blue")
            } else if(matrix[y][x] == 4){
                fill("crimson")
            } else {
                fill("silver")
            }
            rect(x * side, y * side, side, side)
        }
    }
    for (const gr in grassArr) {
        grassArr[gr].mul()
    }
    for (const gre in grassEaterArr) {
        grassEaterArr[gre].eat()
        grassEaterArr[gre].mul()
        grassEaterArr[gre].move()
        grassEaterArr[gre].die()
    }
    for(const grc in grassCreatorArr){
        grassCreatorArr[grc].move()
        grassCreatorArr[grc].die()
    }
    for (const gre2 in grassEater2Arr) {
        grassEater2Arr[gre2].eatGrass()
        grassEater2Arr[gre2].eatGrassCreator()
        grassEater2Arr[gre2].mul()
        grassEater2Arr[gre2].move()
        grassEater2Arr[gre2].die()
    }
}

//  function draw(){
//     for(let y = 0; y < matrix.length; y++){
//         for(let x = 0; x < matrix[y].length; x++){
//             if(x == 0){
//                 fill("crimson")
//                 rect(x * side, y * side, side, side)
//             }else{
//                 fill("silver")
//                 rect(x * side, y * side, side, side)
//             }
//         }
//      }   
//  }

//  function draw(){
//     for(let y = 0; y < matrix.length; y++){
//         for(let x = 0; x < matrix[y].length; x++){
//             if(x + y < matrix[y].length){
//                 fill("crimson")
//                 rect(x * side, y * side, side, side)
//             }else{
//                 fill("silver")
//                 rect(x * side, y * side, side, side)
//             }
//         }
//      }   
//  }

// function draw(){
//         for(let y = 0; y < matrix.length; y++){
//             for(let x = 0; x < matrix[y].length; x++){
//                 if(x % 2 == 0 && y % 2 == 0 || x  % 2 == 1 && y % 2 == 1){
//                     fill("crimson")
//                     rect(x * side, y * side, side, side)
//                 }else{
//                     fill("silver")
//                     rect(x * side, y * side, side, side)
//                 }
//             }
//          }   
//      }