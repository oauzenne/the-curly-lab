"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveAnalysisToFirebase } from "@/lib/saveAnalysis";

type UserData = {
  name: string;
  email: string;
  photo: File | null;
  consent: boolean;
};

export default function AnalysisPage() {
  const [step, setStep] = useState<
    "upload" | "info" | "loading" | "results" | "error"
  >("upload");
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    photo: null as File | null,
    consent: false,
  });
  const [analysis, setAnalysis] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  // const [curlType, setCurlType] = useState("TCL4BHL");
  // const [porosity, setPorosity] = useState("Medium");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserData({ ...userData, photo: e.target.files[0] });
      setStep("info");
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setStep("loading");
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     if (!userData.photo) {
  //       setError("Please upload a photo.");
  //       setStep("error");
  //       return;
  //     }

  //     const simulatedAnalysis = generateSimulatedAnalysis();
  //     setAnalysis(simulatedAnalysis);

  //     const { extractedCurlType, extractedPorosity } =
  //       extractHairProperties(simulatedAnalysis);
  //     setCurlType(extractedCurlType);
  //     setPorosity(extractedPorosity);

  //     storeDataLocally(userData, simulatedAnalysis);
  //     setStep("results");
  //   } catch (err) {
  //     console.error("Analysis failed:", err);
  //     setError(
  //       "Our Strand Scan™ Technology is currently unavailable. Please try again later."
  //     );
  //     setStep("error");
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setStep("loading");
  //   setError("");

  //   try {
  //     // Simulate analysis (your existing logic)
  //     await new Promise((resolve) => setTimeout(resolve, 1200));

  //     if (!userData.photo) {
  //       setError("Please upload a photo.");
  //       setStep("error");
  //       return;
  //     }

  //     const simulatedAnalysis = generateSimulatedAnalysis();
  //     setAnalysis(simulatedAnalysis);

  //     const { extractedCurlType, extractedPorosity } =
  //       extractHairProperties(simulatedAnalysis);
  //     setCurlType(extractedCurlType);
  //     setPorosity(extractedPorosity);

  //     // 🔐 Save to Firebase (photo → Storage, metadata → Firestore)
  //     await saveAnalysisToFirebase({
  //       name: userData.name.trim(),
  //       email: userData.email.trim(),
  //       consent: userData.consent,
  //       analysisHTML: simulatedAnalysis,
  //       curlType: extractedCurlType,
  //       porosity: extractedPorosity,
  //       file: userData.photo, // File object
  //     });

  //     // Local cache remains if you want it:
  //     storeDataLocally(userData, simulatedAnalysis);

  //     setStep("results");
  //   } catch (err: any) {
  //     console.error("Analysis failed:", err);
  //     setError(
  //       err?.message ??
  //         "Our Strand Scan™ Technology is currently unavailable. Please try again later."
  //     );
  //     setStep("error");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("loading");
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      if (!userData.photo) {
        setError("Please upload a photo.");
        setStep("error");
        return;
      }

      const simulatedAnalysis = generateSimulatedAnalysis();
      setAnalysis(simulatedAnalysis);

      const { extractedCurlType, extractedPorosity } =
        extractHairProperties(simulatedAnalysis);
      // setCurlType(extractedCurlType);
      // setPorosity(extractedPorosity);

      await saveAnalysisToFirebase({
        name: userData.name.trim(),
        email: userData.email.trim(),
        consent: userData.consent,
        analysisHTML: simulatedAnalysis,
        curlType: extractedCurlType,
        porosity: extractedPorosity,
        file: userData.photo,
      });

      storeDataLocally(userData, simulatedAnalysis);
      setStep("results");
    } catch (err: unknown) {
      console.error("Analysis failed:", err);
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Our Strand Scan™ Technology is currently unavailable. Please try again later.";
      setError(message);
      setStep("error");
    }
  };  

  const resetFlow = () => {
    setStep("upload");
    setUserData({ name: "", email: "", photo: null, consent: false });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="https://thecurllab.com">
          <div className="flex items-center justify-center mb-5 md:mb-10">
            <Image
              src="/tcl-dark-trans-logo.png"
              alt="Curl Lab Light Logo"
              width={640}
              height={160}
              className="h-auto md:h-32 w-auto"
              priority
            />
          </div>
        </Link>
        {step === "upload" && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-semibold text-[#493979] mb-6">
              Upload Your Hair Photo
            </h2>
            <p className="text-[#493979] mb-8">
              <span className="font-bold">
                Let&apos;s see those beautiful curls!
              </span>{" "}
              <br /> Upload a clear photo that showcases your hair texture.
            </p>

            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                capture="user"
                className="hidden"
                id="hairPhoto"
                required
              />
              <label
                htmlFor="hairPhoto"
                className="cursor-pointer bg-[#493979] text-[#FFFFFF] py-3 px-6 rounded-lg font-medium hover:bg-[#ff9a9e] transition duration-200 inline-block mb-4">
                {" "}
                Choose Photo
              </label>
              {userData.photo && (
                <p className="text-sm text-gray-500 mt-2">
                  {userData.photo.name}
                </p>
              )}
            </form>

            <p className="text-xs text-gray-400 mt-8">
              By continuing, you&apos;ll receive helpful insights powered by AI.
              While it&apos;s designed to be as accurate as possible, it may not
              be perfect every time.{" "}
            </p>
          </div>
        )}

        {step === "info" && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl text-center md:text-left font-semibold text-[#493979] mb-6">
              Complete Your Analysis
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-[#493979] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 text-gray-800"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-[#493979] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 text-gray-800"
                  required
                />
              </div>

              <div className="mb-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={userData.consent}
                      onChange={(e) =>
                        setUserData({ ...userData, consent: e.target.checked })
                      }
                      className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <label
                    htmlFor="consent"
                    className="ml-3 block text-sm text-gray-700">
                    I agree to the processing of my data for hair analysis and
                    to receive personalized recommendations.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#493979] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#fabec0] transition duration-200 cursor-pointer hover:cursor-grab">
                Get My Hair Analysis
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-6">
              To request data deletion, email us at{" "}
              <a href="mailto:info@thecurllab.com" className="text-purple-600">
                info@thecurllab.com
              </a>
            </p>
          </div>
        )}

        {step === "loading" && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-[#493979] mb-2">
              Analyzing Your Curls
            </h2>
            <p className="text-[#493979]">
              Our signature Strand Scan™ Technology is scanning your hair
              texture...
            </p>
            <p className="text-sm text-[#493979] mt-4">
              Remember: This is an AI estimate and may not capture all nuances
              of your unique hair.
            </p>
          </div>
        )}

        {step === "error" && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <h2 className="font-bold text-lg mb-1">Analysis Unavailable</h2>
              <p>{error || "Something went wrong. Please try again later."}</p>
            </div>
            <button
              onClick={resetFlow}
              className="bg-purple-600 text-white py-3 px-6 rounded-lg cursor-pointer hover:cursor-grab font-medium hover:bg-purple-700 transition duration-200">
              Try Again
            </button>
            <p className="text-xs text-gray-400 mt-6">
              For persistent issues, contact us at{" "}
              <a href="mailto:info@thecurllab.com" className="text-purple-600">
                info@thecurllab.com
              </a>
            </p>
          </div>
        )}

        {step === "results" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#493979] mb-2">
                Your Hair Analysis,{" "}
                <span className="text-[#ff8589]">{userData.name}</span>
              </h2>
              <p className="text-gray-500 mb-6">
                Strand Scan™ Results • {new Date().toLocaleDateString()}
              </p>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: analysis }}
              />
            </div>

            <div className="p-8 bg-[#493979] border-t border-purple-700">
              <h3 className="text-2xl md:text-4xl font-medium text-white mb-10 text-center">
                Personalized Hair Care Plans for <br />{" "}
                <span className="text-[#ff8589] text-xl md:text-2xl font-bold bg-white rounded-lg px-2 py-1 inline-block mt-2">
                  {/* TCL Curl Type {curlType} */}
                  TCL4BHL
                </span>{" "}
                {/* <span className="text-white inline-block pt-2 mt-2 mr-2">
                  Curls with{" "}
                </span> */}
                {/* <span className="text-[#ff8589] text-xl md:text-2xl md:text-2xl font-bold bg-white rounded-lg px-2 py-1 inline-block mt-2">
                  {porosity} Porosity
                </span>{" "} */}
              </h3>

              <div className="flex flex-col md:flex-row flex-wrap gap-4">
                <div className="p-4 bg-[#fff1f2] rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center">
                  {" "}
                  <h4 className="font-medium text-[#493979] mb-2">
                    Moisture Retention System
                  </h4>
                  <p className="text-sm text-[#493979] mb-3">
                    Seals in hydration for long-lasting, balanced moisture.
                  </p>
                  <button className="w-full bg-[#493979] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-700 transition cursor-pointer hover:cursor-grab">
                    Get Moisture Plan ($4.99)
                  </button>
                </div>

                <div className="p-4 bg-[#fff1f2] rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center">
                  {" "}
                  <h4 className="font-medium text-[#493979] mb-2">
                    Growth & Strength Package
                  </h4>
                  <p className="text-sm text-[#493979] mb-3">
                    Strengthens hair to reduce breakage for longer locks.
                  </p>
                  <button className="cursor-pointer hover:cursor-grab w-full bg-[#493979] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-700 transition">
                    Get Growth Plan ($4.99)
                  </button>
                </div>

                <div className="p-4 bg-[#fff1f2] rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center">
                  {" "}
                  <h4 className="font-medium text-[#493979] mb-2">
                    Complete Curl Care System
                  </h4>
                  <p className="text-sm text-[#493979] mb-3">
                    Everything you need for long perfect curls (Save 20%)
                  </p>
                  <button className="cursor-pointer hover:cursor-grab w-full bg-[#493979] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-700 transition">
                    Get System ($7.99)
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 m-10 text-[#493979]">
              <p>
                <strong>Note:</strong> This AI-generated analysis is an
                estimation and for informational purposes only; The Curly Lab is
                not liable for any adverse reactions, product performance, or
                outcomes.
              </p>
            </div>

            <div className="px-8 py-6 border-t border-gray-200">
              <button
                onClick={resetFlow}
                className="text-[#493979] hover:text-purple-800 font-medium">
                &larr; Back to Home
              </button>
              <p className="text-xs text-gray-400 mt-4">
                To request data deletion, email{" "}
                <a href="mailto:info@thecurllab.com" className="underline">
                  info@thecurllab.com
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function extractHairProperties(analysisText: string) {
  let extractedCurlType = "3B";
  let extractedPorosity = "Medium";

  const curlTypeMatch = analysisText.match(/(Type\s)?([1234][ABC]?)/i);
  if (curlTypeMatch && curlTypeMatch[2]) {
    extractedCurlType = curlTypeMatch[2].toUpperCase();
  }

  if (
    analysisText.includes("High Porosity") ||
    analysisText.includes("high porosity")
  ) {
    extractedPorosity = "High";
  } else if (
    analysisText.includes("Low Porosity") ||
    analysisText.includes("low porosity")
  ) {
    extractedPorosity = "Low";
  }

  return { extractedCurlType, extractedPorosity };
}

function generateSimulatedAnalysis(): string {
  return `
    <div class="space-y-6 text-[#493979]">
      <div>
        <p class="font-bold">Our Strand Scan™ has analyzed your hair texture and identified these characteristics:</p>
      </div>
      
<div>
  <h4 class="text-lg font-medium mb-2">
<strong class="font-bold text-[2rem]">Curl Type: </strong>
    <span class="bg-[#fff1f2] px-2 py-1 rounded text-[2rem]">TCL4BHL</span>
  </h4>
  <p>
Your curls display tightly coiled, zig-zag patterns typical of Type 4B hair. With low density, there are fewer strands per square inch, which can make styles look lighter or less full.
Because your hair has high porosity, it quickly absorbs moisture but also loses it just as fast. This makes consistent hydration and proper sealing essential to maintain balance.
  </p>
</div>

      
    
      
      <!-- More detailed analysis would continue -->
    </div>
  `;
}

function storeDataLocally(userData: UserData, analysis: string) {
  const dataToStore = {
    user: {
      name: userData.name,
      email: userData.email,
      photo: userData.photo ? userData.photo.name : null,
      date: new Date().toISOString(),
    },
    analysis: analysis,
    viewedUpsells: [],
  };

  localStorage.setItem(
    `curlAnalysis_${userData.email}`,
    JSON.stringify(dataToStore)
  );
}
