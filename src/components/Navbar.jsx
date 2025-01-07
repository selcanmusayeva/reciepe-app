import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">Recipe Manager</div>
        <ul className="flex space-x-6">
          <li>
            <a
              href="/"
              className={`hover:text-indigo-600 transition-all
                ${pathname === "/" ? "text-indigo-600" : "text-gray-700"}`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/recipes"
              className={`hover:text-indigo-600 transition-all
                ${
                  pathname === "/recipes" ? "text-indigo-600" : "text-gray-700"
                }`}
            >
              Recipes
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className={`hover:text-indigo-600 transition-all
                ${
                  pathname === "/contact" ? "text-indigo-600" : "text-gray-700"
                }`}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
