import React, {Component} from 'react';

export class WinModal extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        const show = this.props.show;
        const player = this.props.player;
            return (
                <div className={show ? 'modal display-block' : 'modal display-none'}>
                    <section className='modal-main'>
                        <header>{player != "nobody" ? player +" wins!" : "Draw"}</header>
                        <button onClick={this.props.onclick}>Play again?</button>
                    </section>
                </div>
            );
        };
    }

export class StartModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            player1: "Player 1",
            player2: "Player 2",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e){
        e.preventDefault();

        this.props.onclick(this.state.player1, this.state.player2);
    }
    
    render() {
        const show = this.props.show;

        return (
                <div className={show ? 'modal display-block' : 'modal display-none'}>
                    <form onSubmit={this.handleSubmit} className="FormFields">
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="player1">Player 1</label>
                            <input type="name" id="player1"  className="FormField__Input" placeholder="Player 1" name="player1" value={this.state.email} onChange={this.handleChange} />
                        </div>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="player2">Player 2</label>
                            <input type="name" id="player2"  className="FormField__Input" placeholder="Player 2" name="player2" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <div className="FormField">
                            <button id ="submit" className="FormField__Button">Sign Up</button>
                        </div>
                    </form>
                </div>
            );
        };
    }

