# Zenorizon 🚀

> **Modern Project Management Platform** - Streamline your workflow with intelligent project tracking, issue management, and team collaboration.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

### 🎯 **Project Management**

- **Smart Project Tracking** - Create, organize, and monitor projects with status, priority, and health indicators
- **Rich Text Editor** - TipTap-powered editor for detailed project descriptions
- **Project Analytics** - Track progress with visual indicators and metrics
- **Team Collaboration** - Multi-user project access with role-based permissions

### 🎫 **Issue Tracking**

- **Comprehensive Issue Management** - Create, assign, and track issues within projects
- **Priority & Status System** - Organize issues with customizable priority levels and status workflows
- **Real-time Updates** - Stay synchronized with live issue updates
- **Advanced Filtering** - Find issues quickly with powerful search and filter options

### 👥 **User Management**

- **OAuth Authentication** - Secure login with GitHub and Google
- **User Profiles** - Customizable profiles with username and display name
- **Project Ownership** - Clear ownership and membership models
- **Access Control** - Granular permissions for projects and issues

### 🎨 **Modern UI/UX**

- **Dark Theme** - Beautiful, eye-friendly dark interface
- **Responsive Design** - Seamless experience across all devices
- **Custom Components** - Polished UI with custom toast notifications and loading states
- **Accessibility** - Built with accessibility best practices

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17.0 or higher
- **pnpm** 9.14.2 or higher
- **PostgreSQL** database
- **GitHub/Google OAuth** applications

### Installation

```bash
# Clone the repository
git clone https://github.com/kartikver15gr8/Zenorizon.git
cd Zenorizon

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up database
pnpm prisma generate
pnpm prisma db push

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see Zenorizon in action!

## 📚 Documentation

- **[Setup Guide](SETUP.md)** - Complete local development setup
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to Zenorizon
- **[API Documentation](API.md)** - Complete API reference
- **[Architecture Overview](ARCHITECTURE.md)** - Technical architecture details
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment instructions
- **[Security Policy](SECURITY.md)** - Security guidelines and reporting

## 🏗️ Tech Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **TipTap** - Rich text editing

### **Backend**

- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Authentication with OAuth
- **Prisma ORM** - Type-safe database access
- **Zod** - Runtime type validation
- **Upstash Redis** - Rate limiting and caching

### **Database & Infrastructure**

- **PostgreSQL** - Primary database
- **Prisma** - Database toolkit and ORM
- **Vercel** - Deployment platform
- **GitHub Actions** - CI/CD pipeline

## 🎯 Project Structure

```
zenorizon/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── profile/           # User profile
│   ├── workflow/          # Main application
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── auth/              # Auth components
│   ├── landing/           # Landing page
│   ├── ui/                # Reusable UI
│   └── workflow/          # App components
├── lib/                   # Core utilities
│   ├── auth.ts            # NextAuth config
│   ├── auth-utils.ts      # Authorization
│   └── validation-schemas.ts # Input validation
├── prisma/               # Database schema
├── utils/                # Utility functions
└── public/               # Static assets
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm lint             # Run ESLint
pnpm prisma studio    # Open database GUI
pnpm type-check       # TypeScript checking
```


## 📊 Roadmap

### 🎯 **Current Version (v1.0)**

- ✅ Project management CRUD
- ✅ Issue tracking system
- ✅ User authentication & authorization
- ✅ Responsive UI design
- ✅ API documentation

### 🔮 **Upcoming Features**

- 🔄 **Real-time Collaboration** - Live updates and presence indicators
- 🔄 **Team Management** - Advanced team features and roles
- 🔄 **GitHub Integration** - Sync with GitHub repositories
- 🔄 **Advanced Analytics** - Project insights and reporting
- 🔄 **Mobile App** - Native mobile applications
- 🔄 **API Webhooks** - External integrations

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Excellent ratings
- **Bundle Size**: Optimized with Next.js
- **Database**: Efficient queries with Prisma

## 🔒 Security

Security is a top priority. See our [Security Policy](SECURITY.md) for:

- Vulnerability reporting process
- Security best practices
- Authentication & authorization details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



