// src/App.js
import React, { useEffect, useState } from 'react';
import Quiz from './components/Quiz';
import questions from './questions.json';
import GitHubIcon from '@mui/icons-material/GitHub';
import './components/Quiz.css'

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const requestFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement != null);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  if (!isFullScreen) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div className='up' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

          <h1 style={{ textAlign: 'center' }}>Please enable full-screen mode to start the quiz</h1>
          <button className='btn' onClick={requestFullScreen}>Enable Full-Screen</button>

        </div>
        <div className='down' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '4rem' }}>

          <h3 style={{ color: 'blueviolet' }}>See my other projects on Github: </h3>
          <a href="https://github.com/AbhaySingh502"> <GitHubIcon color='primary' fontSize='large' /> </a>

        </div>
      </div>


    );
  }

  return <Quiz questions={questions} />;
};

export default App;
