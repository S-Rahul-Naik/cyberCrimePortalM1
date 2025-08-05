# 🚨 Cybercrime Reporting Portal

## Project Overview
A comprehensive web application for reporting and managing cybercrime incidents. This system provides a user-friendly interface for citizens to report cybercrimes and an administrative dashboard for law enforcement to track and manage cases.

## 🎯 Features

### User Features
- **Report Submission**: Easy-to-use form for reporting cybercrime incidents
- **Ticket Tracking**: Unique ticket ID generation for each report
- **Status Checking**: Real-time status updates on submitted reports
- **Secure Communication**: Email validation and secure data handling

### Admin Features
- **Dashboard**: Comprehensive view of all submitted reports
- **Case Management**: Update case status (Pending → Under Investigation → Resolved)
- **Excel Export**: Export resolved cases to Excel for record-keeping
- **Report Analytics**: View trends and statistics

## 🛠️ Technology Stack

### Frontend
- **React.js** - Modern UI framework
- **React Router** - Client-side routing
- **CSS3** - Responsive styling
- **React Toastify** - User notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **ExcelJS** - Secure Excel file handling
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request parsing

### Data Storage
- **JSON Files** - Lightweight data storage
- **Excel Files** - Archive for resolved cases

## 📋 Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Modern web browser

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd cyberCrimePortalM1/cybercrime-report
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies (if separate)
cd backend ; npm install
```

### 3. Start the Application

#### Backend Server
```bash
cd backend
node server.js
```
Server runs on: `http://localhost:5000`

#### Frontend Application
```bash
npm start
```
Application runs on: `http://localhost:3000`

## 📚 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/report` | Submit new cybercrime report |
| GET | `/api/reports` | Get all reports (Admin) |
| GET | `/api/status/:ticketId` | Check report status |
| PATCH | `/api/reports/:ticketId` | Update report status |
| GET | `/api/resolved-reports` | Get resolved reports |
| GET | `/api/download-resolved` | Download Excel file |

### Sample API Usage

#### Submit Report
```javascript
POST /api/report
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "crimeType": "Online Fraud",
  "description": "Received suspicious emails asking for bank details",
  "location": "Mumbai, India"
}
```

#### Response
```javascript
{
  "success": true,
  "ticketId": "CYB123456",
  "message": "Report submitted successfully"
}
```

## 🔒 Security Features
- Input validation and sanitization
- Email format validation
- Error handling and logging
- Secure file handling with ExcelJS
- CORS protection

## 📱 User Interface

### Main Components
1. **Home Page** - Landing page with navigation
2. **Report Form** - Cybercrime incident submission
3. **Status Check** - Track report progress
4. **Admin Login** - Secure admin access
5. **Dashboard** - Admin case management

## 🎓 Academic Value

### Learning Outcomes
- **Full-Stack Development**: Frontend and backend integration
- **API Design**: RESTful API implementation
- **Data Management**: JSON and Excel file handling
- **Security**: Input validation and secure practices
- **User Experience**: Responsive design and navigation

### Technical Skills Demonstrated
- React.js development
- Node.js and Express.js
- API development and testing
- File system operations
- Error handling and validation
- Security best practices

## 📊 Future Enhancements
- Database integration (MongoDB/MySQL)
- User authentication system
- Real-time notifications
- Advanced search and filtering
- Dashboard analytics
- Mobile responsive improvements

## 🤝 Contributing
This project is developed as a college mini project. Suggestions and improvements are welcome.

## 📄 License
Educational use only - College Mini Project

## 👨‍💻 Developer
**Sugali Rahul Naik**  
College: BITM
Course: EEE  
Year: 3rd Year

---

### 📞 Contact
For any queries regarding this project:
- Email: 23rahul54@gmail.com
- GitHub: @S-Rahul-Naik

---

*This project demonstrates practical application of web development skills for cybercrime reporting and management.*
