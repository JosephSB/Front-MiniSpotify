import React,{useContext,useEffect,useState} from 'react';
import style from '../../styles/Reproductor.module.css'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { faStepForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AudContext from '../../Context/AudContext'

const Reproductor = () =>{
    const {playing,setPlaying,audio} = useContext(AudContext);

    const playSong = () =>{
        setPlaying(!playing)
        playing ? audio.pause() : audio.play()
    }


    return (
        <div className={style.Reproductor}>
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
                {}
            </div>
        </div>
    )
}

export default Reproductor