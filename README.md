# GRA.FUN - Monad Meme Token Launchpad

A React + Vite meme token launchpad built with TypeScript and Tailwind CSS.

## Project Structure

This is a Vite-powered React application:

```
/
├── index.html              # Entry HTML file
├── vite.config.ts          # Vite configuration
├── package.json            # Single package.json with all dependencies
├── tsconfig.json           # TypeScript configuration
├── App.tsx                 # Main application component
├── src/
│   └── main.tsx           # React app entry point
├── components/
│   ├── TokenCard.tsx           # Token display card component
│   ├── CreateTokenDialog.tsx   # Token creation modal
│   └── ui/                     # Shadcn UI components
└── styles/
    └── globals.css        # Global styles and Tailwind configuration
```

## Features

- 🚀 **Launch Tokens**: Create your own EVM meme tokens in seconds
- 📊 **Live Charts**: View token price trends with Recharts
- 🔥 **Trending View**: See the hottest tokens by 24h price change
- ⏰ **Recent View**: Browse newly launched tokens
- 💼 **Wallet Integration**: Mock wallet connection for token creation
- 🎨 **Beautiful UI**: Gradient backgrounds and glassmorphic cards
- ⚡ **Lightning Fast**: Powered by Vite for instant HMR

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server with HMR
npm run dev
```

The app will be available at `http://localhost:5173`

### Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Development Features

- **Hot Module Replacement (HMR)**: Instant updates without page refresh
- **Fast Refresh**: Preserves component state during edits
- **TypeScript**: Full type safety across the application
- **Path Aliases**: Import components with `@/` prefix
- **ESLint**: Code quality and consistency

## Project Highlights

- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Interactive Charts**: Real-time price visualization
- **Mock Wallet**: Simulated wallet connection for demonstration
- **Token Management**: Create and browse tokens with full state management
- **Glassmorphism**: Modern UI with backdrop blur effects
