import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
    name: string;
    email: string;
    contact: string;
}

interface AuthState {
    isLogin: boolean;
    user: UserData | null;
}

const initialState: AuthState = {
    isLogin: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserData>) {
            state.isLogin = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isLogin = false;
            state.user = null;
        },
        updateUser(state, action: PayloadAction<Partial<UserData>>) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
    },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;