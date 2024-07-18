import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { useUser } from "@clerk/clerk-react";

const TransactionsContext = createContext();
// const API_URL = 'http://localhost:3000/api/expenses/';
const API_URL = 'https://financeappapi-3ghx.onrender.com/api/expenses/';
// const API_URL = 'https://jsonplaceholder.typicode.com/todos/';

const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([])
  const [editTransactions, setEditTransactions] = useState([])
  const [singleData, setSingleData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  
  const fetchData = async () => {
    if (!user) return;

    try {
      setIsLoading(true)
      const response = await axios.get(`${API_URL}user/${user.id}`);
      if (response.status == '200') {
        const records = await response.data
        setTransactions(records)
        setIsLoading(false)
      }
    } catch (err) {
      setIsLoading(false)
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData()
  }, [user])

  const handleCreate = (newItem) => {
    axios.post(API_URL, newItem)
      .then((response) => {
        setTransactions([{ userId: newItem.userId, _id: response.data._id, amount: newItem.amount, description: newItem.description, type: newItem.type, category: newItem.category, date: newItem.date  }, ...transactions])
      })
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}${id}`)
        .then(() => {
          setTransactions(transactions.filter(val => {
            return val._id != id
          }))
        })
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleUpdate = async (id, amount, description, category, type, date) => {
    const response = await axios.put(`${API_URL}/${id}`, { id, amount, description, category, type, date })
      .then(() => {
        setTransactions(transactions.map(val => {
          return val._id == id ? {_id: id, amount: amount, description: description, category: category, type: type, date: date } : val
        }))
      })
  }

  const getSingle = async (id) => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${API_URL}${id}`)
      if (response.status == '200') {
        const records = await response.data
        setSingleData(records)
        setIsLoading(false)
      }
    } catch (err) {
      setIsLoading(false)
      console.log(err.message)
    }
  }

  return (
    <TransactionsContext.Provider value={{ getSingle, singleData, transactions, isLoading, handleDelete, handleCreate, handleUpdate }}>
      { children }
    </TransactionsContext.Provider>
  )
}

export { TransactionsContext, TransactionsProvider }