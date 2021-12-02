import React,{useContext, useEffect,useState} from 'react';
import Link from 'next/link'
import { helpHttp } from '../../Helpers/helpHttp'

/*-----------FONT AWSOME---------------*/
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '../../styles/Components/layouts.module.css'
import AuthContext from '../../Context/AuthContext';
import ItemPlaylist from '../Items/itemPlaylist';

const Aside = () =>{
    const [playlists, setPlaylists] = useState([]);
    const {Username,UserID} = useContext(AuthContext);

    useEffect(() => {
        if(UserID.length > 0){
            let options = {
                body: {userID : UserID}
            }
            let url = process.env.NEXT_PUBLIC_API_KEY_GETPLAYLISTS
    
            helpHttp().post(url,options).then(res => {
                if(res.operation){
                    setPlaylists(res.data)
                }
            })
        }
    }, [UserID]);

    return (
        <nav className={styles.Aside}>
            <ul className={styles.Aside_NavLink + " "+styles.bar_bottom}>
                <li className={styles.Aside_Link}>
                    <Link href="/">
                        <a>
                            <FontAwesomeIcon icon={faHome} />
                            &nbsp;Home
                        </a>
                    </Link>
                </li>
                <li className={styles.Aside_Link}>
                    <Link href="/Buscar">
                        <a>
                            <FontAwesomeIcon icon={faSearch} />
                            &nbsp;Buscar
                        </a>
                    </Link>
                </li>
                <li className={styles.Aside_Link}>
                    <Link href="/Genero">
                        <a>
                            <FontAwesomeIcon icon={faMusic} />
                            &nbsp;Genero
                        </a>
                    </Link>
                </li>
                <li className={styles.Aside_Link}>
                    <Link href="/Upload">
                        <a>
                            <FontAwesomeIcon icon={faUpload} />
                            &nbsp;Upload
                        </a>
                    </Link>
                </li>
                <li className={styles.Aside_Link}>
                    <Link href={Username.length === 0 ? "/Auth/Login" :`/Usuario/${UserID}`}>
                        <a>
                            <FontAwesomeIcon icon={faUser} />
                            &nbsp;{Username.length === 0 ? "Iniciar Sesion" : Username}
                        </a>
                    </Link>
                </li>
            </ul>
            <ul className={styles.Aside_NavLink}>
                <li className={styles.Aside_Link}>
                <Link href="/Playlist/Create">
                    <a>
                        <FontAwesomeIcon className={styles.Icon} icon={faPlusCircle} />
                        &nbsp; Crear Playlist
                    </a>
                </Link>
                </li>
            </ul>
            
            <ul className={styles.Aside_NavLink}>
                {playlists.length > 0 
                    ? playlists.map(item => <ItemPlaylist key={item.ID_PLAYLIST} {...item} />)
                    : <a className={styles.letter}>No hay playlist, cree una</a>
                }
            </ul>
        </nav>
    )
}

export default Aside