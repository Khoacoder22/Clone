# Tico E-commerce

<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Tico E-commerce
</h1>

<h4 align="center">
  <a href="https://docs.medusajs.com">Documentation</a> |
  <a href="https://www.medusajs.com">Website</a>
</h4>

<p align="center">
  Building blocks for digital commerce
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://www.producthunt.com/posts/medusa"><img src="https://img.shields.io/badge/Product%20Hunt-%231%20Product%20of%20the%20Day-%23DA552E" alt="Product Hunt"></a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

## About Tico E-commerce

Tico E-commerce is a customizable e-commerce platform built using [Medusa](https://www.medusajs.com), an open-source commerce engine. This project features a tailored admin panel implemented as a standalone application, forked from the Medusa Admin UI, and includes custom backend modules to enhance functionality. The project is designed to provide a flexible and scalable solution for digital commerce, allowing developers to extend both the frontend and backend as needed.

## Features

- **Custom Admin Panel**: Forked from Medusa’s Admin UI and running as a standalone Vite application for extensive customization. Learn more in the [Customize Admin UI Guide](https://docs.perseides.org/guides/v2/customize-admin-ui/standalone).
- **Custom Backend Modules**: Extended Medusa backend with custom modules to support specific business logic and features. Refer to the [Medusa V2 Advanced Backend Guide](https://docs.medusajs.com/v2/resources/advanced-backend) for customization details.
- **Scalable Architecture**: Built with Medusa’s modular commerce engine, enabling easy integration of new features and third-party services.
- **Developer-Friendly**: Supports modern development workflows with Yarn and Vite for the admin panel.

## Compatibility

This project is compatible with versions >= 2 of `@medusajs/medusa`.

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- Yarn
- Docker
- Medusa CLI (`npm install -g @medusajs/medusa-cli`)

### Installation

1. **Clone the Repository**

   ```bash
   git clone <your-repository-url>
   cd tico-be
   ```

2. **Install Dependencies**

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root of the project and configure the variables

   ```env
    ...
    POSTGRES_DB=medusa-store-tico
    POSTGRES_USER=postgres-tico
    POSTGRES_PASSWORD=postgres
    DATABASE_URL=postgres://postgres-tico:postgres@postgres:5432/medusa-store-tico
    REDIS_URL=redis://redis:6379
    ...

   ```

4. **Disable Admin UI in Backend**

   Ensure the Medusa backend does not serve the default Admin UI by updating the configuration:

   ```javascript
   // medusa-config.ts
   module.exports = defineConfig({
     admin: {
       disable: true // This will not serve the Admin UI
     },
     // ... rest of your config
   })
   ```

5. **Run the Project**

   Start the backend and admin panel using Docker:

   ```bash
   make all
   ```

   Create an admin user:

   ```bash
   docker exec -it medusa_backend_tico npx medusa user -e admin@example.com -p admin
   ```

6. **Run the Admin Panel in Development Mode**

   Navigate to the admin panel directory (if separated):

   ```bash
   cd admin
   yarn install
   yarn dev
   ```

   The admin panel will be served at `http://localhost:5173` by default.

### Building the Admin Panel

To build the admin panel for production:

```bash
cd admin
yarn build:preview
```

### Troubleshooting

- **CORS Errors**: If you encounter CORS issues, refer to the [Medusa V2 Documentation](https://docs.medusajs.com/v2) to configure your backend properly for the standalone admin panel.

## Customizing the Admin UI

The admin panel is forked from the `packages/admin` folder of the Medusa repository and set up as a standalone Vite application (`tags/v2.10.2`). For detailed steps on customizing the admin UI, refer to the [Perseides Customize Admin UI Guide](https://docs.perseides.org/guides/v2/customize-admin-ui/standalone).

## Customizing the Backend

To extend or customize the Medusa backend, you can create custom modules, APIs, or services. The [Medusa V2 Advanced Backend Guide](https://docs.medusajs.com/v2/resources/advanced-backend) provides comprehensive instructions on building and integrating custom backend functionality.

## Community & Contributions

Join the Medusa community to collaborate, seek support, or share ideas:

- [GitHub Discussions](https://github.com/medusajs/medusa/discussions)
- [Discord Server](https://discord.com/invite/medusajs)
- [GitHub Issues](https://github.com/medusajs/medusa/issues)
- [Twitter](https://twitter.com/medusajs)
- [LinkedIn](https://www.linkedin.com/company/medusajs)
- [Medusa Blog](https://medusajs.com/blog/)

Contributions are welcome! See the [Contributing Guide](https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.