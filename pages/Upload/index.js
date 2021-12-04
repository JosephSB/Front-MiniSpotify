import React,{useContext, useEffect,useState} from 'react';
import Btn1 from '../../Components/Buttons/Btn1';
import css from '../../styles/Upload.module.css'

/*-----------FONT AWSOME---------------*/
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthContext from '../../Context/AuthContext';


const formDefault = {
    songname: "",
    gender: "",
    date_premiere: ""
}


const Upload = () =>{
    const [fileAUD, setFileAUD] = useState([]);
    const [fileIMG, setFileIMG] = useState([]);
    const [form, setForm] = useState(formDefault);
    const [message, setMessage] = useState();

    const {data} = useContext(AuthContext);
    const {UserID} = data;

    const SubirIMG = (e) => setFileIMG(e.target.files)
    const SubirAUD = (e) => setFileAUD(e.target.files)
    

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const sendForm = async(e) =>{
        e.preventDefault()
        const fd = new FormData();

        
        fd.append("file_img", fileIMG[0])
        fd.append("file_song", fileAUD[0])
        fd.set("id_user",UserID)
        fd.set("songname", form.songname)
        fd.set("gender", form.gender)
        fd.set("date_premiere", form.date_premiere)

        let url = process.env.NEXT_PUBLIC_API_KEY_UPLOADSONG

        fetch(url , { // Your POST endpoint
            method: 'POST',
            body: fd // This is your file object
        }).then(
            response => response.json() 
        ).then(
            success =>
            {
                console.log(success)
                if(success.operation){
                    console.log(success)
                }else setMessage(success.data)
            }
        ).catch(
            error => console.log(error) 
        );
        /*
        for (var pair of fd.entries()) {
            console.log(pair[1])
            console.log(pair[0]+ ', ' + pair[1]); 
        }*/
        
    }

    return (
        <div className={css.Container}>
            <h1 className={css.Tittle}>Upload Song</h1>
            <p className={css.SpanError}>{message}</p>
            <form className={css.Form}>
                <input className={css.Input} onChange={handleChange} 
                type="text" name="songname" 
                placeholder="Nombre de Cancion:"
                />
                <input className={css.Input} onChange={handleChange} 
                type="text" name="gender" 
                placeholder="Genero:"
                />
                <label className={css.subir}>
                    <FontAwesomeIcon icon={faCloudUploadAlt} />
                    &nbsp; {fileIMG.length > 0 ? fileIMG[0].name : "Subir Portada"}
                    <input className={css.InputFile} onChange={SubirIMG} type="file" name="file_img"/>
                </label>
                <label className={css.subir}>
                    <FontAwesomeIcon icon={faCloudUploadAlt} />
                    &nbsp; {fileAUD.length > 0 ? fileAUD[0].name : "Subir Audio"}
                    <input className={css.InputFile} onChange={SubirAUD} type="file" name="file_song"/>
                </label> 
                <input className={css.Input} onChange={handleChange} 
                type="date" name="date_premiere"
                />
                <Btn1 name="Upload" action={sendForm}/>
            </form>
        </div>
    )
}

export default Upload