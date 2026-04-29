import { supabase } from '@/lib/supabase';
import { createServerClient } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import type { Order, OrderItem } from '@/types/database';
import type { Database } from '@/types/database';

const customerProfile = supabase.schema('customer_profile');

function getOrderWriteClient(accessToken?: string) {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createServerClient().schema('customer_profile');
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey && accessToken) {
    const rlsClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    return rlsClient.schema('customer_profile');
  }

  return supabase.schema('customer_profile');
}

export async function createOrder(
  order: Partial<Order>,
  items: Partial<OrderItem>[],
  accessToken?: string
): Promise<{ order: Order | null; items: OrderItem[] | null; error?: string }> {
  const serverCustomerProfile = getOrderWriteClient(accessToken);

  // Insert order
  const { data: orderData, error: orderError } = await serverCustomerProfile.from('orders').insert(order).select().single();
  if (orderError || !orderData) {
    console.error('createOrder error inserting order', orderError);
    return {
      order: null,
      items: null,
      error: orderError?.message || 'Could not insert order record',
    };
  }

  const orderId = (orderData as Order).id;

  // attach order_id to items
  const itemsToInsert = items.map((it) => ({ ...it, order_id: orderId }));
  const { data: itemsData, error: itemsError } = await serverCustomerProfile.from('order_items').insert(itemsToInsert).select();
  if (itemsError) {
    console.error('createOrder error inserting items', itemsError);
    // Try to cleanup order if items fail
    await serverCustomerProfile.from('orders').delete().eq('id', orderId);
    return {
      order: null,
      items: null,
      error: itemsError.message || 'Could not insert order items',
    };
  }

  return { order: orderData as Order, items: (itemsData as OrderItem[]) || [] };
}

export async function getOrdersByCustomer(customerId: string): Promise<Order[]> {
  const { data, error } = await customerProfile.from('orders').select('*').eq('profile_id', customerId).order('created_at', { ascending: false });
  if (error) {
    console.error('getOrdersByCustomer error', error);
    return [];
  }
  return (data as Order[]) || [];
}

export async function getOrderById(id: string): Promise<{ order: Order | null; items: OrderItem[] }> {
  const { data: orderData, error: orderError } = await customerProfile.from('orders').select('*').eq('id', id).single();
  if (orderError || !orderData) {
    return { order: null, items: [] };
  }
  const { data: itemsData, error: itemsError } = await customerProfile.from('order_items').select('*').eq('order_id', id);
  if (itemsError) {
    console.error('getOrderById items error', itemsError);
    return { order: orderData as Order, items: [] };
  }
  return { order: orderData as Order, items: (itemsData as OrderItem[]) || [] };
}

export async function updateOrderStatus(id: string, status: string): Promise<Order | null> {
  const { data, error } = await customerProfile.from('orders').update({ status }).eq('id', id).select().single();
  if (error) {
    console.error('updateOrderStatus error', error);
    return null;
  }
  return data as Order;
}

export default { createOrder, getOrdersByCustomer, getOrderById, updateOrderStatus };
