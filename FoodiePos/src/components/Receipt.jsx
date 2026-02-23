import React from 'react'

const Receipt = ({ orderDetails, cart }) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    const date = orderDetails?.date || new Date().toLocaleString();
    const orderId = orderDetails?.id || `POS-${Math.floor(Math.random() * 10000)}`
    return (
        <div id="recepit-print"
            className='p-8 bg-white text-slate-800 font-mono text-sm'
        >
            <div className='text-center border-b-2 border-dashed border-slate-300 pb-4 mb-4'>
                <h1 className='text-2xl font-bold uppercase tracking-widest'>GRAND HOTEL</h1>
                <p className='text-xs text-slate-500'>123 Food Street, Tasty City</p>
                <p className='text-xs text-slate-500'>Tel: +91 1234567890</p>
            </div>
            <div className='flex justify-between mb-4 text-xs'>
                <span>Order #{orderId}</span>
                <span>{date}</span>
            </div>

            <div className='border-b border-slate-200 pb-2 mb-2'>
                <div className='flex justify-between font-bold mb-1'>
                    <span className='flex-2'>Item</span>
                    <span className='flex-1 text-center'>Qty</span>
                    <span className='flex-1 text-right'>Price</span>
                </div>
                {cart.map((item) => (
                    <div key={item.id} className='flex justify-between py-1'>
                        <span className='flex-2 truncate'>{item.name}</span>
                        <span className='flex-1 text-center'>x{item.quantity}</span>
                        <span className='flex-1 text-right'>₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>

            <div className='space-y-1 mb-4'>
                <div className='flex justify-between'>
                    <span>subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between'>
                    <span>GST (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className='flex justify-between font-bold text-lg pt-2 border-t-2 border-dashed border-slate-300'>
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                </div>
            </div>
            <div className='text-center text-xs mt-8'>
                <p className='font-bold'>Thank You!</p>
                <p>Visit Again</p>
            </div>

        </div>
    )
}

export default Receipt