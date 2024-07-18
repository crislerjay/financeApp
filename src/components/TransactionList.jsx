import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { formatNumber } from '../utils/formatNumber';

export default function TransactionList({transactions }) {
  const [filterData, setFilterData] = useState([])
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    switch (filter) {
      case '':
        setFilterData(transactions)
        break;
      case 'all':
        setFilterData(transactions)
        break;
      case 'income':
        const incomeTransactions = transactions.filter(transaction => transaction.type === 'income');
        setFilterData(incomeTransactions)
        break;
      case 'expense':
        const expenseTransactions = transactions.filter(transaction => transaction.type === 'expense');
        setFilterData(expenseTransactions)
        break;
      default:
        break;
    }
  }, [filter])

  return (
    <>
    <form className="form">
        <div className='formGroup'>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">Filter by transaction type</option>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </form>
    <div className="transactionsList">
      {filterData && filterData.map(transaction => (
        <div key={transaction._id} className={`flex transaction ${transaction.category}`} onClick={() => navigate(`/transactions/${transaction._id}`)} >
          <div>
            <p className="title">{transaction.category}</p>
            <p className="description">{transaction.description}</p>
          </div>
          <div>
            <p className={`amount ${transaction.type}`}>{formatNumber(transaction.amount)}</p>
            <p className="date">{transaction.date}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}
