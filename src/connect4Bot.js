import React, {Component} from 'react';
import * as constants from './constants.js';
import didWinn from './didWin';


//export default function playBot(board, color, cont, play) {
//    return play(cont, minimax(board, 5, -Infinity, Infinity, true)[1], color);
//}

function isValidLocation(board, col){
    return board[col][constants.ROWS-1] === '';
}

function isTerminalNode(board){
    return didWinn(board, constants.p1Color) || didWinn(board, constants.p2Color) || getValidLocations(board).length === 0;
}

function getValidLocations(board){
    let validLocations = [];

    for(let col = 0; col < constants.COLS; col++){
        if(isValidLocation(board, col)) validLocations.push(col);
    }

    return validLocations;
}

function getNextOpenRow(board, col){
    for(let row = 0; row < board[col].length; row++){
        if(board[col][row] === '') return row;
    }
}

function evaluateWindow(window, color){
    let score = 0;

    let oppColor = constants.p1Color;
    if(color === constants.p1Color){
        oppColor = constants.p2Color;
    }

    if (count(window, color) === 4){
        score += 100;
    }
	else if (count(window, color) === 3 && count(window, '') === 1){
        score += 5;
    }
	else if (count(window, color) === 2 && count(window, '') === 2){
        score += 2;
    }
    if (count(window, oppColor) === 3 && count(window, '') === 1){
        score -= 4;
    }

	return score;
}

function count(arr, char){
    return arr.filter(elem => elem === char).length;
}

function copyArray(arr){
    return arr.map(newarr => [...newarr]);
}

function scorePosition(board, color){
    let score = 0;
    let ROWS = constants.ROWS;
    let COLS = constants.COLS;

    for(let row = 0; row < ROWS; row++){
        for(let col = 0; col < COLS - 3; col++){
            let window = [];
            for(let count = 0; count < constants.CONNECT; count++){
                window.push(board[col+count][row]);
            }
            score += evaluateWindow(window, color);
        }
    }

     for(let row = 0; row < ROWS - 3; row++){
        for(let col = 0; col < COLS; col++){
            let window = [];
            for(let count = 0; count < constants.CONNECT; count++){
                window.push(board[col][row+count]);
            }
            score += evaluateWindow(window, color);
        }
    }

    for(let row = 0; row < ROWS - 3; row++){
        for(let col = 0; col < COLS - 3; col++){
            let window = [];
            for(let count = 0; count < constants.CONNECT; count++){
                window.push(board[col+count][row+count]);
            }
            score += evaluateWindow(window, color);
        }
    }

    for(let row = 0; row < ROWS - 3; row++){
        for(let col = 0; col < COLS - 3; col++){
            let window = [];
            for(let count = 0; count < constants.CONNECT; count++){
                window.push(board[col+3-count][row+count]);
            }
            score += evaluateWindow(window, color);
        }
    } 
    return score;
}



export function minimax(board, depth, alpha, beta, maximizingPlayer){
    let colorAI = constants.p2Color;
    let colorPerson = constants.p1Color;
    let validLocations = getValidLocations(board);
    let isTerminal = isTerminalNode(board);
    let value = 0;
    
	if (depth === 0 || isTerminal){
		if (isTerminal){
            if (didWinn(board, colorAI)){
                return ([null, 100000000000000])
            }
			else if( didWinn(board, colorPerson)){
                return ([null, -10000000000000])
            }
			else{
                return ([null, 0])
            }
            }
        else {
            return ([null, scorePosition(board, colorAI)]);
        }
    }
	if (maximizingPlayer){
        value = -10000000000000000000000;
        let column = Math.floor(Math.random() * validLocations.length);

        
        for (let col of validLocations){
            let row = getNextOpenRow(board, col);
            let tempBoard = copyArray(board);
			tempBoard[col][row] = colorAI;
            let newScore = minimax(tempBoard, depth-1, alpha, beta, false);
            
            if (newScore[1] > value){
				value = newScore[1];
                column = col;
            }

			alpha = Math.max(alpha, value)
			if (alpha >= beta){
                break;
            }
        }
        return [column, value];

    }

	else { // Minimizing player
		let value = 10000000000000000000000;
        let column = Math.floor(Math.random() * validLocations.length);

		for (let col of validLocations){
            let row = getNextOpenRow(board, col);
            let tempBoard = copyArray(board);
			tempBoard[col][row] = colorPerson;
            let newScore = minimax(tempBoard, depth-1, alpha, beta, true);

            if (newScore[1] < value){
				value = newScore[1];
                column = col;
            }
			beta = Math.min(beta, value)
			if (alpha >= beta){
                break;
            }
        }
        return [column, value];
    }
}




/* function pickBestMove(board, color){
    validLocations = getValidLocations(board);
    bestScore = -10000;
    bestCol = Math.floor(Math.random() * validLocations.length);
    for(let col in validLocations){
        row = getNextOpenRow(board, col);
        let tempBoard = copyArray(board);
        tempBoard[row][col] = color;
        score = scorePosition(tempBoard, color)
        if(score > bestScore){
            bestScore = score;
            bestCol = col;
        }
    }
} */






