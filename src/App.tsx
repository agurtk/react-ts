import React from "react";

import { get } from "./util/http";
import BlogPosts, { type BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type RowDataBlogPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};
function App() {
  const [fetchPosts, setFetchPosts] = React.useState<BlogPost[]>();
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  React.useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true);
      try {
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts"
        )) as RowDataBlogPost[];
        const blogPosts: BlogPost[] = data.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });
        setFetchPosts(blogPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setIsFetching(false);
    };
    fetchPosts();
  }, []);

  let content: React.ReactNode;

  if (error) {
    content = <ErrorMessage text={error} />;
  }
  if (isFetching) {
    content = <p id="loading-fallback">Loading...</p>;
  }
  if (fetchPosts) {
    //   content = <p id= "loading-fallback">Loading...</p>;
    // } else if (fetchPosts.length === 0) {
    //   content = <p id= "loading-fallback">No posts found!</p>;
    // } else {
    content = <BlogPosts posts={fetchPosts} />;
  }

  return (
    <main>
      <img
        src={fetchingImg}
        alt="An abstract image depicting a data fetching process."
      />
      {content}
    </main>
  );
}

export default App;
