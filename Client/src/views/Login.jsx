import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IconGoogle} from "../assets/icons/icons"

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
                // setInputs( { email: '', password: '' } )

                setTimeout(() => {
                    setMessage( '' )
                    console.log(data);
                    localStorage.setItem("token", data?.user.token)
                    if (data.user.token) {
                        setAccess(true)
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

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:3001/login/auth/google'; // Cambia la URL según tu configuración
      }

    return (
      <>
        <div className="bg-principal-black min-h-screen flex items-center justify-center">
          <div className="bg-principal-white p-8 rounded shadow-md w-[30rem] h-auto text-2xl">
            <h1 className="text-5xl font-bold mb-8">Log in</h1>

            <form method="post" onSubmit={handleSubmit}>
              <div>
                <div>
                  <label
                    className="block font-semibold text-gray-700 mb-3"
                    htmlFor="email"
                  >
                    Email
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
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(event) => handlerUser(event)}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label
                    className="block font-semibold text-gray-700 mb-3"
                    htmlFor="password"
                  >
                    Password
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
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => handlerUser(event)}
                    autoComplete="off"
                  />
                </div>
              </div>

              <button
                type="submit"
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
                                mb-3
                            "
              >
                {loading ? "Loading..." : "Login"}
              </button>

              <p className="mt-4 text-center">
                Don't have an account?
                <br />{" "}
                <b
                  className="cursor-pointer text-blue-500"
                  onClick={() => navigate("/register")}
                >
                  Register
                </b>
              </p>
            </form>
            <div>
            <button
  onClick={handleGoogleLogin}
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
    mb-3
    flex
    items-center
    justify-center
    mt-4 
  "
>
  <IconGoogle className="mr-2" />
  <p className="text-center">Iniciar con Google</p>
</button>

            </div>
          </div>

          {message && (
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
                            translate-y-[-30px]
                        "
            >
              {message}
            </div>
          )}
        </div>
      </>
    );
}