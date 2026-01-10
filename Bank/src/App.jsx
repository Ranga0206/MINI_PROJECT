import { BankProvider, useBank } from "./context/BankContext";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Deposit from "./pages/Deposit";
import WithDraw from "./pages/WithDraw";
import Transactions from "./pages/Transactions"


const ProtectedRoute = ({ children }) => {
  const { state } = useBank();

  if (!state.account) {
    return <Navigate to="/" replace />
  }
  return children;
}


const AppRoutes = () => {
  const { state } = useBank();


  return (
    <Routes>
      <Route path="/" element={state.account ? <Navigate to="/dashboard" replace /> : <Home />} />
      <Route path="/dashboard" element={<ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>} />
      <Route path="/deposit" element={<ProtectedRoute>
        <Layout>
          <Deposit />
        </Layout>
      </ProtectedRoute>} />
      <Route path="/withdraw" element={<ProtectedRoute>
        <Layout>
          <WithDraw />
        </Layout>
      </ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute>
        <Layout>
          <Transactions />
        </Layout>
      </ProtectedRoute>} />
    </Routes>
  )
}



const App = () => {
  return (
    <BankProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </BankProvider>
  )
}

export default App