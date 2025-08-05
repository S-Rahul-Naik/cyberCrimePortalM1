# 📊 Database Schema Documentation

## Data Structure Overview

### Reports (reports.json)
Each cybercrime report contains the following fields:

```javascript
{
  "ticketId": "CYB123456",           // Unique identifier
  "name": "John Doe",               // Reporter's name
  "email": "john@example.com",      // Contact email
  "phone": "1234567890",           // Phone number
  "crimeType": "Online Fraud",      // Type of cybercrime
  "description": "Detailed description of the incident",
  "location": "City, State",        // Incident location
  "timestamp": "2025-08-05T10:30:00.000Z",  // Submission time
  "status": "Pending"               // Current status
}
```

### Status Flow
```
Pending → Under Investigation → Resolved
```

### File Structure
```
backend/
├── reports.json              # Active reports database
├── resolved_reports.xlsx     # Archive of resolved cases
└── uploads/                  # File attachments (future)
```

### Data Validation Rules

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | String | Yes | Min 2 characters |
| email | String | Yes | Valid email format |
| phone | String | Optional | 10 digits |
| crimeType | String | Yes | Predefined options |
| description | String | Yes | Min 10 characters |
| location | String | Optional | - |

### Sample Database State

#### reports.json
```json
[
  {
    "ticketId": "CYB123456",
    "name": "Alice Smith",
    "email": "alice@example.com",
    "phone": "9876543210",
    "crimeType": "Identity Theft",
    "description": "Someone created fake social media profiles using my photos",
    "location": "Delhi, India",
    "timestamp": "2025-08-05T09:15:00.000Z",
    "status": "Under Investigation"
  },
  {
    "ticketId": "CYB789012",
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "phone": "5551234567",
    "crimeType": "Online Fraud",
    "description": "Received phishing email asking for bank details",
    "location": "Mumbai, India",
    "timestamp": "2025-08-05T11:22:00.000Z",
    "status": "Pending"
  }
]
```

## 🔄 Data Flow

### 1. Report Submission
```
User Form → Validation → JSON Storage → Ticket ID Generation
```

### 2. Status Update
```
Admin Dashboard → Status Change → JSON Update → Excel Archive (if resolved)
```

### 3. Status Check
```
Ticket ID Input → Search JSON → Return Status
```

## 📈 Future Database Improvements
- Migrate to MongoDB/PostgreSQL
- Add user authentication tables
- Implement proper indexing
- Add audit logs
- Create backup strategies
