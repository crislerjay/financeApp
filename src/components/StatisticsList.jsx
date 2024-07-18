import { useNavigate } from "react-router-dom";
import { formatNumber } from '../utils/formatNumber';

export default function StatisticsList({transactions, month, year, type}) {
  const navigate = useNavigate()
  const computeTotalIncome = (transactions) => {
    return transactions
      .filter(transaction => transaction.type === type)
      .reduce((total, transaction) => total + transaction.amount, 0)
  };

  const totalIncome = computeTotalIncome(transactions);

  return (
    <>
    <div className="card">
      <div className="total_balance">
        <p className="fs16 tCenter">Total {type} for {month} {year}</p>
        <h1 className="heading01 mt10 tCenter">&#8369; {formatNumber(totalIncome)}</h1>
      </div>
    </div>
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
  </>
  )
}
