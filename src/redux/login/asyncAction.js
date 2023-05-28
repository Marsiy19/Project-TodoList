import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { Navigate } from 'react-router-dom';




export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://todo.paydali.uz/api/login', userData, { 
                headers: { 'Content-Type': 'application/json' }
             });
             localStorage.setItem('token', response.data.payload.token)
             .then(res => {
                
             })
            const data = response.data;
            console.log(response.data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);










// export const loginUser = createAsyncThunk(
//     'auth/loginUser',
//     async ({ email, password }, { rejectWithValue }) => {
//         try {
//             const response = await fetch('/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             });
//             if (!response.ok) {
//                 const message = `Unable to login: ${response.statusText}`;
//                 throw new Error(message);
//             }
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.message);
//         }
//     }
// );