interface IChatUser {
  id: number;
  username: string;
  room: string;
}
/*
const initValues = {
  id: 0,
  username: "",
  room: "",
}; */

let users: IChatUser[] = [];

exports.addUser = ({ id, username, room }: IChatUser) => {
  if (!username || !room) return { error: "Username and room required." };
  const user = { id, username, room };
  users.push(user);

  return { user };
};

exports.removeUser = (id: number) => {
  const index = users.findIndex((user) => user.id === id);
  return users[index];
};
