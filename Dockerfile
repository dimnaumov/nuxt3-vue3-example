# Используем официальный образ Node.js в качестве базового
FROM node:20.15.0

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /front

# Копируем файл package.json и package-lock.json для установки зависимостей
COPY package*.json /front

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы проекта в контейнер
COPY . /front

# Собираем приложение Nuxt для production
RUN npm run build

# Экспонируем порт, который будет использовать приложение
EXPOSE 3000

# Команда по умолчанию для запуска приложения в production-режиме
CMD ["npm", "run", "start"]
