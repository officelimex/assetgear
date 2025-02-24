# AssetGear

AssetGear is a web application for managing assets. It includes features for user authentication, asset management, and more.

## Table of Contents

- [AssetGear](#assetgear)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Assets](#assets)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/aro-wolo/assetgear.git
    cd assetgear
    ```

2. Install dependencies for the frontend:

    ```sh
    cd frontend
    npm install
    ```

3. Install dependencies for the backend:

    ```sh
    cd ../backend
    go mod tidy
    ```

4. Set up environment variables:

    Create a `.env` file in the [backend](http://_vscodecontentref_/0) directory with the following content:

    ```env
    DB_HOST=your_mysql_host
    DB_USER=your_mysql_user
    DB_PASS=your_mysql_password
    DB_NAME=your_mysql_database
    DB_PORT=your_mysql_port
    JWT_SECRET=your_secret_key
    SMTP_USERNAME=your_email@gmail.com
    SMTP_PASSWORD=your_app_specific_password
    SMTP_SERVER=smtp.gmail.com
    SMTP_PORT=587
    SMTP_FROM=your_email@gmail.com
    ```

## Usage

1. Start the backend server:

    ```sh
    cd backend
    go run main.go
    ```

2. Start the frontend development server:

    ```sh
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /v1/api/auth/signin`: Sign in a user
- `POST /v1/api/auth/send-otp`: Send OTP to user's email
- `POST /v1/api/auth/verify-otp`: Verify OTP
- `POST /v1/api/auth/reset-password`: Reset password

### Assets

- `GET /v1/api/assets`: Get all assets

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.