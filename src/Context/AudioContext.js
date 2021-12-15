import { createContext, useState } from "react";
import { helpHttp } from "../Helpers/helpHttp";
import useAudio from "../Hooks/useAudio";

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

    audio.addEventListener('ended', () => {
      nextSong();
      console.log('termino la cancion, ',SONGNAME)
      audio.removeEventListener('ended', () => console.log('eliminando el ended'));
    });
  };

  const nextSong = () => {
    let { URLPORTADA, SONGNAME, URL_AUDIO } = songs[pointer];
    playSong(URLPORTADA, SONGNAME, URL_AUDIO);

    if (pointer < 9) setPointer(pointer + 1);
    else setPointer(0);
  };


  const handleplay = () => {
    setPlaying(!playing);
    playing ? audio.pause() : audio.play();
  };

  const handleVolumne = (e) => {
    setVolumen(e.target.value);
    audio.volume = parseInt(e.target.value) / 100;
  };

  const data = {
    playing,
    handleplay,
    handleVolumne,
    dataSong,
    songs,
    getSongs,
    nextSong,
    playSong,
    volumen,
  };

  return <AudioContext.Provider value={data}>{children}</AudioContext.Provider>;
};

export { DataAudioProvider };
export default AudioContext;
