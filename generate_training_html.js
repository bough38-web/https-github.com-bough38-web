const fs = require('fs');

const scriptsData = JSON.parse(fs.readFileSync('./data/scripts.json', 'utf8'));
const chatbotData = JSON.parse(fs.readFileSync('./data/chatbot.json', 'utf8'));

const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>해지방어 플랫폼 현장 교육 가이드 & 매뉴얼</title>
    <style>
        :root {
            --primary: #2563eb;
            --primary-hover: #1d4ed8;
            --bg: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
        }
        body {
            font-family: 'Pretendard', -apple-system, sans-serif;
            background-color: var(--bg);
            color: var(--text-main);
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        /* Sticky Navigation */
        nav {
            position: sticky;
            top: 0;
            background: var(--card-bg);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            padding: 15px 20px;
            z-index: 100;
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
        }
        nav a {
            text-decoration: none;
            color: var(--text-main);
            background: #eff6ff;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 700;
            transition: all 0.2s;
            border: 1px solid #bfdbfe;
        }
        nav a:hover {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }
        
        .container {
            max-width: 1000px;
            margin: 40px auto;
            padding: 0 20px;
        }
        
        section {
            background: var(--card-bg);
            border-radius: 16px;
            padding: 40px;
            margin-bottom: 40px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            border-top: 5px solid var(--primary);
        }
        
        h2 {
            font-size: 28px;
            margin-top: 0;
            border-bottom: 2px solid var(--border);
            padding-bottom: 15px;
            margin-bottom: 25px;
        }
        h3 {
            font-size: 20px;
            color: var(--primary);
            margin-top: 30px;
        }
        
        .box {
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        /* Accordion for scripts */
        .script-card {
            border: 1px solid var(--border);
            border-radius: 10px;
            margin-bottom: 15px;
            overflow: hidden;
        }
        .script-header {
            background: #f8fafc;
            padding: 15px 20px;
            cursor: pointer;
            font-weight: 700;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background 0.2s;
        }
        .script-header:hover {
            background: #f1f5f9;
        }
        .script-badges {
            display: flex;
            gap: 10px;
        }
        .badge {
            background: var(--primary);
            color: white;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: normal;
        }
        .badge.type {
            background: #475569;
        }
        .script-content {
            padding: 20px;
            display: none;
            border-top: 1px solid var(--border);
            background: white;
        }
        .script-content.active {
            display: block;
        }
        .script-text {
            background: #eff6ff;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid var(--primary);
            font-size: 18px;
            margin-top: 15px;
            margin-bottom: 15px;
            color: #1e3a8a;
        }
        
        .chatbot-demo {
            display: flex;
            flex-direction: column;
            gap: 15px;
            background: #f1f5f9;
            padding: 20px;
            border-radius: 12px;
        }
        .chat-bubble {
            max-width: 80%;
            padding: 15px;
            border-radius: 16px;
            font-size: 16px;
        }
        .chat-ai {
            background: white;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .chat-user {
            background: var(--primary);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>

    <nav>
        <a href="#manual">📖 사용 매뉴얼</a>
        <a href="#chatbot">🤖 챗봇 기능 안내</a>
        <a href="#scripts">🛡️ 핵심 방어 스크립트 (21종)</a>
    </nav>

    <div class="container">
        <!-- 1. 사용 매뉴얼 -->
        <section id="manual">
            <h2>📖 플랫폼 사용 매뉴얼</h2>
            <div class="box">
                <h3>1. 시스템 접속 및 로그인</h3>
                <p>본 플랫폼은 철저한 사내 자산 보호를 위해 보안 로그인을 거쳐야 합니다.</p>
                <ul>
                    <li>접속 주소(URL) 진입 시 <b>보안 로그인</b> 화면 노출</li>
                    <li>지정된 <b>공통 암호 (3867)</b> 입력 후 <code>Enter</code> 입력</li>
                    <li>모바일/태블릿 접속 시 브라우저 <b>'홈 화면에 추가(즐겨찾기)'</b> 권장</li>
                </ul>
            </div>
            <div class="box">
                <h3>2. 빠른 검색 및 음성 인식</h3>
                <p>현장에서 즉각적인 대응이 필요할 때 활용하세요.</p>
                <ul>
                    <li><b>키워드 검색:</b> "비싸다", "위약금", "타사" 등 핵심 키워드만 입력</li>
                    <li><b>음성 검색(🎤):</b> 검색창 옆 마이크 아이콘을 누르고 상황을 말하면 즉시 스크립트 검색 (예: "경쟁사로 넘어간대")</li>
                </ul>
            </div>
            <div class="box">
                <h3>3. Top 10 전문가 기법</h3>
                <p>현장에서 가장 성공률이 높았던 10개의 핵심 스크립트만 필터링하여 볼 수 있습니다.</p>
                <ul>
                    <li>리스트 상단의 <code>👑 전문가 Top 10 기법</code> 스위치를 켜면 즉시 필터링됩니다.</li>
                </ul>
            </div>
        </section>

        <!-- 2. 챗봇 기능 -->
        <section id="chatbot">
            <h2>🤖 AI 챗봇 (어시스턴트) 기능 안내</h2>
            <p>플랫폼 우측 하단에 떠 있는 <b>메시지 아이콘</b>을 클릭하면 실시간 AI 어시스턴트와 상담할 수 있습니다.</p>
            
            <div class="box">
                <h3>💡 챗봇 활용 시나리오</h3>
                <p>스크립트 목록에 없는 특수한 상황이나, 즉각적인 협상 논리가 필요할 때 챗봇에게 상황을 설명하세요.</p>
                
                <div class="chatbot-demo">
                    <div class="chat-bubble chat-ai">
                        ${chatbotData.greeting.replace(/\\n/g, '<br>')}
                    </div>
                    <div class="chat-bubble chat-user">
                        고객이 "장비가 너무 오래돼서 꼴도 보기 싫다"며 당장 해지해 달라고 화를 냅니다. 어떻게 말해야 하죠?
                    </div>
                    <div class="chat-bubble chat-ai">
                        <b>[대응 가이드]</b><br>
                        "고객님, 오랫동안 저희 장비를 사용하시며 불편을 겪으셨다니 정말 죄송합니다. 꼴도 보기 싫으실 만큼 답답하셨을 마음 충분히 이해합니다. 제가 지금 당장 최신형 장비로 무상 무상 교체가 가능한지 확인해 드리겠습니다. 기기만 새것으로 바꿔도 훨씬 쾌적하실 겁니다. 잠시만 확인 도와드려도 될까요?"<br><br>
                        *핵심: 우선 철저히 공감한 뒤, '최신 장비 무상 교체' 카드로 시선을 돌리세요.*
                    </div>
                </div>
            </div>
        </section>

        <!-- 3. 핵심 방어 스크립트 -->
        <section id="scripts">
            <h2>🛡️ 핵심 방어 스크립트 (총 ${scriptsData.length}종)</h2>
            <p>아래 각 상황을 클릭하면 현장에서 바로 읽을 수 있는 방어 대본이 나타납니다.</p>
            
            <div id="script-list">
                ${scriptsData.map(script => \`
                <div class="script-card">
                    <div class="script-header" onclick="toggleScript('\${script.id}')">
                        <span>[\${script.category}] \${script.situation}</span>
                        <div class="script-badges">
                            <span class="badge type">\${script.customerType}</span>
                        </div>
                    </div>
                    <div class="script-content" id="content-\${script.id}">
                        <div style="margin-bottom: 10px;"><b>🎯 방어 목표:</b> \${script.goal}</div>
                        <div><b>📋 핵심 전략:</b></div>
                        <ul style="margin-top: 5px;">
                            \${script.strategy.map(s => \`<li>\${s}</li>\`).join('')}
                        </ul>
                        <div class="script-text">
                            🗣️ "\${script.script}"
                        </div>
                        <div class="grid-2">
                            <div>
                                <b>🎁 제시 가능 혜택:</b>
                                <ul>
                                    \${script.offer.map(o => \`<li>\${o}</li>\`).join('')}
                                </ul>
                            </div>
                            <div>
                                <b>⚠️ 주의 사항:</b>
                                <ul>
                                    \${script.caution.map(c => \`<li>\${c}</li>\`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                \`).join('')}
            </div>
        </section>
    </div>

    <script>
        function toggleScript(id) {
            const content = document.getElementById('content-' + id);
            if (content.classList.contains('active')) {
                content.classList.remove('active');
            } else {
                content.classList.add('active');
            }
        }
    </script>
</body>
</html>`;

fs.writeFileSync('./public/training.html', htmlContent);
fs.writeFileSync('../현장교육용_발표자료.html', htmlContent);
console.log('Successfully generated HTML with all scripts and features!');
