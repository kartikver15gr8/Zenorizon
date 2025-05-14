export default function IssuesTopTile() {
  return (
    <div className="h-8 border-b border-[#2E3035] px-3 grid grid-cols-12 items-center text-xs md:text-sm  text-[#9A9A9A]">
      <p className=" col-span-4">Title</p>
      <p className=" col-span-1">Product</p>
      <p className=" col-span-1 px-2">Status</p>
      <p className=" col-span-1 pl-2">Priority</p>
      <p className=" col-span-1">Modified</p>
      <p className=" col-span-1">Assigned</p>
      <p className=" col-span-1">Recent update</p>
    </div>
  );
}
