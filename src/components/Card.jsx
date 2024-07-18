import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import { computeTotal } from '../utils/computeTotal';
import { formatNumber } from '../utils/formatNumber';

export default function Card() {
  const { transactions } = useContext(TransactionsContext)
  const { expense, income, total } = computeTotal(transactions)

  return (
    <div className="card">
      <div className="total_balance">
        <p className="fs16 fwNromal">Total Balance</p>
        <h1 className="heading01">&#8369; {formatNumber(total)}</h1>
      </div>
      <div className="flex fs15 mt20">
        <div>
          <p className="fwNromal"><span className="circle">&darr;</span>Income</p>
          <p className="heading02 mt5">&#8369; {formatNumber(income)}</p>
        </div>
        <div>
          <p className="fwNromal"><span className="circle">&uarr;</span>Expenses</p>
          <p className="heading02 mt5">&#8369; {formatNumber(expense)}</p>
        </div>
      </div>
    </div>
  )
}
