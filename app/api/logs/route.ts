import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'logs.json');
    if (!fs.existsSync(dataPath)) return NextResponse.json([]);
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return NextResponse.json(JSON.parse(fileContents));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read logs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const dataPath = path.join(process.cwd(), 'data', 'logs.json');
    let logs = [];
    if (fs.existsSync(dataPath)) {
      logs = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
    // Append new log at the beginning (limit to 1000 logs to prevent huge files)
    logs = [data, ...logs].slice(0, 1000);
    fs.writeFileSync(dataPath, JSON.stringify(logs, null, 2), 'utf8');
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save log' }, { status: 500 });
  }
}
