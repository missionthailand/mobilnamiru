import { Database } from "@/supabase/generated.types";

export type AuditSubmission = Omit<Database["public"]["Tables"]["audit_submissions"]["Row"], "id">;