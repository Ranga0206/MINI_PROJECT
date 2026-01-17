import { Minus, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const CartItems = ({ product, dispatch }) => {
    return (
        <div className='flex items-center p-4 gap-4 mb-4 bg-slate-50
        rounded-xl border border-slate-100'>
            <img className='w-20 h-20 object-cover rounded-lg shadow-sm' src={product.image} alt={product.name} />
            <div className='flex-1'>
                <h4 className='font-semibold text-slate-800 text-sm leading-tight mb-1'>{product.name}</h4>
                <p className='text-indigo-600 text-sm font-bold'>₹{(product.price * product.quantity).toLocaleString("en-IN")}</p>
            </div>
            <div className='flex flex-col items-end gap-2 '>
                <button onClick={() => dispatch({
                    type: "REMOVE_FROM_CART", payload: product,
                })} className='text-slate-400 cursor-pointer hover:text-red-500 transition-colors p-1'>
                    <Trash2 size={16} />
                </button>
                <div className='flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm '>
                    <button
                        onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: product })}
                        className='w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer'>
                        <Minus size={14} />
                    </button>

                    <span className='text-slate-600 font-semibold'>{product.quantity}</span>
                    <button
                        onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: product })}
                        className='w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer'>
                        <Plus size={14} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItems