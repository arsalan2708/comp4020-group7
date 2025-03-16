# Collaborative Grocery Lists

Organize and share grocery lists effortlessly with our collaborative app—plan, edit, and shop together in real-time!

A simple web project that uses TypeScript, HTML, and CSS with hot-reloading. This project is set up to watch TypeScript changes and serve the app with live reloading.

## Project Setup

### 1. Install Dependencies

Run the following command to install the necessary packages:

```bash
npm install --save-dev tsc-watch lite-server
```

### 2. Project Structure

Your project should have the following structure:

```
root/
├── dist/                # Compiled JavaScript files
│   └── index.js         # compiled javascript entry file
├── src/                 # Source files
│   └── index.ts         # TypeScript entry file
├── index.html           # HTML file
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project configuration
├── tsconfig.json        # typescript configuration files
└── style.css            # CSS file
```

### 3. Scripts

The following npm scripts are set up in `package.json`:

- **`npm run build`**: Compiles TypeScript manually.
- **`npm run watch-ts`**: Watches TypeScript files and compiles on changes.
- **`npm run start`**: Runs the `lite-server` to serve the files with hot-reloading.

### 4. Start Development

To start the development environment:

```bash
npm run start
```

To enable hot reloads, run this in a separate cli

```bash
npm run watch-ts
```

This will:

- Watch for TypeScript file changes and recompile them.
- Automatically reload the browser whenever changes occur.

### 5. Entry Point

- `index.js`: Javascript entry file.
- `index.ts`: TypeScript entry file.
- `style.css`: Styles for the app.
- `index.html`: Basic HTML structure for your app.

## License

This project is open-source and available under the MIT License.
