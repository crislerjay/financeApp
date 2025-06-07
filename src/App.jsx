import './App.css'
import { Routes, Route } from 'react-router-dom'
import NotFound from './NotFound';
import Dashboard from './pages/dashboard';
import Transactions from './pages/transactions';
import SingleTransaction from './pages/transactions/singleTransaction';
import Statistics from './pages/statistics';
import Auth from './pages/auth';
import PrivateRoutes  from './utils/PrivateRoutes';
import AddFrom from './pages/addFrom';
import { TransactionsProvider } from './context/TransactionsContext';
import { ToastContainer } from 'react-toastify';
import Category from './pages/category';
import SingleCategory from './pages/category/singleCategory';
// import Maintenance from './components/Maintenance';

function App() {

  return (
    <div className='App'>
      <TransactionsProvider>
      <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/add' element={<AddFrom/>} />
            <Route path='/transactions' element={<Transactions/>} />
            <Route path='/transactions/:id' element={<SingleTransaction/>} />
            <Route path='/category' element={<Category/>} />
            <Route path='/category/:id' element={<SingleCategory/>} />
            <Route path='/statistics' element={<Statistics/>} />
        </Route>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/' element={<Dashboard/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      </TransactionsProvider>
    </div>
  )
}

export default App
