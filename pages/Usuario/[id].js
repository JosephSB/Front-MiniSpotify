import React,{useContext, useEffect,useState} from 'react';
import css from '../../styles/Usuarios.module.css'
import { helpHttp } from '../../Helpers/helpHttp'
import CardSong from '../../Components/Cards/cardSong';

/*-----------FONT AWSOME---------------*/
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthContext from '../../Context/AuthContext';

const dataDefault = {
    UserID: "",
    Username: "",
    Name: "",
    Email: "",
    songs: []
}

const DetailUser = ({id}) =>{
    const [data, setData] = useState(dataDefault);
    const [page, setPage] = useState(1);

    const {removeToken} = useContext(AuthContext);

    useEffect(() => {
        let options = {
            body: {
                UserID: "#"+id,
                Page: page
            }
        }
        let url = process.env.NEXT_PUBLIC_API_KEY_GETDATAUSER

        helpHttp().post(url,options).then(res => {
            if(res.operation){
                setData(res.data)
            }
        })
    }, [id]);

    const SignOut = (e) =>{
        removeToken()
        window.location.href = "/"
    }


    return(
        <div className={css.container}>
            <div className={css.ContentUser}>
                <img className={css.ImgPerfil} src="http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"/>
                <div>
                    <p className={css.Text}><strong>{data.Username}</strong></p>
                    <p className={css.Text2}>
                        Name:&nbsp; 
                        <strong>{data.Name}</strong>
                    </p>
                    <p className={css.Text2}>
                        Email:&nbsp; 
                        <strong>{data.Email}</strong>
                    </p>
                </div>
                <span className={css.BtnExit} onClick={SignOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    Salir
                </span>
            </div> 
            <div className={css.Sections}>
                <section className={css.SectionSongs}>
                    {data.songs.length > 0
                        ? data.songs.map(song => <CardSong key={song.UserID} {...song} />)
                        : <p className={css.Text2}>No hay Canciones subidad por esta persona</p>
                    
                    }
                </section>
                <section className={css.SectionPlaylist}>
                    <p className={css.Text2}>No hay playlist subidad por esta persona</p>
                </section>
            </div>
        </div>
    )
}

export async function getStaticProps(context){
    const {params} = context
    const {id} = params
    
    return {
        props: {
            id: id,
        },
    };
    

}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

export default DetailUser