export const fetchUsers = async () => {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  return users;
};
