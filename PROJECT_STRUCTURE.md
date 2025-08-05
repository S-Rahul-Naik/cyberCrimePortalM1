# 📁 Project Structure

## 🏗️ Cybercrime Reporting Portal - File Organization

```
cyberCrimePortalM1/
├── 📄 PROJECT_README.md              # Main project documentation
├── 📄 PROJECT_PRESENTATION.md        # Academic presentation
├── 📄 DATABASE_SCHEMA.md             # Data structure documentation
├── 📄 .gitignore                     # Git ignore file
├── 📁 .git/                          # Git repository
│
└── 📁 cybercrime-report/             # Main application directory
    ├── 📄 package.json               # Frontend dependencies
    ├── 📄 package-lock.json          # Dependency lock file
    ├── 📁 node_modules/              # Installed packages
    │
    ├── 📁 public/                    # Static assets
    │   ├── 📄 index.html             # Main HTML template
    │   ├── 🖼️ favicon.ico            # Website icon
    │   ├── 🖼️ logo192.png            # App logo (small)
    │   ├── 🖼️ logo512.png            # App logo (large)
    │   ├── 📄 manifest.json          # PWA manifest
    │   └── 📄 robots.txt             # Search engine instructions
    │
    ├── 📁 src/                       # Source code
    │   ├── 📄 index.js               # Application entry point
    │   ├── 📄 index.css              # Global styles
    │   ├── 📄 App.js                 # Main application component
    │   │
    │   ├── 🧩 Components:
    │   ├── 📄 Navbar.jsx             # Navigation component
    │   ├── 📄 Navbar.css             # Navigation styles
    │   ├── 📄 ReportForm.jsx         # Crime reporting form
    │   ├── 📄 ReportForm.css         # Form styles
    │   ├── 📄 StatusCheck.jsx        # Status checking component
    │   ├── 📄 StatusCheck.css        # Status check styles
    │   ├── 📄 AdminLogin.jsx         # Admin authentication
    │   ├── 📄 AdminLogin.css         # Admin login styles
    │   ├── 📄 Dashboard.jsx          # Admin dashboard
    │   ├── 📄 Dashboard.css          # Dashboard styles
    │   ├── 📄 InfoSections.jsx       # Information sections
    │   └── 📄 InfoSections.css       # Info section styles
    │
    └── 📁 backend/                   # Server-side code
        ├── 📄 server.js              # Express.js server
        ├── 📄 reports.json           # Active reports database
        └── 📄 resolved_reports.xlsx  # Archived resolved cases
```

## 🎯 Key Files Description

### 📋 Documentation Files
- **PROJECT_README.md**: Comprehensive project documentation
- **PROJECT_PRESENTATION.md**: Academic presentation material
- **DATABASE_SCHEMA.md**: Data structure and API documentation

### 🔧 Application Files
- **server.js**: Backend API server with all endpoints
- **App.js**: Main React application with routing
- **index.js**: Application entry point and React DOM rendering

### 🧩 Component Files
- **Navbar.jsx**: Main navigation and branding
- **ReportForm.jsx**: Cybercrime incident reporting form
- **StatusCheck.jsx**: Ticket status checking interface
- **AdminLogin.jsx**: Admin authentication system
- **Dashboard.jsx**: Admin case management interface
- **InfoSections.jsx**: Information and help sections

### 📊 Data Files
- **reports.json**: Active cybercrime reports database
- **resolved_reports.xlsx**: Archive of resolved cases
- **package.json**: Project dependencies and scripts


## 📦 Total Project Size
- **Source Files**: ~20 essential files
- **Documentation**: 3 comprehensive docs
- **Components**: 6 React components
- **Styles**: 6 CSS files
- **Dependencies**: Managed via package.json

---
*This structure maintains only essential files for a clean, professional college submission.*
