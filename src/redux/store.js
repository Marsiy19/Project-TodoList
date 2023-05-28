
import { configureStore } from "@reduxjs/toolkit";
import signReducer from '../redux/login_register/authSlice'
// import categoryReducer from './categorySlice/categorySlice'
export default configureStore({
    reducer: {
        register: signReducer,
        // category: categoryReducer
    }
})