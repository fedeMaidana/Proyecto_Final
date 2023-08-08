import { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

export const Login = () => {
    const navigate = useNavigate()

    const [ inputs, setInputs ] = useState( { email: '', password: '' } )
    const [ message, setMessage ] = useState(  )
    const [ loading, setLoading ] = useState( false )
    const [access, setAccess] = useState(false);
    

    const handlerUser = ( event ) => {
        setInputs( { ...inputs, [ event.target.name ]: event.target.value } )
    }

    const { email, password } = inputs

    async function handleSubmit( event ){
        event.preventDefault()

        if( email !== '' && password !== '' ){
            const User = { email, password }

            await axios.post( 'http://localhost:3001/login', User ).then( ( { data } ) => {
                
                setMessage( data.message )
                setInputs( { email: '', password: '' } )

                setTimeout(() => {
                    setMessage( '' )
                    if (data.valid) {
                        setAccess(true); 
                    }
                    setLoading( false )
                }, 1500)
                
            }).catch( error => {
                console.error( error )
                setMessage( 'Hubo un error' )
                setTimeout(() => {
                    setMessage( '' )
                    setLoading( false )
                }, 1500)
            } )
        }
    }

    useEffect(() => {
        if (access) {
          navigate('/home'); // Redirecciona al usuario a '/home' cuando access es true
        }
    }, [access, navigate]);

    
    

    return(
        <>
            <div className="bg-gray-100 min-h-screen flex items-center justify-center" >
                <div className="bg-white p-8 rounded shadow-md w-96" >
                    <h1 className="text-5xl font-bold mb-6" >Inicia Sesión</h1>

                    <form method='post' onSubmit={ handleSubmit } >
                        <div>
                            <div>
                                <label className="block font-semibold text-gray-700" htmlFor="email">Correo</label>
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
                                    type="email"
                                    name='email'
                                    id='email'
                                    value={ email }
                                    onChange={ event => handlerUser( event ) }
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label className="block font-semibold text-gray-700" htmlFor="password">Contraseña</label>
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
                                    type="password"
                                    name='password'
                                    id='password'
                                    value={ password }
                                    onChange={ event => handlerUser( event ) }
                                    autoComplete='off'
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
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
                        >
                            { loading ? 'Loading...' : 'Ingresar' }
                        </button>

                        <p className="mt-4 text-center">No tenes una cuenta ?
                            <b className="cursor-pointer text-blue-500" onClick={ () => navigate( '/register' ) }>Registrate</b>
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
        </>
    )
}