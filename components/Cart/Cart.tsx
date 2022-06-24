import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);

  console.log('cart component: ', cart)

  return (
    <div className="text-3xl font-bold underline">Cart: {cart.totalPrice}</div>
  )
}

export default Cart