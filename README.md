# Web of Trust Application

## Project Description

Ito ay isang modern at propesyonal na Web of Trust application na ginawa gamit ang HTML, CSS, at JavaScript. Ang application na ito ay gumagamit ng Web of Trust API para makakuha ng reputation data ng mga websites at domains. Mayroon itong search functionality para makita ang safety status, reputation score, confidence level, at categories ng kahit anong domain. May dark mode at light mode toggle din para sa better user experience. Responsive ang design sa lahat ng screen sizes kabilang ang mobile devices. May loading animations at error handling din para sa smooth user experience.

## API Details Used

### Base URL

https://corecard.api.mywot.com/v3/target

### Endpoints

GET /v3/target - Reputation API endpoint na ginagamit para makakuha ng reputation information ng isang o multiple domains

GET /v3/target?t={domain} - Get reputation data for a single domain

GET /v3/target?t={domain1}&t={domain2} - Get reputation data for multiple domains (depends on API plan)

### Required Parameters

t - Query parameter na kailangan, dapat may domain name o URL. Pwede magkaroon ng multiple t parameters para sa multiple domains (required)

key - API key na kailangan para ma-authenticate ang request. Dapat i-include sa query parameters (required)

### Authentication

API key - Kailangan ng valid API key mula sa Web of Trust. I-store ang API key sa config.js file. Kailangan din ng User ID para sa ilang API plans. Hindi dapat i-commit ang actual API key sa GitHub, gamitin ang YOUR_API_KEY_HERE bilang placeholder.

### Sample JSON Response

{
  "google.com": {
    "target": "google.com",
    "safety": {
      "status": "SAFE",
      "reputation": 95,
      "confidence": 98
    },
    "childSafety": {
      "reputation": 90,
      "confidence": 95
    },
    "categories": [
      {
        "identifier": 101,
        "name": "Search engines",
        "confidence": 95
      }
    ]
  }
}

### Fetch the Data (JavaScript)

Ginagamit namin ang fetch() function na may async/await para sa API calls. Nag-construct kami ng URL na may query parameters para sa domain name at API key. May error handling din para sa different HTTP status codes tulad ng 403 para sa invalid API key, 400 para sa invalid parameters, 429 para sa quota exceeded, at 500 para sa server errors.

### Display in HTML (DOM)

Ginagamit namin ang card layout para sa main reputation information. May grid layout din para sa safety status at child safety data. May progress bars para sa reputation scores. May category tags din para sa website categories. May icons mula sa Bootstrap Icons para sa visual representation.

### Error Handling

May comprehensive error handling para sa different scenarios. Kapag 403 ang status, nagpapakita ng Invalid API key message. Kapag 400, nagpapakita ng Invalid request message. Kapag 429, nagpapakita ng Request quota exceeded message. Kapag 500, nagpapakita ng Server error message. May network error handling din para sa connection issues. May input validation din para sa empty fields, invalid characters, at invalid domain formats.

### Input Validation

May input validation na chine-check kung empty ang field. Chine-check din kung valid ang domain format at kung may minimum length. Auto-extract ng domain name mula sa full URL. Auto-trim ng whitespace para sa clean input. Disable ang button habang naglo-load para maiwasan ang multiple requests.

### Loading State

May loading spinner na nagpapakita habang nagfe-fetch ng data mula sa API. May Loading text din para sa user feedback. Disable ang search button habang nagpo-process para maiwasan ang double-clicks.

### Responsive Design

Responsive ang design sa lahat ng screen sizes. May media queries para sa mobile, tablet, at desktop. Flexible grid layout na nag-a-adjust base sa screen size. Responsive typography at spacing din. Single column layout sa mobile devices.

### Comments in Code

May 5 Tagalog comments sa most important functions. May explanations para sa API calls, DOM manipulation, input validation, at utility functions. Simple at easy to understand ang comments.

### File Requirements

May exactly 5 files ang project. index.html para sa HTML structure, style.css para sa styling, script.js para sa JavaScript functionality, config.js para sa API key storage, at README.md para sa documentation. Walang inline CSS o JavaScript.

### Code Organization

Ginagamit lang namin ang functions, walang constructors o classes. Separate functions para sa API calls, DOM manipulation, input validation, at utility functions. Walang duplicated code, may reusable functions.

### UI Requirements

May search bar para sa domain input. May search button para trigger ang API call. May results container para sa reputation data display. May error container para sa error messages. May footer na may API source credits. May theme toggle button para sa dark/light mode. May safety status cards para sa safety at child safety data.

### API Key Security

Naka-store ang API key sa config.js file. Imported ang config.js file sa HTML. May placeholder na YOUR_API_KEY_HERE para sa sample. Hindi dapat i-commit ang actual API key sa GitHub. Kailangan din ng User ID para sa ilang API plans.

## Instructions to Run the Project

Una, kailangan mong kumuha ng API key mula sa Web of Trust. Pumunta sa https://www.mywot.com/ at mag-sign up para makakuha ng API access. Pagkatapos, buksan ang config.js file at palitan ang YOUR_API_KEY_HERE ng actual API key mo. Kung kailangan ng User ID, palitan din ang YOUR_USER_ID_HERE.

Para ma-run ang project, buksan lang ang index.html file sa web browser. Pwede mong i-double click ang index.html file o i-open gamit ang web browser. Hindi na kailangan ng server o installation ng dependencies. Pwede mo ring i-open gamit ang local server tulad ng XAMPP, WAMP, o Live Server extension sa VS Code.

Para sa best experience, gamitin ang modern web browsers tulad ng Chrome, Firefox, Edge, o Safari. Responsive ang Web of Trust app sa lahat ng screen sizes kaya pwede mo itong gamitin sa desktop, tablet, o mobile phone. Pwede mo ring i-bookmark sa mobile browser para maging parang app.

## Screenshots Included

Ang Web of Trust application ay may modern dark theme na may blue at green accent colors. May light mode din na may white background. May search bar sa taas na may search button. May large reputation display card na nagpapakita ng domain name, normalized domain, safety status, reputation scores, at confidence levels. May progress bars para sa reputation visualization. May grid layout ng safety cards para sa safety at child safety data. May category tags kapag may available categories. May loading spinner kapag nagfe-fetch ng data. May error messages kapag may problema sa API call o invalid input. Responsive ang design sa lahat ng screen sizes. May theme toggle button sa header para sa dark/light mode switching.

