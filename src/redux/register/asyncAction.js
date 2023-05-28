import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://todo.paydali.uz/api/register', userData);
            const data = response.data;
            console.log(response.data);
            return data;

        } catch (error) {
            return rejectWithValue(error.response.data.message);
            console.log(error);
        }
    }
);


// localStorage.setItem('token', response.data.payload.token)










