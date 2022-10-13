import { FC, useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { userData } from "../../services/auth.service";
let socket;

const CommunityChat: FC = (location: any) => {
  const [username, setUsername] = useState("");
  /* const [room, setRoom] = useState(""); */

  const getUser = async () => {
    const currentUsername = await userData();
    setUsername(currentUsername);
  };

  useEffect(() => {
    socket = io("http://localhost:5000");
    getUser();
  }, []);

  return <></>;
};
export default CommunityChat;
