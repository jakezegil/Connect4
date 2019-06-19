import React, {Component} from 'react';

export default class WinModal extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        const show = this.props.show;
        const player = this.props.player;
            return (
                <div className={show ? 'modal display-block' : 'modal display-none'}>
                    <section className='modal-main'>
                        <header>{player} wins!</header>
                        <button onClick={this.props.onclick}>Play again?</button>
                    </section>
                </div>
            );
        };
    }
