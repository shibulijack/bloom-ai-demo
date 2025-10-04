# Bloom AI

Bloom AI is a full-stack e-commerce application built with Next.js, TypeScript, Tailwind CSS, Prisma, and NextAuth.js. This project aims to provide a seamless shopping experience with a focus on server-centric patterns.

## Features

- **Next.js App Router**: Utilizes the App Router for routing and server components.
- **TypeScript**: Strongly typed code for better maintainability and developer experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Prisma**: ORM for database interactions, currently using SQLite.
- **NextAuth.js**: Authentication solution with Google OAuth integration.

## Project Structure

The project is organized into several key directories:

- `app/`: Contains the application routes and pages.
- `components/`: Reusable UI components.
- `lib/`: Utility functions and configurations.
- `prisma/`: Database schema and migrations.
- `styles/`: Global styles and Tailwind CSS configuration.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd bloom-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Update the `prisma/schema.prisma` file as needed.
   - Run the following command to create the database and tables:
     ```bash
     npx prisma migrate dev --name init
     ```

4. **Configure environment variables**:
   - Copy the `.env.example` to `.env` and fill in the required values, especially for NextAuth.js and database connection.

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

- Navigate through the storefront to view products and add them to your cart.
- Users can sign in using Google to access their account settings and order history.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.