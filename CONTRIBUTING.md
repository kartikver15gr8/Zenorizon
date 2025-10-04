# Contributing to Zenorizon

Thank you for your interest in contributing to Zenorizon! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Follow the setup guide** in [SETUP.md](./SETUP.md)
4. **Create a feature branch** from `main`
5. **Make your changes** following our guidelines
6. **Test thoroughly** before submitting
7. **Submit a pull request**

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Project Structure](#project-structure)
- [API Guidelines](#api-guidelines)
- [UI/UX Guidelines](#uiux-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming environment
- Follow our coding standards and conventions

## 🔄 Development Workflow

### Branch Naming Convention
```
feature/description-of-feature
bugfix/description-of-bug
hotfix/critical-issue-description
docs/documentation-update
```

### Commit Message Format
```
type(scope): description

feat(auth): add GitHub OAuth integration
fix(api): resolve project deletion cascade issue
docs(readme): update installation instructions
style(ui): improve toast notification design
refactor(db): optimize project queries
test(api): add project CRUD tests
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: UI/styling changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## 📝 Coding Standards

### TypeScript
- **Always use TypeScript** - no plain JavaScript files
- **Define proper interfaces** for all data structures
- **Use strict type checking** - avoid `any` type
- **Export types** from `utils/types.ts` for reusability

### React Components
- **Use functional components** with hooks
- **Implement proper error boundaries** for critical components
- **Use custom hooks** for reusable logic
- **Follow the existing component structure**

### API Routes
- **Use proper HTTP methods** (GET, POST, PATCH, DELETE)
- **Implement authorization checks** using `requireAuth()`
- **Validate input** with Zod schemas
- **Use standardized responses** from `ApiResponses`
- **Add proper error logging** with `logError()`

### Database
- **Use Prisma ORM** for all database operations
- **Include proper relations** in queries when needed
- **Implement proper authorization** checks before data access
- **Use transactions** for multi-table operations

## 🏗️ Project Structure

```
zenorizon/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── profile/           # User profile pages
│   ├── workflow/          # Main application pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── auth/              # Authentication components
│   ├── landing/           # Landing page components
│   ├── ui/                # Reusable UI components
│   └── workflow/          # Workflow-specific components
├── lib/                   # Utility libraries
│   ├── auth.ts            # NextAuth configuration
│   ├── auth-utils.ts      # Authorization utilities
│   ├── api-responses.ts   # Standardized API responses
│   └── validation-schemas.ts # Zod validation schemas
├── utils/                 # Utility functions and types
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🔌 API Guidelines

### Authentication
All protected API routes must:
```typescript
import { requireAuth } from '@/lib/auth-utils';
import { ApiResponses } from '@/lib/api-responses';

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    // Your logic here
  } catch (error) {
    if (error.message === "Authentication required") {
      return ApiResponses.unauthorized();
    }
    return ApiResponses.serverError();
  }
}
```

### Input Validation
```typescript
import { validateRequestBody, yourSchema } from '@/lib/validation-schemas';

const validation = validateRequestBody(yourSchema, body);
if (!validation.success) {
  return ApiResponses.validationError(validation.errors);
}
```

### Authorization
```typescript
import { canAccessProject } from '@/lib/auth-utils';

const hasAccess = await canAccessProject(user.id, projectId);
if (!hasAccess) {
  return ApiResponses.forbidden("Access denied");
}
```

## 🎨 UI/UX Guidelines

### Component Patterns
- **Use the existing design system** colors and spacing
- **Implement loading states** for all async operations
- **Add proper error handling** with user-friendly messages
- **Use custom toast notifications** for user feedback
- **Follow responsive design** patterns (mobile-first)

### Styling
- **Use Tailwind CSS** for all styling
- **Follow the existing color palette**:
  - Background: `#0A0A0A`, `#0F1111`
  - Borders: `#414141`, `#2E3035`
  - Text: `#FFFFFF`, `#AEAEAE`, `#939494`
- **Use consistent spacing** and typography
- **Implement hover states** for interactive elements

### Icons
- **Use the existing SVG icon system** from `lib/icons.ts`
- **Add new icons** to the `RAW_ICONS` object
- **Use `SVGIcon` component** for rendering

## 🧪 Testing

### Before Submitting
- [ ] Test all new functionality manually
- [ ] Verify responsive design on different screen sizes
- [ ] Check authentication and authorization flows
- [ ] Test error scenarios and edge cases
- [ ] Ensure no console errors or warnings

### Future Testing Framework
We plan to implement:
- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright
- API tests for all endpoints

## 📤 Pull Request Process

### Before Creating PR
1. **Sync with main branch**: `git pull origin main`
2. **Run linting**: `pnpm lint`
3. **Build successfully**: `pnpm build`
4. **Test thoroughly** in development mode

### PR Requirements
- [ ] **Clear title** describing the change
- [ ] **Detailed description** of what was changed and why
- [ ] **Screenshots** for UI changes
- [ ] **Breaking changes** clearly documented
- [ ] **Related issues** linked

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] No console errors
- [ ] Responsive design verified

## Screenshots (if applicable)
Add screenshots for UI changes
```

## 🐛 Issue Reporting

### Bug Reports
Include:
- **Clear description** of the issue
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Browser/device information**
- **Screenshots** if applicable

### Feature Requests
Include:
- **Clear description** of the feature
- **Use case** and motivation
- **Proposed implementation** (if any)
- **Mockups** or examples (if applicable)

## 🎯 Areas for Contribution

### High Priority
- Real-time collaboration features
- Comprehensive testing suite
- Performance optimizations
- Accessibility improvements

### Medium Priority
- GitHub integration
- Advanced project analytics
- Team management features
- Mobile responsiveness improvements

### Documentation
- API documentation
- Component documentation
- User guides
- Video tutorials

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: [Contact information]

## 🙏 Recognition

Contributors will be:
- Added to the contributors list
- Mentioned in release notes
- Invited to the contributors Discord (if applicable)

---

Thank you for contributing to Zenorizon! 🚀
