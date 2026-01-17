import { ArrowRight, ShoppingBag } from 'lucide-react'
import React from 'react'

const CartSummary = ({ dispatch, total, CartItemCount }) => {
    return (
        <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-8'>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-slate-800 flex items-center gap-2'>
                    <ShoppingBag className='text-indigo-600' />
                    Your Cart
                </h2>
                <span className='bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full'>{CartItemCount} Items</span>
            </div>
            <div className='space-y-4'>
                <div className='flex justify-between text-slate-600'>
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className='flex justify-between text-slate-600'>
                    <span>Tax (18%)</span>
                    <span>₹{(total * 0.18).toLocaleString("en-IN")}</span>
                </div>
                <div className='h-px bg-slate-100 my-4'></div>
                <div className='flex justify-between text-slate-900 text-lg font-bold'>
                    <span>Total</span>
                    <span>₹{(total + total * 0.18).toLocaleString("en-IN")}</span>
                </div>
            </div>
            <button className='w-full mt-8 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl
            font-bold text-sm shadow-md shadow-indigo-200 transition-all duration-300 flex items-center justify-center gap-2 group'>
                <span>Checkout</span>
                <ArrowRight className='group-hover:translate-x-1 transition-transform' />
            </button>
            <button onClick={() => dispatch({ type: "CLEAR_CART" })} className='w-full mt-3 text-red-500 text-xs font-medium hover:underline text-center'>Clear Cart</button>
        </div>
    )
}

export default CartSummary