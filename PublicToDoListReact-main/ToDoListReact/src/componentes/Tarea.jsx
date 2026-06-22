import { patch } from "../services/peticiones";
import { useState } from "react";
import { del } from "../services/peticiones";
import { useNavigate } from "react-router";

export default function Tarea({tarea, update}){

    const [estado, setEstado] = useState(tarea.estado);
    const token = JSON.parse(sessionStorage.getItem("logedIn")).token;

    const navigate = useNavigate();

    async function cambiarEstado(){
        setEstado(estado === "PENDIENTE" ? "COMPLETADA" : "PENDIENTE");
        await patch({
            ruta: "api/tareas/cambiarestado",
            id: tarea.id,
            data: estado === "PENDIENTE" ? "COMPLETADA" : "PENDIENTE",
            token
        });
    }

    async function delTarea(){
        await del({
            ruta: "api/tareas/deltarea",
            data: tarea.id,
            token
        });
        await update()
    }

    return(
        <li>
            {`Nombre: ${tarea.texto}, Prioridad: ${tarea.prioridad}, Creación: ${tarea.fechaCreacion}, Fin: ${tarea.fechaFin}, Estado: ${estado}, Usuarios: [${tarea.users.map(user => user.email)}], Creador: ${tarea.uCreador.email}`}
            <input type="checkbox" checked={estado === "COMPLETADA"} onChange={cambiarEstado} ></input>
            <button onClick={delTarea}>Borrar tarea</button>
        </li>
    )
}