import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xtxgvymigvwhcsogmdqj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0eGd2eW1pZ3Z3cmhjc29nbWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTIyMTYsImV4cCI6MjA5NDk2ODIxNn0.5XvUQHiKvSr8jdENo-CAWOC0aYooWxKok-wFdF_IHp4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
