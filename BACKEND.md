# Career Bridge Backend API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 1. Authentication Endpoints

### Register User
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "firstName": "John",
    "surname": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "phone": "0712345678",
    "age": 18
  }
  ```
- **Response:** `{ token, user }`

### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePass123"
  }
  ```
- **Response:** `{ token, user }`

---

## 2. User Profile Endpoints

### Get Profile
- **GET** `/users/profile` *(Protected)*
- **Response:** User object with all details

### Update Profile
- **PUT** `/users/profile` *(Protected)*
- **Body:** Any user fields to update
- **Response:** Updated user object

---

## 3. Career Endpoints

### Get All Careers
- **GET** `/careers?page=1&limit=10&industry=IT&demandLevel=High`
- **Query Params:**
  - `page`: Page number
  - `limit`: Results per page
  - `industry`: Filter by industry
  - `demandLevel`: Filter by demand
- **Response:** Array of career objects

### Get Career Details
- **GET** `/careers/:id`
- **Response:** Single career object with full details

### Get AI Career Recommendations
- **POST** `/careers/recommendations` *(Protected)*
- **Body:**
  ```json
  {
    "subjects": ["Mathematics", "Physics"],
    "subjectMarks": [75, 80],
    "apsScore": 35,
    "interests": ["Technology", "Problem-solving"],
    "skills": ["Programming", "Analysis"],
    "workEnvironment": "Office"
  }
  ```
- **Response:** Array of recommended careers with explanations

---

## 4. Study Plan Endpoints

### Generate Study Plan
- **POST** `/studyplans/generate` *(Protected)*
- **Body:**
  ```json
  {
    "careerGoal": "Software Developer",
    "subjects": ["Mathematics", "Computer Science"],
    "currentMarks": [75, 82],
    "availableHours": 20
  }
  ```
- **Response:** Weekly study plan with daily tasks

### Get Study Plans
- **GET** `/studyplans` *(Protected)*
- **Response:** Array of user's study plans

### Update Study Plan Progress
- **PUT** `/studyplans/:id` *(Protected)*
- **Body:**
  ```json
  {
    "progressTracking": {
      "Monday": "completed",
      "Tuesday": "in-progress"
    }
  }
  ```
- **Response:** Updated study plan

---

## 5. Bursary Endpoints

### Search Bursaries
- **GET** `/bursaries?fieldOfStudy=Engineering&province=WC&minGrade=60`
- **Query Params:**
  - `fieldOfStudy`: Field of study
  - `province`: South African province
  - `minGrade`: Minimum grade average
  - `page`: Page number
- **Response:** Array of matching bursaries

### Get Bursary Details
- **GET** `/bursaries/:id`
- **Response:** Single bursary object

### Save Bursary
- **POST** `/bursaries/:id/save` *(Protected)*
- **Response:** `{ message: "Bursary saved", saved: true }`

### Get Saved Bursaries
- **GET** `/bursaries/saved` *(Protected)*
- **Response:** Array of user's saved bursaries

---

## 6. Internship Endpoints

### Search Internships
- **GET** `/internships?industry=IT&province=GP&page=1`
- **Query Params:**
  - `industry`: Industry type
  - `province`: South African province
  - `page`: Page number
- **Response:** Array of matching internships

### Get Internship Details
- **GET** `/internships/:id`
- **Response:** Single internship object

### Save Internship
- **POST** `/internships/:id/save` *(Protected)*
- **Response:** `{ message: "Internship saved", saved: true }`

### Get Saved Internships
- **GET** `/internships/saved` *(Protected)*
- **Response:** Array of user's saved internships

---

## 7. Application Endpoints

### Create Application
- **POST** `/applications` *(Protected)*
- **Body:**
  ```json
  {
    "institution": "University of Cape Town",
    "course": "Bachelor of Computer Science",
    "applicationDeadline": "2024-12-31"
  }
  ```
- **Response:** Created application object

### Get User Applications
- **GET** `/applications` *(Protected)*
- **Response:** Array of user's applications

### Get Application Details
- **GET** `/applications/:id` *(Protected)*
- **Response:** Full application with documents and checklist

### Update Application Status
- **PUT** `/applications/:id` *(Protected)*
- **Body:** `{ status: "In Progress" }`
- **Response:** Updated application

### Delete Application
- **DELETE** `/applications/:id` *(Protected)*
- **Response:** `{ message: "Application deleted" }`

---

## 8. Document Endpoints

### Upload Document
- **POST** `/applications/:applicationId/documents` *(Protected)*
- **Content-Type:** `multipart/form-data`
- **Body:** `{ documentType: "Grade 12 Certificate", file: <file> }`
- **Response:** Uploaded document object

### Get Required Documents
- **GET** `/applications/:applicationId/documents/required`
- **Response:** List of required documents for the course

### Update Document Status
- **PUT** `/applications/:applicationId/documents/:documentId` *(Protected)*
- **Body:** `{ uploadStatus: "Verified" }`
- **Response:** Updated document

---

## 9. Eligibility Check Endpoints

### Check Eligibility
- **POST** `/applications/:applicationId/eligibility` *(Protected)*
- **Body:**
  ```json
  {
    "studentMarks": {
      "Mathematics": 75,
      "English": 68
    },
    "apsScore": 36
  }
  ```
- **Response:** `{ eligible: true, requirements: {}, studentResults: {} }`

---

## 10. AI Service Endpoints

### Generate Application Email
- **POST** `/ai/generate-email` *(Protected)*
- **Body:**
  ```json
  {
    "name": "John Doe",
    "company": "ABC Technologies",
    "position": "Software Developer Intern",
    "qualification": "BSc Computer Science"
  }
  ```
- **Response:** `{ email: "<generated email content>" }`

### Generate Study Tips
- **POST** `/ai/study-tips` *(Protected)*
- **Body:** `{ subject: "Mathematics", currentMark: 75 }`
- **Response:** `{ tips: [...] }`

---

## 11. Salary Data Endpoints

### Get Salary Insights
- **GET** `/careers/:careerName/salary?province=WC`
- **Response:** Salary data for career in province

### Get High-Demand Careers
- **GET** `/careers/market/high-demand`
- **Response:** Array of high-demand careers with salaries

---

## Error Responses

All errors follow this format:
```json
{
  "error": "Error message",
  "status": 400
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

- Default: 100 requests per 15 minutes
- Authentication endpoints: 5 requests per 15 minutes

---

## Pagination

Most list endpoints support:
```
?page=1&limit=10
```

Response includes:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```
