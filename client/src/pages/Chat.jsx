import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const endRef = useRef(null);

  const currentUser = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");

  useEffect(() => {
    if (!currentUser) {
      window.location.href = "/";
    }
  }, [currentUser]);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/messages/all"
      );

      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();

    socket.emit("user_online", currentUser);

    socket.on("receive_message", (data) => {
      console.log("Received Message:", data);

      setMessages((prev) => {
        const exists = prev.some(
          (msg) => msg._id === data._id
        );

        if (exists) return prev;

        return [...prev, data];
      });
    });

    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receive_message");
      socket.off("online_users");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const msgData = {
      username: currentUser,
      text: message,
      avatar,
      time: new Date().toLocaleTimeString(),
    };

    try {
      await axios.post(
        "http://localhost:5001/api/messages/send",
        msgData
      );

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #1e1e2f, #2b5876)",
      }}
    >
      <div
        style={{
          width: "450px",
          height: "600px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            background: "#111827",
            color: "white",
            padding: "10px",
          }}
        >
          MERN Chat App

          <div style={{ fontSize: "12px" }}>
            Online: {onlineUsers.join(", ")}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px",
            background: "#f3f4f6",
          }}
        >
          {messages.map((msg) => {
            const isMe =
              msg.username === currentUser;

            return (
              <div
                key={msg._id}
                style={{
                  display: "flex",
                  justifyContent: isMe
                    ? "flex-end"
                    : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    background: isMe
                      ? "linear-gradient(135deg,#00c6ff,#0072ff)"
                      : "white",
                    color: isMe ? "white" : "black",
                    padding: "10px",
                    borderRadius: "12px",
                    maxWidth: "70%",
                    boxShadow:
                      "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <b>{msg.username}</b>

                  <div>{msg.text}</div>

                  <div
                    style={{
                      fontSize: "10px",
                      textAlign: "right",
                    }}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={endRef}></div>
        </div>

        <div
          style={{
            display: "flex",
            padding: "10px",
            background: "#e5e7eb",
          }}
        >
          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "20px",
              border: "1px solid gray",
              outline: "none",
            }}
          />

          <button
            onClick={handleSend}
            style={{
              marginLeft: "10px",
              padding: "10px 18px",
              background: "#111",
              color: "#00ffcc",
              border: "1px solid #00ffcc",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}