import React, {Component} from 'react';
import * as d3 from 'd3';
import * as d3_transition from 'd3-transition';

import './App.css';

const galleryMachine = {
  start: {
    PLAYGAME: 'Player1Turn'
  },
  player1Turn: {
    PLAY: 'player2Turn',
    WIN: 'gameOver',
    QUIT: 'start'
  },
  player2Turn: {
    PLAY: 'player1Turn',
    WIN: 'gameOver',
    QUIT: 'start'  
  },
  gameOver: {
    PLAYAGAIN: 'start',
  }
};

const ROWS = 6;
const COLS = 7;
let board = {};
let newBoard = [];


class AppTemp extends React.Component {
  constructor() {
    super();
    
    this.state = {
      container: {},
      player1Color: "red",
    }


    this.createGrid = this.createGrid.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.createGrid();
  }

  createGrid(color = 'blue'){
    this.container = d3.select("div#container").append("svg")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 420 420")
                    .classed("svg-content", true)
                    .attr("fill", "blue");
    
    board = {};
    for(let i = 0; i < COLS; i++) {
      board[i] = ROWS;
    }

    newBoard = [];
    for(let i = 0; i < 7; i++) {
      newBoard.push([i]);
    }    
    
    for(let x = 0; x < COLS; x++) {
        for(let y = 0; y < ROWS; y++) {
            this.createCircle(this.container, x, y, color);
        }
        
    }
    var svg = d3.select("div#container")
  }

  editColumn(cont, x, color){
    if(x){
      console.log('working')
      let count = board[x]-1;
        if(count >= 0){
          newBoard[x].push(count);
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
        }  
    }
  }

  createCircle(cont, x, y, color){
    cont.append("svg")
            .append("circle")
            .attr("cx", x*60 + 30)
            .attr("cy", y*60 + 80)
            .attr("r", 25)
            .attr("id", x+','+y)
            .attr("fill", color)
  }

  handleClick(e) {
    e.preventDefault();

    let target = e.target;
    let id = target.id;
    this.editColumn(this.container, this.returnX(id), "green");
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
          <div className="App__Aside">
            <div className="App-header">Connect 4!</div>
          </div>
          <div className="Player section"></div>
          <div id="container" class="svg-container" color = {this.player1Color} >{onclick=this.handleClick}</div>
         
        
        </div>
      )
  }


  
  /* command(nextState, action) {
    switch (nextState) {
      case 'loading':
        // execute the search command
        this.search(action.query);
        break;
      case 'gallery':
        if (action.items) {
          // update the state with the found items
          return { items: action.items };
        }
        break;
      case 'photo':
        if (action.item) {
          // update the state with the selected photo item
          return { photo: action.item };
        }
        break;
      default:
        break;
    }
  }
  
  transition(action) {
    const currentGalleryState = this.state.gallery;
    const nextGalleryState =
      galleryMachine[currentGalleryState][action.type];
    
    if (nextGalleryState) {
      const nextState = this.command(nextGalleryState, action);
      
      this.setState({
        gallery: nextGalleryState,
        ...nextState
      });
    }
  }
  
  handleSubmit(e) {
    e.persist();
    e.preventDefault();
    
    this.transition({ type: 'SEARCH', query: this.state.query });
  }
  

  handleChangeQuery(value) {
    this.setState({ query: value })
  }
  
  renderForm(state) {
    const searchText = {
      loading: 'Searching...',
      error: 'Try search again',
      start: 'Search'
    }[state] || 'Search';
    
    return (
      <form className="ui-form" onSubmit={e => this.handleSubmit(e)}>
        <input
          type="search"
          className="ui-input"
          value={this.state.query}
          onChange={e => this.handleChangeQuery(e.target.value)}
          placeholder="Search Flickr for photos..."
          disabled={state === 'loading'}
        />
        <div className="ui-buttons">
          <button
            className="ui-button"
            disabled={state === 'loading'}>
              {searchText}
          </button>
          {state === 'loading' &&
            <button
              className="ui-button"
              type="button"
              onClick={() => this.transition({ type: 'CANCEL_SEARCH' })}>
              Cancel
            </button>
          }
        </div>
      </form>
    );
  }
  renderGallery(state) {
    return (
      <section className="ui-items" data-state={state}>
        {state === 'error'
          ? <span className="ui-error">Uh oh, search failed.</span>
          : this.state.items.map((item, i) =>
            <img
              src={item.media.m}
              className="ui-item"
              style={{'--i': i}}
              key={item.link}
              onClick={() => this.transition({
                type: 'SELECT_PHOTO', item
              })}
            />
          )
        }
      </section>
    );
  }
  renderPhoto(state) {
    if (state !== 'photo') return;
    
    return (
      <section
        className="ui-photo-detail"
        onClick={() => this.transition({ type: 'EXIT_PHOTO' })}>
        <img src={this.state.photo.media.m} className="ui-photo"/>
      </section>
    )
  } 
  const galleryState = this.state.gallery;
    
    return (
      <div className="ui-app" data-state={galleryState}>
        {this.renderForm(galleryState)}
        {this.renderGallery(galleryState)}
        {this.renderPhoto(galleryState)}
      </div>
    ); 
  } */
}

export default AppTemp;