import { createContext} from "react";
import useAudio from "../Hooks/useAudio";

const AudContext = createContext();

const dataSongActual ={
  ImgPortada : "",
  NameSong: ""
}

const DataAudProvider = ({ children }) => {
  const  [playing,setPlaying,audio] = useAudio()

  const data = {playing,setPlaying,audio,dataSongActual}

  return <AudContext.Provider value={data}>{children}</AudContext.Provider>;
};

export { DataAudProvider };
export default AudContext;