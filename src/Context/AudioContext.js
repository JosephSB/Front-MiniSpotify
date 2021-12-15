import { createContext, useState } from "react";
import { helpHttp } from "../Helpers/helpHttp";
import useAudio from "../Hooks/useAudio";
import useEventListener from "../Hooks/useEventListener";

const AudioContext = createContext();

const dataSongActual = {
  ImgPortada: "",
  NameSong: "",
};

const DataAudioProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [pointer, setPointer] = useState(0);
  const [volumen, setVolumen] = useState(100);
  //const [playlists, setPlaylists] = useState();
  const [playing, setPlaying, audio] = useAudio();
  const [dataSong, setDataSong] = useState(dataSongActual);

  const getSongs = async (page) => {
    helpHttp()
      .get(process.env.REACT_APP_API_KEY_URL + "music/getSongs/page=" + page)
      .then((data) => {
        setSongs(data.data);
        return true;
      });
  };

  const playSong = (URLPORTADA, SONGNAME, URL_AUDIO) => {
    audio.pause();
    setDataSong({
      ImgPortada: URLPORTADA,
      NameSong: SONGNAME,
    });
    audio.src = URL_AUDIO;
    setPlaying(true);
    audio.play();
  };

  const prevSong = () => {
    let x = pointer - 1;
    if (x <= 9 && x >= 0) {
      setPointer(x);
      let { URLPORTADA, SONGNAME, URL_AUDIO } = songs[x];
      playSong(URLPORTADA, SONGNAME, URL_AUDIO);
    }
    else setPointer(0);
  };

  const nextSong = () => {
    let x = pointer + 1;
    if (x < 9) {
      setPointer(x);
      let { URLPORTADA, SONGNAME, URL_AUDIO } = songs[x];
      playSong(URLPORTADA, SONGNAME, URL_AUDIO);
    }
    else setPointer(0);

  };

  const handleplay = async() => {
    setPlaying(!playing);
    playing ? audio.pause() : audio.play();
  };

  const handleVolumne = (e) => {
    setVolumen(e.target.value);
    audio.volume = parseInt(e.target.value) / 100;
  };

  useEventListener("ended", nextSong,audio);

  const data = {
    playing,
    handleplay,
    handleVolumne,
    dataSong,
    songs,
    getSongs,
    nextSong,
    prevSong,
    playSong,
    volumen,
  };

  return <AudioContext.Provider value={data}>{children}</AudioContext.Provider>;
};

export { DataAudioProvider };
export default AudioContext;
