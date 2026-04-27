import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key Not Found: 환경변수에 OPENAI_API_KEY가 없습니다.' }, { status: 400 });
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
      const errorData = await res.json().catch(() => ({}));
      console.error('OpenAI Error:', errorData);
      
      let errorMsg = 'OpenAI API Failed';
      if (res.status === 401) errorMsg = '401 Unauthorized: 제공된 API Key가 유효하지 않거나 잘못되었습니다.';
      if (res.status === 429) errorMsg = '429 Too Many Requests: API 한도 초과 또는 결제 정보가 필요합니다.';
      
      return NextResponse.json({ error: errorMsg, details: errorData }, { status: res.status });
    }

    const data = await res.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || '알 수 없는 서버 에러 발생' }, { status: 500 });
  }
}
