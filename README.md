# India Tourist - Travel Wizard 🇮🇳

A React-based travel planning application for exploring India with an interactive travel wizard.

## Quick Start

### First Time Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Access the application**:
   - **Travel Wizard**: http://localhost:3005/wizard
   - **Static Homepage**: http://localhost:3000/public/home.html

## Important Notes

### Port Configuration

This project runs on **port 3005** instead of the default 3000 to avoid conflicts with VS Code Live Preview extension.

The port is configured in the `.env` file:
```
PORT=3005
```

### Available Routes

- `/wizard` - Interactive travel planning wizard (React component)
- `/public/home.html` - Static homepage with India tourism information

## Project Structure

```
nn/
├── public/
│   ├── index.html          # React app entry point
│   ├── home.html           # Static homepage
│   └── assets/             # Images and static files
├── src/
│   ├── App.js              # Main React app with routing
│   ├── TravelWizard.jsx    # Travel wizard component
│   ├── TravelWizard.css    # Wizard styling
│   └── Login.jsx           # Login component
├── .env                    # Port configuration (PORT=3005)
├── package.json
└── README.md
```

## Features

### Travel Wizard
- **Step 1**: Select number of travelers
- **Step 2**: Choose group type (Solo, Couple, Family, Friends)
- **Step 3**: Select landscape preferences (Beach, Mountain, Desert, etc.)
- **Step 4**: Set trip duration
- **Step 5**: Enter origin city
- **Result**: Generate custom itinerary with interactive map

### Homepage
- Beautiful India tourism landing page
- Information about destinations
- Links to travel wizard

## Development

### Running the App

```bash
npm start
```

The app will automatically open in your browser at http://localhost:3005/wizard

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Troubleshooting

### Port Already in Use

If you see "Port 3005 is already in use", either:
1. Stop the existing process on port 3005
2. Change the port in `.env` to a different number

### VS Code Live Preview Conflict

If you have VS Code Live Preview extension running on port 3000, it won't affect this project since we use port 3005. Keep the `.env` file as is.

## Technologies Used

- **React** - Frontend framework
- **React Router** - Client-side routing
- **Create React App** - Build tooling
- **Leaflet** - Interactive maps
- **CSS3** - Modern styling with animations

---

Made with ❤️ for exploring India 🇮🇳
