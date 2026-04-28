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

async function notifyAdmin(message: any) {
  // 1. Email/SMS/Kakao Notification Placeholder
  console.log(`[Notification] To Admin: New message from ${message.senderName} - "${message.content}"`);
  
  // Example: If using a Webhook (Slack/Discord/etc)
  /*
  await fetch('https://hooks.slack.com/services/YOUR/WEBHOOK/URL', {
    method: 'POST',
    body: JSON.stringify({ text: `[현장톡 알림] ${message.senderName}: ${message.content}` })
  });
  */

  // Example: If using an Email Service (Nodemailer/SendGrid)
  // await sendEmail({ to: 'admin@company.com', subject: 'New Field Message', body: message.content });
}

export async function POST(request: Request) {
  try {
    const newMessage = await request.json();
    const messages = getMessages();
    
    if (!newMessage.timestamp) {
      newMessage.timestamp = new Date().toISOString();
    }
    
    messages.push(newMessage);
    fs.writeFileSync(DATA_PATH, JSON.stringify(messages, null, 2), 'utf-8');

    // Notify Admin if message is from field
    if (newMessage.sender === 'field') {
      await notifyAdmin(newMessage);
    }

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error('Failed to save message:', error);
    return NextResponse.json({ success: false, error: 'Failed to save message' }, { status: 500 });
  }
}
