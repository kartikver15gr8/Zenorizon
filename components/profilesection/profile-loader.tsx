export default function ProfilePulseLoader() {
  return (
    <div className="text-sm md:text-[16px] border border-[#322e2e] rounded-2xl h-80 bg-[#3b3a3d18] grid grid-cols-1 p-2 xl:p-3 animate-pulse">
      <div className="flex items-center justify-between border-b border-[#232324]">
        <p className="h-8">Profile picture</p>
        <div className="bg-[#232324] h-12 aspect-square rounded-full"></div>
      </div>
      <div className="flex items-center justify-between border-b border-[#232324]">
        <p className="h-8">Email</p>
        <div className="h-7 w-10 bg-[#232324] rounded min-w-36 md:min-w-48 lg:min-w-52"></div>
      </div>
      <div className="flex items-center justify-between border-b border-[#232324]">
        <p className="h-8">Full name</p>
        <div className="h-7 w-10 bg-[#232324] rounded min-w-36 md:min-w-48 lg:min-w-52"></div>
      </div>
      <div className="flex items-center justify-between">
        <p className="h-8">Username</p>
        <div className="h-7 w-10 bg-[#232324] rounded min-w-36 md:min-w-48 lg:min-w-52"></div>
      </div>
      <div className="flex items-center justify-end">
        <div className="h-7 w-14 bg-[#232324] rounded"></div>
      </div>
    </div>
  );
}
