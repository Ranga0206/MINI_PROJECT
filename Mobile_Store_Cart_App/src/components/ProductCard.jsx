import { ShoppingCart } from 'lucide-react'
import React from 'react'

const ProductCard = ({ product, dispatch }) => {
    return (
        <div className='bg-white rounded-xl overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col'>
            <div className='relative h-64 overflow-hidden bg-slate-50'>
                <img src={product.image} alt={product.name}
                    className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ' />
                <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <button
                        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
                        className='bg-white p-2.5 rounded-full shadow-lg text-slate-800 hover:text-indigo-600 hover:bg-slate-50 transition-colors cursor-pointer' title='Add To Cart'>
                        <ShoppingCart size={24} />
                    </button>
                </div>
            </div>
            <div className='p-5 flex flex-col flex-1'>
                <span className='tex-xs font-semibold text-slate-400 uppercase tracking-wider mb-1'>
                    {product.category}
                </span>
                <h3 className='text-lg font-bold text-slate-800 mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors'>{product.name}</h3>
                <div className='mt-auto pt-4 flex items-center justify-between border-t border-slate-100'>
                    <span className='text-lg font-bold text-slate-900'>₹{
                        product.price.toLocaleString("en-IN")}</span>
                    <button
                        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
                        className='text-sm font-semibold text-indgo-600 hover:text-indigo-700 hover:underline cursor-pointer transition-all'>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard