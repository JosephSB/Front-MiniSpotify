import { NavLink } from 'react-router-dom';

const ItemPlaylist = ({NAME,ID_PLAYLIST}) =>{
    return (
        <NavLink 
        className="Aside_Link"
        exact="true" to={`/Playlist/${ID_PLAYLIST}`}
        activeclassname="active"
        >
            {NAME}
        </NavLink>
    )
}

export default ItemPlaylist