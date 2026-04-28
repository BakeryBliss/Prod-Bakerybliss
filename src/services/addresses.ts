import { supabase } from '@/lib/supabase';
import type { CustomerAddress } from '@/types/database';

const customerProfile = supabase.schema('customer_profile');

export async function getAddressesByCustomer(profileId: string): Promise<CustomerAddress[]> {
  const { data, error } = await customerProfile.from('addresses').select('*').eq('profile_id', profileId).order('label', { ascending: true });
  if (error) {
    console.error('getAddressesByCustomer error', error);
    return [];
  }
  return (data as CustomerAddress[]) || [];
}

export async function addAddress(address: Partial<CustomerAddress>): Promise<CustomerAddress | null> {
  const { data, error } = await customerProfile.from('addresses').insert(address).select().single();
  if (error) {
    console.error('addAddress error', error);
    return null;
  }
  return data as CustomerAddress;
}

export async function updateAddress(id: string, updates: Partial<CustomerAddress>): Promise<CustomerAddress | null> {
  const { data, error } = await customerProfile.from('addresses').update(updates).eq('id', id).select().single();
  if (error) {
    console.error('updateAddress error', error);
    return null;
  }
  return data as CustomerAddress;
}

export async function deleteAddress(id: string): Promise<boolean> {
  const { error } = await customerProfile.from('addresses').delete().eq('id', id);
  if (error) {
    console.error('deleteAddress error', error);
    return false;
  }
  return true;
}

export default { getAddressesByCustomer, addAddress, updateAddress, deleteAddress };
