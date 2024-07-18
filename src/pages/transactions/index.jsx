import HeaderNavi from "../../components/HeaderNavi";
import TransactionList from "../../components/TransactionList";
import { TransactionsContext } from "../../context/TransactionsContext";
import { useContext } from "react";
import LoadingSpinner from '../../components/LoadingSpinner';

export default function transactions() {
  const { transactions, isLoading } = useContext(TransactionsContext)

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <HeaderNavi />
      {transactions && transactions.length == 0 ? <p className='heading03 mt30'>No Records Found!</p>: <TransactionList transactions={transactions}/>}
    </>
  )
}
