import {useState,useEffect} from 'react';
import SongCard from '../Components/Cards/SongCard'
import Loader from '../Components/Loaders/Loader';

import { helpHttp } from '../Helpers/helpHttp'

const Home = () =>{
    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(true);
    

    useEffect(() => {
        setLoader(true);
        helpHttp().get(process.env.REACT_APP_API_KEY_URL+'music/getSongs/page='+page)
            .then(data =>{
                setSongs(data.data)
                setLoader(false);
            })
    }, []);

    return (
        <div className="Container">
            <p className="title">Hola &#128526;!</p>
            <div className="contentSongs">
                {loader && <Loader message="Cargando Canciones"/>}
                {
                songs.length > 0 
                ? songs.map(song => <SongCard key={song.IDSONG} {...song} />)
                : <p>No hay canciones</p>
                }
            </div>
        </div>
    )
}

export default Home