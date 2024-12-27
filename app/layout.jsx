import Navigation from "@components/Navigation";
import "@styles/global.css";
import Cookies from "js-cookie";

export const metadata = {
  title: "Blog CMS",
  description: "Discover feature blogs",
  icon: "/tron.svg"
};

const RootLayout = ({ children }) => {
  const token = Cookies.get('jwt');

  return (
    <html lang="en">
      <body>
        {token && <Navigation />}
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
