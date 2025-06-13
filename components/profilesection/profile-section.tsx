"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type UserInfo = {
  email: string | null;
  name: string | null;
  username: string | null;
};

export default function ProfileSection() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedFullname, setUpdatedFullname] = useState("");
  const [inEditMode, setInEditMode] = useState(false);
  const [updatingUserInfo, setUpdatingUserinfo] = useState(false);

  const toggleEdit = () => setInEditMode((prev) => !prev);

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/user/getprofile");
      setUserInfo(response.data);
    } catch (error) {
      toast.info("Error while fetching user info.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    setUpdatedUsername(userInfo?.username ?? "");
    setUpdatedFullname(userInfo?.name ?? "");
  }, [userInfo]);

  const updateUserInfo = async () => {
    setUpdatingUserinfo(true);
    try {
      const response = await axios.patch("/api/user/updateprofile", {
        username: updatedUsername,
        fullname: updatedFullname,
      });
      if (response.data) {
        toast.info("Updated user info!");
        setInEditMode(false);
        fetchUserInfo(); // Refresh info
      }
    } catch (error) {
      toast.info("Failed to update user info!");
    } finally {
      setUpdatingUserinfo(false);
    }
  };

  // Utility for initials
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      const first = parts[0][0] || "";
      const last = parts[0].slice(-1) || "";
      return (first + last).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const hasChanges =
    updatedUsername !== (userInfo?.username ?? "") ||
    updatedFullname !== (userInfo?.name ?? "");

  return (
    <div className="pt-16 min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 2xl:px-40 flex">
      <div className="border border-[#565555] mt-4 rounded-2xl p-2 md:p-4 flex-1 mb-5 bg-[#0F1111]">
        <p className="text-[18px] md:text-xl xl:text-2xl ">Profile</p>
        <div className="mt-4 lg:mt-10 grid grid-cols-1 gap-x-5">
          {isLoading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inEditMode && hasChanges) updateUserInfo();
                }}
                className="text-sm md:text-[16px] border border-[#322e2e] rounded-2xl h-80 bg-[#3b3a3d18] grid grid-cols-1 p-2 xl:p-3"
              >
                <div className="border-b border-[#2e3232] flex items-center justify-between px-2">
                  <p>Profile picture</p>
                  <div
                    className="border border-[#565555] h-12 aspect-square rounded-full bg-[#56555569] flex items-center justify-center"
                    aria-label="Profile initials"
                  >
                    {getInitials(userInfo?.name)}
                  </div>
                </div>
                <div className="border-b border-[#2e3232] flex items-center justify-between px-2">
                  <p>Email</p>
                  <div className="border border-[#322e2e] h-9 px-2 rounded flex items-center">
                    {userInfo?.email || "Add email"}
                  </div>
                </div>
                <div className="border-b border-[#2e3232] flex items-center justify-between px-2">
                  <p>Full name</p>
                  {!inEditMode ? (
                    <div className="border border-[#322e2e] h-9 px-2 rounded flex items-center">
                      {userInfo?.name || "Add full name"}
                    </div>
                  ) : (
                    <input
                      className="border border-[#322e2e] h-9 px-2 rounded flex items-center outline-none"
                      value={updatedFullname}
                      onChange={(e) => setUpdatedFullname(e.target.value)}
                      placeholder="Add full name"
                      autoComplete="name"
                      aria-label="Full name"
                    />
                  )}
                </div>
                <div className="flex items-center justify-between px-2">
                  <p>Username</p>
                  {!inEditMode ? (
                    <div className="border border-[#322e2e] h-9 px-2 rounded flex items-center">
                      {userInfo?.username || "Add username"}
                    </div>
                  ) : (
                    <input
                      className="border border-[#322e2e] h-9 px-2 rounded flex items-center outline-none"
                      value={updatedUsername}
                      onChange={(e) => setUpdatedUsername(e.target.value)}
                      placeholder="Add username"
                      autoComplete="username"
                      aria-label="Username"
                    />
                  )}
                </div>
                <div className="flex justify-end mt-4 gap-x-2">
                  <button
                    type="button"
                    onClick={toggleEdit}
                    className="border px-4 h-8 rounded-lg border-[#565555] cursor-pointer"
                    aria-label={inEditMode ? "Cancel editing" : "Edit profile"}
                  >
                    {inEditMode ? "Cancel" : "Edit"}
                  </button>
                  {inEditMode && (
                    <button
                      type="submit"
                      disabled={!inEditMode || !hasChanges || updatingUserInfo}
                      className="border px-4 h-8 rounded-lg border-[#565555] cursor-pointer"
                      aria-label="Save changes"
                    >
                      {updatingUserInfo ? "Updating…" : "Save"}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
