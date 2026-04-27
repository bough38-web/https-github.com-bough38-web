import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'chatbot.json');
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({
        greeting: "안녕하세요! 고객 해지방어 전담 AI 어시스턴트입니다.",
        systemPrompt: "당신은 해지방어 전문가입니다."
      });
    }
    const data = fs.readFileSync(dataPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read chatbot settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const dataPath = path.join(process.cwd(), 'data', 'chatbot.json');
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save chatbot settings' }, { status: 500 });
  }
}
