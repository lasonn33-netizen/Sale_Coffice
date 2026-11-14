# Coffice Laravel API

## Windows prerequisites

Install PHP 8.2+ and Composer before running Laravel. The easiest Windows option is
[XAMPP](https://www.apachefriends.org/) for PHP, followed by
[Composer](https://getcomposer.org/download/). Add the PHP folder to Windows PATH,
for example `C:\xampp\php`, then restart VS Code.

Verify the installation:

```powershell
php -v
composer --version
```

If either command is not recognized, Laravel cannot run until that installation or
PATH issue is fixed.

## Setup with PostgreSQL

Create a PostgreSQL database named `coffice`, then update `.env` with your PostgreSQL username and password.

```bash
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

The API is available under `http://localhost:8000/api/v1`. The seeded administrator is `admin` / `password`; change this before production use.

Set `VITE_API_BASE_URL=http://localhost:8000/api/v1` in each frontend application.

Public endpoints are product/category reads and registration/login. Catalog management, users, order status changes, and deletion require an administrator bearer token.

Admins can create users and assign granular permissions from the Users screen. Staff permissions include `products.view`, `products.manage`, `categories.view`, `categories.manage`, `orders.view`, `orders.manage`, `users.view`, and `users.manage`. Admins always have all permissions.

```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=coffice
DB_USERNAME=postgres
DB_PASSWORD=YOUR_REAL_POSTGRES_PASSWORD
```
