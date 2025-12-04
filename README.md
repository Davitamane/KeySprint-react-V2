<div style="display:flex; align-items: center">
  <h1 style="position:relative; top: -6px" >Task Manager App</h1>
</div>

---

Task Manager is a Laravel-powered application featuring a clean, intuitive dashboard for authenticated users. It allows users to create, edit, and review tasks, sort them by due date or creation date, view detailed descriptions, and manage their personal profile.

#

### Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Migrations](#migration)
- [Development](#development)
- [Deployment with CI / CD](#deployment-with-ci--cd)
- [Project Structure](#project-structure)
- [Service Interaction Map](#service-interaction-map)
- [Server Infrastructure](#server-infrastructure)
- [Database Backups](#database-backups)

#

### Prerequisites

![PHP](https://img.shields.io/badge/PHP-%3E%3D%208.4-blue)
![MySQL](https://img.shields.io/badge/MySQL-%3E%3D%208.0-orange)
![Composer](https://img.shields.io/badge/Composer-%3E%3D%202.x-purple)
![Node](https://img.shields.io/badge/Node-%3E%3D%2018-green)

### Tech Stack

#### Backend

- **Laravel** 12.x

#### Frontend

- **Blade** templating engine
- **TailwindCSS**
- **Vite** (asset bundler)

#### Database

- **MySQL** 8.x

#### Other

- **Laravel Storage** (for profile images / task covers)
- **Auth Middleware**
- **Form Requests** (validation)

#

### Getting Started

1\. First of all you need to clone Task manager repository from github:

```sh
git clone https://github.com/RedberryInternship/dato-hizanishvili-task-manager.git
```

2\. Next step requires you to run _composer install_ in order to install all the dependencies.

```sh
composer install
```

3\. after you have installed all the PHP dependencies, it's time to install all the JS dependencies:

```sh
npm install
```

as well as:

```sh
npm run dev
```

in order to build your Vite resources.

4\. Now we need to set our env file. Go to the root of your project and execute this command.

```sh
cp .env.example .env
```

And now you should provide **.env** file all the necessary environment variables:

#

**MYSQL:**

> DB_CONNECTION=mysql

> DB_HOST=127.0.0.1

> DB_PORT=3306

> DB_DATABASE=**\***

> DB_USERNAME=**\***

> DB_PASSWORD=**\***

4\. After setting up the .env file execute this in the root of your project :

```sh
  php artisan migrate
```

Which runs migrations.

5\. Link storage :

```sh
  php artisan storage:link
```

for task covers or user images.

#

### Running Unit tests

Running unit tests also is very simple process, just type in following command:

```sh
composer test
```

### Development

You can run Laravel's built-in development server by executing:

```sh
  php artisan serve
```

As mentioned above, when working on JS you may run:

```sh
  npm run dev
```

#

### Deployment

1\. SSH into your server:

```sh
ssh user@server
```

2\. Pull the latest changes:

```sh
git pull origin main
```

3\. Install server dependencies:

```sh
composer install
```

4\. Run migrations:

```sh
php artisan migrate
```

5\. Build production assets:

```sh
npm install
npm run build
```

6\. Clear & optimize:

```sh
php artisan optimize
```

7\. Reload services (nginx / php-fpm):

```sh
sudo systemctl reload nginx
sudo systemctl restart php8.x-fpm
```

#

### Resources

- **Database Diagram (DrawSQL):**  
  https://drawsql.app/teams/davitamane/diagrams/task-manager

- **Production URL:**  
  http://task-manager.dato-khizanishvili.redberryinternship.ge/

### Developer Notes / Special Logic

> The project uses standard Laravel structure. No special conventions.
