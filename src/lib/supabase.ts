import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Build hook function
export const triggerNetlifyBuild = async () => {
  const buildHookUrl = import.meta.env.VITE_NETLIFY_BUILD_HOOK_URL;
  
  if (!buildHookUrl) {
    console.warn('Netlify build hook URL not configured');
    return false;
  }

  try {
    const response = await fetch(buildHookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Build triggered successfully');
      return true;
    } else {
      console.error('Failed to trigger build:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error triggering build:', error);
    return false;
  }
};

// Auto-trigger builds on data changes
export const setupBuildTriggers = () => {
  // Listen for changes in products table
  supabase
    .channel('products-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'products' },
      (payload) => {
        console.log('Products changed:', payload);
        setTimeout(() => triggerNetlifyBuild(), 1000); // Delay to allow transaction to complete
      }
    )
    .subscribe();

  // Listen for changes in collections table
  supabase
    .channel('collections-changes')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'collections' },
      (payload) => {
        console.log('Collections changed:', payload);
        setTimeout(() => triggerNetlifyBuild(), 1000);
      }
    )
    .subscribe();

  // Listen for changes in site_settings table
  supabase
    .channel('site-settings-changes')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'site_settings' },
      (payload) => {
        console.log('Site settings changed:', payload);
        setTimeout(() => triggerNetlifyBuild(), 1000);
      }
    )
    .subscribe();
};