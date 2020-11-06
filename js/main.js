/*----- constants -----*/

const width = 10; // this will be the width and height of the board
const tileNum = width * width; 
const bombName = 'bomb'; // class name for a bomb
const blankName = 'safe' // class name for a blank square
const bombText = ''; // what the innerText of a bomb square will say
const flagText = 'SUS' // used for when right clicked
const blankTile = ''; // what the innerText of a blank square will say
const boardArray = []; //we are creating an array that has both bombs and safe in the array
const numOfBombs = 10; // number of bombs in the game
const numOfBlanks = tileNum - numOfBombs - 1; //number of blank squares in the game. We are subtracting one because the first in the shuffled array will be safe for the first click


// State variables ===============================================

let boardDivs = [];
let isGameOver = false;
let firstTileIsClicked = false;
let bombsFlagged = 0;
let blankFlagged = 0;
let totalFlagged = 0;
const boardTiles = []; 

// cached element references ========================================

const grid = document.querySelector('.grid');

const newGame = document.querySelector('button');

let character = document.querySelector("img"); //character decoration image on page
let flagCounter = document.querySelector('#counter');

let newGameGif = document.querySelector(".newGame");
let loseGif = document.querySelector(".loseGif");
let winGif = document.querySelector(".winGif");

let newGameAudio = document.querySelector("#newgameaudio");
let victoryAudio = document.querySelector("#victoryaudio");
let defeatAudio = document.querySelector("#defeataudio");

// Creating the grid for the game ==================================

function createBoard() {
    for(i = 0; i < tileNum; i++) { //we will create as many tiles depending on the width of the board and multiply so that the board is a square
    let tile = document.createElement('div'); // this is to create the div element for each
    tile.setAttribute('id', i); //we are setting the id to tile number using the i as a counter
    grid.appendChild(tile) //we are appending the tiles to the grid parent
    boardDivs.push(tile);

    tile.addEventListener('click', function(e){
        if(firstTileIsClicked) {
            click(tile)

        } else {
            firstClick(tile);
            click(tile);
        }
        })

    tile.oncontextmenu = function(e) {
        e.preventDefault()
        flagTile(tile)
        }

    }
    const bombArray = Array(numOfBombs).fill(bombName); //creating an array with the right number of bombs
    const blankArray = Array(numOfBlanks).fill(blankName); //creating an array wih the right number of blank/safe spaces
    
    boardArray.push(...bombArray);
    boardArray.push(...blankArray);

     function shuffle(){ // we are randomizing the order of the bombs and blank areas
        const shuffled = boardArray.sort(() => Math.random() - 0.5);
        boardTiles.push(...shuffled);
        }
   
    shuffle();
  }

// event listeners ================================================================

window.addEventListener('load', createBoard());
newGame.addEventListener('click', restartGame);
character.addEventListener("click", speechPopUp);

// functions ================================================================

function shuffle(){ // we are randomizing the order of the bombs and blank areas
    const shuffled = boardArray.sort(() => Math.random() - 0.5);
    boardTiles.push(...shuffled);
    }

function firstClick(tile){ //cannot be a bomb, so will be a number or empty space
    let clickedId = parseInt(tile.id); 
    tile.className = 'safe';

    for (i = 0; i < width * width; i++){ // we are adding class names to each div with a number as an id so each square is labeled as either bomb or safe
        let gridBlocks = document.getElementById([i]);
        if(gridBlocks.className === 'safe') { continue; } // since the first tile we clicked has already been assigned 'safe', we will skip over it and assign classes to the rest
        gridBlocks.className = boardTiles[i];
    }
    firstTileIsClicked = true; // once the first click is made, firstTileisClicked is triggered so that the next click will just be regular click

    for (let i = 0; i < boardTiles.length; i++){ //add numbers to squares
        let bombTotal = 0;    
        const isLeftSide = i % width === 0; //defines which div numbers are on the left side of the grid
        const isRightSide = i % width === width - 1; //defines which div numbers are on the right side of the grid

        if (boardDivs[i].classList.contains('safe')) {
            if(i > 0 && !isLeftSide && boardDivs[i - 1].classList.contains('bomb')) bombTotal++ // checks left of square
            if(i > 0 && !isRightSide && boardDivs[i + 1].classList.contains('bomb')) bombTotal++ // checks right of square
            if(i > width - 1 && !isLeftSide && boardDivs[i - width - 1].classList.contains('bomb')) bombTotal++ //checks top left of square
            if(i > width - 1 && boardDivs[i - width].classList.contains('bomb')) bombTotal++ // checks above square
            if(i > width - 1 && !isRightSide && boardDivs[i - width + 1].classList.contains('bomb')) bombTotal++ //checks top right of square
            if(i < width * width - width && !isLeftSide && boardDivs[i + width - 1].classList.contains('bomb')) bombTotal++//checks bottom left square
            if(i < width * width - width && boardDivs[i + width].classList.contains('bomb')) bombTotal++ //checks below square
            if(i < width * width - width && !isRightSide && boardDivs[i + width + 1].classList.contains('bomb')) bombTotal++ //checks bottom right square
            boardDivs[i].data = bombTotal; // we are storing the bombTotal into the div's data to refer to later to display
            if(bombTotal == 0){
            boardDivs[i].data = 'empty'; // we are storing empty so we know that this will be a blank tile later
            }
        } else {
            boardDivs[i].data = 'bomb';
        }
    }
} // end of firstClick() function

function click(tile){ // this is for any click that is not the first click
    let clickedId = parseInt(tile.id);  // adding parseInt to make it a number
    let bombClick = document.getElementsByClassName('bomb');
    if(isGameOver)return;
    if (tile.classList.contains('safeclicked')) return;
    tile.classList.add('safeclicked') // to change the color of the square and show it's clicked
    if(tile.classList.contains('bomb')){ // if a bomb tile is clicked
        for (i = 0; i < bombClick.length; i++){
            bombClick[i].innerText = '💣'; 
            bombClick[i].classList.add('bombclicked');
            // bombClick[i].className = 'bombclicked';
                }
        loseAnimation(); // play losing animation
        isGameOver = true;    

    } else if(tile.classList.contains('safe') && tile.data === 'empty'){ //if an empty tile is clicked
        const isLeftSide = tile.id % width === 0; //defines which div numbers are on the left side of the grid
        const isRightSide = tile.id % width === width - 1; //defines which div numbers are on the right side of the grid
            if(tile.classList.contains('flagged')){
                tile.classList.remove('flagged');
                blankFlagged--;
                totalFlagged--;
                flagCounter.innerText = totalFlagged;
            if(tile.data = 'empty'){
                tile.innerText = '';               
                }
            }                
            if(tile.id > 0 && !isLeftSide) { // we are checking all the tiles to the left of the clicked tile
                let leftIdNum = clickedId - 1;                    
                let leftSquare = document.getElementById(leftIdNum) // we are grabbing the square to the left of the current clicked
                click(leftSquare); //we are clicking on the square to the left                       
            }                
            if(tile.id > 0 && !isRightSide) { // we are checking all the tiles to the right of the clicked tile
                let rightIdNum = clickedId + 1;
                let rightSquare = document.getElementById(rightIdNum); //we are grabbing the square to the right of the current clicked
                click(rightSquare); //we are clicking on the square to the right
            }                
            if(tile.id > width){ // we are checking all the tiles above the clicked tile
                let aboveIdNum = clickedId - width;
                let aboveSquare = document.getElementById(aboveIdNum); //we are grabbing the square right above the current clicked
                click(aboveSquare);
            }
            if(tile.id > width && !isLeftSide && tile.id > width + 1){ // we are checking all the tiles the top left of the clicked tile
                let topLeftIdNum = clickedId - width - 1;
                let topLeftSquare = document.getElementById(topLeftIdNum);
                click(topLeftSquare);
            }  
            if(tile.id < width * width - width){ // we are checking all the tiles below the clicked tile  **GOOD**
                let belowIdNum = clickedId + width;
                let belowSquare = document.getElementById(belowIdNum); //we are grabbing the square right above the current clicked
                click(belowSquare);
            }
    } else if(tile.data > 0){ // we are only clicking the one tile if it contains a number
        tile.innerText = tile.data;
    }
}

function flagTile(tile){ // this is for right clicks to flag or unflag a tile
    let rightClickedId = parseInt(tile.id);  // adding parseInt to make it a number
    if(isGameOver)return; // we are returning so that nothing else can be clicked on 
    if (tile.classList.contains('safeclicked')) return; // we are returning so this tile can't be clicked on after being activated

    if(tile.classList.contains('flagged')){ // to remove a flag from any tile already flagged
        tile.classList.remove('flagged');
        tile.innerText = '';
        if(tile.classList.contains('bomb')) {
            bombsFlagged--;
            totalFlagged--;
            flagCounter.innerText = totalFlagged;
        }
        if(tile.classList.contains('safe')) {
            blankFlagged--;
            totalFlagged--;
            flagCounter.innerText = totalFlagged;
        }
        if(tile.classList.contains('safe') && bombsFlagged > numOfBombs - 1 && blankFlagged < 1){
            isGameOver = true;
            winAnimation();
        }
    } else {
        tile.classList.add('flagged');
        tile.innerText = flagText;
        if(tile.classList.contains('safe')){
            blankFlagged++
            totalFlagged++;
            flagCounter.innerText = totalFlagged;
        } else if(tile.classList.contains('bomb') && bombsFlagged < numOfBombs){
            bombsFlagged++
            totalFlagged++;
            flagCounter.innerText = totalFlagged;
            if (bombsFlagged === numOfBombs && blankFlagged < 1){
                isGameOver = true;
                winAnimation();
            }
        }   
    }            
};
   
function restartGame(){ //button to restart the board for a new game
    for (i = 0; i < boardDivs.length; i++){
        boardDivs[i].className = '';
        boardDivs[i].innerText = '';
        bombTotal = 0;
        blankFlagged = 0; //we are resetting all counters for the game to start a new one
        bombsFlagged = 0;
        totalFlagged = 0;
        flagCounter.innerText = totalFlagged;
        isGameOver = false;
        firstTileIsClicked = false;
        boardTiles.length = 0;
        shuffle();
        newGameAnimation();
        if(winGif.style.visibility = "visible"){
            winGif.style.visibility = "hidden";
        }
    }
}

function speechPopUp(){ //for the pop up speech bubble that appears above the character decoration
    let popup = document.getElementById("speechBubble");
    popup.classList.toggle("show");
  }

// end game div pop ups ================================================================

function newGameAnimation(){ //pop up animation when you click "Start New Game"
    newGameGif.style.visibility = "visible";
    newGameAudio.play(); //plays new game sound effect
    setTimeout(function () {
        newGameGif.style.visibility = "hidden";
    }, 2000); //ends animation after 2 seconds
}

function loseAnimation(){ //pop up animation when you lose
    loseGif.style.visibility = "visible";
    defeatAudio.play(); //plays lose game sound effect
    setTimeout(function () {
        loseGif.style.visibility = "hidden";
    }, 2300);//ends animation after 2.3 seconds
    setTimeout(function () {
        defeatAudio.pause(); //plays defeat game sound effect
    }, 2300);//ends animation after 2.3 seconds
}

function winAnimation(){ //pop up animation for when you win
    winGif.style.visibility = "visible";
    victoryAudio.play();//plays victory game sound effect
}