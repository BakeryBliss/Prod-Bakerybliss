import { products } from '../src/data/products';
import { productsToExcel, excelToProducts } from '../src/utils/excelHandler';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const command = process.argv[2];
const scriptsDir = path.join(process.cwd(), 'scripts');

async function exportProducts() {
  try {
    const workbook = productsToExcel(products);
    const fileName = `products_export_${new Date().toISOString().split('T')[0]}.xlsx`;
    const filePath = path.join(scriptsDir, fileName);
    
    XLSX.writeFile(workbook, filePath);
    console.log(`✅ Products exported to: ${filePath}`);
  } catch (error) {
    console.error('❌ Export failed:', error);
  }
}

async function importProducts() {
  try {
    // Find the first .xlsx file in scripts folder
    const files = fs.readdirSync(scriptsDir);
    const excelFile = files.find(f => f.endsWith('.xlsx') && !f.includes('export'));
    
    if (!excelFile) {
      console.error('❌ No .xlsx file found in scripts folder');
      return;
    }

    const filePath = path.join(scriptsDir, excelFile);
    const buffer = fs.readFileSync(filePath);
    const importedProducts = excelToProducts(buffer);

    // Create temp file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const tempFileName = `products_imported_${timestamp}.json`;
    const tempFilePath = path.join(process.cwd(), 'src/data', tempFileName);

    fs.writeFileSync(tempFilePath, JSON.stringify(importedProducts, null, 2));
    console.log(`✅ Products imported from: ${excelFile}`);
    console.log(`✅ Saved to: ${tempFilePath}`);
    console.log(`📊 Total products imported: ${importedProducts.length}`);
  } catch (error) {
    console.error('❌ Import failed:', error);
  }
}

if (command === 'export') {
  exportProducts();
} else if (command === 'import') {
  importProducts();
} else {
  console.log(`
Usage:
  npm run sync:export   - Export products to Excel
  npm run sync:import   - Import products from Excel (place .xlsx in scripts folder)
  `);
}