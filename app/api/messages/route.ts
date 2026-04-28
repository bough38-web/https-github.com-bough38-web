import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'messages.json');

function getMessages() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, '[]', 'utf-8');
    return [];
  }
  const content = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(content);
}

export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newMessage = await request.json();
    const messages = getMessages();
    
    // Add timestamp if not present
    if (!newMessage.timestamp) {
      newMessage.timestamp = new Date().toISOString();
    }
    
    messages.push(newMessage);
    
    fs.writeFileSync(DATA_PATH, JSON.stringify(messages, null, 2), 'utf-8');
    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error('Failed to save message:', error);
    return NextResponse.json({ success: false, error: 'Failed to save message' }, { status: 500 });
  }
}
