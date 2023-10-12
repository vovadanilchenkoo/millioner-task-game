import './App.css';
import { useSelector } from 'react-redux';
import { Store } from './model/interfaces';
import Game from './components/screens/Game/Game';
import GameOver from './components/screens/GameOver/GameOver';
import GameStart from './components/screens/GameStart/GameStart';

function App() {
  const currentScreen = useSelector((state: Store) => state.game.currentScreen);

  return (
    <main className='container'>
      {currentScreen === 'start' ? <GameStart /> :
        currentScreen === 'game' ? <Game /> :
          currentScreen === 'over' ? <GameOver /> : <GameStart />
      }
    </main>
  );
}

export default App;
