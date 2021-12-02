import React from 'react';

const Usuario = ({params}) =>{
    return(
        <div>{params.id} </div>
    )
}

export async function getStaticProps(context){
    const {id} = context.params
}

export default Usuario