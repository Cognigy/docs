import { useState, useRef, useEffect } from 'react'

export const ExpandableTable = ({ 
  headers = [], 
  rows = [], 
  initialRowsToShow,
  showMoreRowsText = "Show more",
  showLessRowsText = "Hide"
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [columnWidths, setColumnWidths] = useState([])
  const hiddenTableRef = useRef(null)
  const visibleTableRef = useRef(null)
  
  // If initialRowsToShow is not provided or is greater than/equal to total rows, show all rows
  const shouldLimitRows = initialRowsToShow !== undefined && initialRowsToShow < rows.length
  const hasMoreRows = shouldLimitRows

  // Calculate column widths from hidden table and apply to visible table
  useEffect(() => {
    if (hiddenTableRef.current && visibleTableRef.current && rows.length > 0) {
      const hiddenTable = hiddenTableRef.current
      const visibleTable = visibleTableRef.current
      const hiddenHeaders = hiddenTable.querySelectorAll('th')
      const visibleHeaders = visibleTable.querySelectorAll('th')
      
      const widths = Array.from(hiddenHeaders).map(th => th.offsetWidth)
      setColumnWidths(widths)
      
      // Apply widths to visible table headers
      visibleHeaders.forEach((th, index) => {
        if (widths[index]) {
          th.style.width = `${widths[index]}px`
          th.style.minWidth = `${widths[index]}px`
        }
      })
    }
  }, [rows.length, headers.length])

  const renderContent = (content) => {
    // If it's already a React element (has $$typeof property), return it as-is
    if (content && typeof content === 'object' && content.$$typeof) {
      return content
    }
    // If it's a string with HTML, render it
    if (typeof content === 'string' && content.includes('<')) {
      return <span dangerouslySetInnerHTML={{ __html: content }} />
    }
    // Otherwise, return the content directly
    return content
  }

  const renderCell = (cell) => renderContent(cell)

  return (
    <>
      {/* Hidden table with all rows to calculate column widths */}
      <div style={{ position: 'absolute', visibility: 'hidden', height: 0, overflow: 'hidden', width: '100%' }}>
        <table ref={hiddenTableRef} className="bg-card dark:bg-muted min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
          <thead className="dark:text-neutral-300">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-medium"
                  scope="col"
                  style={header.minWidth ? { minWidth: header.minWidth } : {}}
                >
                  {typeof header === 'object' && header.content !== undefined 
                    ? renderContent(header.content)
                    : renderContent(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-background dark:bg-card divide-y divide-neutral-200 dark:divide-neutral-700">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100"
                  >
                    {renderCell(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="overflow-x-auto rounded-md">
        <table ref={visibleTableRef} className="bg-card dark:bg-muted min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
          <thead className="dark:text-neutral-300">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-medium"
                  scope="col"
                  style={header.minWidth ? { minWidth: header.minWidth } : {}}
                >
                  {typeof header === 'object' && header.content !== undefined 
                    ? renderContent(header.content)
                    : renderContent(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-background dark:bg-card divide-y divide-neutral-200 dark:divide-neutral-700">
            {rows.map((row, rowIndex) => {
              const shouldShow = isExpanded || !shouldLimitRows || rowIndex < initialRowsToShow
              return (
                <tr 
                  key={rowIndex}
                  style={{ display: shouldShow ? 'table-row' : 'none' }}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100"
                    >
                      {renderCell(cell)}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
        {hasMoreRows && (
          <div className="flex justify-center" style={{ marginTop: '-0.5em', marginBottom: '1em' }}>
            <button
              className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-800 transition-colors hover:bg-neutral-300 dark:border-neutral-500 dark:text-neutral-200 dark:hover:bg-neutral-600"
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? showLessRowsText : showMoreRowsText}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
