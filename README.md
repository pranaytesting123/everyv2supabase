# Everything Coconut - Supabase Integration

A modern e-commerce catalog application with real-time data sync and automatic deployments.

## Features

- **Real-time Data Sync**: All changes sync instantly across devices using Supabase
- **Automatic Deployments**: Changes trigger automatic Netlify rebuilds and deployments
- **Admin Panel**: Comprehensive admin interface for managing products, collections, and site settings
- **Responsive Design**: Mobile-first design with modern UI/UX
- **Image Management**: Support for both URL and file uploads
- **Search & Filtering**: Advanced product search and filtering capabilities

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Go to SQL Editor and run the migration files in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_data.sql`

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_NETLIFY_BUILD_HOOK_URL=your_netlify_build_hook_url
```

### 3. Netlify Build Hook Setup

1. Go to your Netlify site dashboard
2. Navigate to Site settings > Build & deploy > Build hooks
3. Create a new build hook named "Auto Deploy"
4. Copy the webhook URL and add it to your `.env` file

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

## Database Schema

### Tables

- **collections**: Product categories with images and descriptions
- **products**: Individual products linked to collections
- **site_settings**: Configurable site settings (hero product, branding)
- **build_triggers**: Logs for tracking deployment triggers

### Real-time Features

- Automatic UI updates when data changes
- Cross-device synchronization
- Automatic deployment triggers on data modifications

## Admin Panel

Access the admin panel at `/admin-secret-panel` with:
- Username: `admin`
- Password: `catalog123`

### Admin Features

- **Product Management**: Add, edit, delete products
- **Collection Management**: Organize products into collections
- **Hero Section**: Configure the homepage hero product
- **Image Uploads**: Support for both URL and file uploads
- **Manual Deployments**: Trigger builds manually when needed
- **Real-time Preview**: See changes instantly

## Deployment

The application automatically deploys to Netlify when:
- Products are added, updated, or deleted
- Collections are modified
- Site settings are changed

Manual deployments can be triggered from the admin panel.

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Real-time, Auth)
- **Deployment**: Netlify with automatic builds
- **State Management**: React Context with Supabase integration
- **UI Components**: Custom components with Lucide icons

## Security

- Row Level Security (RLS) enabled on all tables
- Public read access for catalog data
- Authenticated write access for admin operations
- Environment variables for sensitive configuration

## Performance

- Real-time subscriptions for instant updates
- Optimized database queries with proper indexing
- Image optimization and lazy loading
- Responsive design for all device sizes