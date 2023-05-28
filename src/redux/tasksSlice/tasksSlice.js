import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const setTodos = createAsyncThunk(
  'post/setTodos',
  async function(_, {rejectWithValue}) {
    try {
      const response = await axios.get('http://todo.paydali.uz/api/tasks');
      console.log(response);
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async function(id, {rejectWithValue, dispatch}) {
    try {
      const response = await axios.delete(`http://todo.paydali.uz/api/tasks/${id}`)
      console.log(response);
      if(!response.status === 200) {
        throw new Error("Can't delete task. Server Error.");
      }
      dispatch(deleteText({id}))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)


export const toggleText = createAsyncThunk(
  'post/toggleText',
  async function (id, {rejectWithValue, dispatch, getState}) {
    const text = getState().post.post.find(tex => tex.id === id)

    try {
      const response = await axios.patch(`http://todo.paydali.uz/api/tasks/${id}`, {
          completed: !text.completed
      });
      console.log(" Toggle ", response);

      if(!response.status === 200) {
        throw new Error("Can't toggle status. Server error.");
      }

      dispatch(toggleComplete({id}));

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addPost = createAsyncThunk(
  'post/addPost',
  async function (text, {rejectWithValue, dispatch}) {
    try {
      const post = {
        title: text,
        userId: 1,
        completed: false,
      };
      const response = await axios.post('http://todo.paydali.uz/api/tasks', post);
      if(!response.status === 201) {
        throw new Error("Can't add task. Server error.")
      }
      const data = response.data
      console.log(data);
      dispatch(addTodo(data))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)