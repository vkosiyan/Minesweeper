/*----- constants -----*/
const grid = document.querySelector('.grid');
let width = 10; // this will be the width and height of the board
let tileNum = width * width; 
let bombName = 'bomb'; // class name for a bomb
let blankName = 'safe' // class name for a blank square
let bombText = '💣'; // what the innerText of a bomb square will say
let blankTile = ''; // what the innerText of a blank square will say
let boardDivs = [];
const boardTiles = []; 
const numOfBombs = 10; // number of bombs in the game
const numOfBlanks = tileNum - numOfBombs; //number of blank squares in the game
// we want access to the images
// and we want to know what beats whats
// so maybe a "beats property somewhere"


// Creating the grid for the game ==================================


function createBoard() {
    for(let i = 0; i < tileNum; i++) { //we will create as many tiles depending on the width of the board and multiply so that the board is a square

    let tile = document.createElement('div'); // this is to create the div element for each
    tile.setAttribute('id', i); //we are setting the id to tile number using the i as a counter
    grid.appendChild(tile) //we are appending the tiles to the grid parent
    boardDivs.push(tile);
    }

    const bombArray = Array(numOfBombs).fill(bombName); 
    const blankArray = Array(numOfBlanks).fill(blankName);
    

    const boardArray = []; //we are creating an array that has both bombs and safe in the array
    boardArray.push(...bombArray);
    boardArray.push(...blankArray);

  
    

    function shuffle(){ // we are randomizing the order of the bombs and blank areas
        const shuffled = boardArray.sort(() => Math.random() - 0.5);
        boardTiles.push(...shuffled);
    
    }
    shuffle();

    for (i = 0; i < boardTiles.length; i++){ // we are adding class names to each div with a number as an id so each square is labeled as either bomb or safe

        let gridBlocks = document.getElementById([i]);
        gridBlocks.className = boardTiles[i];

        
        //gridBlocks.innerText = boardTiles[i];
    }

    // add numbers to squares
    for (let i = 0; i < boardTiles.length; i++){
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
            boardDivs[i].id = bombTotal;
            if(bombTotal == 0){
            boardDivs[i].id = 'empty';
            }
        } else {
            boardDivs[i].id = 'bomb';
        }

    

    }
}// last bracket of createBoard
createBoard();
//====================================================================


// State variables ===============================================




// cached element references ========================================


// event listeners ================================================================


let firstClick; //cannot be a bomb, so will be a number or empty space

[...document.querySelectorAll('.bomb')].forEach(function(bombDiv) { // when you click one bomb, all other bombs appear
    bombDiv.addEventListener('click', function() {
        // firstBomb.innerText = '💣';
        // firstBomb.className = 'clickedbomb';  
        let bombClick = document.getElementsByClassName('bomb');
        console.log(bombClick)
        for (i = 0; i < bombClick.length; i++){
        bombClick[i].innerText = '💣'; 
        // bombClick[i].className = 'bombclicked';
          }

    });
     });


    //  boardDivs.forEach(function(clickedTile){
    //     clickedTile.addEventListener('click', function(){
    //         if(clickedTile.value === 'empty'){
    //             console.log(clickedTile)
    //         //   for(i = indexOf(clickedTile) - 1; i < indexOf(clickedTile) + 1; i++){ 
    //         //        console.log([i]);
    //         //   }
    //         }

    //     })
    // })

// let childrenDiv = document.querySelectorAll('div > div');

// console.log(...childrenDiv)


// console.log(...boardDivs)

// childrenDiv.forEach(tileDiv => {
//     tileDiv.addEventListener('click', function() {    
//      if (tileDiv.classList.contains('safe')){
//          let tileIndex = childrenDiv.index(tileDiv);
//          console.log(tileDiv)
        // for (let i = childrenDiv.indexOf(tileDiv) - 1; i < childrenDiv.indexOf(tileDiv) + 1; i++)
        // childrenDiv[i].innerText = childrenDiv[i].id;
        // if(childrenDiv[i] > 0 && !isLeftSide && childrenDiv[i - 1].classList.contains('safe')){
        //     childrenDiv[i -1].innerText = childrenDiv[i - 1].id;
        // }
    // for (let i = 0; i < childrenDiv.length; i++){
    //     const isLeftSide = i % width === 0; //defines which div numbers are on the left side of the grid
    //     const isRightSide = i % width === width - 1; //defines which div numbers are on the right side of the grid
    
    //         if (childrenDiv[i].classList.contains('safe')) {
    //             childrenDiv[i].innerText = boardDivs[i].id;
    //             if(childrenDiv[i] > 0 && !isLeftSide && childrenDiv[i - 1].classList.contains('safe')){
    //                 continue;
    //             }
    //         }
    
    //     }
//         }
//     // );
//     })
// // })


// childrenDiv.forEach(function(tileDiv, index){
//     tileDiv.addEventListener('click', function() {    
//         if (tileDiv.classList.contains('safe')){

//             console.log(tileDiv(index + 1))
//             console.log(index)
//             }
//      } )
//     }
// )

