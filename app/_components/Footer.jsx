"use client";

import { Github, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full mt-32 rounded-3xl bg-gradient-to-br from-[#0f0f0f] via-[#1c1c1c] to-black text-white border-t border-white/10 shadow-[0_0_40px_#ff9900aa] overflow-hidden"
    >
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* <Image
              src="/logo.png"
              alt="ClipCraft Logo"
              width={170}
              height={170}
              className="text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-500 bg-clip-text text-transparent tracking-tight drop-shadow-[0_0_8px_#ff9900aa]"
            /> */}
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-500 bg-clip-text text-transparent tracking-tight drop-shadow-[0_0_8px_#ff9900aa]">
              Clipcraft AI
            </h1>
          </div>
          {/* <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Next-gen AI-powered video tools, designed by <span className="text-orange-400 font-medium">Nabarun B</span>.
          </p> */}
          <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
            AI-powered video creation—transform your ideas into dynamic videos
            with captions, audio, and visuals, all within moments. Ideal for
            creators, businesses, and content professionals.
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-orange-400 tracking-wide">
            Contact
          </h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li className="flex items-center gap-2 hover:text-orange-300 transition duration-300">
              <Mail
                size={18}
                className="text-orange-400 drop-shadow-[0_0_6px_#ff9900]"
              />
              <Link href="mailto:academyshreyn12@gmail.com">
                academyshreyn12@gmail.com
              </Link>
            </li>
            <li className="flex items-center gap-2 hover:text-orange-300 transition duration-300">
              <Phone
                size={18}
                className="text-orange-400 drop-shadow-[0_0_6px_#ff9900]"
              />
              <Link href="tel:+919679188394">+91 96791 88394</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-orange-300 transition duration-300">
              <Github
                size={18}
                className="text-orange-400 drop-shadow-[0_0_6px_#ff9900]"
              />
              <Link href="https://github.com/trustN12" target="_blank">
                trustN12
              </Link>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-orange-400 tracking-wide">
            Explore
          </h4>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li className="hover:text-orange-300 transition duration-300">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-orange-300 transition duration-300">
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 border-t border-white/10 px-6 md:px-16 lg:px-20 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-orange-400 font-semibold">Clipcraft AI</span>. All
        rights reserved. Crafted by{" "}
        <span className="text-orange-300 font-medium">Nabarun B</span>.
      </div>
    </motion.footer>
  );
}
