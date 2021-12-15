import {useContext} from 'react';
import AudioContext from '../../Context/AudioContext';

const SongCard = ({SONGNAME,URLPORTADA,USERNAME,GENDER,URL_AUDIO}) =>{
    const {playSong} = useContext(AudioContext);

    const handleClick = () => playSong(URLPORTADA,SONGNAME,URL_AUDIO);

    return(
        <div className="cardSong" onClick={handleClick}>
            <img className="cardSong__ImgPortada" src={ URLPORTADA } alt={SONGNAME} />
            <div>
                <p><strong>{ SONGNAME }</strong></p>
                <p>
                    <strong>upload by:</strong>
                    &nbsp;
                    { USERNAME }
                </p>
            </div>
            <p className="cardSong__Span">{ GENDER }</p>
            <span>
                <i className="fas fa-star cardSong__Icon"></i>
            </span>
        </div>
    )
}


export default SongCard