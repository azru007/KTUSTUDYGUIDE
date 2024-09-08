import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link"; // Import Link from Next.js

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define the default year
  const defaultYear = "2019";
  const departments = [
    { name: "CSE", semesters: 8 },
    { name: "ECE", semesters: 8 },
    { name: "EEE", semesters: 8 },
  ];

  return (
    <header className="bg-black text-white">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <button
            className="mr-4 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
          <Link href="/" className="flex items-center">
            <img src="/twitter-icon.png" alt="Logo" className="w-8 h-8" />
            <span className="ml-2 font-bold">KTU GUIDE</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center flex-grow justify-center space-x-6">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="block py-2 px-4">
                Home
              </Link>
            </li>
            {departments.map((dept) => (
              <li key={dept.name} className="relative group">
                <a href="#" className="block py-2 px-4">
                  {dept.name}
                </a>
                <ul className="hidden group-hover:block absolute bg-black text-white space-y-2 p-4">
                  {[...Array(dept.semesters)].map((_, index) => {
                    const semester = `S${index + 1}`;
                    return (
                      <li key={semester}>
                        <Link
                          href={`/subject?path=/${defaultYear}/${dept.name}/${semester}/subjects.json`}
                          className="block py-2 px-4"
                        >
                          {semester}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook">
            <FaFacebook className="text-white" />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter className="text-white" />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram className="text-white" />
          </a>
          <a href="#" aria-label="Telegram">
            <FaTelegram className="text-white" />
          </a>
          <a href="#" aria-label="Whatsapp">
            <FaWhatsapp className="text-white" />
          </a>
        </div>
      </div>
      <nav className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <ul className="space-y-2 p-4">
          <li>
            <Link href="/" className="block py-2 px-4">
              Home
            </Link>
          </li>
          {departments.map((dept) => (
            <li key={dept.name} className="relative group">
              <a href="#" className="block py-2 px-4">
                {dept.name}
              </a>
              <ul className="hidden group-hover:block absolute bg-black text-white space-y-2 p-4">
                {[...Array(dept.semesters)].map((_, index) => {
                  const semester = `S${index + 1}`;
                  return (
                    <li key={semester}>
                      <Link
                        href={`/subject?path=/${defaultYear}/${dept.name}/${semester}/subjects.json`}
                        className="block py-2 px-4"
                      >
                        {semester}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
