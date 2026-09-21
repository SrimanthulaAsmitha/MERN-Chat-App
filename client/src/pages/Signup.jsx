import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/signup",
        {
          email,
          password,
        }
      );

      alert(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}