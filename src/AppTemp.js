import React, {Component} from 'react';
import * as d3 from 'd3';
import * as d3_transition from 'd3-transition';
import didWin from './didWin.js';
import * as constants from './constants.js';

import './App.css';
import WinModal from './modal';

let board = {};
let newBoard = [];

class AppTemp extends React.Component {
  constructor() {
    super();
    
    this.state = {
      container: {},
      turn: {},
      player1: {color: constants.p1Color,
                name: "Player 1"},
      player2: {color: constants.p2Color,
                name: "Player 2"},
      somebodyWon: false,
      who: "nobody",
      start: true,

    }


    this.createGrid = this.createGrid.bind(this);
    this.createCircle = this.createCircle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.restart = this.restart.bind(this);
    this.play = this.play.bind(this);
    this.returnX = this.returnX.bind(this);
    this.returnY = this.returnY.bind(this);
  }

  componentDidMount(){
    this.createGrid();
  }

  //initializes
  createGrid(color = 'blue'){
    this.container = d3.select("div#container").append("svg")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 420 420")
                    .classed("svg-content", true)
                    .attr("fill", "blue");
  
    this.setState({turn: this.state.player1})

    board = {}; //sets up empty board as full array
    for(let i = 0; i < constants.COLS; i++) {
      board[i] = constants.ROWS;
    }

    newBoard = []; //sets up board to be filled as empty array
    for(let i = 0; i < constants.COLS; i++) {
      let rows = [];
      for(let x = 0; x < constants.ROWS; x++) {
        rows.push('');
      }
      newBoard.push(rows);
    }    
    
    //visualize board
    for(let x = 0; x < constants.COLS; x++) {
      for(let y = 0; y < constants.ROWS; y++) {
          this.createCircle(this.container, x, y, color);
      }
    }
  }

  //if the click selection is appropriate and the column isn't full, drops a new chip and changes players
  play(cont, x, color){
    if(x){
      let count = board[x]-1;
        if(count >= 0){
          newBoard[x].splice(constants.ROWS-board[x], 1, color);
          board[x]-=1;
          cont.append("svg")
                .append("circle")
                .attr("cx", x*60 + 30)
                .attr("cy", 0)
                .attr("r", 25)
                .attr("id", x+','+count)
                .attr("fill", color)
                .transition()
                .attr("cy", count*60 + 80)

          this.setState({somebodyWon: didWin(newBoard)});
          
          let who = this.state.who;
          
          if(didWin(newBoard)){
            if(who == 'nobody'){
              this.setState({who: this.state.turn.name});
              console.log(this.state.turn);
            }
            return null;//return this.winner();
          }
          
          this.setState({turn: this.state.turn == this.state.player1 ?
                                   this.state.player2 : this.state.player1});
        }
    }
  }


  //used to set up board 
  createCircle(cont, x, y, color){
    cont.append("svg")
            .append("circle")
            .attr("cx", x*60 + 30)
            .attr("cy", y*60 + 80)
            .attr("r", 25)
            .attr("id", x+','+y)
            .attr("fill", color)
  }

  restart(e){
    e.preventDefault();

    [...document.getElementById("container").children].forEach(elem => elem.remove());

    this.createGrid();
    
    this.setState({
      somebodyWon: false,
      who: "nobody",});
    }

  handleClick(e) {

    e.stopPropagation();
    e.preventDefault();
    let target = e.target;
    let id = target.id;
    this.play(this.container, this.returnX(id), this.state.turn.color);

  }

  returnX(str){
    return str.split(',')[0];
  }  
  
  returnY(str){
    return str.split(',')[1];
  }

  render() {
    return (
        <div className="App">
          <WinModal show={this.state.somebodyWon} player={this.state.turn.name} onclick={this.restart}/>
          <button value= "check it out!" onClick={this.restart}>Quit</button>
          
          <div className="App__Aside">
            <div className="App-header">Connect 4!</div>
            <div className="App-header">{this.state.turn.name +"'s turn  "}</div>
          </div>
          <div id="container" class="svg-container" color={this.state.turn.color} onClick={this.handleClick}></div>
        </div>
      )
  }
}

export default AppTemp;