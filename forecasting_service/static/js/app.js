/* ═══════════════════════════════════════════════════════════════════════════
   app.js — Valu$ AI Demand Forecasting Dashboard
   Handles API calls, Chart.js rendering, and UI updates.
   ═══════════════════════════════════════════════════════════════════════════ */

// ── Constants ────────────────────────────────────────────────────────────────
const COLORS = {
    navy:        '#1B2A4A',
    orange:      '#E8651A',
    orangeLight: 'rgba(232,101,26,0.15)',
    blue:        '#3B82F6',
    blueLight:   'rgba(59,130,246,0.12)',
    green:       '#22C55E',
    greenLight:  'rgba(34,197,94,0.12)',
    red:         '#EF4444',
    redLight:    'rgba(239,68,68,0.12)',
    yellow:      '#F59E0B',
    grey:        '#9BA8BC',
    greyLight:   'rgba(155,168,188,0.15)',
    white:       '#FFFFFF',
};

const CHART_PALETTE = [
    '#E8651A', '#1B2A4A', '#3B82F6', '#22C55E',
    '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4',
];


// ── State ────────────────────────────────────────────────────────────────────
let demandChart = null;
let categoryChart = null;
let currentOutletId = 1;


// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    loadOutlets();
    loadProducts();
    loadSummary();
    initEmptyCharts();
});


function setCurrentDate() {
    const now = new Date();
    const opts = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-SG', opts);
}


// ── Outlets & Products Dropdowns ─────────────────────────────────────────────
async function loadOutlets() {
    try {
        const res = await fetch('/api/outlets');
        const outlets = await res.json();
        const select = document.getElementById('outletSelect');
        
        select.innerHTML = '';
        outlets.forEach(o => {
            const opt = document.createElement('option');
            opt.value = o.id;
            opt.textContent = o.name;
            select.appendChild(opt);
        });

        select.addEventListener('change', () => {
            currentOutletId = select.value;
            loadSummary();
        });
    } catch (e) {
        console.error('Failed to load outlets:', e);
    }
}

async function loadProducts() {
    try {
        const res = await fetch('/api/products');
        const products = await res.json();
        const select = document.getElementById('productSelect');

        products.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = `${p.name}  (${p.sku})`;
            select.appendChild(opt);
        });

        select.addEventListener('change', () => {
            refreshCharts(select.value || null);
        });
    } catch (e) {
        console.error('Failed to load products:', e);
    }
}


// ── Summary Cards ────────────────────────────────────────────────────────────
async function loadSummary() {
    try {
        const res = await fetch('/api/forecast/summary?outlet_id=' + currentOutletId);
        const data = await res.json();

        if (data.total_forecast_30d > 0) {
            document.getElementById('totalForecast').textContent =
                Number(data.total_forecast_30d).toLocaleString() + ' units';
            document.getElementById('totalForecastSub').textContent =
                `Across ${data.total_products} products`;

            document.getElementById('riskItems').textContent = data.products_at_risk;
            document.getElementById('riskItemsSub').textContent =
                data.products_at_risk > 0 ? 'Need immediate restock' : 'All stock levels healthy';

            document.getElementById('modelStatus').textContent = 'Ready';
            document.getElementById('lastUpdated').textContent =
                `Last run: ${data.last_updated}`;

            // Load charts with real data
            refreshCharts(null);
            loadAlerts();
        }
    } catch (e) {
        console.log('No forecast data yet — waiting for generation.');
    }
}


// ── Charts ───────────────────────────────────────────────────────────────────
function initEmptyCharts() {
    const ctxDemand = document.getElementById('demandChart').getContext('2d');
    demandChart = new Chart(ctxDemand, {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: getDemandChartOptions(),
    });

    const ctxCategory = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(ctxCategory, {
        type: 'bar',
        data: { labels: [], datasets: [] },
        options: getCategoryChartOptions(),
    });
}


function getDemandChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 6,
                    font: { size: 11, family: 'Inter' },
                    color: '#6B7A94',
                    padding: 16,
                },
            },
            tooltip: {
                backgroundColor: '#1B2A4A',
                titleFont: { family: 'Inter', size: 12, weight: '600' },
                bodyFont: { family: 'Inter', size: 11 },
                cornerRadius: 8,
                padding: 12,
                displayColors: true,
                boxPadding: 4,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    font: { size: 10, family: 'Inter' },
                    color: '#9BA8BC',
                    maxTicksLimit: 12,
                },
            },
            y: {
                grid: { color: 'rgba(226,230,238,0.6)', drawBorder: false },
                ticks: {
                    font: { size: 10, family: 'Inter' },
                    color: '#9BA8BC',
                },
                beginAtZero: true,
            },
        },
    };
}


function getCategoryChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1B2A4A',
                titleFont: { family: 'Inter', size: 12, weight: '600' },
                bodyFont: { family: 'Inter', size: 11 },
                cornerRadius: 8,
                padding: 12,
                callbacks: {
                    label: ctx => ` ${Number(ctx.raw).toLocaleString()} units`,
                },
            },
        },
        scales: {
            x: {
                grid: { color: 'rgba(226,230,238,0.5)', drawBorder: false },
                ticks: {
                    font: { size: 10, family: 'Inter' },
                    color: '#9BA8BC',
                    callback: v => v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v,
                },
                beginAtZero: true,
            },
            y: {
                grid: { display: false },
                ticks: {
                    font: { size: 11, family: 'Inter', weight: '500' },
                    color: '#1B2A4A',
                },
            },
        },
    };
}


async function refreshCharts(productId) {
    try {
        // Historical data
        let histUrl = '/api/historical?days=60&outlet_id=' + currentOutletId;
        if (productId) histUrl += `&product_id=${productId}`;
        const histRes = await fetch(histUrl);
        const histData = await histRes.json();

        // Forecast data
        let forecastUrl = '/api/forecast/results?outlet_id=' + currentOutletId;
        if (productId) forecastUrl += `&product_id=${productId}`;
        const forecastRes = await fetch(forecastUrl);
        let forecastData = await forecastRes.json();

        if (forecastData.length === 0) return;

        // For aggregated view, group by date
        if (!productId) {
            const grouped = {};
            forecastData.forEach(row => {
                if (!grouped[row.forecast_date]) {
                    grouped[row.forecast_date] = { predicted: 0, lower: 0, upper: 0 };
                }
                grouped[row.forecast_date].predicted += row.predicted_demand;
                grouped[row.forecast_date].lower += (row.confidence_lower || 0);
                grouped[row.forecast_date].upper += (row.confidence_upper || 0);
            });
            forecastData = Object.entries(grouped).sort().map(([date, vals]) => ({
                forecast_date: date,
                predicted_demand: vals.predicted,
                confidence_lower: vals.lower,
                confidence_upper: vals.upper,
            }));
        }

        // Build labels + data
        const histLabels = histData.map(d => d.date.slice(5)); // "MM-DD"
        const histValues = histData.map(d => d.total);

        const forecastLabels = forecastData.map(d => (d.forecast_date || d.date).slice(5));
        const forecastValues = forecastData.map(d => Math.round(d.predicted_demand));
        const forecastUpper = forecastData.map(d => Math.round(d.confidence_upper || d.predicted_demand * 1.15));
        const forecastLower = forecastData.map(d => Math.round(d.confidence_lower || d.predicted_demand * 0.85));

        const allLabels = [...histLabels, ...forecastLabels];

        // Pad historical to full length (NaN for forecast region)
        const histFull = [...histValues, ...forecastValues.map(() => null)];
        const forecastFull = [...histValues.map(() => null), ...forecastValues];
        const upperFull = [...histValues.map(() => null), ...forecastUpper];
        const lowerFull = [...histValues.map(() => null), ...forecastLower];

        demandChart.data = {
            labels: allLabels,
            datasets: [
                {
                    label: 'Historical Demand',
                    data: histFull,
                    borderColor: COLORS.navy,
                    backgroundColor: 'rgba(27,42,74,0.08)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.35,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                },
                {
                    label: 'Predicted Demand',
                    data: forecastFull,
                    borderColor: COLORS.orange,
                    backgroundColor: 'rgba(232,101,26,0.08)',
                    borderWidth: 2.5,
                    borderDash: [6, 3],
                    fill: false,
                    tension: 0.35,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                },
                {
                    label: 'Confidence (Upper)',
                    data: upperFull,
                    borderColor: 'transparent',
                    backgroundColor: 'rgba(232,101,26,0.08)',
                    borderWidth: 0,
                    fill: '+1',
                    tension: 0.35,
                    pointRadius: 0,
                },
                {
                    label: 'Confidence (Lower)',
                    data: lowerFull,
                    borderColor: 'transparent',
                    backgroundColor: 'rgba(232,101,26,0.08)',
                    borderWidth: 0,
                    fill: '-1',
                    tension: 0.35,
                    pointRadius: 0,
                },
            ],
        };
        demandChart.update();

        // Category chart
        const summaryRes = await fetch('/api/forecast/summary?outlet_id=' + currentOutletId);
        const summaryData = await summaryRes.json();
        if (summaryData.category_breakdown && summaryData.category_breakdown.length) {
            categoryChart.data = {
                labels: summaryData.category_breakdown.map(c => c.category),
                datasets: [{
                    data: summaryData.category_breakdown.map(c => c.total_demand),
                    backgroundColor: CHART_PALETTE.slice(0, summaryData.category_breakdown.length),
                    borderRadius: 4,
                    barThickness: 24,
                }],
            };
            categoryChart.update();
        }
    } catch (e) {
        console.error('Failed to refresh charts:', e);
    }
}


// ── Restock Alerts ───────────────────────────────────────────────────────────
async function loadAlerts() {
    try {
        const res = await fetch('/api/forecast/alerts?outlet_id=' + currentOutletId);
        const alerts = await res.json();
        const tbody = document.getElementById('alertsBody');
        const badge = document.getElementById('alertBadge');

        badge.textContent = `${alerts.length} items`;

        if (alerts.length === 0) {
            tbody.innerHTML = `<tr class="empty-row"><td colspan="6">All stock levels are healthy — no alerts</td></tr>`;
            return;
        }

        tbody.innerHTML = alerts.map(a => {
            const shortfall = Math.round(a.total_forecast_30d - a.current_stock);
            const stockClass = a.current_stock <= a.reorder_level ? 'stock-low' : 'stock-ok';
            const btnClass = shortfall > 500 ? 'btn-auto' : 'btn-draft';
            const btnLabel = shortfall > 500 ? 'Auto-Order' : 'Draft PO';

            return `
                <tr>
                    <td><strong>${a.name}</strong></td>
                    <td>${a.category}</td>
                    <td class="${stockClass}">${a.current_stock.toLocaleString()} units</td>
                    <td>${Math.round(a.total_forecast_30d).toLocaleString()} units</td>
                    <td class="shortfall-val">-${shortfall.toLocaleString()} units</td>
                    <td><button class="btn-action ${btnClass}">${btnLabel}</button></td>
                </tr>
            `;
        }).join('');
    } catch (e) {
        console.error('Failed to load alerts:', e);
    }
}


// ── Generate Forecast ────────────────────────────────────────────────────────
async function generateForecast() {
    const btn = document.getElementById('btnGenerate');
    const icon = document.getElementById('generateIcon');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const status = document.getElementById('generateStatus');

    // Disable button & show progress
    btn.disabled = true;
    btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        Running Forecast...
    `;
    icon.classList.add('spinning');
    progressBar.style.display = 'block';

    // Simulated progress during ML computation
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress = Math.min(progress + Math.random() * 8, 90);
        progressFill.style.width = progress + '%';
        const steps = [
            'Loading historical data...',
            'Engineering features (23 signals)...',
            'Training GradientBoosting models...',
            'Generating 30-day predictions...',
            'Computing confidence intervals...',
            'Analyzing restock requirements...',
        ];
        const stepIdx = Math.min(Math.floor(progress / 16), steps.length - 1);
        status.textContent = steps[stepIdx];
    }, 400);

    try {
        const res = await fetch('/api/forecast/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ outlet_id: parseInt(currentOutletId) }),
        });
        const data = await res.json();

        clearInterval(progressInterval);
        progressFill.style.width = '100%';

        if (data.status === 'success') {
            status.textContent = `✅ Forecast complete — ${data.products_forecasted} products analyzed`;

            // Refresh everything
            await loadSummary();
            await refreshCharts(document.getElementById('productSelect').value || null);
            await loadAlerts();

            // Update model status card
            document.getElementById('modelStatus').textContent = 'Ready';
            document.getElementById('lastUpdated').textContent =
                'Last run: ' + new Date().toLocaleString('en-SG');
        } else {
            status.textContent = '❌ Forecast failed — check server logs';
        }
    } catch (e) {
        clearInterval(progressInterval);
        status.textContent = '❌ Error: Could not reach the server';
        console.error(e);
    }

    // Reset button
    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Generate Forecast
        `;
        icon.classList.remove('spinning');
        progressBar.style.display = 'none';
        progressFill.style.width = '0%';
    }, 2000);
}
