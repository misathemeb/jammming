
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '..PlayList';


class App extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    SearchResults: [],
    playlistName: 'My playlist',
    playlistTracks: []
  };

this.addTracks = this.addTracks.bind(this);
this.removeTrack = this.removeTrack.bind(this);
this.updatePlaylistName = this.updatePlaylistName.bind(this);
this.savePlaylist = this.savePlaylist.bind(this);
this.search = this.search.bind(this);
}

  render() {
      return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
          <SearchBar />

            <div className="App-playlist">
                <SearchResults />
                <PlayList />
            </div>
        </div>
    </div>
    )
}
}

export default App;
