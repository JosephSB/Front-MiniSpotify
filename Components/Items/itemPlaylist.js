import React from 'react';
import Link from 'next/link'
import styles from '../../styles/Components/layouts.module.css'

const ItemPlaylist = (props) =>{
    return (
        <li className={styles.Aside_Link}>
            <Link href={`/Playlist/${props.ID_PLAYLIST}`}>
                <a>
                    {props.NAME}
                </a>
            </Link>
        </li>
    )
}

export default ItemPlaylist