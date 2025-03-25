import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// let URL = "https://midnight-fuel.onrender.com";
// let URL = "http://localhost:4000";
const URL = import.meta.env.VITE_API_URL;


const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

export const loginAdmin = createAsyncThunk("/login", async (formData) => {
  try {
    console.log(localStorage.getItem('adminToken'));
    const response = await axios.post(
      `${URL}/api/admin/login`,
      formData,
      { withCredentials: true }
    );
    console.log(response)
    return response?.data;
  } catch (error) {
    console.log(error);
  }
});

// export const logoutAdmin = createAsyncThunk("/logout", async () => {
//   const response = await axios.get("http://localhost:4000/api/admin/logout");
//   return response?.data;
// });

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logoutAdmin : (state)=>{
      state.isAuthenticated = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
        state.user = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
      });
  },
});

export const {logoutAdmin} = authSlice.actions
export default authSlice.reducer;
