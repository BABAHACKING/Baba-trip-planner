---
description: Start the Travel Wizard development server
---

# Start Development Server

This workflow starts the React development server for the India Tourist Travel Wizard.

## Steps

1. **Install dependencies (if first time)**
   ```bash
   npm install
   ```

// turbo
2. **Start the development server**
   ```bash
   npm start
   ```

3. **Access the application**
   - Open your browser and navigate to: http://localhost:3005/wizard
   - The Travel Wizard React component will load
   - You can also access the static homepage at: http://localhost:3000/public/home.html

## Notes

- The app runs on **port 3005** (configured in `.env` file)
- This avoids conflicts with VS Code Live Preview on port 3000
- The server will auto-reload when you make changes to the code
- Press `Ctrl+C` in the terminal to stop the server
