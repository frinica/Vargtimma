import { FC, useEffect, useState } from "react";
import { userData } from "../../services/auth.service";

const AdminPage: FC = () => {
  const initValues = {
    userID: "",
    alias: "",
    phone: "",
    email: "",
    role: null,
  };
  const [user, setUser] = useState(initValues);

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await userData();
      setUser(currentUser);
    };
    getUser();
  }, []);
  return (
    <>
      <h2>Hej {user.alias}</h2>
    </>
  );
};
export default AdminPage;
