export default function ProjectLoadingScreen() {
  return (
    <div className="w-full  bg-[#0A0A0A] h-screen flex flex-col">
      <div className="flex justify-center items-center gap-x-1 h-10 md:h-12">
        <div className="bg-[#858687] w-40 rounded animate-pulse"></div>
      </div>
      <div className="flex flex-col flex-grow border border-[#414141] bg-[#0F1111] rounded-lg ml-2 md:ml-0 mr-2 mb-2 p-1">
        <div className="border h-10 rounded border-[#2d3036] flex items-center justify-between px-4">
          <div className=" flex gap-x-2 items-center ">
            <div className="flex items-center rounded text-[12px] sm:text-[13px] md:text-[15px] border border-transparent  hover:border-[#2E3035] px-2 h-7  hover:bg-[#1C1D21] transition-all duration-300 bg-[#2E3035] animate-pulse"></div>
            <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded  hover:bg-[#1C1D21] transition-all duration-300 bg-[#2E3035] animate-pulse"></div>
          </div>
          <div className="flex gap-x-2 md:gap-x-4 ">
            <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-transparent  px-2 rounded hover:bg-[#1C1D21] hover:border-[#2E3035] transition-all duration-300 bg-[#2E3035] animate-pulse"></div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto h-96 scrollbar-hide px-4 sm:px-6 lg:px-10 xl:px-20">
          <div className="my-4 sm:my-5 lg:my-10">
            <div className="h-10 w-full bg-[#2E3035] rounded animate-pulse"></div>
            <div className="my-3 h-5 w-full bg-[#2E3035] rounded animate-pulse"></div>
          </div>

          <div className="flex gap-x-2 my-5">
            <div className="h-5 w-20 bg-[#2E3035] rounded animate-pulse"></div>
            <div className="h-5 w-20 bg-[#2E3035] rounded animate-pulse"></div>
            <div className="h-5 w-20 bg-[#2E3035] rounded animate-pulse"></div>
            <div className="h-5 w-20 bg-[#2E3035] rounded animate-pulse"></div>
            <div className="h-5 w-20 bg-[#2E3035] rounded animate-pulse"></div>
          </div>

          <div className="my-5">
            <div className="h-5 w-20 bg-[#2E3035] rounded animate-pulse"></div>
          </div>

          <div className="rounded-lg">
            <div className="h-10 w-full bg-[#2E3035] rounded-t-lg  animate-pulse"></div>
            <div className="h-10 w-full bg-[#2E3035]  animate-pulse"></div>
            <div className="h-10 w-full bg-[#2E3035]  rounded-b-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
