import { useContext, useState } from "react";
import { TransactionsContext } from "../../context/TransactionsContext";
import StatisticsTransactions from "../../components/StatisticsTransactions";
import HeaderNavi from "../../components/HeaderNavi";
import LoadingSpinner from '../../components/LoadingSpinner';

export default function statistics() {
  const { transactions, isLoading } = useContext(TransactionsContext)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [type, setType] = useState('income')

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const yearOptions = () => {
    let currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 0; i <= currentYear; i++) {
      years.push(i);
    }
    return years.map(year => (
      <option key={year} value={year}>{year}</option>
    ));
  };

  // Generate options for months
  const monthOptions = (e) => {
    const months = [
      { value: 1, label: 'January' },
      { value: 2, label: 'February' },
      { value: 3, label: 'March' },
      { value: 4, label: 'April' },
      { value: 5, label: 'May' },
      { value: 6, label: 'June' },
      { value: 7, label: 'July' },
      { value: 8, label: 'August' },
      { value: 9, label: 'September' },
      { value: 10, label: 'October' },
      { value: 11, label: 'November' },
      { value: 12, label: 'December' },
    ];

    return months.map(month => (
      <option key={month.value} value={month.value}>{month.label}</option>
    ));
  };
  
  const typeOptions = (e) => {
    setType(e.target.value)
  }
  
  if (isLoading) return <LoadingSpinner />

  return (
   <>
    <HeaderNavi />
    <p className="fs16 mt5">Filter by Date and Type</p>
    <form className="flex formFilter mt10">
      <div className="div">
        <label htmlFor="year">Year:</label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          {yearOptions()}
        </select>
      </div>

      <div className="div">
        <label htmlFor="month">Month:</label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
          {monthOptions()}
        </select>
      </div>

      <div className="div">
        <label htmlFor="type">Type:</label>
        <select id="type" value={type} onChange={typeOptions}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
    </form>

    {transactions && transactions.length == 0 ? <p className='heading03 mt30'>No Records Found!</p>: <StatisticsTransactions transactions={transactions} year={selectedYear} month={selectedMonth} type={type}/>}
   </>
  )
}
