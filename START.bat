@echo off
title winnverse
echo Kutubxonalar o'rnatilmoqda (birinchi marta bir necha daqiqa ketadi)...
call npm install
echo Sayt ishga tushmoqda: http://localhost:5173
start http://localhost:5173
call npm run dev
pause
