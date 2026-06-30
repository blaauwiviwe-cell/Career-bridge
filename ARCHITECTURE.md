# Career Bridge - Architecture Overview

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
│  Home | Assessment | Career Explorer | Dashboard | Apps     │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway (Express)                     │
│  Authentication | Authorization | Rate Limiting | CORS      │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   ┌─────────┐      ┌──────────┐      ┌──────────────┐
   │  MySQL  │      │ OpenAI   │      │ File Storage │
   │ Database│      │   API    │      │  (Uploads)   │
   └─────────┘      └──────────┘      └──────────────┘
```

## Component Architecture

### Frontend Structure

```
src/
├── components/
│   ├── Common/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Navigation.js
│   │   └── LoadingSpinner.js
│   ├── Auth/
│   │   ├── LoginForm.js
│   │   ├── RegisterForm.js
│   │   └── ProtectedRoute.js
│   ├── Career/
│   │   ├── CareerCard.js
│   │   ├── CareerDetails.js
│   │   └── SalaryChart.js
│   ├── Dashboard/
│   │   ├── UserDashboard.js
│   │   ├── SavedCareers.js
│   │   ├── ApplicationTracker.js
│   │   └── StudyPlanCard.js
│   └── Forms/
│       ├── CareerAssessmentForm.js
│       ├── StudyPlanForm.js
│       └── ApplicationForm.js
├── pages/
│   ├── Home.js
│   ├── CareerAssessment.js
│   ├── CareerExplorer.js
│   ├── SalaryDashboard.js
│   ├── BursaryFinder.js
│   ├── InternshipFinder.js
│   ├── UserDashboard.js
│   └── ApplicationHelper.js
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── careerService.js
│   ├── applicationService.js
│   └── aiService.js
├── context/
│   ├── AuthContext.js
│   └── UserContext.js
└── App.js
```

### Backend Structure

```
src/
├── routes/
│   ├── auth.routes.js
│   ├── careers.routes.js
│   ├── bursaries.routes.js
│   ├── internships.routes.js
│   ├── applications.routes.js
│   ├── users.routes.js
│   ├── studyplans.routes.js
│   └── ai.routes.js
├── controllers/
│   ├── authController.js
│   ├── careerController.js
│   ├── bursaryController.js
│   ├── internshipController.js
│   ├── applicationController.js
│   ├── userController.js
│   ├── studyPlanController.js
│   └── aiController.js
├── models/
│   ├── User.js
│   ├── Career.js
│   ├── Bursary.js
│   ├── Internship.js
│   ├── Application.js
│   ├── StudyPlan.js
│   └── Document.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── validation.js
│   └── logging.js
├── config/
│   ├── database.js
│   ├── openai.js
│   └── constants.js
├── utils/
│   ├── emailService.js
│   ├── fileUpload.js
│   ├── aiPrompts.js
│   └── validators.js
└── server.js
```

## Data Flow

### User Registration Flow
1. User enters details on Register page
2. Frontend validates input
3. POST request to `/api/auth/register`
4. Backend validates and hashes password
5. User created in MySQL database
6. JWT token returned to frontend
7. Token stored in localStorage
8. User redirected to profile completion

### Career Assessment Flow
1. User completes assessment form
2. Frontend sends assessment data to `/api/careers/recommendations`
3. Backend processes data
4. OpenAI API generates recommendations
5. Results saved to database
6. Recommendations returned to frontend
7. Display results with career options

### Study Plan Generation Flow
1. User inputs: career goal, subjects, marks, available hours
2. POST to `/api/studyplans/generate`
3. Backend prepares prompt for OpenAI
4. OpenAI generates personalized study plan
5. Plan stored in database
6. Frontend displays weekly breakdown
7. User can modify and save plan

## Database Schema

See `database/schema.sql` for complete schema.

## Authentication Flow

1. **Registration:** Password hashed with bcryptjs, user created
2. **Login:** Credentials verified, JWT token generated
3. **Token Storage:** Stored in localStorage (frontend)
4. **Protected Routes:** JWT verified in middleware
5. **Token Refresh:** Implement refresh token mechanism
6. **Logout:** Token removed from localStorage

## Security Considerations

- Input validation on all endpoints
- SQL injection prevention (parameterized queries)
- XSS protection (React escapes by default)
- CORS enabled for frontend domain only
- JWT secrets stored in environment variables
- Password hashing with bcryptjs
- File upload validation
- Rate limiting on sensitive endpoints

## Scalability

- Database indexing on frequently queried fields
- Implement caching (Redis for future)
- API pagination for large datasets
- Load balancing ready
- Microservices ready architecture

## Deployment

- Docker containerization
- GitHub Actions CI/CD
- Environment-based configuration
- Database migrations
