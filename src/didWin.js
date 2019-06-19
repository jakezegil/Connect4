import React from 'react';
import * as constants from './constants.js';

export default function didWin(board){

    for(let count = 0, x = 0; x < board.length; x++) { //checks columns
      for(let y = 0; y < board[x].length; y++) {
        y && board[x][y] ? //restart at the bottom
          board[x][y-1] == board[x][y] ? //colors match from this to previous?
            count++: count = 0
          : count = 0;

        if(count >= constants.CONNECT-1) return true;
      }
    }    
    for(let count = 0, x = 0, y = 0; y < board[x].length; y++) { //checks rows
      for(; x < board.length; x++) {
        x && board[x][y] ? //restart at the left side
          board[x-1][y] == board[x][y] ? //colors match from this to previous?
            count++: count = 0
          : count = 0;

        if(count >= constants.CONNECT-1) return true;
      }
      x = 0;
    }

    for(let count = 0, x = 0, y=board[0].length-1; x < board.length || y > 0; y--) { //checks diagonal up/right
      while(x && y){
        x--;
        y--;
      }
      for(; x < board.length && y < board[x].length; x++, y++) {
        x && y && board[x][y] ? 
          board[x-1][y-1] == board[x][y] ? //colors match from this to previous?
            count++: count = 0
          : count = 0;
        if(count >= constants.CONNECT-1) return true;
      }
    }

    for(let count = 0, x = board.length-1, y = board[x].length-1; x > 0 || y > 0; x--) { //checks diagonal down/left
      while(x && y < board[x].length-1){
        x--;
        y++;
      }
      for(; x < board.length && y >= 0; x++, y--) {
        x && y < board[x].length-1 && board[x][y] ? 
          board[x-1][y+1] == board[x][y] ? //colors match from thisx && y < board to previous?
            count++: count = 0
          : count = 0;
        if(count >= constants.CONNECT-1) return true;
      }
    }
    return false;

  }