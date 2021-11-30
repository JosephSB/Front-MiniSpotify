import React from 'react';
import Link from 'next/link'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '../../styles/Aside.module.css'

const Aside = () =>{
    return (
        <div className={styles.Aside}>
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
            </ul>
            <ul className={styles.Aside_NavLink}>
                <li className={styles.Aside_Link}>
                <Link href="/">
                    <a>
                        <FontAwesomeIcon className={styles.Icon} icon={faPlusCircle} />
                        &nbsp; Crear Playlist
                    </a>
                </Link>
                </li>
            </ul>
            <ul className={styles.Aside_NavLink}>
                <li className={styles.Aside_Link}>
                    <Link href="/">
                        <a>
                            Play1
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Aside