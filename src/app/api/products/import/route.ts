import { NextRequest, NextResponse } from 'next/server';
import { excelToProducts } from '@/utils/excelHandler';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    if (!file.name.endsWith('.xlsx')) {
      return NextResponse.json(
        { error: 'File must be .xlsx format' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Parse Excel to products
    const products = excelToProducts(buffer);

    // Create temporary test file instead of updating main products.ts
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const tempFileName = `products_imported_${timestamp}.json`;
    const tempFilePath = path.join(process.cwd(), 'src/data', tempFileName);

    // Write as JSON for now (easier to read)
    fs.writeFileSync(tempFilePath, JSON.stringify(products, null, 2));

    return NextResponse.json({
      success: true,
      message: `Products imported successfully. Temp file: ${tempFileName}`,
      productsCount: products.length,
      tempFile: tempFileName,
      filePath: tempFilePath
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Import failed' },
      { status: 500 }
    );
  }
}
