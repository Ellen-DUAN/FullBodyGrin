import React from 'react';
import './Video.css';

function Video() {
  return (
    <div>
        <video src='running.mp4' autoPlay loop muted/>
    </div>
  );
}

export default Video;