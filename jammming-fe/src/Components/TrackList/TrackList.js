
import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  
    render() {
        const showTracks = typeof this.props.tracks != 'undefined' && this.props.tracks.length > 0;
        console.log(this.props);

        return ( 
            <div className="TrackList">
                { /* You will add a map method that renders a set of Track components */ }      
            {showTracks && this.props.tracks.map(track => 
            <Track key={track.id} track={track} removeTrack={this.props.removeTrack} onAdd={this.props.onAdd} isRemoval={true} onRemove={this.props.onRemove} />)}

            {!showTracks && 'no tracks match your search'}    
            </div>
    )
  }
}

export default TrackList;