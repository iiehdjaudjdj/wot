# Web of Trust Application

## Project Description

This is a modern Web of Trust app made with HTML, CSS, and JavaScript. The app uses Web of Trust API to get reputation data of websites and domains. You can search to see the safety status, reputation score, confidence level, and categories of any domain. It has dark mode and light mode toggle for better user experience. The design works on all screen sizes including mobile phones. It has loading animations and error handling for smooth user experience.

## API Details Used

### Base URL

https://scorecard.api.mywot.com/v3/targets

### Endpoints

GET /v3/targets - Reputation API endpoint used to get reputation information of one or multiple domains

GET /v3/targets?t={domain} - Get reputation data for a single domain

GET /v3/targets?t={domain1}&t={domain2} - Get reputation data for multiple domains (depends on API plan)

### Required Parameters

t - Query parameter that is required, must have domain name or URL. Can have multiple t parameters for multiple domains (required)

### Authentication

API key and User ID - You need a valid API key and User ID from Web of Trust. Store them in config.js file. Do not commit the actual API key to GitHub, use YOUR_API_KEY_HERE and YOUR_USER_ID_HERE as placeholders.

### Sample JSON Response

{
  "google.com": {
    "target": "google.com",
    "safety": {
      "status": "SAFE",
      "reputations": 95,
      "confidence": 98
    },
    "childSafety": {
      "reputations": 90,
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

I use the fetch() function with async/await for API calls. We build a URL with query parameters for domain name. We send API key and User ID in headers. There is error handling for different HTTP status codes like 403 for invalid API key, 400 for invalid parameters, 429 for quota exceeded, and 500 for server errors.


### API Key

The API key and User ID are stored in config.js file. The config.js file is imported in HTML. There are placeholders YOUR_API_KEY_HERE and YOUR_USER_ID_HERE for sample. Do not commit the actual API key to GitHub. Some API plans need User ID too.

## Instructions to Run the Project

First, you need to get an API key and User ID from Web of Trust. Go to https://www.mywot.com/ and sign up to get API access. Then, open the config.js file and replace YOUR_API_KEY_HERE with your actual API key. If you need User ID, also replace YOUR_USER_ID_HERE.

To run the project, just open the index.html file in your web browser. You can double click the index.html file or open it with your web browser. You do not need a server or to install anything. You can also open it using a local server like XAMPP, WAMP, or Live Server extension in VS Code.

For best experience, use modern web browsers like Chrome, Firefox, Edge, or Safari. The Web of Trust app works on all screen sizes so you can use it on desktop, tablet, or mobile phone. You can also bookmark it in mobile browser to make it like an app.

## Screenshots Included

<img width="1746" height="996" alt="image" src="https://github.com/user-attachments/assets/b1ebdb0b-1b0d-41ee-b744-7408aa72cb24" />

