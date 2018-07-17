import React, { Component } from 'react';

class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lyrics: '',
        }
        this.handleNewClick = this.handleNewClick.bind(this);
        this.handleLyrics = this.handleLyrics.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    handleLyrics(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleClick(event) {
        event.preventDefault();
        this.props.addSearch(this.state);
    }

    handleNewClick() {
        this.props.deleteItem(this.props.searchResult);
    }

    render() {
        let button;

        if (this.props.searchItem.length == 0) {
            button = <button className="button-search btn" name="submit" onClick={this.handleClick}>Search</button>
        } else {
            button = <button className="button-search btn" onClick={this.handleNewClick} >New Search</button>
        }
        if (this.props.searchItem.length === 0) {
            return (
                <div className='input-area'>
                    <div className="row one" >
                        <div className="col-md-4">
                            <label className="lyrics-textarea">Lyrics: </label>
                            <div className="lyrics-div">
                                <textarea className="user-lyrics" type="text" placeholder="type lyrics here..." name="lyrics"
                                    value={this.state.lyrics} onChange={this.handleLyrics} />
                            </div>
                        </div>
                    </div>
                    <div className="btn row two">
                        {button}
                    </div>
                </div>
            )
        } else {
            return (
                <div className='input-area'>
                    <div className='padding'>
                    </div>
                    {button}
                </div>
            )
        }
    }
}
export default UserInput;