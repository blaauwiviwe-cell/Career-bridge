# Career Bridge – AI-Powered Career Guidance Platform

**Tagline:** "Bridging the Gap Between Education and Employment."

## Overview

Career Bridge is a modern, fully responsive web application designed to help South African learners, students, graduates, and career changers make informed career decisions. The platform uses AI to recommend suitable careers, provide salary and job market insights, create personalized study plans, assist with university applications, and help users find bursaries and internships.

## Target Users

- Grade 10–12 learners
- University students
- TVET College students
- Recent graduates
- Career changers

## Core Features

1. **Career Recommendations** - AI-powered career suggestions based on aptitude
2. **Salary Insights** - Job market data and salary ranges by profession
3. **Study Planner** - Personalized study schedules and progress tracking
4. **Bursary Finder** - Search and track bursary opportunities
5. **Internship Finder** - Discover internship and work experience opportunities
6. **Application Assistant** - AI-generated professional emails and application guidance
7. **University/College Application Helper** - Document tracking and eligibility checking
8. **User Dashboard** - Centralized management of all career planning activities

## Tech Stack

### Frontend
- React.js 18+
- Tailwind CSS
- Chart.js
- Axios
- React Router

### Backend
- Node.js 18+
- Express.js
- JWT Authentication
- Multer (File uploads)
- Dotenv

### Database
- MySQL 8+

### AI Integration
- OpenAI API

### DevOps
- Docker
- GitHub Actions (CI/CD)

## Project Structure

```
career-bridge/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Common/
│   │   │   ├── Auth/
│   │   │   ├── Career/
│   │   │   ├── Dashboard/
│   │   │   └── Forms/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── assets/
│   │   ├── styles/
│   │   └── App.js
│   ├── public/
│   └── package.json
├── backend/                     # Node.js/Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── utils/
│   │   └── server.js
│   ├── migrations/
│   └── package.json
├── database/                    # Database schema and seeds
│   ├── schema.sql
│   └── seeds/
├── docker-compose.yml
├── .env.example
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- MySQL (v8+)
- Docker & Docker Compose (optional)
- Git

### Quick Start (Local Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/blaauwiviwe-cell/career-bridge.git
   cd career-bridge
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Setup Frontend (in new terminal)**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Database Setup**
   ```bash
   # Create database and tables
   mysql -u root -p < ../database/schema.sql
   ```

### Using Docker
```bash
docker-compose up --build
```

Access the application:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **MySQL:** localhost:3306

## Color Scheme

- **Primary:** `#0F172A` (Dark Navy)
- **Secondary:** `#2563EB` (Professional Blue)
- **Accent:** `#10B981` (Success Green)
- **Background:** `#F8FAFC`
- **Text:** `#1E293B`

## API Documentation

See `BACKEND.md` for detailed API endpoint documentation.

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For support, email support@careerbridge.co.za or create an issue in this repository.

---

**Built with ❤️ for South African Career Seekers**
