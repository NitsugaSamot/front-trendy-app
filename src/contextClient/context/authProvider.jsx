import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
/* import axiosClient from "../config/axiosClient"; */
import axios from "axios";

const AuthContext = createContext()

/* AuthProvider rodea a toda la aplicacion */
const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

/*     console.log(auth)
    console.log(cargando) */

    const navigate = useNavigate()

/* Se ejecuta una sola vez , ya que solo comprueba que haya un token para autenticar al usuario */
    useEffect(() => {
        const authenticateUser = async () => {

            /* leer el token */
            const token = localStorage.getItem('token')
            console.log(token)

            //Si no hay token detenemos la ejecucion del codigo
            if(!token) {
                setCargando(false)
                return
            }

            /* headers es un objeto */
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            
            try {
                const {data} = await axios('https://back-trendy-app.up.railway.app/users/profile', config)
                setAuth(data)
                console.log(data)
                navigate('/logged_in')

            } catch (error) {
                setAuth({})
            } finally{
                 setCargando(false) 
            }

            
        }
        authenticateUser()
    }, [])


    const closeSession = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const updateProfile = async dataProfile => {
        const token = localStorage.getItem('token')

        if(!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.put(`https://back-trendy-app.up.railway.app/users/profile/${dataProfile.id}`, dataProfile, config)

            // console.log(dataProfile)

            return{
                msg: 'Changes saved with success'
            }
        
        } catch (error) {
            return{
                msg: error.response.data.msg,
                error: true        
            }
        }     
    }

    const updatePassword = async(dataProfile) => {
        const token = localStorage.getItem('token')

        if(!token) {
            setCargando(false)
            return
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.put(`https://back-trendy-app.up.railway.app/users/update-password`, dataProfile, config)
            return{
                msg: data.msg
            }
        } catch (error) {
            console.log(error)
    } 
}
 

    return(
        <AuthContext.Provider

            value={{
                auth,
                setAuth, 
                cargando,
                closeSession,
                updateProfile,
                updatePassword
            }}
        >


            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider,
}

export default AuthContext;
