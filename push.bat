@echo off
git init
git config user.name "oprom0004"
git config user.email "oprom0004@gmail.com"
git add .
git commit -m "Initial commit for yiouapp.com"
git remote add origin https://github.com/oprom0004/yiouapp.com
git branch -M main
git push -u origin main --force
