export const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/posts");
  const posts = await response.json();
  return posts;
};
