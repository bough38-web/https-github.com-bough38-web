import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'interactions.json');
    if (!fs.existsSync(dataPath)) return NextResponse.json({});
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return NextResponse.json(JSON.parse(fileContents));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read interactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json(); // Full interactions map
    const dataPath = path.join(process.cwd(), 'data', 'interactions.json');
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save interactions' }, { status: 500 });
  }
}
