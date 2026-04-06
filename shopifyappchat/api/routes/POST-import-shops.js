export default async function route({ request, reply, api, logger }) {
  const { csvData, onlyInstalled = true, userId } = request.body;

  if (!csvData) {
    return reply.code(400).send({ error: "csvData is required" });
  }

  logger.info("Starting shop import", { onlyInstalled, userId });

  // Parse CSV
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

  logger.info("CSV headers", { headers, totalLines: lines.length });

  let rows = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row = {};
    headers.forEach((header, i) => {
      row[header] = values[i] || '';
    });
    return row;
  });

  // Helper to parse CSV-escaped JSON state
  const parseState = (rawState) => {
    let state = rawState || '';

    // Handle CSV-escaped JSON: "{""created"":""installed""}"
    if (state.startsWith('"') && state.endsWith('"')) {
      state = state.slice(1, -1).replace(/""/g, '"');
    }

    if (state.startsWith('{')) {
      try {
        const parsed = JSON.parse(state);
        state = parsed.created || parsed.status || '';
      } catch (e) {
        // Not valid JSON, use as-is
      }
    }

    return state.toUpperCase();
  };

  // Filter if onlyInstalled
  if (onlyInstalled) {
    rows = rows.filter(row => {
      const state = parseState(row.state);
      return state === 'INSTALLED' || state === '';
    });
  }

  logger.info("Rows to import after filter", { count: rows.length });

  let success = 0;
  let failed = 0;
  const errors = [];

  // Process in batches of 50
  const batchSize = 50;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);

    await Promise.all(batch.map(async (row) => {
      try {
        const state = parseState(row.state) || 'INSTALLED';

        await api.shop.create({
          domain: row.domain || row.shop_domain || row.url,
          name: row.name || row.shop_name || row.domain,
          shopId: row.shopid || row.shop_id ? Number(row.shopid || row.shop_id) : undefined,
          state: state,
          parentOrganization: { _link: "1" },
          user: userId ? { _link: userId } : undefined
        });
        success++;
      } catch (err) {
        failed++;
        errors.push(`${row.domain || 'Unknown'}: ${err.message}`);
        logger.warn("Failed to create shop", { domain: row.domain, error: err.message });
      }
    }));

    logger.info("Batch complete", { processed: i + batch.length, total: rows.length });
  }

  logger.info("Import complete", { success, failed });

  return reply.send({ success, failed, total: rows.length, errors: errors.slice(0, 10) });
}
