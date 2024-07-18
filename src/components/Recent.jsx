import { Link, useNavigate } from 'react-router-dom';
import { formatNumber } from '../utils/formatNumber';

export default function Recent({transactions}) {
  let limitedData = transactions.slice(0, 5)
  const navigate = useNavigate()

  return (
    <>
      <div className="flex mt20">
        <p className="heading03">Recent transactions</p>
        <p className="fs14"> <Link to={'/transactions'}>See all</Link></p>
      </div>
      
      <div className="transactionsList mt20">
        {limitedData && limitedData.map(transaction => (
          <div key={transaction._id} className={`flex transaction ${transaction.category}`} onClick={() => navigate(`/transactions/${transaction._id}`)}>
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
