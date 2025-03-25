import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// let URL = "https://midnight-fuel.onrender.com";
// let URL = "http://localhost:4000";
const URL = import.meta.env.VITE_API_URL;


const initialState = {
    sellers:[],
    users:[]
}

export const getUser = createAsyncThunk('/getUser', 
    async()=>{
        const response = await axios.post(`${URL}/api/admin/get-users`,
            {},
            {headers : {
                adminToken : localStorage.getItem('adminToken'),
            }},
        )
        return response.data;
    }
)

export const getSeller = createAsyncThunk('/getseller',
    async()=>{
        const response = await axios.post(`${URL}/api/admin/get-sellers`,{},
            {headers : {
                adminToken : localStorage.getItem('adminToken'),
            }},
        )
        return response.data;
    }
)

export const verifySeller = createAsyncThunk('/verifySeler',
    async(sellerId)=>{
        try {
            const response = await axios.post(`${URL}/api/admin/verify-seller/${sellerId}`,
                {},
                {headers : {
                    adminToken : localStorage.getItem('adminToken'),
                }},
            )
            return response.data;
        } catch (error) {
            console.log("error in verifySeller", error);
            
        }
    }
)

export const rejectSeller = createAsyncThunk('/rejectSeller',
    async(sellerId)=>{
        console.log("reject seller ", sellerId);
        try {
            const response = await axios.post(`${URL}/api/admin/reject-seller/${sellerId}`,
                {},
                {headers : {
                    adminToken : localStorage.getItem('adminToken'),
                }},
            )

            return response.data;
        } catch (error) {
            console.log("error in rejectSeller ", error);
        }
    }
)

const controlSlice = createSlice({
    name: 'controlSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUser.pending, (state)=>{
            state.users = [];
        })
        .addCase(getUser.fulfilled, (state, action)=>{
            state.users = action.payload.data;
        })
        .addCase(getUser.rejected, (state)=>{
            state.users = [];
        })
        .addCase(getSeller.pending, (state)=>{
            state.sellers = [];
        })
        .addCase(getSeller.fulfilled, (state, action)=>{
            state.sellers = action.payload.data;
        })
        .addCase(getSeller.rejected, (state)=>{
            state.sellers = [];
        })
    }
})


export default controlSlice.reducer
