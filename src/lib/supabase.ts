import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://jemimaovpnorfyvqqolb.supabase.co"
const supabaseKey = process.env.SUPABASE_ANON_KEY || "your key"

export const supabase = createClient(supabaseUrl, supabaseKey)
