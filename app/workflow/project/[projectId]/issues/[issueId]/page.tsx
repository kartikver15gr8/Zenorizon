"use client";

import { useEffect, useState } from "react";

export default function Issue({
  params,
}: {
  params: Promise<{ issueId: string }>;
}) {
  const [issue_id, setIssueId] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setIssueId(resolvedParams.issueId);
    };
    fetchParams();
  }, [params]);
  return (
    <div className="">
      <p>ISSUE:</p>
      <p>{issue_id}</p>
    </div>
  );
}
