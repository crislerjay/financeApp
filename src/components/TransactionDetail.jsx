import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TransactionDetail({transaction}) {
  const navigate = useNavigate()

  return (
    <div className={`flex transaction ${transaction.category}`} onClick={() => navigate(`/transactions/${transaction._id}`)}>
      <div>
        <p className="title">{transaction.category}</p>
        <p className="description">{transaction.description}</p>
      </div>
      <div>
        <p className={`amount ${transaction.type}`}>{transaction.amount}</p>
        <p className="date">{transaction.date}</p>
      </div>
    </div>
  )
}
