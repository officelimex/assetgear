# AssetGear Frontend

This project is the frontend part of the AssetGear application, built with React, TypeScript, and Vite. It provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Table of Contents

- [AssetGear Frontend](#assetgear-frontend)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Assets](#assets)
  - [Expanding the ESLint Configuration](#expanding-the-eslint-configuration)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/aro-wolo/assetgear.git
    cd assetgear/frontend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

## Usage

1. Start the frontend development server:

    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /v1/api/auth/signin`: Sign in a user
- `POST /v1/api/auth/send-otp`: Send OTP to user's email
- `POST /v1/api/auth/verify-otp`: Verify OTP
- `POST /v1/api/auth/reset-password`: Reset password

### Assets

- `GET /v1/api/assets`: Get all assets

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

    ```js
    export default tseslint.config({
      languageOptions: {
        // other options...
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname,
        },
      },
    })
    ```

- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

    ```js
    // eslint.config.js
    import react from 'eslint-plugin-react'

    export default tseslint.config({
      // Set the react version
      settings: { react: { version: '18.3' } },
      plugins: {
        // Add the react plugin
        react,
      },
      rules: {
        // other rules...
        // Enable its recommended rules
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
      },
    })
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.