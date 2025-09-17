import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
    _id: string;
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
        login(state, action: PayloadAction<Partial<UserData>>) {
            state.isLogin = true;

            state.user = {
                _id: action.payload._id || '',
                email: action.payload.email || '',
                name: action.payload.name || '',
                contact: action.payload.contact || '',
                cartItemCount: action.payload.cartItemCount || 0,
                ...action.payload
            };

        },
        logout(state) {
            state.isLogin = false;
            state.user = null;
        },
        updateCartItemCount(state, action: PayloadAction<number>) {
            if (state.user) {
                state.user.cartItemCount = action.payload;
            }
        },
    },
});

export const { login, logout, updateCartItemCount } = authSlice.actions;
export default authSlice.reducer;