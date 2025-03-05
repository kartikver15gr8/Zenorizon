"use client";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <div className="h-96 flex justify-center items-center">
        <LandingTitle />
      </div>
    </div>
  );
}

const LandingTitle = () => {
  return (
    <div className="w-[90%] ">
      <p className="text-6xl">Streamline your workflow,</p>
      <div className="flex">
        <p className="text-6xl mr-3">Amplify your impact with </p>
        <span className="text-6xl text-transparent bg-gradient-to-b from-gray-600 via-gray-400 to-white bg-clip-text mb-5 font-bold">
          Zenorizon
        </span>
      </div>

      <div className=" mt-5 flex gap-x-2">
        <div className="border border-[#565555] h-12 w-96 rounded-md bg-[#121212]">
          <input
            className="rounded-md h-full w-full bg-transparent px-3 outline-none font-extralight"
            placeholder="you@example.com"
          ></input>
        </div>
        <button className="h-12 px-4 rounded-md text-black bg-white">
          Join waitlist
        </button>
      </div>
    </div>
  );
};
