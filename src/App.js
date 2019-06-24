import React, {Component} from 'react';
import * as d3 from 'd3';
import * as d3_transition from 'd3-transition';
import didWinn from './didWin.js';
import * as constants from './constants.js';
import './App.css';
import * as modal from './modal';
import * as connect4Bot from './connect4Bot.js';

let board = {};
let newBoard = [];

class App extends React.Component {
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
      robot: false,

    }


    this.createGrid = this.createGrid.bind(this);
    this.createCircle = this.createCircle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.start = this.start.bind(this);
    this.restart = this.restart.bind(this);
    this.play = this.play.bind(this);
    this.returnX = this.returnX.bind(this);
    this.returnY = this.returnY.bind(this);
  }

  componentDidMount(){
    this.createGrid();
  }

  //initializes
  createGrid(color = constants.boardColor){
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
    if(x || x===0){
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

          this.setState({somebodyWon: didWinn(newBoard, this.state.turn.color)});
          
          let who = this.state.who;
          
          if(didWinn(newBoard, this.state.turn.color)){
            if(who == 'nobody'){
              this.setState({who: this.state.turn.name});
            }
            return null;
          } //describes a win

          if(!Object.values(board).join('').match(/[1-9]/g)){
            this.setState({somebodyWon: true,
            turn: {...this.state.turn,
                  name: "nobody"}
                });
            return null; //describes a draw
          }
          
          this.setState({turn: this.state.turn == this.state.player1 ?
                                   this.state.player2 : this.state.player1});
            //this.play(cont, tryMe[0], constants.p2Color);
          
        }
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.robot){
      if(prevState.turn != this.state.turn && this.state.turn == this.state.player2){
        if(this.state.turn == this.state.player2){
          setTimeout(() => {
            let column = connect4Bot.minimax(newBoard, 5, -Infinity, Infinity, true);
            console.log(column);
            this.play(this.container, column[0], constants.p2Color);
          }, 500)
        }
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

  start(p1, p2, robot){
    this.setState({
      player1: {
        ...this.state.player1,
        name: p1
      },
      player2: {
        ...this.state.player2,
        name: p2
      },
      start: false,
      robot: robot,
    }, () =>
    this.setState({
      turn: this.state.player1
    }))
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

    if(this.state.turn == this.state.player2 && this.state.robot){
      return null;
    }

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
          <header className = "Cool_Header">Connect 4: Stack 'Em Up</header>
          <modal.WinModal show={this.state.somebodyWon} player={this.state.turn.name} onclick={this.restart}/>
          <modal.StartModal show={this.state.start} player={this.state.turn.name} onclick={this.start}/>
          <button className="Fun_Button" onClick={this.restart}>Restart</button>
          
          <div className="App__Aside">
            <div className="App-header">{this.state.turn.name +"'s turn  "}</div>
          </div>
          <div id="container" className="svg-container" color={this.state.turn.color} onClick={this.handleClick}></div>
        </div>
      )
  }
}

export default App;