import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";

export default function AddFrom() {
  const navigate = useNavigate()
  return (
    <>
    <div className="flex">
      <h2 className="heading02 pt10">Create Transaction</h2>
      <button className="backBtn mt10" onClick={() => navigate(-1)}>Back</button>
    </div>
    <Form />
    </>
  )
}
