import { NavLink } from "react-router-dom"

export const Login = () => {
    async function handleSubmit( event ){
        event.preventDefault()
    }

    return(
        <>
            <form method='post' onSubmit={ handleSubmit } >
                        <h1>Inicia Sesión</h1>

                        <div>
                            <span>
                                <label htmlFor="email"> Correo </label>
                                <input type="email" name="email" id="email"/>
                            </span>

                            <span>
                                <label htmlFor="password"> Contraseña </label>
                                <input type="password" name="password" id="password"/>
                            </span>
                        </div>

                        <button type="submit"> Ingresar </button>

                        <span> No tenes cuenta ? { <NavLink to='/register'> Registrate </NavLink> } </span>
                    </form>
        </>
    )
}
