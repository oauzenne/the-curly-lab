import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
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

      <div className="absolute top-6 left-6 z-20 md:top-12 md:left-12">
        <Image
          src="/curl-lab-logo-v2.svg"
          alt="Your Brand"
          width={240}
          height={80}
          className="h-16 md:h-24 w-auto"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl md:left-12 h-screen flex items-center pt-40 md:pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-none">
              Unlock <span className="font-light"> the Science </span> of Your
              Curls{" "}
            </h1>
            <p className="text-lg md:text-xl  text-gray-200">
              Upload your photo to{" "}
              <span className="font-bold text-[#fabec0]">
                discover your exact curl type
              </span>
              , porosity, and care needs with our{" "}
              <span className="font-bold">AI-powered Strand Scan™</span>. Get a
              personalized, science-backed routine in minutes — no more
              guessing,{" "}
              <span className="font-bold text-[#fabec0]">
                no more wasted products
              </span>
              .{" "}
            </p>

            <div className="pt-4">
              <Link
                href="/get-started"
                className="inline-block bg-white text-[#493979] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition duration-300 transform hover:scale-105">
                Analyze My Curls{" "}
              </Link>
            </div>
          </div>

          <div className="hidden md:block relative h-full w-full p-10">
            <Image
              src="/curl-analyzer.png"
              alt="Curl Analyzer"
              width={800}
              height={800}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
