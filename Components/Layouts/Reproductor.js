import React,{useContext,useEffect,useState} from 'react';
import style from '../../styles/Components/layouts.module.css'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { faStepForward } from '@fortawesome/free-solid-svg-icons'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AudContext from '../../Context/AudContext'

const Reproductor = () =>{
    const [volumen, setVolumen] = useState(100);
    const {playing,setPlaying,audio, dataSong} = useContext(AudContext);

    const playSong = () =>{
        setPlaying(!playing)
        playing ? audio.pause() : audio.play()
    }

    const handleChange = (e) =>{
        setVolumen(e.target.value);
        audio.volume = parseInt(e.target.value)/100;
    }
    
    return (
        <div className={style.Reproductor}>
            <div className={style.Reproductor_Portada}>
                <img className={style.Portada} src={dataSong.ImgPortada}/>
                <p className={style.letter}>{dataSong.NameSong}</p>
            </div>
            <div className={style.Reproductor_Controles}>
                <div className={style.Reproductor_Botones}>
                    <FontAwesomeIcon className={style.icon} icon={faStepBackward}/>
                    <FontAwesomeIcon className={style.icon} 
                    icon={ playing ? faPauseCircle : faPlayCircle} 
                    size="2x" onClick={playSong}
                    />
                    <FontAwesomeIcon className={style.icon} icon={faStepForward}/>
                </div>
                <div className={style.progressBarPlayback}></div>
            </div>
            <div className={style.Reproductor_Volumen}>
                <FontAwesomeIcon className={style.icon} icon={faVolumeUp}/>
                <input 
                className={style.Reproductor_Input} 
                type="range" min="0" max="100" value={volumen} 
                onChange={handleChange} ></input>
            </div>
        </div>
    )
}

export default Reproductor