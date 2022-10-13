import { ChangeEvent, FC, useEffect, useState } from "react";
import io from "socket.io-client";
import { userData } from "../../services/auth.service";

const CommunityChat: FC = (location: any) => {
  const socket = io("http://localhost:5000");
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const getUser = async () => {
    const currentUsername = await userData();
    setUsername(currentUsername);
  };

  const getRoom = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const activeRoom = urlParams.get("room");
    setRoom(activeRoom);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message });
      setMessage("");
    } else alert("Empty input");
  };

  useEffect(() => {
    getUser();
    getRoom();
    if (username.length > 0 && room !== null) {
      socket.emit("join", { username, room }, (error: any) => {
        if (error) alert(error);
      });
    } else {
      console.log("Failure to connect to socket");
    }
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  return (
    <div>
      {messages.map((val, i) => {
        return (
          <div key={i}>
            {val.text}
            <br />
            {val.user}
          </div>
        );
      })}

      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e: any) => setMessages(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};
export default CommunityChat;
