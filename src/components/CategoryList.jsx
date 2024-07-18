import { useNavigate } from "react-router-dom";
import { formatNumber } from '../utils/formatNumber';

export default function CategoryList({transactions}) {
  const navigate = useNavigate()

  return (
    <div className="transactionsList mt20">
      {transactions && transactions.map(transaction => (
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
  )
}
