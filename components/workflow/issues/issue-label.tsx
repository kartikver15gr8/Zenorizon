export default function IssueLabel({
  title,
  description,
  projectKey,
  priority,
  createdAt,
  status,
  update,
  assigedUser,
  projectID,
}: {
  title: string;
  description?: string;
  projectKey?: string;
  priority?: string;
  createdAt?: string;
  status?: string;
  update?: string;
  assigedUser?: string;
  projectID: string | null;
}) {
  return (
    <div className="h-14 rounded-lg border border-transparent hover:bg-[#1C1D21]  hover:border-[#2E3035] transition-all duration-200 px-3 grid grid-cols-12 items-center ">
      <div className=" col-span-4 flex items-center  gap-x-5">
        <div className="border rounded-full h-5 w-5"></div>
        <p>{title}</p>
      </div>
      <p className="col-span-1">{projectKey ? projectKey : "ZEN-1"}</p>
      <p className="col-span-1 ">Priority</p>
      <p className="col-span-2 ">Status</p>
      <p className="col-span-2 ">update</p>
      <p className="col-span-1 ">date</p>
      <p className="col-span-1 ">Assigned to</p>
    </div>
  );
}
