# Webinar Hoster Setup Guide

Follow these steps to get your application running locally.

## 1. Start the Database (PostgreSQL)

## 1. Start the Database (PostgreSQL)

You need a running PostgreSQL database. You have two options:

### Option A: Use Docker (Recommended)
If you install **Docker Desktop**, you don't need to install PostgreSQL separately. Docker will download and run it for you.

1.  **Download & Install Docker Desktop** for Mac: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
2.  Start Docker Desktop.
3.  Run this command in your project folder:
    ```bash
    docker-compose up -d
    ```

### Option B: Install PostgreSQL Native App
If you prefer not to use Docker, you can install the Postgres app directly.

1.  **Download Postgres.app**: [https://postgresapp.com/](https://postgresapp.com/)
2.  Open it and click "Initialize" to create a new server.
3.  **Important:** You must update your `.env` file to match your local Postgres settings.
    *   Default Postgres.app URL is usually: `postgresql://localhost:5432/postgres`
    *   You might need to create the database `webinar_db` manually using the command: `createdb webinar_db`
    *   Update `.env`: `DATABASE_URL="postgresql://localhost:5432/webinar_db"`

## 2. Configure Environment Variables

You need to provide your secret keys for Clerk (Authentication) and the database connection string.

**Steps:**
1.  Open the file named `.env` in your project root.
2.  **Database URL:** Ensure the `DATABASE_URL` matches the one in your `docker-compose.yml`. It should look like this (already set by default):
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/webinar_db"
    ```
3.  **Clerk Keys:**
    *   Go to your [Clerk Dashboard](https://dashboard.clerk.com/).
    *   Select your application.
    *   Go to **API Keys** in the sidebar.
    *   Copy the **Publishable Key** and **Secret Key**.
    *   Paste them into your `.env` file, replacing the dummy values:
        ```env
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...  <-- Paste your key here
        CLERK_SECRET_KEY=sk_test_...                    <-- Paste your key here
        ```
4.  Save the `.env` file.

## 3. Initialize the Database Schema

Now that the database is running and the connection string is set, we need to create the tables in the database.

**Steps:**
1.  Run the following command in your terminal:
    ```bash
    npx prisma db push
    ```
    *   This command connects to your database and creates the tables defined in `prisma/schema.prisma`.
    *   You should see a success message like `🚀  Your database is now in sync with your Prisma schema.`

## 4. Start the Application

1.  If the development server is already running, stop it (Ctrl+C) and start it again to load the new environment variables:
    ```bash
    npm run dev
    ```
2.  Open `http://localhost:3000` in your browser.
