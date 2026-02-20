# NiCE Cognigy Product Documentation

This repository provides comprehensive documentation for NiCE Cognigy products, hosted on [docs.cognigy.com](https://docs.cognigy.com/). It includes documentation for all NiCE Cognigy products, such as Cognigy.AI, Insights, Webchat, Voice Gateway, and Live Agent.

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

