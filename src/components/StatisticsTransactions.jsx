import { useEffect, useState } from "react";
import StatisticsList from "./StatisticsList";

export default function StatisticsTransactions({ transactions, year, month, type }) {
  let [filterData, setFilterData] = useState('')

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getMonth = (month) => {
    if (month < 1 || month > 12) {
      return 'Invalid month number'
    }
    return months[month - 1]
  };

  const filterTransactions = (transactions, year, month, type) => {
    return transactions.filter(transaction => {
      const transactionYear = new Date(transaction.date).getFullYear();
      const transactionMonth = new Date(transaction.date).getMonth() + 1;
      return transactionYear === year && transactionMonth === month && transaction.type === type;
    });
  };

  useEffect(() => {
    const filteredTransactions = filterTransactions(transactions, year, month, type);
    setFilterData(filteredTransactions);
  }, [type, year, month])
  
  return (
    <>
      {filterData.length === 0 ? <p className='heading03 mt30'>No Records Found!</p>: <StatisticsList month={getMonth(month)} year={year} type={type} transactions={filterData} />}
    </>
  )
}
