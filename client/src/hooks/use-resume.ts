import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

// We need to construct the response type based on the schema
// Since we don't have the exact inferred type exported as a single object from routes,
// we'll infer it from the Zod schema directly.
type ResumeData = z.infer<typeof api.resume.get.responses[200]>;

export function useResume() {
  return useQuery({
    queryKey: [api.resume.get.path],
    queryFn: async () => {
      const res = await fetch(api.resume.get.path);
      if (!res.ok) {
        throw new Error("Failed to fetch resume data");
      }
      return api.resume.get.responses[200].parse(await res.json());
    },
  });
}
