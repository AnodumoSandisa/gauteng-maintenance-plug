📍 Gauteng Maintenance Plug
A localized service-discovery and booking application designed to connect users with service providers across Gauteng. This project implements a dynamic service catalog, asynchronous data handling, and automated transaction notifications.



🛠️ Technical Stack
Frontend: HTML5, CSS3 (Modern Grid & Flexbox)

Logic: Vanilla JavaScript (ES6+)

Data Management: JSON-based local database for provider metadata.

Integrations: EmailJS API for automated booking confirmations and lead generation.

🔑 Core Features
Dynamic Filtering Engine: Real-time search functionality that filters by service category (Nail Tech, Braider, Lash Tech) and location (Johannesburg, Pretoria, Ekurhuleni).

Asynchronous Content Rendering: Fetches data from a JSON source and dynamically generates UI components, minimizing initial page load.

Portfolio Modal System: A modular view system that displays provider-specific portfolios, pricing, and availability based on unique IDs.

Appointment Scheduling: Interactive time-slot selection with integrated client-side validation for booking requests.

Automated Email Workflow: Direct integration with an SMTP-based API to send instant confirmations to users upon successful booking.

🏗️ Project Architecture
The application follows a clean separation of concerns:

Data Layer (startup.json): Stores provider details, image links, and available time slots.

Logic Layer (app.js): Manages state, filtering logic, modal toggling, and API communication.

Presentation Layer (index.html & style.css): Handles the semantic structure and the "Dark Mode" aesthetic, optimized for high-contrast visibility.

⚙️ Installation & Setup
Clone the repository:

Bash
git clone https://github.com/AnodumoSandisa/gauteng-maintenance-plug.git
Open the project:
Navigate to the project folder and open index.html using a local web server (e.g., VS Code Live Server extension) to avoid CORS policy restrictions on the fetch() API.

Configuration:
To enable the email feature, initialize your own Public Key and Template IDs in the index.html and app.js files.

🛡️ Security Considerations
Credential Handling: Public keys for third-party services are initialized at runtime, keeping the communication secure between the client and the API gateway.

Input Validation: The booking form requires a valid email format and an active slot selection before processing the transaction request.
