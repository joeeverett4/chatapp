import { useState, useRef } from "react";
import { api } from "../../api";

export function ImportView({ isActive = true, user }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [onlyInstalled, setOnlyInstalled] = useState(true);
  const fileInputRef = useRef(null);

  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    console.log('CSV lines:', lines.length);
    console.log('First line (headers):', lines[0]);

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    console.log('Parsed headers:', headers);

    const rows = lines.slice(1).map((line, idx) => {
      const values = line.split(',').map(v => v.trim());
      const row = {};
      headers.forEach((header, i) => {
        row[header] = values[i] || '';
      });
      if (idx < 3) console.log(`Row ${idx}:`, row);
      return row;
    });

    console.log('Total rows parsed:', rows.length);
    return rows;
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);
    setResults(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = parseCSV(event.target.result);
        setPreview(parsed.slice(0, 5)); // Show first 5 rows
      } catch (err) {
        setError('Failed to parse CSV file');
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setError(null);
    setResults(null);

    try {
      const csvData = await file.text();
      console.log('Sending CSV to backend, length:', csvData.length);

      const response = await fetch('/import-shops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          csvData,
          onlyInstalled,
          userId: user?.id
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Import failed');
      }

      console.log('Import result:', result);
      setResults(result);
    } catch (err) {
      console.error('Import failed:', err);
      setError(err.message);
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview([]);
    setResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    layout: "single",

    fullContent: (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <s-page heading="Import Shops" inlineSize="small">
          <s-section>
            <s-stack gap="400">
              {/* Instructions */}
              <s-box padding="400" background="bg-surface-secondary" borderRadius="200">
                <s-stack gap="200">
                  <s-text fontWeight="semibold">CSV Format</s-text>
                  <s-text tone="subdued">
                    Your CSV should have columns: domain, name, shopid (optional), state (optional)
                  </s-text>
                  <s-box padding="200" background="bg-surface" borderRadius="100">
                    <code style={{ fontSize: '12px' }}>
                      domain,name,shopid,state<br/>
                      myshop.myshopify.com,My Shop,12345,INSTALLED
                    </code>
                  </s-box>
                </s-stack>
              </s-box>

              {/* File Upload */}
              <s-box padding="400" borderWidth="025" borderColor="border" borderRadius="200">
                <s-stack gap="300" align="center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  {!file ? (
                    <>
                      <s-icon name="upload" size="large" tone="subdued" />
                      <s-text tone="subdued">Select a CSV file to import</s-text>
                      <s-button onClick={() => fileInputRef.current?.click()}>
                        Choose File
                      </s-button>
                    </>
                  ) : (
                    <>
                      <s-icon name="file" size="large" />
                      <s-text fontWeight="semibold">{file.name}</s-text>
                      <s-button variant="tertiary" onClick={handleReset}>
                        Remove
                      </s-button>
                    </>
                  )}
                </s-stack>
              </s-box>

              {/* Options */}
              {file && (
                <s-checkbox
                  checked={onlyInstalled}
                  onChange={(e) => setOnlyInstalled(e.target.checked)}
                  label="Only import installed shops"
                />
              )}

              {/* Preview */}
              {preview.length > 0 && (
                <s-box>
                  <s-stack gap="200">
                    <s-text fontWeight="semibold">Preview (first 5 rows)</s-text>
                    <s-table>
                      <s-table-header-row>
                        <s-table-header>Domain</s-table-header>
                        <s-table-header>Name</s-table-header>
                        <s-table-header>Shop ID</s-table-header>
                        <s-table-header>State</s-table-header>
                      </s-table-header-row>
                      <s-table-body>
                        {preview.map((row, i) => (
                          <s-table-row key={i}>
                            <s-table-cell>
                              <s-text>{row.domain || row.shop_domain || '-'}</s-text>
                            </s-table-cell>
                            <s-table-cell>
                              <s-text>{row.name || row.shop_name || '-'}</s-text>
                            </s-table-cell>
                            <s-table-cell>
                              <s-text>{row.shopid || row.shop_id || '-'}</s-text>
                            </s-table-cell>
                            <s-table-cell>
                              <s-text>{row.state || 'INSTALLED'}</s-text>
                            </s-table-cell>
                          </s-table-row>
                        ))}
                      </s-table-body>
                    </s-table>
                  </s-stack>
                </s-box>
              )}

              {/* Error */}
              {error && (
                <s-banner tone="critical">
                  {error}
                </s-banner>
              )}

              {/* Results */}
              {results && (
                <s-banner tone={results.failed > 0 ? "warning" : "success"}>
                  <s-stack gap="200">
                    <s-text fontWeight="semibold">
                      Import Complete: {results.success} of {results.total} shops imported
                    </s-text>
                    {results.failed > 0 && (
                      <s-text tone="subdued">
                        {results.failed} failed
                      </s-text>
                    )}
                  </s-stack>
                </s-banner>
              )}

              {/* Import Button */}
              {file && !results && (
                <s-button
                  variant="primary"
                  onClick={handleImport}
                  disabled={importing}
                >
                  {importing ? 'Importing...' : 'Import Shops'}
                </s-button>
              )}

              {/* Import More */}
              {results && (
                <s-button onClick={handleReset}>
                  Import More
                </s-button>
              )}
            </s-stack>
          </s-section>
        </s-page>
      </div>
    ),

    badge: 0,
  };
}
