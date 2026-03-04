import { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import SplashScreen from './components/SplashScreen';
import './styles/global.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Windows 98 boot time ~3-4 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <SplashScreen /> : <Desktop />;
}

export default App;
