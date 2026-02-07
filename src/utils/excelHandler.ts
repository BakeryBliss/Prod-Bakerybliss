import * as XLSX from 'xlsx';
import { Product, ProductImage, CustomizationOption, Ingredient } from '@/data/products';

// Helper function to serialize arrays into readable strings
function serializeArray(items: any[], key: string): string {
  if (!items || items.length === 0) return '';
  return items.map(item => {
    if (typeof item === 'string') return item;
    if (typeof item === 'object') {
      if ('label' in item && 'priceModifier' in item) {
        return `${item.label}:${item.priceModifier}`;
      }
      if ('url' in item) {
        return item.url;
      }
      if ('name' in item && 'allergen' in item) {
        return `${item.name}${item.allergen ? '*' : ''}`;
      }
    }
    return JSON.stringify(item);
  }).join('; ');
}

// Helper function to parse serialized arrays back
function parseArray(value: string, type: 'image' | 'customization' | 'ingredient' | 'tag'): any[] {
  if (!value || value.trim() === '') return [];
  
  const items = value.split(';').map(item => item.trim()).filter(item => item);
  
  if (type === 'image') {
    return items.map((url, idx) => ({
      id: `img_${idx}`,
      url,
      alt: url.split('/').pop() || 'Product image'
    }));
  }
  
  if (type === 'customization') {
    return items.map((item, idx) => {
      const [label, priceStr] = item.split(':');
      return {
        id: `custom_${idx}`,
        label: label || item,
        priceModifier: parseFloat(priceStr) || 0
      };
    });
  }
  
  if (type === 'ingredient') {
    return items.map(item => ({
      name: item.replace('*', ''),
      allergen: item.includes('*')
    }));
  }
  
  if (type === 'tag') {
    return items;
  }
  
  return [];
}

// Helper function to parse nutrition info from concatenated string
function parseNutrition(
  servingSize: string,
  calories: string,
  fat: string,
  carbs: string,
  protein: string,
  sugar: string
) {
  return {
    servingSize: servingSize || '100g',
    calories: parseInt(calories) || 0,
    fat: fat || '0g',
    carbs: carbs || '0g',
    protein: protein || '0g',
    sugar: sugar || '0g'
  };
}

export interface ExcelRow {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  category: string;
  inStock: boolean;
  imageUrls: string;
  sizes: string;
  flavors: string;
  ingredients: string;
  servingSize: string;
  calories: string;
  fat: string;
  carbs: string;
  protein: string;
  sugar: string;
  detailedDescription: string;
  subcategory?: string;
  tags?: string;
  isNew?: boolean;
  isPopular?: boolean;
  isVegan?: boolean;
  allergens?: string;
}

/**
 * Convert products array to Excel workbook
 */
export function productsToExcel(products: Product[]): XLSX.WorkBook {
  // Transform products into flat Excel rows
  const rows: ExcelRow[] = products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    rating: product.rating,
    reviewCount: product.reviewCount,
    description: product.description,
    category: Array.isArray(product.category) ? product.category.join('; ') : product.category,
    inStock: product.inStock,
    imageUrls: serializeArray(product.images, 'url'),
    sizes: serializeArray(product.sizes, 'label'),
    flavors: serializeArray(product.flavors, 'label'),
    ingredients: serializeArray(product.ingredients, 'name'),
    servingSize: product.nutrition.servingSize,
    calories: product.nutrition.calories.toString(),
    fat: product.nutrition.fat,
    carbs: product.nutrition.carbs,
    protein: product.nutrition.protein,
    sugar: product.nutrition.sugar,
    detailedDescription: product.detailedDescription,
    subcategory: product.subcategory,
    tags: product.tags ? product.tags.join('; ') : '',
    isNew: product.isNew,
    isPopular: product.isPopular,
    isVegan: product.isVegan,
    allergens: product.allergens ? product.allergens.join('; ') : ''
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);
  
  // Set column widths for better readability
  const columnWidths = [
    { wch: 8 },   // id
    { wch: 25 },  // name
    { wch: 10 },  // price
    { wch: 12 },  // originalPrice
    { wch: 8 },   // rating
    { wch: 12 },  // reviewCount
    { wch: 30 },  // description
    { wch: 12 },  // category
    { wch: 10 },  // inStock
    { wch: 50 },  // imageUrls
    { wch: 30 },  // sizes
    { wch: 30 },  // flavors
    { wch: 40 },  // ingredients
    { wch: 12 },  // servingSize
    { wch: 10 },  // calories
    { wch: 10 },  // fat
    { wch: 10 },  // carbs
    { wch: 10 },  // protein
    { wch: 10 },  // sugar
    { wch: 50 },  // detailedDescription
    { wch: 15 },  // subcategory
    { wch: 20 },  // tags
    { wch: 10 },  // isNew
    { wch: 10 },  // isPopular
    { wch: 10 },  // isVegan
    { wch: 30 }   // allergens
  ];
  
  worksheet['!cols'] = columnWidths;

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

  return workbook;
}

/**
 * Convert Excel file to products array
 */
export function excelToProducts(buffer: Buffer): Product[] {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

    const products: Product[] = rows.map(row => {
      // Validate required fields
      if (!row.id || !row.name || row.price === undefined) {
        throw new Error(`Missing required fields in row: ${row.name || 'Unknown'}`);
      }

      return {
        id: row.id.toString(),
        name: row.name,
        price: typeof row.price === 'string' ? parseFloat(row.price) : row.price,
        originalPrice: row.originalPrice 
          ? (typeof row.originalPrice === 'string' ? parseFloat(row.originalPrice) : row.originalPrice)
          : undefined,
        rating: typeof row.rating === 'string' ? parseFloat(row.rating) : row.rating,
        reviewCount: typeof row.reviewCount === 'string' ? parseInt(row.reviewCount) : row.reviewCount,
        description: row.description,
        category: row.category,
        inStock: String(row.inStock).toLowerCase() === 'true' || row.inStock === true,
        images: parseArray(row.imageUrls, 'image'),
        sizes: parseArray(row.sizes, 'customization'),
        flavors: parseArray(row.flavors, 'customization'),
        ingredients: parseArray(row.ingredients, 'ingredient'),
        nutrition: parseNutrition(
          row.servingSize,
          row.calories,
          row.fat,
          row.carbs,
          row.protein,
          row.sugar
        ),
        detailedDescription: row.detailedDescription,
        subcategory: row.subcategory,
        tags: row.tags ? parseArray(row.tags, 'tag') : undefined,
        isNew: row.isNew === true || String(row.isNew).toUpperCase() === 'TRUE',
        isPopular: row.isPopular === true || String(row.isPopular).toUpperCase() === 'TRUE',
        isVegan: row.isVegan === true || String(row.isVegan).toUpperCase() === 'TRUE',
        allergens: row.allergens ? row.allergens.split(';').map(a => a.trim()).filter(a => a) : undefined
      };
    });

    return products;
  } catch (error) {
    throw new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate TypeScript code for products file from products array
 */
export function generateProductsTypeScriptCode(products: Product[]): string {
  const imports = `import { Product, ProductImage, CustomizationOption, Ingredient, NutritionInfo } from './products';

`;

  const productsCode = `export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;

  return imports + productsCode;
}
