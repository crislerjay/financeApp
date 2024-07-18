import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="notFound">
      <h1 className="heading01">Page not Found</h1>
      <button className="backBtn mt20" onClick={() => navigate('/')}>back to home</button>
    </div>
  )
}
