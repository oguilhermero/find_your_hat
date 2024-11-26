const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//field Class declaration
class Field {
    constructor (field = []){
        this.field = field;
        this.x = 0;
        this.y = 0;
    }

    print() {
        let field = this.field;
        let stringResult = field.map(innerArray => innerArray.join("")).join("\n");
        return stringResult;
    }

    set move(dir) {
        switch (dir) {
            case dir = "u":
            this.y = this.y - 1;
            break;
            case dir = "d":
            this.y = this.y + 1;
            break;
            case dir = "l":
            this.x = this.x - 1;
            break;
            case dir = "r":
            this.x = this.x + 1;
            break;
        }
    }

}

//Out of bounds check functions
let outOfBounds = false;
const outOfBoundsCheck = (obj) => {
    if(obj.x < 0 || obj.y < 0){
        outOfBounds = true;
    }
}

//Check for holes in the Field
let holeWalk = false;
const holeWalkCheck = (obj) => {
    if (obj.field[obj.y][obj.x] === hole){
        holeWalk = true;
    }
}

//check for hat in the Field
let hatWalk = false;
const hatWalkCheck = (obj) => {
    if (obj.field[obj.y][obj.x] === hat){
        hatWalk = true;
    }
}


let gameField = new Field([[pathCharacter,fieldCharacter,fieldCharacter,hole,fieldCharacter],[hole,fieldCharacter,fieldCharacter,fieldCharacter,hole],[hole,hole,fieldCharacter,fieldCharacter,hole],[hole,fieldCharacter,fieldCharacter,fieldCharacter,hole],[fieldCharacter,hole,hat,hole,fieldCharacter]]);


while (!outOfBounds && !holeWalk && !hatWalk) {
    console.log(gameField.print());
    let move = prompt("Where to? (Up Down Left Right) ");
    gameField.move = move.toLowerCase();
    outOfBoundsCheck(gameField);
    holeWalkCheck(gameField);
    hatWalkCheck(gameField);
    gameField.field[gameField.y][gameField.x] = pathCharacter;
    if (outOfBounds === true) {
        console.log(gameField.print());
        console.log("You're out of bonds! Try again");
    } else if (holeWalk === true) {
        console.log(gameField.print());
        console.log("You stepped in a hole! Try again.");
    } else if (hatWalk === true) {
        console.log(gameField.print());
        console.log("You found the hat! Congratulations!");
    }
}