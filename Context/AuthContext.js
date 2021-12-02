import { createContext,useState,useEffect} from "react";
import { helpHttp } from '../Helpers/helpHttp'

const AuthContext = createContext();

const dataUserDefault = {
    UserID: "",
    Username: "",
    Token: "",
    Name: "",
    Email: ""
}

const DataAuthProvider = ({ children }) => {
    const [data, setData] = useState(dataUserDefault);

    const validarToken = (token) =>{
        let options = {
            body: {Token : token}
        }
        let url = process.env.NEXT_PUBLIC_API_KEY_VALIDARTOKEN

        helpHttp().post(url,options).then(res => {
            if(res.operation) setData(res.data)
        })
    }

    useEffect(() => {
        let token = window.sessionStorage.getItem('token')
        //window.sessionStorage.setItem('token', "8825a67a298b3ee2fddad6947465c745")
        if(token) validarToken(token)
    }, []);

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { DataAuthProvider };
export default AuthContext;