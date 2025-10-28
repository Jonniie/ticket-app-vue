# TicketApp - Vue.js Version

A modern ticket management system built with Vue.js 3, TypeScript, Pinia, and Tailwind CSS. This is a Vue.js implementation of the original React ticket management application.

## Features

- **User Authentication**: Sign up and login with email-based authentication
- **Ticket Management**: Create, read, update, and delete tickets
- **Status Tracking**: Track tickets through Open, In Progress, and Closed states
- **Dashboard**: Overview of ticket statistics and recent activity
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live status updates and notifications
- **Search & Filter**: Filter tickets by status, priority, and search terms

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Vue Next** - Beautiful icons
- **Vite** - Fast build tool and dev server

## Project Structure

```
src/
├── components/           # Reusable Vue components
│   ├── Dashboard/        # Dashboard-specific components
│   ├── Layout/          # Layout components (Header, Footer, Container)
│   ├── Landing/         # Landing page components
│   └── Tickets/         # Ticket-related components
├── stores/              # Pinia stores for state management
│   ├── auth.ts          # Authentication store
│   ├── tickets.ts       # Tickets store
│   └── toast.ts         # Toast notifications store
├── views/               # Page components
│   ├── DashboardView.vue
│   ├── LandingView.vue
│   ├── LoginView.vue
│   ├── SignupView.vue
│   ├── TicketsView.vue
│   └── TicketFormView.vue
├── router/              # Vue Router configuration
└── assets/              # Static assets and styles
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:

   ```bash
   cd ticket-app-vue
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Troubleshooting

If you encounter PostCSS or Tailwind CSS errors, ensure you have the correct dependencies installed:

```bash
npm install @tailwindcss/postcss @tailwindcss/forms autoprefixer postcss tailwindcss
```

The project uses Tailwind CSS v4 with the new PostCSS plugin architecture. If you see "Cannot apply unknown utility class" errors, make sure to use standard Tailwind classes like `font-sans` and `max-w-7xl` instead of custom utility classes.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Usage

### Authentication

1. **Sign Up**: Create a new account with your name and email
2. **Login**: Sign in with your email address
3. **Session Management**: Your session is automatically managed with localStorage

### Ticket Management

1. **Create Tickets**: Click "New Ticket" to create a new ticket
2. **View Tickets**: Browse all tickets on the Tickets page
3. **Edit Tickets**: Click the edit icon on any ticket to modify it
4. **Delete Tickets**: Click the delete icon to remove a ticket
5. **Filter & Search**: Use the filters and search bar to find specific tickets

### Dashboard

- View ticket statistics (Total, Open, In Progress, Closed)
- See recent activity
- Quick access to common actions

## Key Features Comparison with React Version

| Feature          | React Version | Vue Version     |
| ---------------- | ------------- | --------------- |
| Framework        | React 18      | Vue 3           |
| State Management | Context API   | Pinia           |
| Routing          | React Router  | Vue Router      |
| Styling          | Tailwind CSS  | Tailwind CSS    |
| Icons            | Lucide React  | Lucide Vue Next |
| TypeScript       | Yes           | Yes             |
| Build Tool       | Vite          | Vite            |

## Architecture Decisions

### State Management

- **Pinia** was chosen over Vuex for its simplicity and TypeScript support
- Stores are organized by feature (auth, tickets, toast)

### Component Structure

- **Composition API** is used throughout for better TypeScript integration
- Components are organized by feature and functionality
- Reusable components are placed in appropriate directories

### Routing

- **Vue Router** with route guards for authentication
- Lazy-loaded components for better performance

### Styling

- **Tailwind CSS** for consistent styling with the React version
- Custom CSS classes for reusable components
- Responsive design with mobile-first approach
