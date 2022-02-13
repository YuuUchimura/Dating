export const Container = ({ children }) => {
  return (
    <div className="mx-auto font-Comic font-semibold min-h-screen pt-10 md:pt-20 pb-20 bg-gradient-to-b from-blue-200 to-pink-200">
      {children}
    </div>
  );
};
