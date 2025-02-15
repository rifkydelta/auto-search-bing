# Microsoft Rewards Bing Search Automation Extension 🚀

This Chrome extension is designed to automate Bing searches so you can earn Microsoft Rewards more easily. By using a list of random Indonesian words, the extension generates varied search queries (3–5 words per query) and opens each query sequentially in the same active tab.

> **⚠️ WARNING:**  
> Using this extension to automate searches for earning Microsoft Rewards may violate Microsoft’s policies. Use this extension at your own risk and responsibility. Always comply with the applicable terms and conditions.

## Key Features 💡

- **Bing Search Automation 🔍**  
  Generates random search queries (3–5 words per query) from a predetermined word list.
- **Earn Microsoft Rewards 💰**  
  By opening the Bing search queries, the extension helps you earn Microsoft Rewards points.
- **Customizable Query Count & Search ID 🛠️**  
  Specify the number of queries you want to automate and enter a custom search ID for tracking.
- **Automatic Storage 📂**  
  Generated links are saved using `chrome.storage.local` so they remain even if the popup is closed.
- **Single-Tab Navigation 🔥**  
  Search queries open in the same active tab, keeping your browser window uncluttered.
- **100% Hands-Free Automation 🤖**  
  Sit back and relax—let the bot handle everything for you, no clicks needed! It will automatically perform a search within a time range of 3000ms to 6000ms.
## Installation ⚙️

1. **Clone or Download the Repository:**

   ```bash
   git clone https://github.com/rifkydelta/auto-search-bing.git
   ```

2. **Load the Extension in Edge (or Chrome):**
   - Open Edge and navigate to `edge://extensions` (or `chrome://extensions` for Chrome).
   - Enable **Developer mode** in the top-right corner.
   - Click **Load unpacked** and select the folder where the repository is located.

3. Once the extension is loaded, its icon will appear in the browser toolbar.

## How to Use 📌

1. **Open the Extension Popup:**  
   Click the extension icon in the toolbar to open the popup.

2. **Enter Inputs:**
   - **INPUT COUNT:** Enter the number of search queries you want to generate.
   - **ID:** Enter the search ID to earn points. To get the ID, perform a manual Bing search and copy the ID from the URL.  
     *Example:* In the URL `https://www.bing.com/search?q=example&qs=n&form=QBRE&sp=...`, the ID is `QBRE`.

3. **Generate Search Queries:**  
   Click the **SAVE** button. The extension will generate random Bing search queries—each composed of 3–5 words. Each query is created by URL-encoding each word and joining them with a plus sign (`+`).

4. **View Query List:**  
   The generated queries will be displayed in the popup. Each query is a Bing URL in the following format:  
   ```
   https://bing.com/search?q=[query]+[query]+...&qs=PN&form=[ID]
   ```

5. **Automate Searches:**  
   Click the **OPEN LINK** button to open the next search query in the same active tab. Each click opens one query and removes it from the list. Continue this process to automate your searches and earn Microsoft Rewards points.

## Code Structure 📁

### popup.js

This extension uses `popup.js` to manage all logic and interactions, including:

- **updateLinkListDisplay()**  
  - 🔹 Updates the query list display in the popup.
  - 🔹 Disables the **OPEN LINK** button if no queries remain.

- **saveLinksToStorage()**  
  - 🔹 Saves the array of generated queries to `chrome.storage.local`.

- **loadLinksFromStorage()**  
  - 🔹 Retrieves the saved queries from `chrome.storage.local` when the popup is opened.
  - 🔹 Calls `updateLinkListDisplay()` to refresh the view.

- **generateLinks(num, formID)**  
  - 🔹 Generates `num` search queries.
  - 🔹 For each query, a random word count (between 3 and 5) is determined.
  - 🔹 Random words are selected from the `commonWords` array.
  - 🔹 Each word is URL-encoded individually and joined with a plus sign (`+`).
  - 🔹 The final URL is created in the format:  
    `https://bing.com/search?q=[encoded_query]&qs=PN&form=[encoded_formID]`

- **Event Listeners:**
  - **SAVE Button:**  
    🔸 Validates the input, calls `generateLinks()`, saves the queries, and updates the display.
  - **OPEN LINK Button:**  
    🔸 Opens the next search query in the active tab using `chrome.tabs.update({ url: link })`, removes the query from the list, and updates the storage and display.

## Customization 🎨

- **Modify the Word List:**  
  Change the `commonWords` array in `popup.js` to add or remove words as needed.
- **Adjust the Word Count Range:**  
  Update the logic in `generateLinks()` if you want to change the range of words per query.
- **UI & Styling:**  
  Customize the popup appearance through the HTML/CSS files to match your design preferences.

## License 📄

This project is licensed under the [MIT License](LICENSE).