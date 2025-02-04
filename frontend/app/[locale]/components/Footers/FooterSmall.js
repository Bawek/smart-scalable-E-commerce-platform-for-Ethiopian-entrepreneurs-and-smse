'use client'

import { useEffect, useState } from "react";

export default function FooterSmall(props) {
  const [isSticky, setIsSticky] = useState(false);

  // Handle sticky footer on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={
        (props.absolute
          ? "absolute w-full bottom-0 bg-blueGray-800"
          : "fixed bottom-0 left-0 w-full bg-blueGray-800 z-50") + " pb-6"
      }
    >
      <div
        className={`container mx-auto px-4 ${isSticky ? 'fixed bottom-0 left-0 w-full bg-blueGray-800 z-50' : 'absolute bottom-0 w-full bg-blueGray-800'}`}
      >
        <hr className="mb-6 border-b-1 border-blueGray-600" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4">
            <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
              Copyright © {new Date().getFullYear()}{" "}
              <a
                href="https://www.creative-tim.com?ref=nnjs-footer-small"
                className="text-white hover:text-blueGray-300 text-sm font-semibold py-1"
              >
                Creative Tim
              </a>
            </div>
          </div>
          <div className="w-full md:w-8/12 px-4">
            <ul className="flex flex-wrap list-none md:justify-end justify-center">
              <li>
                <a
                  href="https://www.creative-tim.com?ref=nnjs-footer-small"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >
                  Creative Tim
                </a>
              </li>
              <li>
                <a
                  href="https://www.creative-tim.com/presentation?ref=nnjs-footer-small"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="http://blog.creative-tim.com?ref=nnjs-footer-small"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md?ref=nnjs-footer-small"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
