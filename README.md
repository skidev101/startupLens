# StartupLens API

## Overview
StartupLens is a modern platform built with Next.js and TypeScript, designed to empower entrepreneurs to pitch their startup ideas and connect with investors. It features GitHub OAuth authentication via NextAuth, a robust content management system powered by Sanity, and comprehensive error tracking with Sentry. Users can create, view, search for, and discover innovative startup concepts.

## Features
*   **User Authentication**: Secure user login and registration using GitHub OAuth through NextAuth.
*   **Startup Creation & Management**: Users can submit detailed startup pitches, including titles, descriptions, categories, images, and rich markdown content.
*   **Dynamic Startup Feed**: Explore a public feed of submitted startups, filterable by category and searchable by keywords.
*   **Personalized User Profiles**: View individual user profiles showcasing all their submitted startup ideas.
*   **View Tracking**: Tracks and displays the number of views for each startup pitch.
*   **Editor Picks Playlists**: Curated lists of outstanding startup pitches highlighted by editors.
*   **Sanity CMS Integration**: Backend content management for startups, authors, and playlists, offering a flexible and scalable data store.
*   **Sentry Error Monitoring**: Proactive error tracking and performance monitoring for both client and server-side operations.
*   **Responsive Design**: A user-friendly interface powered by Tailwind CSS and Shadcn UI components.

## Getting Started
To set up and run StartupLens locally, follow these steps:

### Installation
*   📂 **Clone the Repository**:
    ```bash
    git clone https://github.com/skidev101/startupLens.git
    cd startupLens
    ```
*   📦 **Install Dependencies**:
    ```bash
    pnpm install
    ```
*   📝 **Generate Sanity Types**:
    ```bash
    pnpm typegen
    ```
*   🚀 **Run Development Server (Frontend)**:
    ```bash
    pnpm dev:site
    ```
*   ✍️ **Run Development Server (Sanity Studio)**:
    ```bash
    pnpm dev:studio
    ```

### Environment Variables
Create a `.env.local` file in the project root and populate it with the following environment variables:

```
AUTH_SECRET=*****************
AUTH_GITHUB_ID=************************
AUTH_GITHUB_SECRET=****************
NEXT_PUBLIC_SANITY_PROJECT_ID=********
NEXT_PUBLIC_SANITY_DATASET=***********
NEXT_PUBLIC_SANITY_API_VERSION=****
SANITY_WRITE_TOKEN=**************************************************
SENTRY_AUTH_TOKEN=*****************************************************
```

**Note**: Replace placeholder values with your actual API keys and secrets for production deployments.

## Usage

Once the development servers are running, you can access the application and Sanity Studio:

*   **Frontend**: Navigate to `http://localhost:3000` in your browser.
    *   **Browse Startups**: The homepage displays a feed of all submitted startups. You can search by keywords or filter by categories using the search bar.
    *   **Authenticate**: Click "Login" in the navigation bar to sign in using your GitHub account. Upon successful login, a user profile is automatically created or updated in Sanity.
    *   **Create a Startup**: After logging in, navigate to `/startup/create` to submit your own startup idea. Fill in the details including title, description, category, an image URL, and a detailed pitch using the markdown editor.
    *   **View Startup Details**: Click on any startup card to see its full details, including the markdown pitch and author information. A view counter is incremented for each visit.
    *   **User Profile**: Access your profile from the navigation bar to see all startups you have submitted.
*   **Sanity Studio**: Access the CMS at `http://localhost:3000/studio`. Here you can manage:
    *   **Authors**: View and edit user profiles created via NextAuth.
    *   **Startups**: Directly manage all submitted startup pitches.
    *   **Playlists**: Create curated collections of startups, such as "Editor Picks."

## API Documentation
### Base URL
The API endpoints are served from the root of the application.

### Endpoints
#### POST /api/auth/[...nextauth]
**Overview**: Handles user authentication with GitHub OAuth. When a user attempts to sign in via GitHub, NextAuth processes the callback, creates or updates the user (Author) in Sanity, and establishes a session.
**Request**:
This endpoint does not expect a direct JSON payload. Authentication is managed through redirects to GitHub and subsequent callbacks. The internal process involves:
```json
{
  "provider": "github",
  "callbackUrl": "/api/auth/callback/github"
}
```
**Response**:
Upon successful authentication, the user is redirected, and a session cookie is set. Subsequent requests will include authentication information.
```json
// Example session data (accessible via GET /api/auth/session)
{
  "user": {
    "name": "GitHub User",
    "email": "user@example.com",
    "image": "https://avatars.githubusercontent.com/u/12345?v=4"
  },
  "expires": "2025-01-01T00:00:00.000Z",
  "id": "author_sanity_id"
}
```
**Errors**:
-   `400 Bad Request`: Invalid OAuth state or parameters.
-   `401 Unauthorized`: Authentication failed (e.g., GitHub access denied).
-   `500 Internal Server Error`: Issues with NextAuth configuration or Sanity database operations during user creation/update.

#### GET /api/auth/session
**Overview**: Retrieves the current user's session information.
**Request**:
No request payload.
**Response**:
```json
{
  "user": {
    "name": "GitHub User",
    "email": "user@example.com",
    "image": "https://avatars.githubusercontent.com/u/12345?v=4"
  },
  "expires": "2025-01-01T00:00:00.000Z",
  "id": "author_sanity_id"
}
```
**Errors**:
-   `401 Unauthorized`: No active session or invalid session token.

#### GET /api/auth/csrf
**Overview**: Retrieves the Cross-Site Request Forgery (CSRF) token, essential for protecting forms against CSRF attacks.
**Request**:
No request payload.
**Response**:
```json
{
  "csrfToken": "your-csrf-token-here"
}
```
**Errors**:
-   `500 Internal Server Error`: Problem generating the CSRF token.

#### GET /api/sentry-example-api
**Overview**: A test API endpoint designed to trigger a backend error for Sentry monitoring.
**Request**:
No request payload.
**Response**:
This endpoint is designed to throw an error, thus a successful response is not expected.
**Errors**:
-   `500 Internal Server Error`: Always returns an error as it's an example of error handling.
    ```json
    {
      "error": {
        "name": "SentryExampleAPIError",
        "message": "This error is raised on the backend called by the example page."
      }
    }
    ```

## Technologies Used

| Technology   | Description                                                     | Link                                               |
| :----------- | :-------------------------------------------------------------- | :------------------------------------------------- |
| Next.js      | React framework for building full-stack web applications.       | [nextjs.org](https://nextjs.org/)                  |
| TypeScript   | Statically typed superset of JavaScript.                        | [typescriptlang.org](https://www.typescriptlang.org/) |
| React        | JavaScript library for building user interfaces.                | [react.dev](https://react.dev/)                    |
| NextAuth.js  | Flexible authentication for Next.js applications.               | [next-auth.js.org](https://next-auth.js.org/)      |
| Sanity.io    | Headless CMS for structured content.                            | [sanity.io](https://www.sanity.io/)                |
| Tailwind CSS | Utility-first CSS framework.                                    | [tailwindcss.com](https://tailwindcss.com/)        |
| Shadcn UI    | Reusable UI components built with Radix UI and Tailwind CSS.    | [ui.shadcn.com](https://ui.shadcn.com/)            |
| Sentry       | Error monitoring and performance management.                    | [sentry.io](https://sentry.io/)                    |
| Zod          | TypeScript-first schema declaration and validation library.     | [zod.dev](https://zod.dev/)                        |
| Markdown-it  | Markdown parser.                                                | [github.com/markdown-it/markdown-it](https://github.com/markdown-it/markdown-it) |

## License
This project is not currently licensed.

## Author Info
**monaski**
*   Twitter: [twitter.com/monaski_](https://twitter.com/monaski_) (placeholder)

---

[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-F5F5F5?style=for-the-badge&logo=next.js&logoColor=black)](https://next-auth.js.org/)
[![Sanity.io](https://img.shields.io/badge/Sanity.io-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)](https://www.sanity.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)](https://sentry.io/)
