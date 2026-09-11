//Mole/Plant Management
let currMoleTile;
let currPlantTile;
let currMoleClicked = false; //Prevents a mole from being clicked twice in the same pop-up interval
//Spawning Management
let moleIntv;
let plantIntv;
//Game Management
let score = 0;
let highScore = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    //Set up the grid for the game board in html
    for (let i = 0; i < 9; i++) {
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile); //Detects when the user clicks a tile
        document.getElementById("board").appendChild(tile); //appendChild creates an element under the parent
    }

    moleIntv = setInterval(setMole, (Math.random() + 1) * 1000); //Picks random time between 1-2 seconds
    plantIntv = setInterval(setPlant, (Math.random() + 2) * 1000); //Picks random time between 2-3 seconds
}

function restartGame() {
    //Clears all existing tiles
    document.getElementById("board").innerHTML = "";

    //Resets game
    currMoleClicked = false;
    score = 0;
    gameOver = false;
    clearInterval(moleIntv);
    clearInterval(plantIntv);
    setGame();

    //Reset displays
    setTexts();
}

// Picks a random tile 0-8
function getRandomTile() {
    let num = Math.floor(Math.random() * 9)
    return num.toString();
}

// Sets the mole to appear at a random tile
function setMole() {
    //Voids function if the game ended
    if (gameOver) {
        return;
    }

    //Replaces current mole with nothing, if one exists
    let prevMoleTile = currMoleTile;
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    //Sets the mole texture
    let mole = document.createElement("img");
    mole.src = "./media/monty-mole.png"

    //Gets a random tile and places the mole there, given no plant is there
    let num = getRandomTile();
    if (document.getElementById(num) == prevMoleTile) { //Offsets tile if it would appear in the same spot as the previous one
        num++;
    }
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
    currMoleClicked = false;
}

// Sets the plant to appear at a random tile
function setPlant() {
    //Voids function if the game ended
    if (gameOver) {
        return;
    }
    
    //Replaces current plant with nothing, if one exists
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    //Sets the plant texture
    let plant = document.createElement("img");
    plant.src = "./media/piranha-plant.png"

    //Gets a random tile and places the plant there, given no mole is there
    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (this == currMoleTile && !currMoleClicked && !gameOver) {
        currMoleClicked = true;
        score += 10;
        if (highScore < score) {
            highScore = score;
        }
        setTexts();
        //Updates the current mole's sprite
        currMoleTile.children[0].style.filter = "grayscale()"; //Sets mole to grayscale, indicating "death"
    }
    else if (this == currPlantTile && !gameOver) {
        setTexts();
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //Overrides the setTexts() function
        gameOver = true;
        currMoleTile.children[0].style.filter = "grayscale()"; //Sets mole to grayscale, indicating "death"
    }
}

function setTexts() {
    document.getElementById("score").innerText = score.toString();
    document.getElementById("highScore").innerText = "High Score: " + highScore.toString();
}