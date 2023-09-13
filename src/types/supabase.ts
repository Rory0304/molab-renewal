import { Database } from "@rory0304/molab-renewal-types";

export type Row<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type StorageType =
  | "review_thumbnail"
  | "propose_thumbnail"
  | "project_image";
s;
