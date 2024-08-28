import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../app/user/userSlice.js";

export default function OAuth() {
  const auth = getAuth(app);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Provider: ", result);

      const res = await fetch("/api/v3/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.user),
      });

      const resData = await res.json();
      console.log("google Login: ", resData);

      if (res.ok) {
        dispatch(signInSuccess(resData.data));
        navigate("/");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="mr-2 w-6 h-6" />
      <span>Continue with Google</span>
    </Button>
  );
}
