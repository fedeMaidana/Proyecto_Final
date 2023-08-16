import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const ProfilePage = () => {

  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get('http://localhost:3001/user', {
            headers: {
              token: `${token}`,
            },
          });
          console.log(response);

          setUser(response?.data?.id);
        } catch (error) {
          console.error('Error al obtener detalles del usuario:', error);
        }
      };

      fetchUserDetails();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(undefined);
    
  };
  const UpdateUser = ({ id }) => {
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState({
      name: '',
      email: '',
      userName: '',
      lastName: '',
      birthDate: '',
    });
  
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
  
    const { name, email, userName, lastName, birthDate } = inputs;
  
    const onChange = (event) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    };
  
    const onSubmit = async (event) => {
      event.preventDefault();
  
      if (name !== '' && email !== '' && userName !== '' && lastName !== '' && birthDate !== '') {
        const updatedUser = { name, email, userName, lastName, birthDate };
  
        setLoading(true);
  
        try {
          const response = await axios.put(`http://localhost:3001/updateuser/${id}`, updatedUser);
          setMessage(response.data.message);
          setInputs({ name: '', email: '', userName: '', lastName: '', birthDate: '' });
  
          setTimeout(() => {
            setMessage('');
            navigate('/profile'); // Cambia a la ruta de perfil o donde desees redirigir
            setLoading(false);
          }, 1500);
        } catch (error) {
          console.error(error);
          setMessage('Hubo un error al actualizar el usuario');
          setTimeout(() => {
            setMessage('');
          }, 1500);
        }
      }
    };
  
    return (
      <div>
        <h3>Update User Information</h3>
        <form onSubmit={onSubmit}>
          {/* Resto del formulario */}
        </form>
        {message && <div>{message}</div>}
      </div>
    );
  };

  
};

