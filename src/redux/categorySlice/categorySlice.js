// import axios from 'axios';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import api from '../../api/api'

// export const setTodos = createAsyncThunk(
//   'post/setTodos',
//   async function(_, {rejectWithValue}) {
//     try {
//       const response = await api.get('/api/categories');
//       console.log(response);
//       console.log('asdvasdvasdvsdavds');
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   }
// );

// export const deletePost = createAsyncThunk(
//   'post/deletePost',
//   async function(id, {rejectWithValue, dispatch}) {
//     try {
//       const response = await api.delete(`/api/categories/${id}`);
//       console.log(response);
//       dispatch(deleteText({id}))
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   }
// )

// export const toggleText = createAsyncThunk(
//   'post/toggleText',
//   async function (id, {rejectWithValue, dispatch, getState}) {
//     const text = getState().post.post.find(tex => tex.id === id)

//     try {
//       const response = await api.patch(`/api/categories/${id}`, {
//       });
//       console.log(" Toggle ", response);
//       dispatch(toggleComplete({id}));
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   }
// )

// export const addPost = createAsyncThunk(
//   'post/addPost',
//   async function (text, {rejectWithValue, dispatch}) {
//     try {
//       const post = {
//         title: text,
//         userId: 1,
//       };
//       const response = await api.post('/api/categories', post);
//       const data = await response.data
//       console.log(data);
//       dispatch(addTodo(data))
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//     console.log('dsavsdvasvasdvasdvsd');
//   }
// )

// const todoSlice = createSlice({
//   name: 'post',
//   initialState: {
//     post: [],
//     status: null,
//     error: null
//   },

//   reducers: {
//     addTodo(state, action) {
//       state.post.push(action.payload);
//     },
//     toggleComplete(state, action) {
//       const toggleTodo = state.post.find(item => item.id === action.payload.id);
//     },
//     deleteText(state, action) {
//       state.post = state.post.filter(item => item.id !== action.payload.id)
//     }
//   },
//   extraReducers: {
//     [setTodos.pending]: (state) => {
//       state.status = 'loading',
//       state.error = null
//     },
//     [setTodos.fulfilled]: (state, action) => {
//       state.status = 'resolved',
//       state.post = action.payload;
//     },
//     [setTodos.rejected]: (state, action) => {
//       state.status = 'rejected',
//       state.error = action.payload;
//     },

//     [deletePost.rejected]: (state, action) => {
//       state.status = 'rejected';
//       state.error = action.payload;
//     },

//     [toggleText.rejected]: (state, action) => {
//       state.status = 'rejected';
//       state.error = action.payload
//     },

//   }
// })

// const { addTodo, toggleComplete, deleteText } = todoSlice.actions

// export default todoSlice.reducer;

