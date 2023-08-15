import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const ProfilePage = () => {
    const [ user, setUser ] = useState( undefined )
  const [ isModalOpen, setIsModalOpen ] = useState( false )

  useEffect(() => {
    const token = localStorage.getItem( 'token' )

    if( token ){
      const fetchUserDetails = async () => {
        try{
          const response = await axios.get( 'http://localhost:3001/user', {
            headers: {
              token: `${ token }`
            }
          })

          setUser( response?.data?.name )

        }catch( error ){
          console.error( 'Error al obtener detalles del usuario:', error )
        }
      }

      fetchUserDetails()
    }
  }, [] )

console.log(localStorage)
    return (
        <div><h1>holaa</h1></div>
        
    );
};


// import axios from 'axios';
// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const UpdateUser = () => {
//   const navigate = useNavigate();
  

//   const [inputs, setInputs] = useState({
//     name: '',
//     email: '',
//     userName: '',
//     lastName: '',
//     birthDate: '',
//   });

//   const [message, setMessage] = useState();
//   const [loading, setLoading] = useState(false);

//   const { name, email, userName, lastName, birthDate } = inputs;

//   const onChange = (event) => {
//     setInputs({ ...inputs, [event.target.name]: event.target.value });
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();

//     if (name !== '' && email !== '' && userName !== '' && lastName !== '' && birthDate !== '') {
//       const updatedUser = { name, email, userName, lastName, birthDate };

//       setLoading(true);

//       try {
//         const response = await axios.put(`http://localhost:3001/updateuser/${id}`, updatedUser);
//         setMessage(response.data.message);
//         setInputs({ name: '', email: '', userName: '', lastName: '', birthDate: '' });

//         setTimeout(() => {
//           setMessage('');
//           navigate('/profile'); // Cambia a la ruta de perfil o donde desees redirigir
//           setLoading(false);
//         }, 1500);
//       } catch (error) {
//         console.error(error);
//         setMessage('Hubo un error al actualizar el usuario');
//         setTimeout(() => {
//           setMessage('');
//         }, 1500);
//       }
//     }
//   };

//   return (
//     <div>
//       <h3>Update User Information</h3>
//       <form onSubmit={onSubmit}>
//         <div>
//           <label htmlFor="name">Name</label>
//           <input type="text" id="name" name="name" value={name} onChange={onChange} />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" name="email" value={email} onChange={onChange} />
//         </div>
//         <div>
//           <label htmlFor="userName">Username</label>
//           <input type="text" id="userName" name="userName" value={userName} onChange={onChange} />
//         </div>
//         <div>
//           <label htmlFor="lastName">Last Name</label>
//           <input type="text" id="lastName" name="lastName" value={lastName} onChange={onChange} />
//         </div>
//         <div>
//           <label htmlFor="birthDate">Birth Date</label>
//           <input type="date" id="birthDate" name="birthDate" value={birthDate} onChange={onChange} />
//         </div>
//         <button type="submit">Update User</button>
//       </form>
//       {message && <div>{message}</div>}
//     </div>
//   );
// };

// export default UpdateUser;

