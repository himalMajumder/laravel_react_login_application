# Login Application

This is a sample application built with Laravel, Vite, ReactJS, Formik, and Yup to demonstrate a basic login functionality.

## Prerequisites

Before running this application, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (v20.x or later)
- [PHP](https://www.php.net/) (v8.1 or later)
- [Composer](https://getcomposer.org/)
- [MySQL](https://www.mysql.com/) or any other compatible database

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/himalMajumder/laravel_react_login_application.git
    ```

2. Navigate to the project directory:

    ```bash
    cd laravel_react_login_application
    ```

3. Install PHP dependencies:

    ```bash
    composer install
    ```

4. Install Node.js dependencies:

    ```bash
    npm install
    ```
4. Install Node.js dependencies:

    ```bash
    cp .env.example .env
    ```

## Configuration
 
1. Configure your database credentials in the `.env` file:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_database_username
    DB_PASSWORD=your_database_password
    ```

## Running the Application

1. Compile assets:

    ```bash
    npm run dev
    ```

2. Start the Laravel development server:

    ```bash
    php artisan serve
    ```

3. Access the application in your web browser at `http://localhost:8000`.

## Features

- **Laravel**: Backend framework for PHP development.
- **Vite**: Build tooling for modern web development.
- **ReactJS**: Frontend library for building user interfaces.
- **Formik**: Form library for ReactJS applications.
- **Yup**: Schema validation library for form validation.
- **Login Functionality**: Demonstrates a basic login functionality with form validation.
- **Register Functionality**: Demonstrates a basic login functionality with form validation.

## License

This project is licensed under the [MIT License](LICENSE).
