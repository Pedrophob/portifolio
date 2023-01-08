const cellElements = document.querySelectorAll("[data__cell]");
const board = document.querySelector("[data__board]");
const winningMessageTextElement = document.querySelector('[data__winning__text]');
const winningMessage = document.querySelector('[data__winning__message]')
const buttonReset = document.querySelector('[button__reset]')

let isCircleTurn;

const winninCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const  startGame = () =>{

    isCircleTurn = false;

    for (const cell of cellElements){
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener("click" , handleClick);
        cell.addEventListener("click" , handleClick, {once:true});
    }

    setBoardHoverClass();
    winningMessage.classList.remove('show-winning-message')
};

const endGame = (isDraw) => {
    if (isDraw){
        winningMessageTextElement.innerText = 'Empate!';
    }else{
        winningMessageTextElement.innerText = isCircleTurn 
        ? "O venceu" 
        : "X Venceu";
    }

    winningMessage.classList.add("show-winning-message");
};



const checkForWin = (currentPlayer) =>{
    return winninCombinations.some((combination) => {
        return combination.every((index)=>{
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell =>{
     return cell.classList.contains('x') || cell.classList.contains('circle');
    });
};

const placeMark = (cell,classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x')

    if(isCircleTurn){
        board.classList.add('circle');
    }else{
        board.classList.add('x');
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
};

const handleClick = (e) =>{
    //colocar a marca ( x de circulo)

    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell,classToAdd);

    //verificar por vitoria
    const isWin = checkForWin(classToAdd);

    //verificar por empate

    const isDraw = checkForDraw();

    if (isWin){
        endGame(false);
    }else if (isDraw) {
        endGame(true);
    }else{
        //mudar o simbolo
        swapTurns();
    }

};

startGame();

buttonReset.addEventListener('click' ,startGame)