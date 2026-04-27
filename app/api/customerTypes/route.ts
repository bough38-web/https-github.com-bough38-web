import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import customerTypesData from '@/data/customerTypes.json';

export async function GET() {
  return NextResponse.json(customerTypesData);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'customerTypes.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to write customerTypes:', error);
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 });
  }
}
