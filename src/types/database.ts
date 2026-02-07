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
