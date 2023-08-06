import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {

    const [inputs, setInputs] = useState({
        email: "",
        name: "",
        password: ""
    });

    const [mensaje, setMensaje] = useState();
    const [loading, setLoading] = useState(false);

    const { email, name, password } = inputs;


    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (name !== "" && email !== "" &&  password !== "") {
            const User = {
                name,
                email,
                password,
            };
            setLoading(true);
            await axios
            .post('http://localhost:3001/register', User)
            .then(({ data }) => {
                setMensaje(data.message);
                setInputs({ email: "", name: "", password: "" });
                setTimeout(() => {
                    setMensaje('')
                    navigate('/login')
                    setLoading(false)
                }, 1500)
            })
            .catch(error => {
                console.log(error)
                setMensaje('Hubo un error')
                setTimeout(() => {
                    setMensaje('')
                }, 1500)
            });

        }
    }


    const navigate = useNavigate();


    return(

        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-5xl font-bold mb-6">Welcome to the regiter website</h1>
                
                <form onSubmit={ (e) => onSubmit(e)}>
                    <div className="mb-6">
                        <div>
                            <label 
                                className="block font-semibold text-gray-700" 
                                htmlFor="name">Name
                            </label>

                            <input 
                                className="mt-1 p-3 border border-gray-300 w-full rounded focus:outline-none focus:ring focus:border-blue-300" 
                                onChange={(e) => onChange(e)}
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="Name..." 
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label 
                                className="block font-semibold text-gray-700"
                                htmlFor="email">Email
                            </label>

                            <input 
                                className="mt-1 p-3 border border-gray-300 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
                                onChange={(e) => onChange(e)}
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Email..." 
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label 
                                className="block font-semibold text-gray-700"
                                htmlFor="password">Password
                            </label>

                            <input 
                                className="mt-1 p-3 border border-gray-300 w-full rounded focus:outline-none focus:ring focus:border-blue-300"
                                onChange={(e) => onChange(e)}
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Password..." 
                                autoComplete="off"/>
                        </div>
                    </div>

                    <button 
                        className="w-full bg-blue-500 text-white font-semibold py-3 rounded hover:bg-blue-600 transition-colors duration-300"
                        type="submit"
                        >{ loading ? 'Loading...' : 'Register'}
                    </button>

                    <p className="mt-4 text-center">Do you have an account?
                        <b className="cursor-pointer text-blue-500" onClick={() => navigate('/login')}>Log in</b>
                    </p>
                </form>
            </div>

            {
                mensaje && <div className="text-2xl font-bold text-black-500 bg-blue-500 bg-opacity-75 rounded-lg w-96 text-center absolute bottom-0 mb-8px px-6 py-3 transition duration-300 translate-y-[-80px]">
                    {mensaje}</div>
            }
        </div>

    )
};