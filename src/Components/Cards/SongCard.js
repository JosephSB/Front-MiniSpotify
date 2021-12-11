import {useContext} from 'react';
import AudioContext from '../../Context/AudioContext';

const SongCard = ({SONGNAME,URLPORTADA,USERNAME,GENDER,URL_AUDIO}) =>{
    const {setPlaying,audio,setDataSong} = useContext(AudioContext);

    const playSong = () =>{
        setDataSong({ 
            ImgPortada: URLPORTADA, 
            NameSong: SONGNAME
        });
        audio.src = URL_AUDIO
        setPlaying(true)
        audio.play()
    }

    return(
        <div className="cardSong" onClick={playSong}>
            <img className="cardSong_img" src={ URLPORTADA }/>
            <div className="cardSong_InfoSong">
            <p className="cardSong_P__title"><strong>{ SONGNAME }</strong></p>
            <p className="cardSong_P">
                <strong>Upload by:</strong>
                &nbsp;
                { USERNAME }
            </p>
            </div>
            <span className="cardSong_Span">{ GENDER }</span>
        </div>
    )
}


export default SongCard