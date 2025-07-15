import { AppDispatch } from "@/store";
import { ProductType } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

type userType ={
  name: string
  login: string
  phone?: string
  password?: string
  id?: string
}


const getUsers = async (): Promise<userType[]> => {
  const usersResult = await fetch(`http://localhost:7000/users`);
  return await usersResult.json();
}

export const login = createAsyncThunk<userType | void, userType, {rejectValue: {message: string}}>(
  "user/login", 
  async (userForm, { rejectWithValue }) => {
    const users: userType[] = await getUsers()
    const checkUserLogin = users.find(user => user.login === userForm.login && user.password === userForm.password)
    
    if(checkUserLogin){
      return checkUserLogin
    }else if(!checkUserLogin){
      return rejectWithValue({message: 'Логин или пароль неверны'})
    }
  }
);


export const registration = createAsyncThunk<userType, userType, {rejectValue: {message: string}}>(
  "user/registration",
  async (userForm, { rejectWithValue }) => {
    const users: userType[] = await getUsers()

    const checkUser = users.some(user => user.login === userForm.login || user.phone === userForm.phone)

    if(checkUser){
      return rejectWithValue({message: 'Пользовоатель уже зарегестрирован'})
    }

    if(!checkUser){
      const result = await fetch("http://localhost:7000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userForm),
      });
      const user = await result.json()
      return user
      }
    }
);

type InitialStateRegistration = {
  user: userType | null
}

const initialState: InitialStateRegistration = {
  user: null,
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default registrationSlice.reducer;
