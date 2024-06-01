import Timer from './components/Timer';
import Game from './components/Game';
import './App.css'
const App = () => {
  return (
    <>
      <div className = "timer-box">
        <div className="timer">
          <Timer initalTime={30} />
        </div>
      </div>

      <div className="game">
        <Game />
      </div>
    </>
  );
}

export default App