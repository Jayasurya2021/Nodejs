import { supabase } from "../lib/supabaseClient";

/**
 * Fetches the user profile from the 'profiles' table in Supabase.
 * Returns the name and profile picture URL.
 */
export const fetchUserProfile = async () => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.log("No active user session. Please log in to view your profile.");
      return null;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('name, profile_pic')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error in fetchUserProfile:", err);
    return null;
  }
};
