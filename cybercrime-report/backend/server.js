// const express = require("express");
// const fs = require("fs");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const XLSX = require("xlsx"); // for Excel export
// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // File where reports are stored
// const REPORTS_FILE = "./reports.json";

// // Ensure file exists
// if (!fs.existsSync(REPORTS_FILE)) {
//   fs.writeFileSync(REPORTS_FILE, "[]");
// }

// // Submit report
// app.post("/api/report", (req, res) => {
//   const report = req.body;
//   report.timestamp = new Date().toISOString();

//   // Generate unique ticket ID
//   const id = "CYB" + Math.floor(100000 + Math.random() * 900000);
//   report.ticketId = id;

//   const reports = JSON.parse(fs.readFileSync(REPORTS_FILE));
//   reports.push(report);
//   fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));

//   res.json({ success: true, ticketId: id });
// });

// // Get all reports
// app.get("/api/reports", (req, res) => {
//   const reports = JSON.parse(fs.readFileSync(REPORTS_FILE));
//   res.json({ reports });
// });

// // Check report status
// app.get("/api/status/:ticketId", (req, res) => {
//   const reports = JSON.parse(fs.readFileSync(REPORTS_FILE));
//   const found = reports.find(r => r.ticketId === req.params.ticketId);
//   if (found) {
//     res.json({ success: true, report: found });
//   } else {
//     res.status(404).json({ success: false, message: "Ticket not found" });
//   }
// });

// // ✅ Enhanced PATCH route for status update + Excel archive
// app.patch("/api/reports/:ticketId", (req, res) => {
//   const { ticketId } = req.params;
//   const { status } = req.body;

//   let reports = JSON.parse(fs.readFileSync(REPORTS_FILE));
//   const index = reports.findIndex(r => r.ticketId === ticketId);

//   if (index === -1) {
//     return res.status(404).json({ success: false, message: "Report not found" });
//   }

//   const report = reports[index];
//   report.status = status;

//   if (status === "Resolved") {
//     // Remove from JSON
//     reports.splice(index, 1);
//     fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));

//     // Append to Excel
//     const resolvedPath = "./resolved_reports.xlsx";
//     let wb, ws, data = [];

//     if (fs.existsSync(resolvedPath)) {
//       const file = XLSX.readFile(resolvedPath);
//       ws = file.Sheets[file.SheetNames[0]];
//       data = XLSX.utils.sheet_to_json(ws);
//       wb = file;
//     } else {
//       wb = XLSX.utils.book_new();
//     }

//     data.push(report);
//     const newWS = XLSX.utils.json_to_sheet(data);
//     XLSX.utils.book_append_sheet(wb, newWS, "ResolvedReports", true);
//     XLSX.writeFile(wb, resolvedPath);
//   } else {
//     // Just update status
//     reports[index] = report;
//     fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));
//   }

//   res.json({ success: true, report });
// });
// // ✅ Fetch resolved reports
// app.get("/api/resolved-reports", (req, res) => {
//   const resolvedPath = "./resolved_reports.xlsx";
//   if (!fs.existsSync(resolvedPath)) {
//     return res.json({ reports: [] });
//   }

//   const workbook = XLSX.readFile(resolvedPath);
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   const data = XLSX.utils.sheet_to_json(sheet);
//   res.json({ reports: data });
// });

// // ✅ Optional: Allow downloading the Excel file
// app.get("/api/download-resolved", (req, res) => {
//   const resolvedPath = "./resolved_reports.xlsx";
//   if (!fs.existsSync(resolvedPath)) {
//     return res.status(404).send("No resolved reports available.");
//   }
//   res.download(resolvedPath);
// });

// // ✅ Home route
// app.get("/", (req, res) => {
//   res.send("🚀 Cybercrime Reporting API is running.");
// });

// // ✅ Start server
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const ExcelJS = require("exceljs"); // for Excel export
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// File where reports are stored
const REPORTS_FILE = "./reports.json";

// Ensure file exists
if (!fs.existsSync(REPORTS_FILE)) {
  fs.writeFileSync(REPORTS_FILE, "[]");
}

// Submit report with validation
app.post("/api/report", (req, res) => {
  try {
    const report = req.body;
    
    // Basic validation
    if (!report.name || !report.email || !report.crimeType || !report.description) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: name, email, crimeType, description" 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(report.email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid email format" 
      });
    }

    report.timestamp = new Date().toISOString();
    report.status = "Pending"; // Initial status

    // Generate unique ticket ID
    const id = "CYB" + Math.floor(100000 + Math.random() * 900000);
    report.ticketId = id;

    const reports = JSON.parse(fs.readFileSync(REPORTS_FILE));
    reports.push(report);
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));

    res.json({ 
      success: true, 
      ticketId: id,
      message: "Report submitted successfully" 
    });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

// Get all reports
app.get("/api/reports", (req, res) => {
  const reports = JSON.parse(fs.readFileSync(REPORTS_FILE));
  res.json({ reports });
});

// Check report status
app.get("/api/status/:ticketId", (req, res) => {
  const reports = JSON.parse(fs.readFileSync(REPORTS_FILE));
  const found = reports.find(r => r.ticketId === req.params.ticketId);
  if (found) {
    res.json({ success: true, report: found });
  } else {
    res.status(404).json({ success: false, message: "Ticket not found" });
  }
});

// ✅ Enhanced PATCH route for status update + Excel archive
app.patch("/api/reports/:ticketId", async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;

  let reports = JSON.parse(fs.readFileSync(REPORTS_FILE));
  const index = reports.findIndex(r => r.ticketId === ticketId);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Report not found" });
  }

  const report = reports[index];
  report.status = status;

  if (status === "Resolved") {
    // Remove from JSON
    reports.splice(index, 1);
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));

    // Append to Excel using ExcelJS
    const resolvedPath = "./resolved_reports.xlsx";
    let workbook = new ExcelJS.Workbook();
    let worksheet;

    if (fs.existsSync(resolvedPath)) {
      // Load existing workbook
      await workbook.xlsx.readFile(resolvedPath);
      worksheet = workbook.getWorksheet("ResolvedReports") || workbook.addWorksheet("ResolvedReports");
    } else {
      // Create new workbook and worksheet
      worksheet = workbook.addWorksheet("ResolvedReports");
      // Add headers
      worksheet.addRow(Object.keys(report));
    }

    // Add the resolved report data
    worksheet.addRow(Object.values(report));
    
    // Save the workbook
    await workbook.xlsx.writeFile(resolvedPath);
  } else {
    // Just update status
    reports[index] = report;
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));
  }

  res.json({ success: true, report });
});

// ✅ Fetch resolved reports
app.get("/api/resolved-reports", async (req, res) => {
  const resolvedPath = "./resolved_reports.xlsx";
  if (!fs.existsSync(resolvedPath)) {
    return res.json({ reports: [] });
  }

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(resolvedPath);
    const worksheet = workbook.getWorksheet("ResolvedReports");
    
    if (!worksheet) {
      return res.json({ reports: [] });
    }

    const data = [];
    const headers = [];
    
    // Get headers from first row
    worksheet.getRow(1).eachCell((cell, colNumber) => {
      headers[colNumber - 1] = cell.value;
    });

    // Get data from subsequent rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Skip header row
        const rowData = {};
        row.eachCell((cell, colNumber) => {
          rowData[headers[colNumber - 1]] = cell.value;
        });
        data.push(rowData);
      }
    });

    res.json({ reports: data });
  } catch (error) {
    console.error("Error reading Excel file:", error);
    res.status(500).json({ error: "Failed to read resolved reports" });
  }
});

// ✅ Optional: Allow downloading the Excel file
app.get("/api/download-resolved", (req, res) => {
  const resolvedPath = "./resolved_reports.xlsx";
  if (!fs.existsSync(resolvedPath)) {
    return res.status(404).send("No resolved reports available.");
  }
  res.download(resolvedPath);
});

// ✅ Home route with API documentation
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Cybercrime Reporting API is running",
    version: "1.0.0",
    endpoints: {
      "POST /api/report": "Submit a new cybercrime report",
      "GET /api/reports": "Get all reports (Admin only)",
      "GET /api/status/:ticketId": "Check report status by ticket ID",
      "PATCH /api/reports/:ticketId": "Update report status (Admin only)",
      "GET /api/resolved-reports": "Get all resolved reports",
      "GET /api/download-resolved": "Download resolved reports as Excel"
    },
    author: "Developed for College Mini Project",
    timestamp: new Date().toISOString()
  });
});

// ✅ Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
