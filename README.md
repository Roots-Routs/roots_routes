# Roots & Routes

Roots & Routes is a heritage tourism platform that allows users to discover and book custom heritage tours. It features a public-facing booking interface and an admin dashboard for managing tours, experiences, and accommodations.

## Features

### Public Interface

- **Tour Discovery**: Browse available tour routes and heritage themes.
- **Custom Itinerary Builder**: Customize daily experiences, including morning/afternoon activities, meals, and accommodations.
- **Interactive Map**: Visualize tour routes and locations on a map.
- **Booking Request**: Submit custom tour requests with group size and transportation preferences.

### Admin Dashboard

- **Authentication**: Secure login and registration for administrators using Supabase Auth.
- **Dashboard Overview**: View key statistics about routes, experiences, and partners.
- **Content Management**:
  - Manage Tour Routes
  - Manage Experiences (Activities, Meals)
  - Manage Accommodations (Hotels)
  - Manage Heritage Themes
  - Manage Partners

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Backend/Database**: Supabase (PostgreSQL, Auth)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase project

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd roots_routes
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── context/          # React Context (Auth, Tour state)
├── data/             # Static data (if any)
├── hooks/            # Custom React hooks
├── lib/              # Library configurations (Supabase)
├── pages/            # Page components (Home, Admin, Login, etc.)
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx          # Entry point
```

## Authentication

The project uses Supabase Auth for the admin dashboard.

- **Login**: `/login`
- **Sign Up**: Available on the login page (toggle "Need an account?").
- **Protected Routes**: The `/admin` route is protected and requires authentication.

## License

[MIT](LICENSE)
