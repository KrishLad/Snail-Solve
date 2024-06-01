import Timer from './components/Timer';
import './App.css'
const App = () => {
  return (
    <>
      <div className="timer">
        <Timer initalTime={30} />
      </div>
    </>
  );
}

export default App