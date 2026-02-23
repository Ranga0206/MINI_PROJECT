import { useEffect, useState } from 'react'
import CartSidebar from './components/CartSidebar'
import OrderHistory from './components/OrderHistory'
import Receipt from './components/Receipt'
import MenuTile from "./components/MenuTile"
import { Clock, Pizza, Search } from 'lucide-react'
import menuData from "./data/menu.json";


const App = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [printOrder, setPrintOrder] = useState(null);

  //Load Pervious cart items from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("hotel-pos-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  })

  //Load Pervious order details from localStorage
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("hotel-pos-orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  })


  useEffect(() => {
    localStorage.setItem("hotel-pos-cart", JSON.stringify(cart))
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hotel-pos-orders', JSON.stringify(orders))
  }
    , [orders])

  //update Cart Item
  const updateCart = (item, quantity) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty <= 0) return prev.filter((i) => i.id !== item.id);
        return prev.map((i) => i.id === item.id ? { ...i, quantity: newQty } : i)
      }
      if (quantity > 0) return [...prev, { ...item, quantity: 1 }]
      return prev;
    })
    // console.log(cart)
  }

  //clear Cart
  const handleClear = () => {
    if (window.confirm("Clear all items from cart?")) {
      setCart([]);
    }
  }

  //Print Receipt
  const handlePrint = () => {
    const newOrder = {
      id: "POS_" + Date.now().toString(),
      date: new Date().toDateString('dd-MM-yyyy'),
      item: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.05
    }
    setOrders((prev) => [...prev, newOrder]);
    setPrintOrder(newOrder);
    setTimeout(() => {
      window.print();
      setCart([]);
      setPrintOrder(null);
    })
  };

  //print History
  const handleHistoryPrint = (order) => {
    setPrintOrder(order);

    setTimeout(() => {
      window.print();
      setPrintOrder(null);
    })
  }



  const categories = ["All", ...new Set(menuData.map((item) => item.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMenu = menuData.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  })

  // console.log(filteredMenu);
  return (
    <div className='flex h-screen bg-slate-50 overflow-hidden'>
      {/* main content */}
      <main className='flex-1 flex flex-col min-w-0'>
        <header className='bg-white border-b border-slate-200 p-6 flex items-center justify-between'>
          {/* Brand Name */}
          <div className='flex items-center'>
            <div>
              <h1 className='text-2xl font-black text-orange-500 tracking-tight flex items-center gap-2 mb-2'>
                <Pizza size={32} />
                Foodie POS</h1>
              <p className='text-slate-400 text-sm font-medium'>Table #04 -Cashier : Admin</p>
            </div>
          </div>
          {/* history + search */}
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => setShowHistory(true)}
              className='flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-bold text-sm cursor-pointer'>
              <Clock />
              History
            </button>
            <div className='relative'>
              <Search className='absolute top-2.5 left-2 w-4 h-4' />
              <input
                placeholder='Search food...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-slate-900 w-64 transition-all' type="text" />
            </div>
          </div>
        </header>
        {/* Categories */}
        <div className='p-6 overflow-x-auto bg-white border-b border-slate-100 no-scrollbar '>
          <div className='flex space-x-2'>
            {categories.map((cat, index) => (<button
              onClick={(e) => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl cursor-pointer text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 scale-105' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`} key={index}>{cat}</button>))}
          </div>
        </div>
        {/* Menu Tile */}
        <div className='flex-1 overflow-y-auto p-6 custom-scrollbar'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredMenu.map((item) => (<MenuTile key={item.id} item={item} onUpdate={updateCart} />))}
          </div>
        </div>
      </main >
      {/* Cart Sidebar */}
      < aside className='w-100 shrink-0' >
        <CartSidebar cart={cart} onClear={handleClear} onUpdate={updateCart} onPrint={handlePrint} />
      </aside >
      {/* Print Area */}
      <div id="printable-area" className='hidden'>
        <Receipt orderDetails={printOrder} cart={printOrder ? printOrder.item : cart} />
      </div>
      {showHistory && <OrderHistory onClose={() => setShowHistory(false)} orders={orders} onPrint={handleHistoryPrint} />}
    </div >
  )
}

export default App