import React, { useContext, useEffect } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const notifyUpdated = () => toast.success('Transaction updated', { autoClose: 3000 })
const notifyDeleted = () => toast.success('Transaction deleted', { autoClose: 3000 })

const schema = yup.object().shape({
  amount: yup.number().typeError('Amount must be a number').required('Amount is required').positive('Amount must be a positive number').integer('Amount must be an integer'),
  description: yup.string().required('Description is required'),
  category: yup.string().oneOf(['salary', 'shopping', 'bills', 'health', 'food', 'beverage', 'business', 'transportation', 'credit', 'gadgets', 'vehicle', 'family', 'travel', 'vape'], 'Select a valid category').required('Catrgory is required'),
  type: yup.string().oneOf(['income', 'expense'], 'Select a valid type').required('Transaction type is required'),
  date: yup.date().required('Date is required').typeError('Invalid date').min(new Date(2024, 0, 1), 'Date cannot be earlier than 2024')
});

export default function EditForm({_id, _amount, _description, _category, _type, _date}) {
  const { handleUpdate, handleDelete } = useContext(TransactionsContext)
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: '',
      description: '',
      category: '',
      type: '',
      date: '',
    }
  });

  useEffect(() => {
    reset({
      amount: _amount,
      description: _description,
      category: _category,
      type: _type,
      date: _date,
    });
  }, [_amount, _description, _category, _type, _date, reset]);

  const onSubmit = data => {
    handleUpdate(_id, parseInt(data.amount), data.description, data.category, data.type, format(new Date(data.date), 'yyyy-MM-dd'))
    notifyUpdated()
    navigate('/')
  };

  const onDelete = () => {
    handleDelete(_id)
    notifyDeleted()
    navigate('/')
  }

  return (
    <>
    <form className="form mt20" onSubmit={handleSubmit(onSubmit)}>
    <div className='formGroup'>
        <div className="flex">
          <label>Category</label>
          <p className="error">{errors.category?.message}</p>
        </div>
        {/* <select defaultValue="salary" */}
        <select {...register('category')}>
          <option value="">Select category</option>
          <option value="salary">Salary</option>
          <option value="shopping">Shopping</option>
          <option value="bills">Bills</option>
          <option value="health">Health</option>
          <option value="food">Food</option>
          <option value="business">Business</option>
          <option value="transportation">Transportation</option>
          <option value="credit">Credit</option>
          <option value="gadgets">Gadgets</option>
          <option value="vehicle">Vehicle</option>
          <option value="family">Family</option>
          <option value="travel">Travel</option>
          <option value="beverage">Beverage</option>
          <option value="vape">Vape</option>
        </select>
      </div>
      
      <div className='formGroup'>
        <div className="flex">
          <label>Transaction Type:</label>
          <p className="error">{errors.type?.message}</p>
        </div>
        <select {...register('type')}>
        <option value="">Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className='formGroup'>
        <div className="flex">
          <label>Amount:</label>
          <p className="error">{errors.amount?.message}</p>
        </div>
        <input type="number" {...register('amount')} placeholder='Add amount' />
      </div>
      
      <div className='formGroup'>
        <div className="flex">
          <label>Description:</label>
          <p className="error">{errors.description?.message}</p>
        </div>
        <input {...register('description')} placeholder='Add description' />
      </div>
      
      <div className='formGroup'>
        <div className="flex">
          <label>Date</label>
          <p className="error">{errors.date?.message}</p>
        </div>
        <input type="date" {...register('date')} min="2024-01-01" />
      </div>

      <button className='btn' type="submit">Update</button>
    </form>
    <button className='btn btnRed mt15' onClick={() => onDelete()}>Delete</button>
    </>
  )
}