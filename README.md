# SecOps: Automated Incident Data Ingestion

### 🚀 Overview
This project bridges the gap between **Network Security Reconnaissance** and **IT Service Management (ITSM)**. It automates the process of scanning a network environment and transforming raw security data into a **ServiceNow-ready JSON payload**.

### 💼 The Business Use Case
Manual entry of security threats into an ITSM platform is slow and prone to human error. This utility simulates a **MID Server** workflow by:
1.  Identifying active services on a network using Nmap.
2.  Formatting technical data into a structured JSON object.
3.  Preparing that data for ingestion via a **ServiceNow Scripted REST API**.

### 🛠️ Technical Stack
- **Language:** Python 3.13
- **Engine:** Nmap 7.99 (Network Mapping)
- **Library:** `python-nmap`
- **Data Format:** JSON (JavaScript Object Notation)

### 📂 How to Run
1.  **Install Nmap Engine:** Download and install from [nmap.org](https://nmap.org/).
2.  **Install Requirements:** ```bash
    pip install python-nmap
    ```
3.  **Execute Scan:**
    ```bash
    python scanner_to_json.py
    ```

### 📜 Sample JSON Payload
This is the structured data ready for ServiceNow incident creation:
```json
{
    "source": "Python-SecOps-Automation",
    "scan_timestamp": "2026-04-07 18:30:45",
    "target_system": "127.0.0.1",
    "vulnerabilities": [
        {
            "port": 443,
            "service": "https",
            "state": "open",
            "description": "Service https is active on port 443"
        }
    ]
}
