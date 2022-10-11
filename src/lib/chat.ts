import { CometChat } from "@cometchat-pro/chat";
import { ObjectId } from "mongodb";
import config from "../config";

export default class CCManager {
  static LISTENER_KEY_MESSAGE = "msglistener"; // Required by msg listener
  static appId = config.appId;
  static appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion("EU")
    .autoEstablishSocketConnection(true)
    .build();
  static apiKey = config.apiKey;
  static LISTENER_KEY_GROUP = "grouplistener";
  static init() {
    return CometChat.init(CCManager.appId, CCManager.appSetting);
  }

  // Create the message object
  static getTextMessage(uid: any, text: string, msgType: any) {
    if (msgType === "user") {
      return new CometChat.TextMessage(
        uid,
        text,
        CometChat.RECEIVER_TYPE.GROUP
      );
    }
  }

  // Get currently logged in user
  static getLoggedinUser() {
    return CometChat.getLoggedinUser();
  }

  // Login a user
  static login(UID: string) {
    return CometChat.login(UID, this.apiKey);
  }

  // Get previous group messages
  static getGroupMessages(GUID: string, callback: any, limit = 30) {
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(GUID)
      .setLimit(limit)
      .build();
    callback();
    return messagesRequest.fetchPrevious();
  }

  // Send messages in the group chat
  static sendGroupMessages(UID: ObjectId, message: string) {
    const textMessage = this.getTextMessage(UID, message, "group");
    return CometChat.sendMessage(textMessage);
  }

  // Join a group with GUID
  static joinGroup(GUID: string) {
    let groupType: any = CometChat.GROUP_TYPE.PUBLIC;
    return CometChat.joinGroup(GUID, groupType);
  }

  // Listen to messages called in real-time
  static addMessageListener(callback: any) {
    CometChat.addMessageListener(
      this.LISTENER_KEY_MESSAGE,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage: string) => {
          callback(textMessage);
        },
      })
    );
  }
}
