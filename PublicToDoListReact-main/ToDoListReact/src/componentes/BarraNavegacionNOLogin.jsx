import { Link } from "react-router";

export default function BarraNavegacionNOLogin(){
    return (
        <>
            <Link to="homenologin" > Home </Link>
            <Link to="login"> Login </Link>
            <Link to="registro"> Registro </Link>
        </>
    )

}