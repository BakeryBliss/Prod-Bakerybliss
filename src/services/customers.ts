import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/database';

const customerProfile = supabase.schema('customer_profile');

export async function getCustomerById(id: string): Promise<Profile | null> {
  const { data, error } = await customerProfile.from('profiles').select('*').eq('id', id).single();
  if (error) {
    console.error('getCustomerById error', error);
    return null;
  }
  return data as Profile | null;
}

export async function upsertCustomerProfile(profile: Partial<Profile>): Promise<Profile | null> {
  const { data, error } = await customerProfile.from('profiles').upsert(profile).select().single();
  if (error) {
    console.error('upsertCustomerProfile error', error);
    return null;
  }
  return data as Profile;
}

export async function getOrCreateCustomer(authUserId: string, defaults?: Partial<Profile>): Promise<Profile | null> {
  const existing = await getCustomerById(authUserId);
  if (existing) return existing;

  const toInsert: Partial<Profile> = {
    id: authUserId,
    updated_at: new Date().toISOString(),
    full_name: defaults?.full_name ?? null,
    avatar_url: defaults?.avatar_url ?? null,
    phone_number: defaults?.phone_number ?? null,
    favorite_flavor: defaults?.favorite_flavor ?? null,
  };

  return upsertCustomerProfile(toInsert);
}

export async function deleteCustomer(id: string): Promise<boolean> {
  const { error } = await customerProfile.from('profiles').delete().eq('id', id);
  if (error) {
    console.error('deleteCustomer error', error);
    return false;
  }
  return true;
}

export default { getCustomerById, upsertCustomerProfile, getOrCreateCustomer, deleteCustomer };
