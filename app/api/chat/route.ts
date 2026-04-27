import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('No API Key');
    }

    let systemPrompt = "당신은 엔터프라이즈 보안 서비스 회사의 고객 해지방어 전문 코치입니다.";
    try {
      const settingsPath = path.join(process.cwd(), 'data', 'chatbot.json');
      if (fs.existsSync(settingsPath)) {
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        if (settings.systemPrompt) systemPrompt = settings.systemPrompt;
      }
    } catch(e) {}

    // Call OpenAI API
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: 'system', content: systemPrompt },
          ...history.map((h: any) => ({ role: h.role, content: h.content })),
          { role: 'user', content: message }
        ],
        max_tokens: 300
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('OpenAI Error:', errorData);
      throw new Error('OpenAI API Failed');
    }

    const data = await res.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to generate AI response' }, { status: 500 });
  }
}
