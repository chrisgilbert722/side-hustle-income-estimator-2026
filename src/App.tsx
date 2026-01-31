import { useState } from 'react';

interface HustleInput {
    hoursPerWeek: number;
    hustleType: string;
    hourlyRate: number;
    monthlyExpenses: number;
}

const HUSTLE_TIPS: string[] = [
    'Consistency is key — regular hours build reliable income',
    'Track all expenses to maximize your net earnings',
    'Consider taxes — set aside 25-30% for self-employment tax',
    'Diversify hustles to reduce income volatility'
];

const HUSTLE_TYPES = [
    { value: 'rideshare', label: 'Rideshare / Delivery', rateRange: '$15-30/hr' },
    { value: 'freelance', label: 'Freelance Services', rateRange: '$25-75/hr' },
    { value: 'tutoring', label: 'Tutoring / Teaching', rateRange: '$20-50/hr' },
    { value: 'taskbased', label: 'Task-Based (TaskRabbit, etc.)', rateRange: '$18-35/hr' },
    { value: 'creative', label: 'Creative Work (Design, Writing)', rateRange: '$30-80/hr' },
    { value: 'other', label: 'Other', rateRange: 'Varies' }
];

function App() {
    const [values, setValues] = useState<HustleInput>({ hoursPerWeek: 10, hustleType: 'rideshare', hourlyRate: 20, monthlyExpenses: 50 });
    const handleChange = (field: keyof HustleInput, value: string | number) => setValues(prev => ({ ...prev, [field]: value }));

    // Calculate income
    const weeksPerMonth = 4.33;
    const weeklyIncome = values.hoursPerWeek * values.hourlyRate;
    const monthlyGross = weeklyIncome * weeksPerMonth;
    const annualGross = monthlyGross * 12;
    const monthlyNet = monthlyGross - values.monthlyExpenses;
    const annualNet = monthlyNet * 12;

    const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    const selectedHustle = HUSTLE_TYPES.find(h => h.value === values.hustleType);

    return (
        <main style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <header style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>
                <h1 style={{ marginBottom: 'var(--space-2)' }}>Side Hustle Income Estimator (2026)</h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>Estimate your potential gig economy earnings</p>
            </header>

            <div className="card">
                <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                    <div>
                        <label htmlFor="hustleType">Type of Side Hustle</label>
                        <select id="hustleType" value={values.hustleType} onChange={(e) => handleChange('hustleType', e.target.value)}>
                            {HUSTLE_TYPES.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                        {selectedHustle && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                                Typical rate range: {selectedHustle.rateRange}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="hoursPerWeek">Hours Per Week</label>
                        <input id="hoursPerWeek" type="number" min="1" max="80" value={values.hoursPerWeek || ''} onChange={(e) => handleChange('hoursPerWeek', parseInt(e.target.value) || 0)} placeholder="10" />
                    </div>
                    <div>
                        <label htmlFor="hourlyRate">Hourly Rate ($)</label>
                        <input id="hourlyRate" type="number" min="1" max="500" value={values.hourlyRate || ''} onChange={(e) => handleChange('hourlyRate', parseInt(e.target.value) || 0)} placeholder="20" />
                    </div>
                    <div>
                        <label htmlFor="monthlyExpenses">Monthly Expenses ($)</label>
                        <input id="monthlyExpenses" type="number" min="0" max="10000" value={values.monthlyExpenses || ''} onChange={(e) => handleChange('monthlyExpenses', parseInt(e.target.value) || 0)} placeholder="50" />
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>Gas, supplies, platform fees, etc.</div>
                    </div>
                    <button className="btn-primary" type="button">Calculate Income</button>
                </div>
            </div>

            <div className="card results-panel">
                <div className="text-center">
                    <h2 className="result-label" style={{ marginBottom: 'var(--space-2)' }}>Estimated Monthly Income</h2>
                    <div className="result-hero">{fmt(monthlyGross)}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>Before expenses</div>
                </div>
                <hr className="result-divider" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', textAlign: 'center' }}>
                    <div>
                        <div className="result-label">Weekly</div>
                        <div className="result-value">{fmt(weeklyIncome)}</div>
                    </div>
                    <div style={{ borderLeft: '1px solid #BAE6FD', paddingLeft: 'var(--space-4)' }}>
                        <div className="result-label">Annual</div>
                        <div className="result-value">{fmt(annualGross)}</div>
                    </div>
                    <div style={{ borderLeft: '1px solid #BAE6FD', paddingLeft: 'var(--space-4)' }}>
                        <div className="result-label">Net/Month</div>
                        <div className="result-value" style={{ color: '#16A34A' }}>{fmt(monthlyNet)}</div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-4)' }}>Side Hustle Tips</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 'var(--space-3)' }}>
                    {HUSTLE_TIPS.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-primary)', flexShrink: 0 }} />{item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="ad-container"><span>Advertisement</span></div>

            <div className="card" style={{ padding: 0 }}>
                <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1rem' }}>Income Breakdown</h3>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Category</th>
                            <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Monthly</th>
                            <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'right', color: 'var(--color-text-secondary)' }}>Annual</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>Gross Income</td>
                            <td style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center', fontWeight: 600 }}>{fmt(monthlyGross)}</td>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'right', fontWeight: 500 }}>{fmt(annualGross)}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#F8FAFC' }}>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>Expenses</td>
                            <td style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center', fontWeight: 600, color: '#DC2626' }}>-{fmt(values.monthlyExpenses)}</td>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'right', fontWeight: 500, color: '#DC2626' }}>-{fmt(values.monthlyExpenses * 12)}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-primary)', fontWeight: 600 }}>Net Income</td>
                            <td style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center', fontWeight: 700, color: '#16A34A' }}>{fmt(monthlyNet)}</td>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'right', fontWeight: 700, color: '#16A34A' }}>{fmt(annualNet)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ maxWidth: 600, margin: '0 auto', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                <p>This calculator provides estimates for potential side hustle income based on hours worked and hourly rates. Actual earnings vary by location, demand, platform fees, and individual circumstances. These figures are estimates only and do not account for taxes, vehicle depreciation, or variable income fluctuations common in gig work. Consult a financial advisor for personalized guidance on managing self-employment income.</p>
            </div>

            <footer style={{ textAlign: 'center', padding: 'var(--space-8) var(--space-4)', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', marginTop: 'var(--space-8)' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-4)', fontSize: '0.875rem' }}>
                    <li>• Estimates only</li><li>• Not financial advice</li><li>• Free to use</li>
                </ul>
                <p style={{ marginTop: 'var(--space-4)', fontSize: '0.75rem' }}>&copy; 2026 Side Hustle Income Estimator</p>
            </footer>

            <div className="ad-container ad-sticky"><span>Advertisement</span></div>
        </main>
    );
}

export default App;
