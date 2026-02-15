# SETUP GUIDE - India Tourist Travel Wizard

## 🚀 Quick Start

### First Time Opening This Project

1. **Open terminal in VS Code** (`Ctrl + ~`)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   
   Or use the workflow command:
   ```bash
   /start-dev-server
   ```

4. **Open in browser**:
   - Go to: **http://localhost:3005/wizard**
   - The Travel Wizard will load automatically

---

## ✨ What You Need to Know

### Important Files

| File | Purpose |
|------|---------|
| `.env` | **DO NOT DELETE!** Sets port to 3005 |
| `package.json` | Project dependencies and scripts |
| `src/TravelWizard.jsx` | Main wizard component |
| `src/App.js` | React routing configuration |
| `public/index.html` | React entry point |

### Port Configuration

- **React App (Travel Wizard)**: Port **3005**
  - Access at: http://localhost:3005/wizard
  - Configured in `.env` file
  
- **VS Code Live Preview**: Port **3000**
  - Shows directory listing
  - For static files only

**IMPORTANT**: Always use port **3005** for the React app!

---

## 🎯 How to Use in Antigravity

When you open this project in Antigravity, you can:

1. **Use the workflow command**: `/start-dev-server`
   - Automatically runs `npm start`
   - Opens server on port 3005

2. **Access the wizard**: Navigate to http://localhost:3005/wizard

3. **Make changes**: Edit any `.jsx` or `.css` files
   - The app auto-reloads on save

---

## 📁 Project Structure

```
nn/
├── .env                    ← Port configuration (3005)
├── .agent/workflows/       ← Workflow commands
│   └── start-dev-server.md
├── public/
│   ├── index.html          ← React entry point
│   └── home.html           ← Static homepage
├── src/
│   ├── App.js              ← Main app & routing
│   ├── TravelWizard.jsx    ← Wizard component
│   └── TravelWizard.css    ← Wizard styles
├── package.json
└── README.md
```

---

## 🔧 Troubleshooting

### "Port 3005 already in use"
- Stop the existing `npm start` process
- Run `npm start` again

### "Cannot find module"
- Run `npm install` to install dependencies

### Wizard not loading
- Make sure you're accessing **port 3005** (not 3000)
- URL should be: http://localhost:3005/wizard

### VS Code Live Preview conflict
- Live Preview uses port 3000 (for static files)
- React app uses port 3005
- No conflict! Both can run simultaneously

---

## 💡 Development Tips

1. **Start server**: `npm start` or `/start-dev-server`
2. **Access wizard**: http://localhost:3005/wizard
3. **Edit code**: Changes auto-reload
4. **Stop server**: `Ctrl + C` in terminal

---

## 📝 Notes

- The `.env` file is **critical** - it ensures the app runs on port 3005
- Always commit the `.env` file when using version control
- The project is configured to work seamlessly in VS Code and Antigravity

---

**Enjoy building amazing travel experiences! 🇮🇳✨**
