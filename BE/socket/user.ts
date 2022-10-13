interface IChatUser {
  id: number;
  username: string;
  room: string;
}
const initValues = {
  id: 0,
  username: "",
  room: "",
};

let users = [initValues];

exports.addUser = ({ id, username, room }: IChatUser) => {
  if (!username || !room) return { error: "Username and room required." };
  const user = { id, username, room };

  users.push(user);

  return { user };
};
