import { supabase } from '@/lib/supabase';
import type {
  Product as DBProduct,
  ProductImage as DBProductImage,
  ProductSize,
  ProductFlavor,
  ProductIngredient,
  ProductNutrition,
  ProductTag,
  ProductAllergen,
  Category,
} from '@/types/database';

// Import the existing Product interface types for compatibility
import type {
  Product,
  ProductImage,
  CustomizationOption,
  Ingredient,
  NutritionInfo,
} from '@/data/products';

// Transform database product to app Product format
function transformProduct(
  product: DBProduct,
  images: DBProductImage[],
  sizes: ProductSize[],
  flavors: ProductFlavor[],
  ingredients: ProductIngredient[],
  nutrition: ProductNutrition | null,
  tags: ProductTag[],
  allergens: ProductAllergen[],
  categories: Category[],
  parentCategories: Map<string, Category>
): Product {
  // Determine the main category and subcategory
  let mainCategory = '';
  let subcategory: string | undefined;

  for (const cat of categories) {
    if (cat.parent_id) {
      // This is a subcategory
      subcategory = cat.name;
      const parent = parentCategories.get(cat.parent_id);
      if (parent) {
        mainCategory = parent.name;
      }
    } else {
      // This is a main category
      if (!mainCategory) {
        mainCategory = cat.name;
      }
    }
  }

  // Transform images
  const transformedImages: ProductImage[] = images.map((img, index) => ({
    id: img.id || `img${index + 1}`,
    url: img.image_url,
    alt: img.alt || product.name,
  }));

  // Provide default image if none exists
  if (transformedImages.length === 0) {
    transformedImages.push({
      id: 'default',
      url: '/assets/images/placeholder.jpg',
      alt: product.name,
    });
  }

  // Transform sizes
  const transformedSizes: CustomizationOption[] = sizes.map((size, index) => ({
    id: size.id || `size${index + 1}`,
    label: size.label || 'Default',
    priceModifier: size.price_modifier || 0,
  }));

  // Provide default size if none exists
  if (transformedSizes.length === 0) {
    transformedSizes.push({
      id: 'default',
      label: 'Regular',
      priceModifier: 0,
    });
  }

  // Transform flavors
  const transformedFlavors: CustomizationOption[] = flavors.map((flavor, index) => ({
    id: flavor.id || `flavor${index + 1}`,
    label: flavor.label || 'Original',
    priceModifier: flavor.price_modifier || 0,
  }));

  // Provide default flavor if none exists
  if (transformedFlavors.length === 0) {
    transformedFlavors.push({
      id: 'original',
      label: 'Original',
      priceModifier: 0,
    });
  }

  // Transform ingredients
  const transformedIngredients: Ingredient[] = ingredients.map((ing) => ({
    name: ing.name || 'Unknown',
    allergen: ing.allergen || false,
  }));

  // Transform nutrition
  const transformedNutrition: NutritionInfo = nutrition
    ? {
        servingSize: nutrition.serving_size || '1 serving',
        calories: nutrition.calories || 0,
        fat: nutrition.fat || '0g',
        carbs: nutrition.carbs || '0g',
        protein: nutrition.protein || '0g',
        sugar: nutrition.sugar || '0g',
      }
    : {
        servingSize: '1 serving',
        calories: 0,
        fat: '0g',
        carbs: '0g',
        protein: '0g',
        sugar: '0g',
      };

  // Extract tag strings
  const tagStrings = tags.map((t) => t.tag).filter((t): t is string => t !== null);

  // Extract allergen strings
  const allergenStrings = allergens.map((a) => a.allergen).filter((a): a is string => a !== null);

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.original_price || undefined,
    rating: product.rating || 0,
    reviewCount: product.review_count || 0,
    description: product.description || '',
    category: mainCategory || 'Uncategorized',
    inStock: product.in_stock ?? true,
    images: transformedImages,
    sizes: transformedSizes,
    flavors: transformedFlavors,
    ingredients: transformedIngredients,
    nutrition: transformedNutrition,
    detailedDescription: product.detailed_description || product.description || '',
    subcategory,
    tags: tagStrings.length > 0 ? tagStrings : undefined,
    isPopular: product.is_popular || undefined,
    allergens: allergenStrings.length > 0 ? allergenStrings : undefined,
  };
}

// Fetch all products with their relations
export async function fetchAllProducts(): Promise<Product[]> {
  // Fetch all products
  const productsResult = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (productsResult.error) {
    throw productsResult.error;
  }

  const products = productsResult.data as DBProduct[];
  if (!products || products.length === 0) {
    return [];
  }
  const productIds = products.map((p) => p.id);

  // Fetch all related data in parallel
  const [
    imagesResult,
    sizesResult,
    flavorsResult,
    ingredientsResult,
    nutritionResult,
    tagsResult,
    allergensResult,
    productCategoriesResult,
    categoriesResult,
  ] = await Promise.all([
    supabase.from('product_images').select('*').in('product_id', productIds),
    supabase.from('product_sizes').select('*').in('product_id', productIds),
    supabase.from('product_flavors').select('*').in('product_id', productIds),
    supabase.from('product_ingredients').select('*').in('product_id', productIds),
    supabase.from('product_nutrition').select('*').in('product_id', productIds),
    supabase.from('product_tags').select('*').in('product_id', productIds),
    supabase.from('product_allergens').select('*').in('product_id', productIds),
    supabase.from('product_categories').select('*').in('product_id', productIds),
    supabase.from('categories').select('*'),
  ]);

  // Type assertions for the results
  const images = (imagesResult.data || []) as DBProductImage[];
  const sizes = (sizesResult.data || []) as ProductSize[];
  const flavors = (flavorsResult.data || []) as ProductFlavor[];
  const ingredients = (ingredientsResult.data || []) as ProductIngredient[];
  const nutritions = (nutritionResult.data || []) as ProductNutrition[];
  const tags = (tagsResult.data || []) as ProductTag[];
  const allergens = (allergensResult.data || []) as ProductAllergen[];
  const productCategories = (productCategoriesResult.data || []) as { product_id: string; category_id: string }[];
  const categories = (categoriesResult.data || []) as Category[];

  // Create lookup maps
  const imagesMap = new Map<string, DBProductImage[]>();
  const sizesMap = new Map<string, ProductSize[]>();
  const flavorsMap = new Map<string, ProductFlavor[]>();
  const ingredientsMap = new Map<string, ProductIngredient[]>();
  const nutritionMap = new Map<string, ProductNutrition>();
  const tagsMap = new Map<string, ProductTag[]>();
  const allergensMap = new Map<string, ProductAllergen[]>();
  const productCategoryMap = new Map<string, string[]>(); // product_id -> category_ids
  const categoriesMap = new Map<string, Category>();

  // Populate categories map
  categories.forEach((cat) => {
    categoriesMap.set(cat.id, cat);
  });

  // Populate relation maps
  images.forEach((img) => {
    if (img.product_id) {
      if (!imagesMap.has(img.product_id)) imagesMap.set(img.product_id, []);
      imagesMap.get(img.product_id)!.push(img);
    }
  });

  sizes.forEach((size) => {
    if (size.product_id) {
      if (!sizesMap.has(size.product_id)) sizesMap.set(size.product_id, []);
      sizesMap.get(size.product_id)!.push(size);
    }
  });

  flavors.forEach((flavor) => {
    if (flavor.product_id) {
      if (!flavorsMap.has(flavor.product_id)) flavorsMap.set(flavor.product_id, []);
      flavorsMap.get(flavor.product_id)!.push(flavor);
    }
  });

  ingredients.forEach((ing) => {
    if (ing.product_id) {
      if (!ingredientsMap.has(ing.product_id)) ingredientsMap.set(ing.product_id, []);
      ingredientsMap.get(ing.product_id)!.push(ing);
    }
  });

  nutritions.forEach((nut) => {
    nutritionMap.set(nut.product_id, nut);
  });

  tags.forEach((tag) => {
    if (tag.product_id) {
      if (!tagsMap.has(tag.product_id)) tagsMap.set(tag.product_id, []);
      tagsMap.get(tag.product_id)!.push(tag);
    }
  });

  allergens.forEach((allergen) => {
    if (allergen.product_id) {
      if (!allergensMap.has(allergen.product_id)) allergensMap.set(allergen.product_id, []);
      allergensMap.get(allergen.product_id)!.push(allergen);
    }
  });

  productCategories.forEach((pc) => {
    if (!productCategoryMap.has(pc.product_id)) productCategoryMap.set(pc.product_id, []);
    productCategoryMap.get(pc.product_id)!.push(pc.category_id);
  });

  // Fetch review stats (count and average rating) for these products from the reviews table
  // Reviews are stored in the `customer_profile.reviews` table/schema
  const reviewsResult = await supabase
    .from('customer_profile.reviews')
    .select('product_id, rating')
    .in('product_id', productIds);

  const reviewsData = (reviewsResult.data || []) as { product_id: string; rating: number }[];
  const reviewStatsMap = new Map<string, { count: number; average: number }>();
  if (reviewsData.length > 0) {
    const tempMap = new Map<string, { sum: number; count: number }>();
    for (const r of reviewsData) {
      const id = r.product_id;
      if (!tempMap.has(id)) tempMap.set(id, { sum: r.rating || 0, count: 1 });
      else {
        const cur = tempMap.get(id)!;
        cur.sum += r.rating || 0;
        cur.count += 1;
      }
    }
    for (const [id, { sum, count }] of tempMap.entries()) {
      reviewStatsMap.set(id, { count, average: Math.round((sum / count) * 10) / 10 });
    }
  }

  // Transform products
  return products.map((product) => {
    const categoryIds = productCategoryMap.get(product.id) || [];
    const productCategories = categoryIds
      .map((id) => categoriesMap.get(id))
      .filter((c): c is Category => c !== undefined);

    // Create parent categories map for this product
    const parentCategoriesMap = new Map<string, Category>();
    productCategories.forEach((cat) => {
      if (cat.parent_id) {
        const parent = categoriesMap.get(cat.parent_id);
        if (parent) {
          parentCategoriesMap.set(cat.parent_id, parent);
        }
      }
    });

    const transformed = transformProduct(
      product,
      imagesMap.get(product.id) || [],
      sizesMap.get(product.id) || [],
      flavorsMap.get(product.id) || [],
      ingredientsMap.get(product.id) || [],
      nutritionMap.get(product.id) || null,
      tagsMap.get(product.id) || [],
      allergensMap.get(product.id) || [],
      productCategories,
      parentCategoriesMap
    );

    // Override rating and reviewCount with aggregated values from reviews table when available
    const stats = reviewStatsMap.get(product.id);
    if (stats) {
      transformed.rating = stats.average;
      transformed.reviewCount = stats.count;
    }

    return transformed;
  });
}

// Fetch a single product by ID
export async function fetchProductById(id: string): Promise<Product | null> {
  const { data: productData, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (productError || !productData) {
    console.error('Error fetching product:', productError);
    return null;
  }

  const product = productData as unknown as DBProduct;

  // Fetch all related data in parallel
  const [
    imagesResult,
    sizesResult,
    flavorsResult,
    ingredientsResult,
    nutritionResult,
    tagsResult,
    allergensResult,
    productCategoriesResult,
  ] = await Promise.all([
    supabase.from('product_images').select('*').eq('product_id', id),
    supabase.from('product_sizes').select('*').eq('product_id', id),
    supabase.from('product_flavors').select('*').eq('product_id', id),
    supabase.from('product_ingredients').select('*').eq('product_id', id),
    supabase.from('product_nutrition').select('*').eq('product_id', id).single(),
    supabase.from('product_tags').select('*').eq('product_id', id),
    supabase.from('product_allergens').select('*').eq('product_id', id),
    supabase.from('product_categories').select('*').eq('product_id', id),
  ]);

  // Type assertions
  const images = (imagesResult.data || []) as DBProductImage[];
  const sizes = (sizesResult.data || []) as ProductSize[];
  const flavors = (flavorsResult.data || []) as ProductFlavor[];
  const ingredients = (ingredientsResult.data || []) as ProductIngredient[];
  const nutrition = (nutritionResult.data || null) as ProductNutrition | null;
  const productTags = (tagsResult.data || []) as ProductTag[];
  const productAllergens = (allergensResult.data || []) as ProductAllergen[];
  const productCats = (productCategoriesResult.data || []) as { product_id: string; category_id: string }[];

  // Fetch categories
  const categoryIds = productCats.map((pc) => pc.category_id);
  const categoriesResult = await supabase.from('categories').select('*').in('id', categoryIds.length > 0 ? categoryIds : ['']);
  const fetchedCategories = (categoriesResult.data || []) as Category[];

  // Create parent categories map
  const parentCategoriesMap = new Map<string, Category>();
  const allCategoriesResult = await supabase.from('categories').select('*');
  const allCategories = (allCategoriesResult.data || []) as Category[];
  allCategories.forEach((cat) => {
    parentCategoriesMap.set(cat.id, cat);
  });

  return transformProduct(
    product,
    images,
    sizes,
    flavors,
    ingredients,
    nutrition,
    productTags,
    productAllergens,
    fetchedCategories,
    parentCategoriesMap
  );
}

// Fetch products by category
export async function fetchProductsByCategory(categoryName: string): Promise<Product[]> {
  // Find the category
  const { data: categoryData } = await supabase
    .from('categories')
    .select('id')
    .eq('name', categoryName)
    .single();

  if (!categoryData) {
    return [];
  }

  const category = categoryData as unknown as { id: string };

  // Find products in this category
  const productCategoriesResult = await supabase
    .from('product_categories')
    .select('product_id')
    .eq('category_id', category.id);

  const productCategoriesData = (productCategoriesResult.data || []) as { product_id: string }[];
  
  if (productCategoriesData.length === 0) {
    return [];
  }

  const productIds = productCategoriesData.map((pc) => pc.product_id);
  const allProducts = await fetchAllProducts();

  return allProducts.filter((p) => productIds.includes(p.id));
}

// Fetch popular products
export async function fetchPopularProducts(limit = 8): Promise<Product[]> {
  const productsResult = await supabase
    .from('products')
    .select('id')
    .eq('is_popular', true)
    .limit(limit);

  if (productsResult.error || !productsResult.data) {
    return [];
  }

  const productsData = productsResult.data as { id: string }[];
  const allProducts = await fetchAllProducts();
  const popularIds = new Set(productsData.map((p) => p.id));

  return allProducts.filter((p) => popularIds.has(p.id));
}

// Fetch all categories with their hierarchy
export async function fetchCategories(): Promise<Category[]> {
  const result = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (result.error) {
    console.error('Error fetching categories:', result.error);
    return [];
  }

  return (result.data || []) as Category[];
}

// Search products by name or description
export async function searchProducts(query: string): Promise<Product[]> {
  const searchTerm = `%${query}%`;

  const productsResult = await supabase
    .from('products')
    .select('id')
    .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`);

  if (productsResult.error || !productsResult.data) {
    return [];
  }

  const productsData = productsResult.data as { id: string }[];
  const allProducts = await fetchAllProducts();
  const matchingIds = new Set(productsData.map((p) => p.id));

  return allProducts.filter((p) => matchingIds.has(p.id));
}
