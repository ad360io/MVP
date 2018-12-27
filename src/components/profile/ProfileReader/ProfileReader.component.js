import React, { Component } from 'react';

import './ProfileReader.component.css';

class ProfileReader extends Component {
    render() {
        return <div className='profile-reader-container'>
            Profile Reader works! {this.props.match.params.userId}
        </div>
    }
}

export default ProfileReader;