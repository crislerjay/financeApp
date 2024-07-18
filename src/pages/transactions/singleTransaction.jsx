import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TransactionsContext } from '../../context/TransactionsContext';
import EditForm from '../../components/EditForm';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function singleTransaction() {
  const { getSingle, singleData, isLoading } = useContext(TransactionsContext)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getSingle(id)
  }, [])

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <div className="flex">
        <h2 className="heading02 tCenter pt10">Transaction Details</h2>
        <button className="backBtn mt10" onClick={() => navigate(-1)}>Back</button>
      </div>
      {singleData && singleData.length == 0 ? <p className='heading03 mt30'>No Records Found!</p>: <EditForm _id={singleData._id} _amount={singleData.amount} _description={singleData.description} _category={singleData.category} _type={singleData.type} _date={singleData.date} /> }
    </>
  )
}