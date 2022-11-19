import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
    socket = io(ENDPOINT);
    console.log(socket);

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
      <div className="vh-100 position-relative overflow-scroll p-2">
        {messages.length > 1 &&
          messages.slice(1).map((message, i) => {
            return (
              <div
                className={
                  message.user === username
                    ? "d-flex flex-row-reverse mx-3 mb-5"
                    : "d-flex mx-3 mb-5"
                }
                key={i}
              >
                <div className="fw-bold fs-6 align-self-end mx-2">
                  {message.user}
                </div>
                <div
                  className={
                    message.user === username
                      ? "bg-primary rounded-4 p-3"
                      : "bg-success rounded p-3"
                  }
                >
                  {message.text}
                </div>
              </div>
            );
          })}
      </div>
      <div className="d-flex justify-content-center border-top">
        <form action="" onSubmit={handleSubmit} className="pb-3">
          <input
            type="text"
            value={message}
            className="rounded-3 p-2 mt-5 mb-1 w-80"
            style={{ height: "90px" }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
          />
          <Button type="submit" variant="custom" size="lg" className="ms-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-right-circle"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
};
export default CommunityChat;
