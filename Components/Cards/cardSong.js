import React,{useContext} from 'react';
import AudContext from '../../Context/AudContext';
import styles from '../../styles/Components/cards.module.css'

const CardSong = (props) =>{
    const {setPlaying,audio} = useContext(AudContext);

    const playSong = () =>{
        
        audio.src = props.URL_AUDIO
        setPlaying(true)
        audio.play()
    }

    return(
        <div className={styles.cardSong} onClick={playSong}>
            <img className={styles.cardSong_img} src={props.URLPORTADA} />
            <div className={styles.cardSong_InfoSong}>
            <p className={styles.cardSong_P}>{props.SONGNAME}</p>
            <p className={styles.cardSong_P}>
                <strong>Upload by:</strong>
                &nbsp;
                {props.USERNAME}
            </p>
            </div>
            <span className={styles.cardSong_Span}>{props.GENDER}</span>
        </div>
    )
}

export default CardSong