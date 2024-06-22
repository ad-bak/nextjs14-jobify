"use client";

import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { JobStatus } from "@/utils/types";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const jobStatus = searchParams.get("jobStatus") || "all";
  const search = searchParams.get("search") || "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;

    let params = new URLSearchParams();
    params.set("search", search);
    params.set("jobStatus", jobStatus);

    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <form className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg" onSubmit={handleSubmit}>
      <Input type="text" placeholder="Search Jobs" name="search" defaultValue={search} />
      <Select defaultValue={jobStatus} name="jobStatus">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["all", ...Object.values(JobStatus)].map((status) => {
            return (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
}

export default SearchForm;
