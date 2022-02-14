import { MyPostCard } from "./MyPostCard";

export const MyPosts = ({
  icon,
  user,
  currentPosts,
  myAddress,
  deletePost,
  id
}) => {
  return (
    <>
      {currentPosts &&
        currentPosts.map((currentPost, i) => {
          return (
            <MyPostCard
              id={id}
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
