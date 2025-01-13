import React from "react";
import Navigation from "@components/Navigation";
import { Toaster } from "@node_modules/react-hot-toast/dist";
import "@styles/global.css";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

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
        <Toaster />
      </body>
    </html>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
