import { MyPostCard } from "./MyPostCard";

export const MyPosts = ({ user, currentPosts, myAddress, deletePost }) => {
  return (
    <>
      {currentPosts &&
        currentPosts.map((currentPost, i) => {
          return (
            <MyPostCard
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
