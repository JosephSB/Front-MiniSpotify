import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SongCard from '../../Components/Cards/SongCard';
import Loader from '../../Components/Loaders/Loader';
import { helpHttp } from '../../Helpers/helpHttp';

const dataDefault = {
    ID_PLAYLIST: "",
    NAME: "",
    URL_PORTADA: "",
    CREATION_DATE: "",
    DESCRIPTION:"",
    SONGS: []
}

const PlaylistById = () =>{
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState(dataDefault);
    let { id } = useParams();

    useEffect(() => {
        console.log(data.SONGS.length)
        setLoader(true);
        let options = {
            body: {
                playlistID: id
            }
        }
        let url = process.env.REACT_APP_API_KEY_URL+'playlist/getSongsByPlaylist';

        helpHttp().post(url,options).then(res => {
            if(res.operation){
                setData(res.data[0]);
                setLoader(false);
            }
        })
    }, [id]);

    return(
        <div className="Container Playlist">
            {loader && <Loader message="Cargando Datos"/>}
            <div className='Playlist_Header'>
                <img className='Playlist_PortadaHeader' src={data.URL_PORTADA} alt={data.NAME} />
                <div className="Playlist_BodyHeader">
                    <h1 className='Playlist_Title'>{data.NAME}</h1>
                    <p className='Playlist_Text'>{data.DESCRIPTION}</p>
                </div>
            </div>
            <div className="Playlist_Body">
                {data.SONGS.length > 0
                        ? data.SONGS.map(song => <SongCard key={song.IDSONG} {...song} />)
                        : <p className="Usuario_Text2">No hay Canciones en esta playlist</p>
                }
            </div>
        </div>
    )
}

export default PlaylistById