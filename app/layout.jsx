import Nav from "@components/Nav";
import "@styles/global.css";

export const metadata = {
  title: "Blog CMS",
  description: "Discover feature blogs",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
