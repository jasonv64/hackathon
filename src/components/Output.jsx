import React, { Component } from 'react';
import axios from 'axios';

class OutPut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musixmatchApi: '970de3da8c16f2857d9e3e2b61ce8fe3',
            SeatGeekApi: 'MTIyMTg1Njl8MTUzMTI1NTM4Ni40Mw',
            index: 0,
            trackInfo: null,
            trackId: '',
            trackName: '',
            artistName: '',
            lyricsOutPut: '',
            concertsInfo: '',
            upcomingEvent: '',
            url: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get('https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=' + this.props.searchItem[0].lyrics + '&apikey=' + this.state.musixmatchApi)
            .then((Response) => {
                this.setState({
                    trackInfo: Response.data.message.body.track_list
                });

                this.setState({
                    artistName: this.state.trackInfo[this.state.index].track.artist_name,
                    trackName: this.state.trackInfo[this.state.index].track.track_name
                });
                this.setState({ trackId: this.state.trackInfo[this.state.index].track.track_id })
                axios.get('https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + this.state.trackId + '&apikey=' + this.state.musixmatchApi)
                    .then((lyrics) => {
                        this.setState({ lyricsOutPut: lyrics.data.message.body.lyrics.lyrics_body });

                        axios.get('https://api.seatgeek.com/2/performers?q=' + this.state.artistName + '&client_id=' + this.state.SeatGeekApi)
                            .then((tickets) => {
                                this.setState({
                                    concertsInfo: tickets.data.performers[0],
                                    upcomingEvent: tickets.data.performers[0].has_upcoming_events,
                                    url: tickets.data.performers[0].url
                                })
                            })
                    })
            })
    }

    handleClick(event) {
        event.preventDefault();
        this.state.index++;
        this.setState({
            artistName: this.state.trackInfo[this.state.index].track.artist_name,
            trackName: this.state.trackInfo[this.state.index].track.track_name,
            trackId: this.state.trackInfo[this.state.index].track.track_id
        })
        this.componentDidMount();
    }

    render() {
        let button;
        let nextButton = <button className="next-button button1 btn" onClick={this.handleClick}>Next</button>;

        if (this.state.upcomingEvent === false) {
            button = <div></div>
        } else {
            button = <a href={this.state.url} className="button button3 btn">Tickets!</a>
        }
        return (
            <div className="container col-md-6">
                <div className="artist-display">
                    {this.state.artistName}
                </div>
                <div className="track-display">
                    {this.state.trackName}
                </div>
                <div className="lyrics-display">
                    {this.state.lyricsOutPut}
                </div>
                <div className="next">
                    {nextButton}
                </div>
                <div className="ticket-button btn">
                    {button}
                </div>
            </div>
        )
    }
}

export default OutPut;