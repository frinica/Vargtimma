import { FC, useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { userData } from "../../services/auth.service";
let socket;

const CommunityChat: FC = (location: any) => {
  const socket = io("http://localhost:5000");
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

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
    </div>
  );
};
export default CommunityChat;
