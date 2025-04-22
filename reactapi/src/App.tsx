import { useEffect, useState } from "react";

function App() {
  interface Post {
    id: number;
    createdDate: string;
    text: string;
    sender: {
      name: string;
      avatar: string;
    };
  }

  const [posts, setPosts] = useState<Post[]>([]);

  const getData = async () => {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow" as RequestRedirect,
    };

    fetch("http://localhost:3030/chat", requestOptions)
      .then((response) => response.json())
      .then((result) => setPosts(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.createdDate}</h2>
            <p>{post.text}</p>
            <p>Sender is {post.sender.name}</p>
            <img src={post.sender.avatar} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
