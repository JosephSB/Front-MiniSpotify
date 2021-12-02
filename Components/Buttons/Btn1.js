import React from 'react';
import css from '../../styles/Components/Buttons.module.css'

const Btn1 = (props) =>{

    return (
        <button className={css.Btn1} onClick={props.action}>{props.name}</button>
    )
}

export default Btn1