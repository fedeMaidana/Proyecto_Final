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
        <div className="bg-principal-black min-h-screen flex items-center justify-center">
            <div className="bg-principal-white p-8 rounded shadow-md w-[30rem] h-auto text-2xl">
                <h1 className="text-5xl font-bold mb-8">Register in Custom Craft</h1>

                <form onSubmit={ event => onSubmit( event ) } >
                    <div className="mb-6">
                        <div>
                            <label
                                className="block font-semibold text-gray-700 mb-3"
                                htmlFor="name">Name
                            </label>

                            <input
                                className="
                                    bg-principal-white
                                    mt-1
                                    p-3
                                    border
                                    border-principal-black
                                    w-full
                                    rounded
                                    focus:outline-none
                                    focus:ring
                                    focus:border-blue-300
                                    mb-1
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
                                className="block font-semibold text-gray-700 mb-3"
                                htmlFor="email">Email
                            </label>

                            <input
                                className="
                                    bg-principal-white
                                    mt-1
                                    p-3
                                    border
                                    border-principal-black
                                    w-full
                                    rounded
                                    focus:outline-none
                                    focus:ring
                                    focus:border-blue-300
                                    mb-6
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
                                className="block font-semibold text-gray-700 mb-3"
                                htmlFor="password">Password
                            </label>

                            <input
                                className="
                                    bg-principal-white
                                    mt-1
                                    p-3
                                    border
                                    border-principal-black
                                    w-full
                                    rounded
                                    focus:outline-none
                                    focus:ring
                                    focus:border-blue-300
                                    mb-8
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
                            bg-secondary-blue2
                            text-white
                            font-semibold
                            py-3
                            rounded
                            hover:bg-blue-600
                            transition-colors
                            duration-300
                            mb-5
                        "
                        type="submit"
                    >
                        { loading ? 'Loading...' : 'Register' }
                    </button>

                    <p className="mt-4 text-center">
                        Do you have an account?
                        <br /> <b className="cursor-pointer text-blue-500" onClick={ () => navigate( '/login' ) }>Log in</b>
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