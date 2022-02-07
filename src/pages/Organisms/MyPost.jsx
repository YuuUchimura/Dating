import { PostCard } from "./PostCard";

export const MyPost = ({
  user,
  currentPosts,
  myAddress,
  deletePost,
}) => {
  return (
    <>
      {currentPosts &&
        currentPosts.map((currentPost, i) => {
          return (
            <PostCard
              user={user}
              currentPost={currentPost}
              key={i}
              i={i}
              myAddress={myAddress}
              deletePost={deletePost}
            />
          );
        })}
    </>
  );
};
