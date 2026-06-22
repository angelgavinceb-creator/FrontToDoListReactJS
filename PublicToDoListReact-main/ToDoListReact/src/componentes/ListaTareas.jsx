import { useState } from "react";
import { useEffect } from "react";
import { get } from "../services/peticiones";
import Tarea from "./Tarea";
import { post } from "../services/peticiones";
import { useOutletContext } from "react-router";
import { useNavigate } from "react-router";

export default function ListaTareas(){

    const [tareas, setTareas] = useState([]);
    const [tarea, setTarea] = useState({});
    const [count, setLogedIn] = useOutletContext();

    
    const token = JSON.parse(sessionStorage.getItem("logedIn")).token;

    const navigate = useNavigate();
    
    const getTareas = async () => {
        const data = await get({
            ruta: "api/tareas/mistareas",
            token: token
            });
            setTareas(data);
        }
    

    useEffect(()=>{
        console.log(token);
        if(token){
            getTareas();
        }
    }, []);

    function cerrarSesion(){
        sessionStorage.removeItem("logedIn");
        navigate("/");
    }

    async function nuevaTarea(){
       const response = await post({
            ruta: "api/tareas/nueva",
            data: tarea,
            token: token
        });
        setTareas([...tareas, response])
    }

    return(
        <>
            <button onClick={cerrarSesion} >Cerrar sesión</button>
            <p>Escribe en el input el json de la nueva tarea</p>
            <p>Nombre</p>
            <input type="text" onChange={e=>{setTarea({...tarea, texto: e.target.value})}}/>
            <p>Prioridad</p>
            <input type="text" onChange={e=>{setTarea({...tarea, prioridad: e.target.value})}}/>
            <p>Fecha creacion</p>
            <input type="text" onChange={e=>{setTarea({...tarea, fechaCreacion: e.target.value})}}/>
            <p>Fecha fin</p>
            <input type="text" onChange={e=>{setTarea({...tarea, fechaFin: e.target.value})}}/>
            <button onClick={nuevaTarea}>Nueva tarea</button>
            <ul>
                {console.log(tareas)};
                {tareas.map((tarea) => (
                    <Tarea 
                    key={tarea.id}
                    tarea={tarea}
                    update={getTareas}
                    />
                ))}
            </ul>
        </>
    )
}