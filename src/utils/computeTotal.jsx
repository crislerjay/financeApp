export const computeTotal = (transactions) => {
  let expense = 0;
  let income = 0;

  transactions.forEach(item => {
    if (item.type === 'expense') {
      expense += item.amount;
    } else if (item.type === 'income') {
      income += item.amount;
    }
  });

  let total = income - expense

  return {
    total,
    expense,
    income
  };
};