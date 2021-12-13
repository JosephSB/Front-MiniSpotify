import {useContext,useState} from 'react';
import BtnUpload from '../../Components/Items/BtnUpload';
import Alert from '../../Components/Modals/Alert';
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
    const [alert, setAlert] = useState(null);

    const {data} = useContext(AuthContext);
    const {UserID} = data;

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

        let url = process.env.REACT_APP_API_KEY_URL + 'music/Upload';

        fetch(url , { // Your POST endpoint
            method: 'POST',
            body: fd // This is your file object
        }).then( response => response.json() )
        .then(
            success =>
            {
                if(success.operation) setAlert(true);
                else setMessage(success.data);
            }
        ).catch( error => setMessage(error) );
        
    }

    return (
        <div className="Container Auth">
            {alert && <Alert/>}
            <h1 className="Auth_Tittle">Upload Song</h1>
            <p className="Auth_SpanError">{message}</p>
            <form className="Auth_Form">
                <input className="Auth_input" onChange={handleChange} 
                type="text" name="songname" 
                placeholder="Nombre de Cancion:"
                />
                <input className="Auth_input" onChange={handleChange} 
                type="text" name="gender" 
                placeholder="Genero:"
                />
                <BtnUpload key="1" file={fileIMG} action={SubirIMG} name="file_img" message="Subir Portada" />
                <BtnUpload key="2" file={fileAUD} action={SubirAUD} name="file_song" message="Subir Audio" />

                <input className="Auth_input" onChange={handleChange} 
                type="date" name="date_premiere"
                />
                <button className="Btn1" onClick={sendForm}>
                    Upload
                </button>
            </form>
        </div>
    )
}

export default Upload