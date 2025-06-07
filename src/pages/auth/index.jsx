import { SignedOut, SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import mv from '/assets/images/finance.jpg'
import { useEffect } from "react";

export default function Auth() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/"); // ⬅️ Redirect manually when signed in
    }
  }, [isSignedIn]);

  return (
    <div className="auth">
      <div className="intro">
        <h1 className="title">SpendSmart</h1>
        <p className="text">Your Digital Finacial Record</p>
      </div>
      <div className="mv mt20">
        <img src={mv} alt="mv" />
      </div>
      <div className="mt20">
        <SignedOut>
          <SignUpButton className="btn" mode="modal"/>
          <SignInButton className="btn mt15" mode="modal"/>
        </SignedOut>
      </div>
    </div>
  )
}
