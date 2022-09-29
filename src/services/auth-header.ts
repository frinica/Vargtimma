// Check local storage for a user item and return authorization header or empty object
export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user && user.accessToken) {
    return { "x-access-token": "Bearer" + user.accessToken };
  } else {
    return { "x-access-token": "" };
  }
}
