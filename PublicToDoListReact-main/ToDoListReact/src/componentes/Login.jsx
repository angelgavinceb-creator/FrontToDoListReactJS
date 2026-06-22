import { useState } from "react";
import { post } from "../services/peticiones";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import MensajeError from "./MensajeError";

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarError, setMostrarError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    async function login(){
        const usuarioInsertado = await post({
            ruta: "api/users/login",
            data: {email, password},
        });
        sessionStorage.setItem("logedIn", JSON.stringify(usuarioInsertado));
        navigate("/tareas");
    }

    function validarUsuario(){
        if(email === "" || password === ""){
            setMostrarError(true);
            setMensajeError("No puedes enviar datos vacíos");
        }else{
            setMostrarError(false);
            setMensajeError("");
            login();
        }
    }

    const navigate = useNavigate();
        return(
            <>
                <h1>Inicio de sesión</h1>
                <p>¿Aún no tienes cuenta? <Link to="/registro">Regístrate</Link></p>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {mostrarError ? <p>{`${mensajeError}`}</p> : <></> }
                <button onClick={validarUsuario}>Enviar</button>
            </>
        )
}