"use client";

import { useEffect, useState } from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";

export default function Home() {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="spinner-wrapper">
          <div className="spinner">
            <div className="spinnerin"></div>
          </div>
        </div>
      ) : (
        <div className="md:px-5 lg:px-10 xl:px-12">
          {/* HEADER */}
          <Header />

          {/* HERO */}
          <Hero />

          {/* FOOTER */}
          <Footer />
        </div>
      )}
    </>
  );
}
