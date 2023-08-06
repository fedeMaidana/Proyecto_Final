import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const navigate = useNavigate()

    const [inputs, setInputs] = useState( { email: "", name: "", password: "" } )

    const [ message, setMessage ] = useState()
    const [ loading, setLoading ] = useState( false )

    const { email, name, password } = inputs


    const onChange = ( event ) => {
        setInputs({ ...inputs, [ event.target.name ]: event.target.value } )
    }

    const onSubmit = async ( event ) => {
        event.preventDefault()

        if( name !== "" && email !== "" &&  password !== "" ){
            const User = { name, email, password }

            setLoading( true )

            await axios.post( 'http://localhost:3001/register', User ).then( ( { data } ) => {
                setMessage( data.message )
                setInputs( { email: "", name: "", password: "" } )
                setTimeout(() => {
                    setMessage( '' )
                    navigate( '/login' )
                    setLoading( false )
                }, 1500)
            }).catch( error => {
                console.error( error )
                setMessage( 'Hubo un error al registrarse' )
                setTimeout(() => {
                    setMessage( '' )
                }, 1500)
            })

        }
    }

    return(
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-5xl font-bold mb-6">Registrate en Custom Craft</h1>

                <form onSubmit={ event => onSubmit( event ) } >
                    <div className="mb-6">
                        <div>
                            <label
                                className="block font-semibold text-gray-700"
                                htmlFor="name">Nombre
                            </label>

                            <input
                                className="
                                    mt-1
                                    p-3
                                    border
                                    border-gray-300
                                    w-full
                                    rounded
                                    focus:outline-none
                                    focus:ring
                                    focus:border-blue-300
                                "
                                onChange={ event => onChange( event ) }
                                type="text"
                                id="name"
                                name="name"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label
                                className="block font-semibold text-gray-700"
                                htmlFor="email">Correo
                            </label>

                            <input
                                className="
                                    mt-1
                                    p-3
                                    border
                                    border-gray-300
                                    w-full
                                    rounded
                                    focus:outline-none
                                    focus:ring
                                    focus:border-blue-300
                                "
                                onChange={ event => onChange( event ) }
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label
                                className="block font-semibold text-gray-700"
                                htmlFor="password">Contraseña
                            </label>

                            <input
                                className="
                                    mt-1
                                    p-3
                                    border
                                    border-gray-300
                                    w-full
                                    rounded
                                    focus:outline-none
                                    focus:ring
                                    focus:border-blue-300
                                "
                                onChange={ event => onChange( event ) }
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="off"/>
                        </div>
                    </div>

                    <button
                        className="
                            w-full
                            bg-blue-500
                            text-white
                            font-semibold
                            py-3
                            rounded
                            hover:bg-blue-600
                            transition-colors
                            duration-300
                        "
                        type="submit"
                    >
                        { loading ? 'Loading...' : 'Register' }
                    </button>

                    <p className="mt-4 text-center">
                        Tenes una cuenta ?
                        <b className="cursor-pointer text-blue-500" onClick={ () => navigate( '/login' ) }>Inicia Sesión</b>
                    </p>
                </form>
            </div>

            { message && (
                <div
                    className="
                        text-2xl
                        font-bold
                        text-black-500
                        bg-blue-500
                        bg-opacity-75
                        rounded-lg
                        w-96
                        text-center
                        absolute
                        bottom-0
                        mb-8px
                        px-6
                        py-3
                        transition
                        duration-300
                        translate-y-[-80px]
                    "
                >
                    { message }
                </div>
            )}
        </div>

    )
};