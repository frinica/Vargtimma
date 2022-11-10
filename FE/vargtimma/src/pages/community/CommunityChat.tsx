import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import io from "socket.io-client";
const ENDPOINT = process.env.REACT_APP_SOCKET_URL || "";
let socket: any;
const initMessages = [{ user: "", text: "" }];

const CommunityChat: FC = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get("username");
  const room = urlParams.get("room");
  const [messages, setMessages] = useState(initMessages);
  const [message, setMessage] = useState("");

  // Connect user to the socket
  useEffect(() => {
    console.log("user: ", username, "api: ", ENDPOINT);
    socket = io(ENDPOINT, { transports: ["websocket"] });

    socket.emit("join", { username, room }, (error: any) => {
      console.log("Connected to socket");
      if (error) alert(error);
    });
  }, []);

  // Re-render on new messages
  useEffect(() => {
    socket.on("message", (message: any) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message });
      setMessage("");
    } else alert("empty input");
  };

  return (
    <div>
      {messages.map((message, i) => {
        return (
          <div key={i}>
            {message.user}
            <br />
            {message.text}
          </div>
        );
      })}

      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />
        <input type="submit" />
      </form>
    </div>
  );
};
export default CommunityChat;
