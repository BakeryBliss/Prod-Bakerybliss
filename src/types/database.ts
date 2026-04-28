// Database types for Supabase
// Generated from the provided schema

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          parent_id: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          parent_id?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          parent_id?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          detailed_description: string | null;
          price: number;
          original_price: number | null;
          rating: number | null;
          review_count: number | null;
          in_stock: boolean | null;
          is_popular: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          detailed_description?: string | null;
          price: number;
          original_price?: number | null;
          rating?: number | null;
          review_count?: number | null;
          in_stock?: boolean | null;
          is_popular?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          detailed_description?: string | null;
          price?: number;
          original_price?: number | null;
          rating?: number | null;
          review_count?: number | null;
          in_stock?: boolean | null;
          is_popular?: boolean | null;
          created_at?: string | null;
        };
      };
      product_categories: {
        Row: {
          product_id: string;
          category_id: string;
        };
        Insert: {
          product_id: string;
          category_id: string;
        };
        Update: {
          product_id?: string;
          category_id?: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string | null;
          image_url: string;
          alt: string | null;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          image_url: string;
          alt?: string | null;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          image_url?: string;
          alt?: string | null;
        };
      };
      product_sizes: {
        Row: {
          id: string;
          product_id: string | null;
          label: string | null;
          price_modifier: number | null;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          label?: string | null;
          price_modifier?: number | null;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          label?: string | null;
          price_modifier?: number | null;
        };
      };
      product_flavors: {
        Row: {
          id: string;
          product_id: string | null;
          label: string | null;
          price_modifier: number | null;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          label?: string | null;
          price_modifier?: number | null;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          label?: string | null;
          price_modifier?: number | null;
        };
      };
      product_ingredients: {
        Row: {
          id: string;
          product_id: string | null;
          name: string | null;
          allergen: boolean | null;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          name?: string | null;
          allergen?: boolean | null;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          name?: string | null;
          allergen?: boolean | null;
        };
      };
      product_nutrition: {
        Row: {
          product_id: string;
          serving_size: string | null;
          calories: number | null;
          fat: string | null;
          carbs: string | null;
          protein: string | null;
          sugar: string | null;
        };
        Insert: {
          product_id: string;
          serving_size?: string | null;
          calories?: number | null;
          fat?: string | null;
          carbs?: string | null;
          protein?: string | null;
          sugar?: string | null;
        };
        Update: {
          product_id?: string;
          serving_size?: string | null;
          calories?: number | null;
          fat?: string | null;
          carbs?: string | null;
          protein?: string | null;
          sugar?: string | null;
        };
      };
      product_tags: {
        Row: {
          id: string;
          product_id: string | null;
          tag: string | null;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          tag?: string | null;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          tag?: string | null;
        };
      };
      product_allergens: {
        Row: {
          id: string;
          product_id: string | null;
          allergen: string | null;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          allergen?: string | null;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          allergen?: string | null;
        };
      };
      customers: {
        Row: {
          id: string; // usually matches auth.users.id (uuid)
          first_name: string | null;
          last_name: string | null;
          email: string | null;
          phone: string | null;
          created_at: string | null;
          metadata: any | null;
        };
        Insert: {
          id?: string;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          phone?: string | null;
          created_at?: string | null;
          metadata?: any | null;
        };
        Update: {
          id?: string;
          first_name?: string | null;
          last_name?: string | null;
          email?: string | null;
          phone?: string | null;
          created_at?: string | null;
          metadata?: any | null;
        };
      };
      customer_addresses: {
        Row: {
          id: string;
          customer_id: string | null;
          label: string | null; // e.g., "Home", "Work"
          line1: string | null;
          line2: string | null;
          city: string | null;
          state: string | null;
          postal_code: string | null;
          country: string | null;
          phone: string | null;
          is_default: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          label?: string | null;
          line1?: string | null;
          line2?: string | null;
          city?: string | null;
          state?: string | null;
          postal_code?: string | null;
          country?: string | null;
          phone?: string | null;
          is_default?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          customer_id?: string | null;
          label?: string | null;
          line1?: string | null;
          line2?: string | null;
          city?: string | null;
          state?: string | null;
          postal_code?: string | null;
          country?: string | null;
          phone?: string | null;
          is_default?: boolean | null;
          created_at?: string | null;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_id: string | null;
          total_amount: number | null;
          currency: string | null;
          status: string | null; // e.g., pending, paid, fulfilled, cancelled
          shipping_address_id: string | null;
          billing_address_id: string | null;
          payment_method_id: string | null;
          metadata: any | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          total_amount?: number | null;
          currency?: string | null;
          status?: string | null;
          shipping_address_id?: string | null;
          billing_address_id?: string | null;
          payment_method_id?: string | null;
          metadata?: any | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          customer_id?: string | null;
          total_amount?: number | null;
          currency?: string | null;
          status?: string | null;
          shipping_address_id?: string | null;
          billing_address_id?: string | null;
          payment_method_id?: string | null;
          metadata?: any | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string | null;
          product_id: string | null;
          product_name: string | null;
          quantity: number | null;
          unit_price: number | null;
          total_price: number | null;
          metadata: any | null; // e.g., chosen size/flavor
        };
        Insert: {
          id?: string;
          order_id?: string | null;
          product_id?: string | null;
          product_name?: string | null;
          quantity?: number | null;
          unit_price?: number | null;
          total_price?: number | null;
          metadata?: any | null;
        };
        Update: {
          id?: string;
          order_id?: string | null;
          product_id?: string | null;
          product_name?: string | null;
          quantity?: number | null;
          unit_price?: number | null;
          total_price?: number | null;
          metadata?: any | null;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string | null;
          customer_id: string | null;
          rating: number | null;
          title: string | null;
          body: string | null;
          created_at: string | null;
          metadata: any | null;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          customer_id?: string | null;
          rating?: number | null;
          title?: string | null;
          body?: string | null;
          created_at?: string | null;
          metadata?: any | null;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          customer_id?: string | null;
          rating?: number | null;
          title?: string | null;
          body?: string | null;
          created_at?: string | null;
          metadata?: any | null;
        };
      };
      payment_methods: {
        Row: {
          id: string;
          customer_id: string | null;
          provider: string | null; // e.g., razorpay, stripe
          provider_payment_id: string | null;
          brand: string | null; // card brand
          last4: string | null;
          exp_month: number | null;
          exp_year: number | null;
          is_default: boolean | null;
          metadata: any | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          provider?: string | null;
          provider_payment_id?: string | null;
          brand?: string | null;
          last4?: string | null;
          exp_month?: number | null;
          exp_year?: number | null;
          is_default?: boolean | null;
          metadata?: any | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          customer_id?: string | null;
          provider?: string | null;
          provider_payment_id?: string | null;
          brand?: string | null;
          last4?: string | null;
          exp_month?: number | null;
          exp_year?: number | null;
          is_default?: boolean | null;
          metadata?: any | null;
          created_at?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
  customer_profile: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          full_name: string | null;
          avatar_url: string | null;
          phone_number: string | null;
          favorite_flavor: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          phone_number?: string | null;
          favorite_flavor?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          phone_number?: string | null;
          favorite_flavor?: string | null;
        };
      };
      addresses: {
        Row: {
          id: string;
          profile_id: string | null;
          label: string | null;
          street_address: string;
          city: string;
          postal_code: string;
          phone_number: string | null;
          is_default: boolean | null;
        };
        Insert: {
          id?: string;
          profile_id?: string | null;
          label?: string | null;
          street_address: string;
          city: string;
          postal_code: string;
          phone_number?: string | null;
          is_default?: boolean | null;
        };
        Update: {
          id?: string;
          profile_id?: string | null;
          label?: string | null;
          street_address?: string;
          city?: string;
          postal_code?: string;
          phone_number?: string | null;
          is_default?: boolean | null;
        };
      };
      orders: {
        Row: {
          id: string;
          profile_id: string | null;
          address_id: string | null;
          status: string | null;
          total_amount: number;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          profile_id?: string | null;
          address_id?: string | null;
          status?: string | null;
          total_amount: number;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          profile_id?: string | null;
          address_id?: string | null;
          status?: string | null;
          total_amount?: number;
          created_at?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string | null;
          product_id: string | null;
          quantity: number;
          price_at_purchase: number;
        };
        Insert: {
          id?: string;
          order_id?: string | null;
          product_id?: string | null;
          quantity: number;
          price_at_purchase: number;
        };
        Update: {
          id?: string;
          order_id?: string | null;
          product_id?: string | null;
          quantity?: number;
          price_at_purchase?: number;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string | null;
          profile_id: string | null;
          rating: number | null;
          comment: string | null;
          created_at: string | null;
          customer_name: string | null;
          customer_image_url: string | null;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          profile_id?: string | null;
          rating?: number | null;
          comment?: string | null;
          created_at?: string | null;
          customer_name?: string | null;
          customer_image_url?: string | null;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          profile_id?: string | null;
          rating?: number | null;
          comment?: string | null;
          created_at?: string | null;
          customer_name?: string | null;
          customer_image_url?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Typed row types for convenience
export type Category = Database['public']['Tables']['categories']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type ProductCategory = Database['public']['Tables']['product_categories']['Row'];
export type ProductImage = Database['public']['Tables']['product_images']['Row'];
export type ProductSize = Database['public']['Tables']['product_sizes']['Row'];
export type ProductFlavor = Database['public']['Tables']['product_flavors']['Row'];
export type ProductIngredient = Database['public']['Tables']['product_ingredients']['Row'];
export type ProductNutrition = Database['public']['Tables']['product_nutrition']['Row'];
export type ProductTag = Database['public']['Tables']['product_tags']['Row'];
export type ProductAllergen = Database['public']['Tables']['product_allergens']['Row'];

// Extended product type with all relations
export interface ProductWithRelations extends Product {
  images: ProductImage[];
  sizes: ProductSize[];
  flavors: ProductFlavor[];
  ingredients: ProductIngredient[];
  nutrition: ProductNutrition | null;
  tags: ProductTag[];
  allergens: ProductAllergen[];
  categories: (Category & { parent?: Category | null })[];
}

export type Profile = Database['customer_profile']['Tables']['profiles']['Row'];
export type Customer = Profile;
export type CustomerAddress = Database['customer_profile']['Tables']['addresses']['Row'];
export type Order = Database['customer_profile']['Tables']['orders']['Row'];
export type OrderItem = Database['customer_profile']['Tables']['order_items']['Row'];
export type Review = Database['customer_profile']['Tables']['reviews']['Row'];

// Extend product relations with reviews
export interface ProductWithAllRelations extends ProductWithRelations {
  reviews?: Review[];
}
