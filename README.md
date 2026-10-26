# CSV Explorer — Constems AI Systems Assessment

A lightweight, high-performance React application that enables users to upload CSV files, display tabular data in the browser, and filter rows across columns.

Built as part of the candidate assessment task for **Constems AI Systems Pvt. Ltd.**

---

## Features

- **CSV Upload & Parsing**: Supports drag-and-drop and standard file picker. Parses files client-side using PapaParse with file size validation.
- **Tabular Data Display**: Clean, responsive table showing row numbers, column headers, and graceful fallback for empty values.
- **Global Search Box**: Real-time free-text search across all columns simultaneously with an instant clear button (`✕`).
- **Dynamic Select Boxes (Dropdown Filters)**: Automatically extracts unique categorical values from CSV columns (e.g. Department, City, Status, Role) for instant 1-click filtering.
- **Date Range Filter**: Filter records between a "From" and "To" date on any date column (with automatic date column detection).
- **Client-Side Pagination**: Configurable rows per page (10, 25, 50, 100), page indicator, and previous/next page navigation.
- **Intuitive Navigation**: Single "Back to Home" button in the sticky top header to return to the upload screen at any time.
- **Production-Ready & Clean**: 0 linter errors/warnings, fully responsive, and styled with Tailwind CSS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Bundler & Dev Server** | [Vite 8](https://vite.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **CSV Parser** | [PapaParse](https://www.papaparse.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Linter** | [Oxlint](https://oxc.rs/) |

---

## Project Structure

```text
ConstemAITask/
├── public/                 # Static assets
├── src/
│   ├── components/ui/      # Reusable UI primitives (Button)
│   ├── constants/          # App constants (page sizes, upload limits)
│   ├── features/
│   │   ├── table/          # Table, toolbar, header, body, pagination, empty state
│   │   └── upload/         # Drag-and-drop zone and file picker
│   ├── hooks/              # Custom hooks (useCsvParser, usePagination)
│   ├── pages/              # Main view (CsvExplorerPage)
│   ├── utils/              # CSV schema, pagination, and file size helpers
│   ├── App.jsx             # Root component
│   ├── index.css           # Tailwind CSS entrypoint
│   └── main.jsx            # Application mount point
├── test_data.csv           # Sample test dataset (1,000 rows)
├── vite.config.js          # Vite configuration with @ path alias
└── package.json            # Project dependencies and scripts
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### Installation

1. Clone or download the repository.
2. Install the dependencies:

```bash
npm install
```

### Running Locally

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Building for Production

Create an optimized production bundle in the `dist/` directory:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### Running the Linter

Verify code style and quality with Oxlint:

```bash
npm run lint
```

---

## How It Works

1. **Upload**: Drop a `.csv` file into the upload dropzone or click to select a file from your device.
2. **View Data**: Once parsed, the view switches to the data table, presenting the columns and rows with pagination.
3. **Filter**:
   - **Global Search**: Type in the search box to search across all records instantly.
   - **Select Boxes**: Use the dropdowns (`All Department`, `All City`, `All Status`, etc.) to filter by specific categorical values with 1 click.
   - **Date Range Filter**: Select "From" and "To" dates to view records within a specific timeframe.
   - Multiple filters work together simultaneously in real-time.
4. **Clear All**: Reset all search inputs, dropdowns, and date boundaries with the single-click **Clear All** button.
5. **Reset / Back**: Click the **← Back to Home** button in the header to return to the upload screen and load another dataset.
