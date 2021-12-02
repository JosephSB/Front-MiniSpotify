import React,{useState,useEffect} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import CardSong from '../Components/Cards/cardSong'
import styles from '../styles/Home.module.css'
import { helpHttp } from '../Helpers/helpHttp'

function Home() {
  const [songs, setSongs] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    helpHttp().get(process.env.NEXT_PUBLIC_API_KEY_GETSONGS+page)
      .then(data =>{
        setSongs(data.data)
      })
  }, []);

  return (
    <div className={styles.containerHome}>
      <p className={styles.title}>Hola &#128526;!</p>
      <div className={styles.contentSongs}>
        {
        songs.length > 0 
          ? songs.map(song => <CardSong key={song.IDSONG} {...song} />)
          : <p>No hay canciones</p>
        }
      </div>
    </div>
  )
}

export default Home
