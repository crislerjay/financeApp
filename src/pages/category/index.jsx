import { useNavigate } from 'react-router-dom'
import HeaderNavi from '../../components/HeaderNavi'

export default function Category() {
  const navigate = useNavigate()

  const categories = [ 'salary', 'shopping', 'bills', 'health', 'food', 'business', 'transportation', 'credit', 'gadgets', 'vehicle', 'family', 'travel', 'beverage', 'vape' ]

  return (
    <>
    <HeaderNavi />
    <div className="transactionsList mt10">
      {categories.map((category, index) => (
        <div key={index} className={`flex transaction ${category}`} onClick={() => navigate(`/category/${category}`)}>
          <p className="title mb0">{category}</p>
        </div>
      ))}
    </div>
    </>
  )
}
