import { FadeLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function LoadingSpinner() {
  return (
    <div className="loading">
      <FadeLoader 
        color="#FC4747"
        size={150}
        cssOverride={override}
      />
    </div>
  )
}
