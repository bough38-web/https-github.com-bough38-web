#!/bin/bash
echo "🚀 GitHub Pages(gh-pages 브랜치) 배포를 시작합니다..."

# 현재 브랜치 백업
current_branch=$(git branch --show-current)

# 기존 gh-pages 브랜치가 있다면 삭제
git branch -D gh-pages 2>/dev/null

# 새 고아(orphan) 브랜치 생성 (기록이 없는 빈 브랜치)
git checkout --orphan gh-pages

# 모든 파일 Git에서 추적 해제 (삭제)
git rm -rf .

# main 브랜치에서 교육용 자료만 가져오기
git checkout main -- public/training.html

# 경로 이동 (루트 디렉토리로)
mv public/training.html ./index.html
rm -rf public

# 커밋 및 푸시
git add index.html
git commit -m "docs: 현장 교육용 가이드 배포"
git push origin gh-pages -f

# 원래 브랜치로 복귀
git checkout $current_branch

echo "✅ 배포가 완료되었습니다!"
echo "👉 접속 주소: https://bough38-web.github.io/https-github.com-bough38-web/"
