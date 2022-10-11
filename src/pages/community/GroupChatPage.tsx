import { ObjectId } from "mongodb";
import React from "react";
import { Navigate } from "react-router-dom";
import config from "../../config";
import chat from "../../lib/chat";

interface IChatProps {
  GUID: any;
}

interface IChatState {
  receiverId: ObjectId | string;
  messageText: string;
  groupMsg: Array<string>;
  user: any;
  isAuthenticated: boolean;
}

// Using class component to implement statefullness
class GroupChatPage extends React.Component<IChatProps, IChatState> {
  chatProps: IChatProps = {
    GUID: config.GUID,
  };
  chatState: IChatState = {
    receiverId: "",
    messageText: "",
    groupMsg: [],
    user: {},
    isAuthenticated: true,
  };

  constructor(props: IChatProps) {
    super(props);
    this.state = this.chatState;
    /* this.GUID = config.GUID; */
  }

  sendMessage = () => {
    chat
      .sendGroupMessages(this.chatProps.GUID, this.chatState.messageText)
      .then(
        (message) => {
          this.setState({ messageText: "" });
        },
        (error) => {
          // Make a req to join the group and call function again
          if (error.code === "ERR_NOT_A_MEMBER") {
            chat.joinGroup(this.chatProps.GUID).then((response) => {
              this.sendMessage();
            });
          }
        }
      );
  };

  scrollToBottom = () => {
    const chat = document.getElementById("chatList")!;
    chat.scrollTop = chat.scrollHeight;
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.sendMessage();
    e.target.reset();
  };

  handleChange = (e: any) => {
    this.setState({ messageText: e.target.value });
  };

  // Store user object in components state
  getUser = () => {
    chat
      .getLoggedinUser()
      .then((user) => {
        console.log("user details: ", { user });
        this.setState({ user });
      })
      .catch(({ error }) => {
        if (error.code === "USER_NOT_LOGED_IN") {
          this.setState({ isAuthenticated: false });
        }
      });
  };

  // Append new messages received in the GroupMsg array
  messageListener = () => {
    chat.addMessageListener((data: any, error: any) => {
      if (error) return console.log(`error: ${error}`);
      this.setState(
        (prevState) => ({
          groupMsg: [...prevState.groupMsg, data],
        }),
        () => {
          this.scrollToBottom();
        }
      );
    });
  };

  // Calls functions when mounted
  componentDidMount() {
    this.getUser();
    this.messageListener();
    // chat.joinGroup(this.GUID)
  }

  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    return (
      <div className="chatWindow">
        <ul className="chat" id="chatList">
          {this.state.groupMsg.map((data: any) => (
            <div key={data.id}>
              {this.state.user!.uid === data.sender.uid ? (
                <li className="self">
                  <div className="msg">
                    <p>{data.sender.uid}</p>
                    <div className="message">{data.data.text}</div>
                  </div>
                </li>
              ) : (
                <li className="other">
                  <div className="msg">
                    <p>{data.sender.uid}</p>
                    <div className="message">{data.data.text}</div>
                  </div>
                </li>
              )}
            </div>
          ))}
        </ul>

        <div className="chatInputWrapper">
          <form onSubmit={this.handleSubmit}>
            <input
              className="textarea input"
              type="text"
              placeholder="Skriv ett meddelande..."
              onChange={this.handleChange}
            />
          </form>
        </div>
      </div>
    );
  }
}
export default GroupChatPage;
