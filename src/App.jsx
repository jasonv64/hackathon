import React, { Component } from 'react';
import UserInput from './components/Userinput';
import OutPutFormat from './components/Outputformat';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchItem: [],
        }
        this.addSearch = this.addSearch.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    addSearch(searchItem) {
        let searchItemCopy = [...this.state.searchItem];
        searchItemCopy.push({
            lyrics: searchItem.lyrics,
            artist: searchItem.artist,
            album: searchItem.album,
        });
        this.setState({
            searchItem: searchItemCopy,
        })
    }

    deleteItem(searchItem) {
        let searchItemCopy = [...this.state.searchItem];
        searchItemCopy.splice(0, 1);
        this.setState({
            searchItem: searchItemCopy,
        });
    }

    render() {
        return (
            <div className="container">
                <UserInput
                    addSearch={this.addSearch}
                    deleteItem={this.deleteItem}
                    searchItem={this.state.searchItem}
                />
                <OutPutFormat
                    searchItem={this.state.searchItem}
                />
            </div>
        )
    }
}
export default App;