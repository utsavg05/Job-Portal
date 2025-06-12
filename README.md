# JobSeek 🧑‍💼🔍

**JobSeek** is a full-featured MERN stack job portal that connects job seekers with recruiters in a streamlined and intuitive interface. Designed with role-based access control, it supports both student applicants and company recruiters.

## 🚀 Features

### 👤 User (Student)
- Register/login as a student
- View available jobs with filters (location, salary, industry)
- Apply for jobs and upload resumes
- Track application status (Accepted / Rejected / Pending)

### 🛠️ Admin (Recruiter)
- Register/login as a recruiter
- Create and manage company profiles
- Post jobs under registered companies
- View applicants and update their application status

## 🔧 Tech Stack

- **Frontend**: React.js, Tailwind CSS, ShadCN UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas with Mongoose
- **Authentication**: JWT with role-based authorization
- **File Uploads**: Cloudinary for resumes and profile images
- **Deployment**: Full-stack hosted on **Render**

## ⚙️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/utsavg05/Job-Portal.git
cd zync

# 2. Install backend dependencies
npm install

# 3. Setup environment variables
touch .env

Add your secrets in .env:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# 4. Install frontend dependencies
cd client
npm install

# 5. Run both client and server
cd ..
npm run dev
