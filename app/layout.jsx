import "@styles/global.css";

export const metadata = {
  title: "Blog CMS",
  description: "Discover feature blogs",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
