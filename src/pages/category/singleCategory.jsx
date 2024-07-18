import React, { useEffect, useState } from 'react'
import HeaderNavi from '../../components/HeaderNavi'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { TransactionsContext } from '../../context/TransactionsContext'
import LoadingSpinner from '../../components/LoadingSpinner'
import CategoryList from '../../components/CategoryList'

export default function SingleCategory() {
  const { id } = useParams()
  const { transactions, isLoading } = useContext(TransactionsContext)
  const [ filteredData, setFilteredData ] = useState([])

  useEffect(() => {
    const expenseTransactions = transactions.filter(transaction => transaction.category === id);
    setFilteredData(expenseTransactions);
  }, [])

  if (isLoading) return <LoadingSpinner />

  return (
    <>
    <HeaderNavi />
    <h2 className="heading02 mt10 tCaps tCenter">{id}</h2>
    {filteredData.length == 0 ? <p className='heading03 mt30'>No Records Found!</p>: <CategoryList transactions={filteredData}/>}
    </>
  )
}
