import React,{useContext, useEffect,useState} from 'react';
import { helpHttp } from '../../Helpers/helpHttp'
import AuthContext from '../../Context/AuthContext';
import ItemPlaylist from '../Items/ItemPlaylist';
import ItemLink from '../Items/ItemLink';

const Aside = () =>{
    const [playlists, setPlaylists] = useState([]);
    const {data} = useContext(AuthContext);
    const {Username,UserID} = data;

    useEffect(() => {
        if(UserID.length > 0){
            let options = {
                body: {userID : UserID}
            }
            let url = process.env.REACT_API_KEY_URL+'playlist/getPlaylist'
    
            helpHttp().post(url,options).then(res => {
                if(res.operation){
                    setPlaylists(res.data)
                }
            })
        }
    }, [UserID]);

    return (
        <nav className="Aside">
            <ul className="Aside_NavLink bar_bottom">
                <ItemLink name="Home" icon="fa-home" route="/" />
                <ItemLink name="Buscar" icon="fa-search" route="/Buscar" />
                <ItemLink name="Genero" icon="fa-music" route="/Genero" />
                <ItemLink name="Upload" icon="fa-upload" route="/Upload" />
                <ItemLink 
                name={Username.length === 0 ? "Iniciar Sesion" : Username} 
                icon="fa-user" 
                route={Username.length === 0 ? "/Auth/Login" :`/Usuario/${UserID.replace('#', '')}`}
                />

            </ul>
            <ul className="Aside_NavLink">
                <ItemLink name="Crear Playlist" icon="fa-plus-circle" route="/Playlist/Create" />
            </ul>
            
            <ul className="Aside_NavLink">
                {playlists.length > 0 
                    ? playlists.map(item => <ItemPlaylist key={item.ID_PLAYLIST} {...item} />)
                    : <a className="letter">No hay playlist, cree una</a>
                }
            </ul>
        </nav>
    )
}

export default Aside