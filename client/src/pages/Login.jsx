import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Enter username");
      return;
    }

    const cleanName = username.trim();

    // save username
    localStorage.setItem("username", cleanName);

    // save avatar
    localStorage.setItem(
      "avatar",
      "https://ui-avatars.com/api/?name=" + cleanName
    );

    navigate("/chat");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          width: "350px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px gray",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid gray",
              outline: "none",
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid gray",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid gray",
              outline: "none",
            }}
          />

          {/* FIXED BUTTON (NO BLUE ANYMORE) */}
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#075e54",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "#064c45")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "#075e54")
            }
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}