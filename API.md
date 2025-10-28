# Zenorizon API Documentation

Complete API reference for Zenorizon's backend endpoints.

## 🔐 Authentication

All API endpoints (except public ones) require authentication via NextAuth.js session cookies.

### Authentication Headers
```http
Cookie: next-auth.session-token=<session-token>
```

### Error Responses
```json
// 401 Unauthorized
{
  "success": false,
  "error": "Authentication required"
}

// 403 Forbidden
{
  "success": false,
  "error": "Access denied"
}
```

## 📋 Project Management API

### Get User Projects
```http
GET /api/workflow/getprojects
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx1234567890",
      "title": "My Project",
      "description": "Project description",
      "status": "Working",
      "priority": "High",
      "health": "Good",
      "targetDate": "2024-12-31T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-15T00:00:00.000Z",
      "creator": {
        "id": "user123",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "_count": {
        "issues": 5,
        "members": 3
      }
    }
  ]
}
```

### Get Specific Project
```http
GET /api/workflow/project?project_id=<project-id>
```

**Query Parameters:**
- `project_id` (required): Project ID

### Create Project
```http
POST /api/workflow/createproject
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Project",
  "description": "Project description",
  "priority": "Medium",
  "targetDate": "2024-12-31"
}
```

**Validation Rules:**
- `title`: Required, 1-100 characters, must be unique
- `description`: Optional, max 500 characters
- `priority`: Optional, one of: "Urgent", "High", "Medium", "Low", "No Priority"
- `targetDate`: Optional, valid date string

### Update Project
```http
PATCH /api/workflow/updateproject
Content-Type: application/json
```

**Request Body:**
```json
{
  "projectId": "clx1234567890",
  "title": "Updated Project Title",
  "description": "Updated description",
  "content": "Updated rich text content",
  "status": "Working",
  "priority": "High",
  "health": "At Risk",
  "targetDate": "2024-12-31"
}
```

### Delete Project
```http
DELETE /api/workflow/deleteproject
Content-Type: application/json
```

**Request Body:**
```json
{
  "projectId": "clx1234567890"
}
```

**Authorization:** User must be project creator

## 🎯 Issue Management API

### Get Project Issues
```http
POST /api/issues/getissues
Content-Type: application/json
```

**Request Body:**
```json
{
  "project_id": "clx1234567890"
}
```

### Create Issue
```http
POST /api/issues/createissue
Content-Type: application/json
```

**Request Body:**
```json
{
  "issueTitle": "New Issue",
  "issueDescription": "Issue description",
  "issueStatus": "Backlog",
  "issuePriority": "Medium",
  "projectId": "clx1234567890"
}
```

### Update Issue
```http
PATCH /api/issues/updateissue
Content-Type: application/json
```

**Request Body:**
```json
{
  "issueId": "issue123",
  "title": "Updated Issue Title",
  "description": "Updated description",
  "status": "Working",
  "priority": "High"
}
```

## 👤 User Management API

### Get User Profile
```http
GET /api/user/getprofile
```

### Update User Profile
```http
PATCH /api/user/updateprofile
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "newusername",
  "fullname": "John Smith"
}
```

## 📧 Waitlist API

### Join Waitlist
```http
POST /api/waitlist
Content-Type: application/json
```

**Request Body:**
```json
{
  "userEmail": "user@example.com"
}
```

## 🔧 Error Handling

### Validation Errors (422)
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

### Resource Not Found (404)
```json
{
  "success": false,
  "error": "Project not found"
}
```

### Server Errors (500)
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## 🚀 Rate Limiting

- **General API**: 100 requests per minute per IP
- **Authentication**: 10 requests per minute per IP
- **Waitlist**: 5 requests per minute per IP

## 📝 API Usage Examples

### JavaScript/TypeScript
```typescript
// Get projects
const response = await fetch('/api/workflow/getprojects', {
  method: 'GET',
  credentials: 'include', // Include session cookies
});
const data = await response.json();

// Create project
const response = await fetch('/api/workflow/createproject', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    title: 'My New Project',
    description: 'Project description',
    priority: 'High'
  }),
});
```

For complete API documentation, see the individual endpoint files in the codebase.
