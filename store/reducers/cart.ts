import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductItem { 
  productId: string; title: string; price: number
}
export interface CartState {
  totalProducts: number;
  totalPrice: number;
  products: ProductItem[]
}
const initialState: CartState = {
  totalProducts: 0,
  totalPrice: 0,
  products: []
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductItem>) => {
      state.products.push(action.payload)
      state.totalPrice += action.payload.price;
      state.totalProducts += 1;
      localStorage.setItem('cart', JSON.stringify(state));
    }
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { addProduct } = cartSlice.actions

export default cartSlice.reducer