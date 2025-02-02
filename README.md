# Bible Customization App

An interactive web application that allows users to customize and preview a 3D Bible model in real-time. Users can personalize various aspects of the Bible's appearance, including the outer leather, inner leather, guilding, and ribbon colors.

## Features

- Interactive 3D Bible model with real-time preview
- Customizable components:
  - Outer leather cover
  - Inner leather lining
  - Page guilding
  - Three customizable ribbon bookmarks
- Color customization options:
  - Color picker for precise color selection
  - Pre-defined color presets (Classic, Simple, Rustic, Ornate)
  - Random color generator
- Responsive design that works on various screen sizes
- Intuitive user interface with Material-UI components

## Tech Stack

- React 18
- Vite (for fast development and optimized builds)
- Three.js (via @react-three/fiber and @react-three/drei)
- Material-UI (MUI) for UI components
- React Color for the color picker

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Usage

1. Open the application in your web browser
2. Use the sidebar menu to select different components of the Bible
3. Click on any component to open the color picker
4. Choose from preset color schemes using the dropdown menu
5. Click "Randomize Colors" for random color combinations
6. Use your mouse to interact with the 3D model:
   - Left click and drag to rotate
   - Right click and drag to pan
   - Scroll to zoom in/out

## License

This project is private and not licensed for public use.

## Deployment

### GitHub Pages Setup

1. First, modify the `vite.config.js` file to set the correct base URL:
```bash
npm run build
```
