import { createSlice } from '@reduxjs/toolkit'
import { cartHandler } from '../components/http_requests';

const authSlice = createSlice({
    name: "Authentication",
    initialState: {
        isAuthenticated: false,
        name: 'guest',
        email: '',
        profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnW0NUpcrZcGZeUJ4e50ZLU8ugS9GPPoqww&usqp=CAU',
        cart: {}
    },
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.profileImage = action.payload.profileImage;
            state.cart = action.payload.cart || {};
        },
        logout(state) {
            state.isAuthenticated = false;
            state.name = 'guest';
            state.email = '';
            state.profileImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnW0NUpcrZcGZeUJ4e50ZLU8ugS9GPPoqww&usqp=CAU";
            state.cart = {};
        },
        addToCard(state, action) {
            if (state.cart[action.payload.id]) {
                state.cart[action.payload.id]++;
            } else {
                state.cart[action.payload.id] = 1;
            }
            // cartHandler(state);
        },
        removeFromCart(state, action) {
            if (state.cart[action.payload.id] > 1) {
                state.cart[action.payload.id]--;
            } else {
                ({ [action.payload.id]: state.cart[action.payload.id], ...state.cart } = state.cart)
            }
        },
        changeImage(state, action) {
            state.profileImage = action.payload;
        }
    }
})

export default authSlice;