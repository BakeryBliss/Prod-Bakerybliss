import { supabase } from '@/lib/supabase';
import type { Profile, Review } from '@/types/database';

const customerProfile = supabase.schema('customer_profile');

export interface ReviewCard {
  id: string;
  customerName: string;
  customerImage?: string | null;
  customerImageAlt?: string | null;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpful: number;
}

export async function addReview(review: Partial<Review>): Promise<Review | null> {
  // If profile_id is provided, fetch customer name and image to denormalize
  let enrichedReview = { ...review };

  if (review.profile_id) {
    const { data: profileData, error: profileError } = await customerProfile
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', review.profile_id)
      .single();

    if (profileError) {
      console.error('addReview: Error fetching profile', profileError);
    } else if (profileData) {
      enrichedReview = {
        ...enrichedReview,
        customer_name: profileData.full_name || 'Verified Customer',
        customer_image_url: profileData.avatar_url,
      };
    }
  }

  const { data, error } = await customerProfile.from('reviews').insert(enrichedReview).select().single();
  if (error) {
    console.error('addReview error', error);
    return null;
  }
  return data as Review;
}

export async function getReviewsForProduct(productId: string): Promise<Review[]> {
  const { data, error } = await customerProfile.from('reviews').select('*').eq('product_id', productId).order('created_at', { ascending: false });
  if (error) {
    console.error('getReviewsForProduct error', error);
    return [];
  }
  return (data as Review[]) || [];
}

export async function getReviewCardsForProduct(productId: string): Promise<ReviewCard[]> {
  const reviews = await getReviewsForProduct(productId);
  if (reviews.length === 0) {
    return [];
  }

  // Use denormalized customer data from reviews table instead of joining to profiles
  return reviews.map((review) => ({
    id: review.id,
    customerName: review.customer_name || 'Verified Customer',
    customerImage: review.customer_image_url || null,
    customerImageAlt: review.customer_name ? `${review.customer_name} profile picture` : null,
    rating: review.rating || 0,
    date: review.created_at ? new Date(review.created_at).toLocaleDateString('en-US') : '',
    comment: review.comment || '',
    verified: Boolean(review.profile_id),
    helpful: 0,
  }));
}

export async function updateReview(id: string, updates: Partial<Review>): Promise<Review | null> {
  const { data, error } = await customerProfile.from('reviews').update(updates).eq('id', id).select().single();
  if (error) {
    console.error('updateReview error', error);
    return null;
  }
  return data as Review;
}

export async function deleteReview(id: string): Promise<boolean> {
  const { error } = await customerProfile.from('reviews').delete().eq('id', id);
  if (error) {
    console.error('deleteReview error', error);
    return false;
  }
  return true;
}

export default { addReview, getReviewsForProduct, getReviewCardsForProduct, updateReview, deleteReview };
