import { MyPostCard } from "./MyPostCard";

export const MyPosts = ({
  icon,
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
            <MyPostCard
              icon={icon}
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
