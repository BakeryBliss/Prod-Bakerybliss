import * as XLSX from 'xlsx';
import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';
import { productsToExcel } from '@/utils/excelHandler';

export async function GET(request: NextRequest) {
  try {
    // Convert products to Excel workbook
    const workbook = productsToExcel(products);
    
    // Convert workbook to buffer
    const buffer = Buffer.from(XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }));
    
    // Return Excel file as response
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="products_${new Date().toISOString().split('T')[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
