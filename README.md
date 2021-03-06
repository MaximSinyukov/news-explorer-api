# Проект NewsExplorer API

<p>
  <img alt="Status" src="https://img.shields.io/badge/status-released-green" >
  <img alt="Author" src="https://img.shields.io/badge/author-MaximSinyukov-blue" />
</p>

**Фронтенд часть проекта: [NewsExplorer Front-end](https://github.com/MaximSinyukov/news-explorer-frontend)**

## :page_with_curl: Суть проекта

Бэкенд часть проекта `News`. Проект позволяет развернуть `REST API` и задействовать базу данных `MongoDB`. В проекте представлены две сущности, а именно пользователь и статья. Было установлено ограничение на количество входящих запросов с одного ip. За это отвечает мидлвэра `rate-limiter`. Любой приходящий запрос проверяется на допустимые заголовки. За это отвечает модуль `Helmet`. Был настроен сбор логов для ошибок и запросов на api. Осуществлена защита информационных роутов через мидлвэру `auth`. Все поля запросов валидируются до передачи в контроллеры. Пароли хешируются. В этой работе предстояло реализовать возможность генерации токена через ключ расположенный в файле `.env`. Его следует создавать на месте непосредственного использования (сервер/локальный репозиторий) в корне проекта. Для этого в файле обозначьте следующие зависимости:
* `NODE_ENV=production` - сообщает скрипту о продакшн сборке
* `JWT_SECRET=ваш ключ` - ваш hex-ключ (его можно сгенерировать в консоли)
* `MONGO_URL=ваш url` - адрес mongoDB сервера

## :pushpin: Приложение к API

В заголовках запросов к защищенным роутам следует обязательно добавить - `authorization: 'Bearer token'`, где `token` - это токен пользователя.

### :green_book: Открытые роуты

`POST /signup`  
Регистрация пользователя. В body необходимо передать объект с `email, password, name`.
Возвращает объект пользователя c `email`.

`POST /signin`  
Регистрация пользователя. В body необходимо передать объект с `email, password`. 
Возвращает объект c `token`.

### :closed_book: Роуты с проверкой токена

`GET /users/me`  
Получение информации о пользователе.
Возвращает объект пользователя c `_id, name, email`,где:
- `_id` - id пользователя
- `name` - имя пользователя
- `email` - почта пользователя

`GET /articles`  
Получение сохраненных статей пользователя.
Возвращает массив статей. Статьи состоят из `_id, keyword, title, text, date, source, link, image`, где:
- `_id` - id статьи
- `keyword` - слово по которому найдена статья
- `title` - заголовок статьи
- `text` - текст статьи
- `date` - дата публикации статьи
- `source` - источник статьи
- `link` - ссылка на статью
- `image` - ссылка на картинку статьи

`POST /articles`  
Создание сохраненной статьи. В body необходимо передать `_id, keyword, title, text, date, source, link, image`.
Возвращает статью с информацией о ней.

`DELETE /articles/:id`  
Удаление сохраненной статьи, где `id` - это id статьи.
Возвращает информацию об удаленной статье.

## :wrench: О работе с проектом

1. Перед работой установите необходимые зависимости через - `npm install`
2. Для локального запуска базы данных используйте - `mongod`
3. Для запуска API в режиме разработчика используйте - `npm run dev`
4. Для локального запуска API воспользуйтесь - `npm run start`

## :bookmark_tabs: Стек

- JavaScript
- NodeJS
- ExpressJS
- MongoDB
- Eslint

## :mag_right: Полученные навыки

* работы с ограничением количества запросов с одного ip через мидлвэру
* проверка заголовков у запросов через модуль Helmet
* предоставить возможность использовать свой ключ для токена
* создать возможность подключения своего mongoDB сервера
* настройка сбора логов для входящих запросов и полученных ошибок
* защита некоторых роутов через мидлвэр
* валидация полей до передачи в контроллеры
* работа с генерацией токена
* хеширование пароля
* работа с централизованным обработчиком ошибок
* защита статей от удаления другими пользователями
* подключение и работа с линтером
* запуск сервера на локальном порте
* реализация режима разработчика с хот релоудом
* настройка первых роутов
* подключение к MongoDB
* создание схем и моделей сущностей
* настройка базы данных
* создание и настройка роутов
* создание и настройка контроллеров
