import { useState } from "react";
import { post } from "../services/peticiones";
import { Link } from "react-router";
import { useNavigate } from "react-router";


export default function Registro(){
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [repetirEmail, setRepetirEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");
    const [condiciones, setCondiciones] = useState(false);
    const [novedades, setNovedades] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);
    const [mensajeError, setMensajeError] = useState("Error");

    const navigate = useNavigate();

    async function registro(){
        await post({
            ruta: "api/users/signin",
            data: {email, password},
        });
        navigate("/login");
    }

    function validarUsuario(){
        if(
            validarNombre() === true &&
            validarApellidos() === true &&
            validarEmail() === true &&
            validarRepetirEmail() === true &&
            validarPassword() === true &&
            validarRepetirPassword() === true &&
            validarCondiciones() === true
        ){
            registro();
        }else{
        }
    }

    function validarNombre(){
        let esValido = true;
        if(nombre.length<3){
            setMostrarError(true);
            setMensajeError("El nombre debe tener más de 2 letras");
            esValido = false;
        }else{
            setMostrarError(false);
        }
        if(nombre.charAt(0) !== nombre.charAt(0).toUpperCase()){
            setMostrarError(true);
            setMensajeError("La primera letra del nombre debe ser mayúscula");
            esValido = false;
        }else{
            setMostrarError(false);
        }
        return esValido;
    }

    function validarApellidos(){
        let esValido = true;
        if(apellidos.length<3){
            setMostrarError(true);
            setMensajeError("El apellido debe tener más de 2 letras");
            esValido = false;
        }else{
            setMostrarError(false);
        }
        if(apellidos.charAt(0) !== apellidos.charAt(0).toUpperCase()){
            setMostrarError(true);
            setMensajeError("La primera letra del apellido debe ser mayúscula");
            esValido = false;
        }else{
            setMostrarError(false);
        }
        return esValido;
    }

    function validarEmail(){
        let esValido = true;

        if(!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)){
        esValido = false;
        setMostrarError(true);
        setMensajeError("Debes introducir un email válido");
    }else{
            setMostrarError(false);
        }
        return esValido;
    }

    function validarRepetirEmail(){
        let esValido = true;

        if(repetirEmail !== email){
            setMostrarError(true);
            esValido = false;
            setMensajeError("Los email deben coincidir");
        }else{
            setMostrarError(false);
        }
        return esValido;
    }

    function validarPassword(){
        let esValido = true;

        if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password)){
        setMostrarError(true);
        esValido = false;
        setMensajeError("Debes introducir una contraseña válida");
        }else{
            setMostrarError(false);
        }
        return esValido;
    }

    function validarRepetirPassword(){
        let esValido = true;

        if(repetirPassword !== password){
            setMostrarError(true);
            esValido = false;
            setMensajeError("Las contraseñas deben coincidir");
        }else{
            setMostrarError(false);
        }
        return esValido;
    }

    function validarCondiciones(){
        let esValido = true;

        if(condiciones === false){
            setMostrarError(true);
            esValido = false;
            setMensajeError("Debes aceptar las condiciones");
        }else{
            setMostrarError(false);
        }
        return esValido;
    }


    return(
        <>
            <h1>Registro</h1>
            <p>¿Ya tienes una cuenta? <Link to="/login">Inicio de sesión</Link></p>
            <p>Nombre</p>
            <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            <p>Apellidos</p>
            <input type="text" value={apellidos} onChange={(e)=>setApellidos(e.target.value)}/>
            <p>Email</p>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <p>Repetir Email</p>
            <input type="text" value={repetirEmail} onChange={(e)=>setRepetirEmail(e.target.value)}/>
            <p>Contraseña</p>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <p>Repetir Contraseña</p>
            <input type="password" value={repetirPassword} onChange={(e)=>setRepetirPassword(e.target.value)}/>
            <p>Aceptar condiciones</p>
            <input type="checkbox" checked={condiciones} onChange={(e)=>setCondiciones(e.target.value)}/>
            <p>¿Deseas recibir novedades?</p>
            <input type="checkbox" checked={novedades} onChange={(e)=>setNovedades(e.target.value)}/>
            {mostrarError ? <p>{`${mensajeError}`}</p> : <></> }
            <p></p>
            <button onClick={validarUsuario}>Envíar</button>
        </>
    )
}