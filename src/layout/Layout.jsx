import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";
const Layout = ({ children }) => {
  console.log(children);
  return (
    <div className="container-fluid mx-auto ">
      <Header setVisible={false} />
      <section className="contenido-minimo overflow-y-scroll">
        {children}
      </section>

      <Footer />
    </div>
  );
};

export default Layout;
