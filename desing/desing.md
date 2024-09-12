# Product renderer

Node.js application that utilizes Puppeteer to automate the process of loading an online store product page, utilizing the DuckDuckGo AutoConsent library to hide cookie dialogues, capture a screenshot of the rendered page, retrieve the HTML DOM content, the text content, and specific image network requests.

## Main Tasks  Overview:

**Project Setup & Configuration**: Initial project setup, including directory structure and necessary configurations.

**Puppeteer Page Loading & Autoconsent Integration**: Integrate Puppeteer for web page loading and Autoconsent for cookie dialog handling.

**Capture Screenshot of Rendered Page**: Capture and store a screenshot of the fully rendered page.

**Configure Image Filters**: Define and apply regular expressions to filter out unwanted images (like logos or banners).

**Extract & Store Product Images**: Monitor network requests for product images, download, and store them.

**Extract HTML & Text Content**: Extract the fully rendered HTML and a text representation of the product page.

**Consolidate Extracted Data & Implement Storage Structure** Aggregate all the extracted data into a single structure and define the storage mechanism.

**Error Handling & Logging**: Implement error handling mechanisms and set up logging for the application.

<br>

---

### 1. Setup the Node.js Project

- Initialize a new Node.js application, install necessary dependencies, and set up a basic directory structure.

### 2. Integrate Puppeteer and Configure Browser Automation Settings

- Incorporate Puppeteer into the application and establish browser automation settings to ensure accurate page loading.

### 3. Integrate the DuckDuckGo AutoConsent Library to Handle Cookie Dialogs

- Ensure that any cookie dialogs appearing during the page loading process are automatically accepted or dismissed, facilitating a clean capture of the product page without any obstructions.

### 4. Capture and Save Screenshot of the Rendered Page

- After successfully loading the product page and handling any cookie dialogs, capture a screenshot of the entire rendered page and save it to a designated directory.

### 5. Extract, Store, and Filter Network Requests for Images

- Monitor and store all network requests of MIME type "image", filtering out image requests that match certain predefined patterns. Save these images directly during the rendering process to avoid re-downloading.

### 6. Extract and Store Rendered DOM HTML and Text Content

- Extract both the rendered HTML content and text representation of the loaded product page. Store this extracted data in the designated output/data.json file.

### 7. Consolidate Extracted Data and Implement Final Storage Structure

- To consolidate all the extracted data including screenshots, image URLs, HTML content, and text content into a cohesive and organized structure. Additionally, define a consistent storage mechanism in preparation for database integration in the future.

### 8. Error Handling and Logging

- Implement robust error handling mechanisms to gracefully manage potential issues that might arise during the data extraction process. Additionally, set up logging to monitor and diagnose the application's behavior and errors.