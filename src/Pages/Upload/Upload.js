import {useContext,useState} from 'react';
import { useNavigate } from 'react-router-dom';
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

    let navigate = useNavigate();

    const SubirIMG = (e) => setFileIMG(e.target.files);
    const SubirAUD = (e) => setFileAUD(e.target.files);
    const handleChange = (e) => setForm({...form,[e.target.name]:e.target.value});

    const sendForm = async(e) =>{
        e.preventDefault()
        const fd = new FormData();
        fd.append("file_img", fileIMG[0]);
        fd.append("file_song", fileAUD[0]);
        fd.set("id_user",UserID);
        fd.set("songname", form.songname);
        fd.set("gender", form.gender);
        fd.set("date_premiere", form.date_premiere);

        let url = process.env.REACT_APP_API_KEY_URL + 'music/Upload'

        fetch(url , { // Your POST endpoint
            method: 'POST',
            body: fd // This is your file object
        }).then( response => response.json() )
        .then(
            success =>
            {
                if(success.operation){
                    alert("Cancion subida correctamente");
                    navigate("/");
                }else setMessage(success.data)
            }
        ).catch( error => console.log(error) );
        
    }

    return (
        <div className="Container">
            <h1 className="Tittle">Upload Song</h1>
            <p className="SpanError">{message}</p>
            <form className="Form">
                <input className="Input" onChange={handleChange} 
                type="text" name="songname" 
                placeholder="Nombre de Cancion:"
                />
                <input className="Input" onChange={handleChange} 
                type="text" name="gender" 
                placeholder="Genero:"
                />

                <label className="subir">
                    <i className="fas fa-cloud-upload-alt"></i>
                    &nbsp; {fileIMG.length > 0 ? fileIMG[0].name : "Subir Portada"}
                    <input className="InputFile" onChange={SubirIMG} type="file" name="file_img"/>
                </label>
                <label className="subir">
                    <i className="fas fa-cloud-upload-alt"></i>
                    &nbsp; {fileAUD.length > 0 ? fileAUD[0].name : "Subir Audio"}
                    <input className="InputFile" onChange={SubirAUD} type="file" name="file_song"/>
                </label> 

                <input className="Input" onChange={handleChange} 
                type="date" name="date_premiere"
                />
                <button className="Btn1" onClick={sendForm}>
                    Registrar
                </button>
            </form>
        </div>
    )
}

export default Upload