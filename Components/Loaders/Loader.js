import React from 'react'

const Loader = (props) =>{
    return(
        <div className="Loader">
            <div className="preloader"></div>
            <p className="mesage-loader">{props.message}</p>
        </div>
    )
}

export default Loader