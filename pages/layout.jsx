import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <main className="flex-1">{children}</main>
      </QueryClientProvider>
      <Footer />
    </div>
  );
};

export default Layout;
