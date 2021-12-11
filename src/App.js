import { DataAudioProvider } from './Context/AudioContext';
import { DataAuthProvider } from './Context/AuthContext';
import MainRouter from './Router/MainRouter';
import './Scss/main.scss'

function App() {
  return (
    <div className="App">
      <DataAuthProvider>
        <DataAudioProvider>
          <MainRouter />
        </DataAudioProvider>
      </DataAuthProvider>
    </div>
  );
}

export default App;
