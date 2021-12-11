import { createContext,useState} from "react";
import useAudio from "../Hooks/useAudio";

const AudioContext = createContext();

const dataSongActual ={
  ImgPortada : "",
  NameSong: ""
}

const DataAudioProvider = ({ children }) => {
  const  [playing,setPlaying,audio] = useAudio()
  const [dataSong, setDataSong] = useState(dataSongActual);

  const data = {playing,setPlaying,audio,setDataSong, dataSong}

  return <AudioContext.Provider value={data}>{children}</AudioContext.Provider>;
};

export { DataAudioProvider };
export default AudioContext;