import {useContext,useState} from 'react';
import AudioContext from '../../Context/AudioContext'

const Reproductor = () =>{
    const [volumen, setVolumen] = useState(100);
    const {playing,setPlaying,audio, dataSong} = useContext(AudioContext);

    const playSong = () =>{
        setPlaying(!playing)
        playing ? audio.pause() : audio.play()
    }

    const handleChange = (e) =>{
        setVolumen(e.target.value);
        audio.volume = parseInt(e.target.value)/100;
    }
    
    return (
        <div className="Reproductor">
            <div className="Reproductor_Portada">
                <img className="Reproductor_ImgPortada" src={dataSong.ImgPortada} alt={dataSong.NameSong} />
                <p className="Reproductor_letter">{dataSong.NameSong}</p>
            </div>
            <div className="Reproductor_Controles">
                <div className="Reproductor_Botones">
                    <i className="fas fa-backward icon"></i>
                    <i className={`fas ${playing ? "fa-pause-circle icon" : "fa-play-circle icon"} fa-2x`}
                    onClick={playSong}
                    ></i>
                    <i className="fas fa-forward icon"></i>
                </div>
                <div className="Reproductor_progressBarPlayback"></div>
            </div>
            <div className="Reproductor_Volumen">
                <i className="fas fa-volume-up icon"></i>
                <input 
                className="Reproductor_Input" 
                type="range" min="0" max="100" value={volumen} 
                onChange={handleChange} ></input>
            </div>
        </div>
    )
}

export default Reproductor