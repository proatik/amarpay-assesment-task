# Event Management System

A modern, responsive Event Management System built with Next.js 15+, TypeScript, and Tailwind CSS. This application uses Server Actions and SSR for optimal performance, allowing users to view, create, manage events.

## 🚀 Features

### Core Features

- **📅 Browse Events**: View all upcoming events with beautiful card layouts
- **🔍 Search & Filter**: Advanced filtering by title, category, and date range
- **➕ Create Events**: Easy event creation with form validation
- **📝 Manage Events**: Edit and delete your own events
- **📱 Responsive Design**: Perfect experience on all devices

### Technical Features

- **⚡ Next.js 15+**: Latest Next.js with App Router and React 19
- **🔄 Server Actions**: Modern server-side mutations without API routes
- **🏗️ SSR**: Server-side rendering for optimal performance
- **🔷 TypeScript**: Full type safety throughout the application
- **🎨 Tailwind CSS**: Modern, utility-first CSS framework
- **🗃️ JSON Database**: File-based data persistence

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Runtime**: Node.js 22.16.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Fetching**: Server Actions & SSR
- **Database**: JSON file-based storage
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites

- **Node.js 22.16.0** (recommended)
- **pnpm** (package manager)

### Installation Steps

1. **Clone the project**

   ```bash
   git clone https://github.com/proatik/amarpay-assesment-task.git

   cd amarpay-assesment-task
   ```

2. **Install dependencies with pnpm**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Data Schema

```typescript
type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: "Conference" | "Workshop" | "Meetup";
  attendees: number;
  createdBy: string;
};
```

### Local Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Event Management

- ✅ **Create Events**: Form with server-side validation
- ✅ **View Events**: SSR-rendered event listings
- ✅ **Edit Events**: Server actions for updates
- ✅ **Delete Events**: Confirmation with server actions
- ✅ **Search & Filter**: Client-side filtering of SSR data

🔗 [Live Demo](https://amarpay-assesment-task.vercel.app)

### ⚠️ Note on File Storage in Production

This application is deployed on **Vercel**, which uses **serverless functions** for backend operations. As such, writing to the local filesystem (e.g., storing data in a `.json` file) is **not supported in production**, because:

- Serverless functions are **stateless and ephemeral**
- Any changes to the filesystem are **not persisted** between requests

✅ File-based storage **works locally**. To test and run the app with JSON file storage:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```
