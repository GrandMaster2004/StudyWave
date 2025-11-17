import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  signupData: null,
  loading: false,

  // Do NOT parse the token – JWT is not JSON
  token: localStorage.getItem("token") || null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      localStorage.setItem("token", action.payload) // optional: persist token
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setSignupData(state, action) {
      state.signupData = action.payload
    },
  },
})

export const { setSignupData, setLoading, setToken } = authSlice.actions
export default authSlice.reducer
