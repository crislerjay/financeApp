import HeaderNavi from '../../components/HeaderNavi';
import { TransactionsContext } from "../../context/TransactionsContext";
import { useContext } from "react";
import Card from '../../components/Card';
import Recent from '../../components/Recent';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function Dashboard() {
  const { transactions, isLoading } = useContext(TransactionsContext)

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <HeaderNavi />
      <Card />
      {transactions && transactions.length == 0 ? <p className='heading03 mt30'>No Records Found!</p>: <Recent transactions={transactions}/>}
    </>
  )
}
