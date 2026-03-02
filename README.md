# NiCE Cognigy Product Documentation

This repository provides comprehensive documentation for NiCE Cognigy products, hosted on [docs.cognigy.com](https://docs.cognigy.com/). It includes documentation for all NiCE Cognigy products, such as Cognigy.AI, Insights, Webchat, Voice Gateway, and Live Agent.

## Repository Structure

```
mintlify-docs/
├── docs.json                 # Mintlify configuration (theme, navigation, settings)
├── index.mdx                 # Landing page
├── package.json              # Node.js dependencies
│
├── ai/                       # Cognigy.AI documentation
│   ├── administer/           # Administration guides
│   ├── agents/               # Agent configuration
│   ├── escalate/             # Escalation workflows
│   ├── for-developers/       # Developer resources
│   ├── overview/             # Product overview
│   └── platform-features/    # Platform feature guides
│
├── agent-copilot/            # Agent Copilot documentation
│   ├── configure/
│   ├── deploy/
│   ├── getting-started/
│   └── installation/
│
├── insights/                 # Cognigy Insights documentation
│   ├── dashboards/
│   ├── data-management/
│   ├── explorers/
│   └── reports/
│
├── live-agent/               # Live Agent documentation
│   ├── assistants/
│   ├── conversation/
│   ├── getting-started/
│   ├── installation/
│   ├── reports/
│   ├── settings/
│   └── tools/
│
├── voice-gateway/            # Voice Gateway documentation
├── webchat/                  # Webchat documentation
├── xApps/                    # xApps documentation
├── ops-center/               # Ops Center documentation
├── pci-vault/                # PCI Vault documentation
├── api-reference/            # API reference documentation
├── help/                     # Help and support resources
├── release-notes/            # Release notes (versioned)
│
├── snippets/                 # Reusable MDX snippets & components
│   ├── expandable-table.jsx  # ExpandableTable component
│   ├── ai/                   # AI-specific snippets
│   ├── insights/             # Insights-specific snippets
│   ├── voice-gateway/        # Voice Gateway snippets
│   └── ...                   # Other product snippets
│
├── _assets/                  # Static assets (images, icons, SVGs)
│   ├── ai/                   # AI-related images
│   ├── insights/             # Insights-related images
│   ├── icons/                # Icon library
│   └── ...                   # Other product assets
│
├── styles/                   # Custom CSS styles
├── cognigy.css               # Main custom styles
├── cognigy.js                # Custom JavaScript
├── custom-cookie-banner.css  # Cookie banner styles
├── custom-cookie-banner.js   # Cookie banner scripts
├── custom-footer.js          # Custom footer scripts
│
├── _docs-cli/                # Documentation CLI tools
│   ├── cli.js                # CLI entry point
│   └── commands/             # CLI commands
│
├── .vale.ini                 # Vale linter configuration
├── .github/                  # GitHub Actions & workflows
└── CODEOWNERS                # Code ownership definitions
```

### Key Directories

| Directory | Description |
|-----------|-------------|
| `ai/` | Core Cognigy.AI platform documentation |
| `agent-copilot/` | Agent Copilot setup, configuration, and deployment guides |
| `insights/` | Analytics dashboards, reports, and data management |
| `live-agent/` | Human agent handover and live chat documentation |
| `voice-gateway/` | Voice and telephony integration guides |
| `webchat/` | Webchat widget customization and deployment |
| `xApps/` | Extensible applications documentation |
| `snippets/` | Reusable MDX components and content snippets |
| `_assets/` | Images, icons, and other static files |
| `release-notes/` | Version-specific release notes |

### Configuration Files

| File | Purpose |
|------|---------|
| `docs.json` | Mintlify configuration: theme, navigation, colors, fonts |
| `package.json` | Node.js dependencies for local development |
| `.vale.ini` | Prose linting rules for documentation quality |
| `CODEOWNERS` | Defines code review ownership |

## Custom Elements

### Components

#### ExpandableTable

The `ExpandableTable` component displays a table with an optional button to expand and collapse rows. The table initially shows a limited number of rows and can be expanded to show all rows.

**Import:**
```jsx
import { ExpandableTable } from '@snippets/expandable-table'
```

**Usage:**
```jsx
<ExpandableTable 
  headers={headers}
  rows={rows}
  initialRowsToShow={5}
  showMoreRowsText="Show more"
  showLessRowsText="Hide"
/>
```

**Parameters:**

- `headers` (array): Array of table header values. Each header can be:
  - A plain string: `"Column Name"`
  - An HTML string: `"<strong>Column</strong> Name"`
  - A React element: `<span>Column <Icon /></span>`
  - An object with `content` and optional `minWidth`:
    ```jsx
    {
      content: "Column Name", // or HTML string or React element
      minWidth: "200px" // optional, sets minimum width for the column
    }
    ```

- `rows` (array): Array of table rows. Each row is an array of cells. Each cell can be:
  - A plain string: `"Cell Value"`
  - An HTML string: `"<code>value</code>"`
  - A React element: `<span>Value <Icon /></span>`

- `initialRowsToShow` (number, optional): Number of rows to display initially. If not provided or if the value is greater than or equal to the total number of rows, all rows are displayed and the "show more" button is hidden.
- `showMoreRowsText` (string, default: `"Show more"`): Text displayed on the button when the table is collapsed.
- `showLessRowsText` (string, default: `"Hide"`): Text displayed on the button when the table is expanded.

**Example:**
```jsx
<ExpandableTable 
  headers={[
    { content: "Feature", minWidth: "150px" },
    "Status",
    "<strong>Version</strong>"
  ]}
  rows={[
    ["Feature A", "Available", "1.0"],
    ["Feature B", "<code>beta</code>", "2.0"],
    ["Feature C", "Available", "1.5"],
    ["Feature D", "Available", "2.1"],
    ["Feature E", "Available", "1.8"]
  ]}
  initialRowsToShow={3}
  showMoreRowsText="Show more features"
  showLessRowsText="Hide features"
/>
```

### CSS Classes

#### Sticky Table Classes

Two CSS classes are available for creating tables with sticky positioning:

**`.sticky-first-column`**

Makes the first column of a table sticky when scrolling horizontally. The first column remains visible while other columns scroll horizontally.

**Usage:**
```html
<div class="sticky-first-column">
  | Header 1 | Header 2 |
  |----------|----------|
  | Cell 1   | Cell 2   |
</div>
```

**`.sticky-header-column`**

Makes both the header row sticky (on vertical scroll) and the first column sticky (on horizontal scroll). The table is contained in a scrollable box with customizable maximum height.

**Usage:**
```html
<div class="sticky-header-column" style="--table-max-height: 400px;">
  | Header 1 | Header 2 |
  |----------|----------|
  | Cell 1   | Cell 2   |
</div>
```

**Customization:**

- For `.sticky-header-column`, you can customize the maximum height of the table container using the CSS variable `--table-max-height`. The default is `70vh`.
- Example: `style="--table-max-height: 500px;"` or `style="--table-max-height: 50vh;"`
