"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/v3-bg-img.svg"
            alt="molecule-background"
            fill
            className="object-cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="absolute top-6 w-full flex justify-between items-center px-6 md:top-12 md:px-12 z-20">
          <Image
            src="/curl-lab-logo-white-trans.png"
            alt="The Curl Lab Logo"
            width={240}
            height={80}
            className="h-20 md:h-24 w-auto top-6 md:top-12"
            priority
          />

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-[#2E1A47] font-semibold py-4 px-8 rounded-xl shadow-md hover:bg-[#fdf4f8] hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer tracking-wide mt-1">
            Contact Us
          </button>
        </div>

        <div className="relative z-10 max-w-7xl md:left-12 h-screen flex flex-col justify-evenly md:pt-40 pt-32 md:pt-32">
          <div className="flex flex-col md:flex-row gap-8 w-screen max-h-full items-center px-10 md:px-0">
            <div className="text-white space-y-6 md:w-[50%]">
              <h1 className="text-3xl text-center md:text-left md:text-5xl lg:text-6xl font-bold leading-normal">
                Unlock <span className="font-light"> the Science </span> of Your
                Curls{" "}
              </h1>
              <p className="text-md md:text-xl  text-gray-200">
                Upload your photo for FREE to{" "}
                <span className="font-bold text-[#fabec0]">
                  discover your exact curl type
                </span>
                , porosity, and care needs with our{" "}
                <span className="font-bold">
                  breakthrough Strand Scan™ Technology
                </span>
                . Get a personalized, science-backed routine based on your exact
                hair type in minutes - no more guessing,{" "}
                <span className="font-bold text-[#fabec0]">
                  no more wasted products
                </span>
                .{" "}
              </p>

              <div className="pt-4">
                <Link
                  href="/analysis"
                  className="inline-block bg-white text-[#493979] hover:bg-gray-100 hover:shadow-xl px-8 py-4 rounded-lg font-bold text-lg transition duration-300 transform hover:scale-105 cursor-pointer">
                  Analyze My Curls{" "}
                </Link>
              </div>
            </div>

            <div className="hidden md:block relative p-10 md:w-[50%] text-center">
              <Image
                src="/curl-analyzer.png"
                alt="Curl Analyzer"
                width={500}
                height={500}
                className="inline-block object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-xl bg-white/5">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center relative animate-fadeIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-4 text-gray-400 hover:text-gray-700 text-xl cursor-pointer"
              aria-label="Close Modal">
              &times;
            </button>

            <h2 className="text-2xl font-bold text-[#2E1A47] mb-4">
              Let’s Connect
            </h2>

            <p className="text-[#2E1A47] mb-3">

              <a
                href="mailto:thecurllab@gmail.com"
                className="underline hover:text-pink-500">
                hello@thecurllab.io
              </a>
            </p>

            <p className="text-[#2E1A47] mb-6">
              TikTok:{" "}
              <a
                href="https://www.tiktok.com/@thecurllab.io"
                className="underline hover:text-pink-500"
                target="_blank"
                rel="noreferrer">
                @thecurllab.io
              </a>
            </p>

            <p className="text-sm text-gray-500">
              We'll get back to you soon. Thanks for reaching out!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
