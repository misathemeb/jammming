
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{
        'id': 1,
        'name': 'wonderwall',
        'artist': 'oasis',
        'album': 'what\'s the story morning glory'
      }, 
      {
        'id': 2,
        'name': 'patience',
        'artist': 'mannequin pussy',
        'album': 'romantic'
      },
      {
        'id': 3,
        'name': 'smells like teen spirit',
        'artist': 'nirvana',
        'album': 'nirvana'
      }],

      playlistName: 'My playlist',

      playlistTracks: [{
        'id': 4,
        'name': 'wonder-wall',
        'artist': 'oasis',
        'album': 'what\'s the story morning glory'
      }, 
      {
        'id': 5,
        'name': 'patience',
        'artist': 'mannequin pu$$y',
        'album': 'romantic'
      },
      {
        'id': 6,
        'name': 'smells like TWEEN spirit',
        'artist': 'nirvana',
        'album': 'nirvana'

      }]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
}

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.setState({playlistTracks: tracks})
    };
  }


  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })

  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.URI)

  }  

  search(term){
    this.setState({
      searchTerm: term
    })
    console.log(term);
  }

  render() {
      return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search}/>

            <div className="App-playlist">

                <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />

                <Playlist 
                  playlistName={this.state.playlistName} 
                  playlistTracks={this.state.playlistTracks} 
                  onRemove={this.removeTrack} 
                  onNameChange={this.updatePlaylistName}
                  onSave={this.savePlaylist} />
            </div>
        </div>
    </div>
    )
}
}

export default App;
