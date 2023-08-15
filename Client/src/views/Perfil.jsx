import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../path-to-your-actions';

export const ProfilePage = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/user', {
                        headers: {
                            token: `${token}`
                        }
                    })

                    setUser(response?.data?.name)
                } catch (error) {
                    console.error("la cosa fallo mi pana", error)
                }
            }
            fetchUserDetails()
        }
    }, [])


    return (
        <h1>hola</h1>
    );
};
