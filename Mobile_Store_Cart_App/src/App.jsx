import { ShoppingCart, Store } from 'lucide-react';
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import CartItems from "./components/CartItems"
import CartSummary from "./components/CartSummary"
import { useEffect, useReducer } from 'react';
import { cartReducer, initialState } from './reducers/cartReducer';

const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const totalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900'>
      <header className='bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50'>
        <div className='flex items-center justify-between max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-20'>
          <div className='flex items-center gap-2'>
            <div className='bg-indigo-600 p-2 rounded-lg '>
              <Store className='text-white' size={24} />
            </div>
            <h1 className='text-2xl font-bold
            bg-linear-to-r from-indigo-900 to-pink-700 bg-clip-text text-transparent'>Mobile Kart</h1>
          </div>
          <div className='p-2 relative hover:bg-slate-100 rounded-full transition-colors cursor-pointer'>
            <ShoppingCart className='text-slate-700' size={24} />
            {totalItems > 0 && (<span className='absolute top-0 right-1 text-white bg-indigo-600 text-[12px] border-white shadow-sm ring-1 ring-indigo-600 w-5 h-5 font-bold flex justify-center items-center rounded-full'>{totalItems}</span>)}

          </div>
        </div>
      </header>
      <main className='max-w7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          {/* Product Section */}
          <div className='lg:col-span-8 space-y-8'>
            <div className='flex items-center justify-between'>
              <h2 className='text-3xl font-bold text-slate-800'>New Arrivals</h2>
              <span className='text-slate-500 text-sm font-medium'>{products.length} Products</span>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {products.map((product) => (<ProductCard key={product.id} dispatch={dispatch} product={product} />))}
            </div>
          </div>
          {/* cart Section */}
          <div className='lg:col-span-4 pl-0 lg:pl-4'>
            {state.cart.length > 0 ? (<>
              <div className='mb-5'>
                <h2 className='text-2xl font-bold text-slate-800'>Your Cart</h2>
              </div>
              <div className='space-y-5'>
                <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
                  <h3 className='text-lg font-bold text-slate-500 mb-4'>Cart Items</h3>
                  <div className='max-h-100 overflow-y-auto pr-2 space-y-1'>
                    {state.cart.map((item) => (<CartItems dispatch={dispatch} key={item.id} product={item} />))}
                  </div>
                </div>
                <CartSummary dispatch={dispatch} total={state.total} CartItemCount={totalItems} />
              </div>
            </>) : (<div className='sticky top-24 bg-white rounded-2xl p-8 border border-slate-100 text-center'>
              <div className='bg-slate-100 w-16 h-16 rounded flex items-center justify-center mx-auto mb-4 '>
                <ShoppingCart />
              </div>
              <h3 className='text-lg font-bold text-slate-800 mb-2'>Your cart is empty</h3>
              <p className='text-slate-500 text-sm'>Looks like you haven't added anything to your cart yet.</p>
            </div>)}


          </div>
        </div>
      </main>
    </div>
  )
}

export default App