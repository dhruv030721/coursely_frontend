import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
    email: string;
    name: string;
    contact: string;
    cartItemCount: number
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
            console.log(action.payload)
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
        updateCartItemCount(state, action: PayloadAction<number>) {
            if (state.user) {
                state.user.cartItemCount = action.payload;
            }
        },
    },
});

export const { login, logout, updateUser, updateCartItemCount } = authSlice.actions;
export default authSlice.reducer;