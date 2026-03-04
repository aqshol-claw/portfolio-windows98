import { useState, useEffect } from 'react';
import './SplashScreen.css';

const MESSAGES = [
  'Detecting hardware...',
  'Loading Windows 98...',
  'Starting desktop...',
];

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    // Typing effect for messages
    const typingInterval = setInterval(() => {
      if (messageIndex < MESSAGES.length) {
        const targetText = MESSAGES[messageIndex];
        if (currentText.length < targetText.length) {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        } else {
          // Move to next message after a delay
          setTimeout(() => {
            setMessageIndex(prev => prev + 1);
            setCurrentText('');
          }, 300);
        }
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [messageIndex, currentText]);

  useEffect(() => {
    // Progress bar fills up
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="splash-screen">
      <div className="splash-window">
        <div className="splash-logo">
          <div className="splash-logo-icon">
            <img 
              src="https://win98icons.alexmeub.com/icons/png/windows-0.png" 
              alt="Windows 98" 
            />
          </div>
          <div className="splash-logo-text">
            <span className="splash-microsoft">Microsoft</span>
            <span className="splash-windows">Windows&#174; 98</span>
          </div>
        </div>
        
        <div className="splash-progress-container">
          <div 
            className="splash-progress-bar" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        <div className="splash-message">
          {messageIndex < MESSAGES.length ? (
            <>
              <span className="splash-cursor">&#9612;</span>
              {currentText}
            </>
          ) : (
            <span className="splash-ready">Starting Windows...</span>
          )}
        </div>
      </div>
      
      <div className="splash-footer">
        <span>Copyright&#169; Microsoft Corporation</span>
      </div>
    </div>
  );
};

export default SplashScreen;
