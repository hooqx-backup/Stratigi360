import { useState } from 'react'
import HeroNav from '../../components/ui/HeroNav/HeroNav'
import Button from '../../components/ui/Button/Button'
import heroBg from '../../assets/images/hero-bg.webp'
import './Calculator.css'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const BUSINESS_CATEGORIES = [
  'Events/Exhibition Organizers',
  'Accounting',
  'Advertising',
  'Agricultural',
  'Finance',
  'Logistics',
  'Investment',
  'Real Estate',
  'Brokerage',
  'Consultancy - IT',
  'Consultancy - HR',
  'Consultancy - Maritime',
  'Consultancy - Management',
  'Consultancy - Aviation',
  'Consultancy - Finance',
  'Consultancy - Logistics',
  'Consultancy - Media',
  'Design',
  'Lifestyle Coaching',
  'Production - Art/Video/Photography/Graphic Design',
  'General Trading',
  'Trading - Garments',
  'Trading - Furniture',
  'Trading - Building Materials',
  'Trading - Foodstuff',
  'Trading - Automobile',
  'Trading - Electronics',
  'Sports',
  'Customer Care Center',
  'Other - please specify',
]

const VISA_OPTIONS = [
  { id: 'v0', count: 0, label: '0',  cost: 0     },
  { id: 'v1', count: 1, label: '1',  cost: 4500  },
  { id: 'v2', count: 2, label: '2',  cost: 9000  },
  { id: 'v3', count: 3, label: '3',  cost: 12500 },
  { id: 'v4', count: 4, label: '4',  cost: 16500 },
  { id: 'v5', count: 5, label: '5',  cost: 20000 },
  { id: 'v6', count: 6, label: '6+', cost: 25000 },
]

const TURNOVER_OPTIONS = [
  { id: 't1', label: 'AED 20,000 – 100,000',       min: 20000,    max: 100000   },
  { id: 't2', label: 'AED 100,000 – 250,000',      min: 100000,   max: 250000   },
  { id: 't3', label: 'AED 250,000 – 500,000',      min: 250000,   max: 500000   },
  { id: 't4', label: 'AED 500,000 – 1,000,000',    min: 500000,   max: 1000000  },
  { id: 't5', label: 'AED 1,000,000 – 5,000,000',  min: 1000000,  max: 5000000  },
  { id: 't6', label: 'AED 5,000,000+',             min: 5000000,  max: null     },
]

const TIMELINE_OPTIONS = [
  { id: 'immediately', label: 'Immediately',  icon: 'fa-bolt',          desc: 'Ready to start right away' },
  { id: 'next-month',  label: 'Next Month',   icon: 'fa-calendar-days', desc: 'Planning for the near future' },
  { id: 'undecided',   label: 'Undecided',    icon: 'fa-circle-question',desc: 'Still exploring options' },
]

const COUNTRIES = [
  'United Arab Emirates','India','Pakistan','Saudi Arabia','Egypt','Jordan',
  'Lebanon','Syria','Iraq','Kuwait','Qatar','Bahrain','Oman','Turkey','Iran',
  'Bangladesh','Sri Lanka','Philippines','China','Russia','United Kingdom',
  'United States','Germany','France','Italy','Spain','Netherlands','Switzerland',
  'Canada','Australia','South Africa','Nigeria','Kenya','Singapore','Malaysia',
  'Indonesia','Thailand','Japan','South Korea','Brazil','Mexico','Other',
]

const STEPS = ['Business Category', 'Scale & Visas', 'Business Profile', 'Growth Outlook', 'Your Details']

// ─── COST ESTIMATE ────────────────────────────────────────────────────────────

function getBaseRange(category) {
  if (!category) return [10000, 20000]
  const c = category.toLowerCase()
  if (c.includes('trading'))                                              return [12000, 20000]
  if (c.includes('consultancy') || c.includes('accounting'))             return [8000,  15000]
  if (c.includes('finance') || c.includes('investment') ||
      c.includes('brokerage') || c.includes('real estate'))              return [15000, 28000]
  if (c.includes('advertising') || c.includes('design') ||
      c.includes('events') || c.includes('production'))                  return [10000, 18000]
  if (c.includes('logistics'))                                           return [12000, 20000]
  if (c.includes('sports') || c.includes('lifestyle'))                   return [10000, 16000]
  if (c.includes('agricultural'))                                        return [12000, 20000]
  if (c.includes('customer care'))                                       return [8000,  14000]
  return [10000, 20000]
}

function calcEstimate(sel) {
  const [baseMin, baseMax] = getBaseRange(sel.category)
  const extraActivities = Math.max(0, sel.activities - 3)
  const extraActCost    = extraActivities * 1000
  const visaOpt         = VISA_OPTIONS.find(v => v.id === sel.visas)
  const visaCost        = visaOpt?.cost ?? 0
  const regMin = 2500, regMax = 4000

  const items = [
    { label: 'Trade License (estimated)',            min: baseMin,           max: baseMax,           fixed: false },
    { label: 'Government Registration Fees',          min: regMin,            max: regMax,            fixed: false },
    { label: `Visa Package (${visaOpt?.count ?? 0} ${(visaOpt?.count ?? 0) === 1 ? 'visa' : 'visas'})`,
                                                      min: visaCost,          max: visaCost,          fixed: true  },
  ]
  if (extraActCost > 0) {
    items.push({ label: `Additional Activities (${extraActivities} × AED 1,000)`, min: extraActCost, max: extraActCost, fixed: true })
  }

  return {
    items,
    totalMin: baseMin + regMin + visaCost + extraActCost,
    totalMax: baseMax + regMax + visaCost + extraActCost,
    note: 'Office space costs vary by jurisdiction (AED 5,000 – 120,000/yr) and are not included above.',
  }
}

function fmt(n) {
  return 'AED\u00a0' + n.toLocaleString()
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const Calculator = () => {
  const [step, setStep] = useState(0)
  const [sel, setSel]   = useState({
    category:     '',
    activities:   3,
    shareholders: 1,
    visas:        null,
    businessPlan: null,   // 'yes' | 'no'
    inUAE:        null,   // 'yes' | 'no'
    turnover:     null,
    timeline:     null,
    name:         '',
    email:        '',
    phone:        '',
    country:      '',
  })
  const [errors, setErrors] = useState({})

  const pick = (key, val) => {
    setSel(prev => ({ ...prev, [key]: val }))
    setErrors(prev => ({ ...prev, [key]: '' }))
  }

  const adjustNum = (key, delta, min = 1, max = 10) =>
    setSel(prev => ({ ...prev, [key]: Math.min(max, Math.max(min, prev[key] + delta)) }))

  // ── Validation per step ────────────────────────────────────────────────────

  const validateStep = () => {
    const e = {}
    if (step === 0 && !sel.category)      e.category = 'Please select a business category.'
    if (step === 1 && !sel.visas)         e.visas = 'Please select the number of visas needed.'
    if (step === 2) {
      if (!sel.businessPlan) e.businessPlan = 'Please answer this question.'
      if (!sel.inUAE)        e.inUAE = 'Please answer this question.'
    }
    if (step === 3) {
      if (!sel.turnover)  e.turnover = 'Please select your forecasted turnover.'
      if (!sel.timeline)  e.timeline = 'Please select when you plan to start.'
    }
    if (step === 4) {
      if (!sel.name.trim())  e.name = 'Full name is required.'
      if (!sel.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sel.email)) e.email = 'A valid email address is required.'
      if (!sel.phone.trim()) e.phone = 'Phone number is required.'
      if (!sel.country)      e.country = 'Please select your country.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const goNext = () => {
    if (!validateStep()) return
    if (step === 4) { setStep(5); return }
    setStep(s => s + 1)
  }
  const goBack  = () => { setStep(s => s - 1); setErrors({}) }
  const restart = () => {
    setStep(0)
    setErrors({})
    setSel({ category: '', activities: 3, shareholders: 1, visas: null, businessPlan: null, inUAE: null, turnover: null, timeline: null, name: '', email: '', phone: '', country: '' })
  }


  return (
    <div className="calc-page">
      <HeroNav />

      {/* ── Hero ── */}
      <div className="calc-page__hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="calc-page__hero-overlay" />
        <div className="calc-page__hero-content">
          <p className="calc-page__hero-label">
            <i className="fa-solid fa-calculator" /> Stratigi360 Cost Calculator
          </p>
          <h1 className="calc-page__hero-heading">
            Estimate the Initial Investment for<br />Establishing a Business in Dubai
          </h1>
          <p className="calc-page__hero-sub">
            Answer a few quick questions and get a personalised cost estimate — plus a free expert consultation.
          </p>
          <div className="calc-hero-badges">
            <div className="calc-hero-badge">
              <i className="fa-solid fa-bolt" />
              <span>Instant Results</span>
            </div>
            <div className="calc-hero-badge">
              <i className="fa-solid fa-shield-halved" />
              <span>100% Confidential</span>
            </div>
            <div className="calc-hero-badge">
              <i className="fa-solid fa-star" />
              <span>Free Consultation</span>
            </div>
            <div className="calc-hero-badge">
              <i className="fa-solid fa-clock" />
              <span>24hr Response</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <section className="calc-page__body">
        <div className="container">
          {step < 5 ? (

            /* ────── WIZARD ────── */
            <div className="calc-wizard">

              {/* Stepper */}
              <div className="calc-stepper-wrap">
                <div className="calc-stepper-progress">
                  <div
                    className="calc-stepper-progress__fill"
                    style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
                  />
                </div>
                <div className="calc-stepper">
                  {STEPS.map((label, i) => (
                    <div
                      key={i}
                      className={`calc-stepper__item${i < step ? ' is-done' : ''}${i === step ? ' is-active' : ''}`}
                    >
                      <div className="calc-stepper__circle">
                        {i < step ? <i className="fa-solid fa-check" /> : <span>{i + 1}</span>}
                      </div>
                      <span className="calc-stepper__label">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="calc-stepper-meta">
                  <span className="calc-stepper-meta__step">Step {step + 1} of {STEPS.length}</span>
                  <span className="calc-stepper-meta__pct">{Math.round((step / STEPS.length) * 100)}% complete</span>
                </div>
              </div>

              {/* ── STEP 0: Business Category ── */}
              {step === 0 && (
                <div className="calc-step" key="step-0">
                  <div className="calc-step__header">
                    <div className="calc-step__header-icon"><i className="fa-solid fa-briefcase" /></div>
                    <div>
                      <h2 className="calc-step__title">What is your business category?</h2>
                      <p className="calc-step__sub">Select the category that best describes your primary business activity.</p>
                    </div>
                  </div>

                  <div className="calc-select-wrap">
                    <select
                      className={`calc-select${errors.category ? ' is-error' : ''}`}
                      value={sel.category}
                      onChange={e => pick('category', e.target.value)}
                    >
                      <option value="" disabled>— Select business category —</option>
                      {BUSINESS_CATEGORIES.map(item => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                    <i className="fa-solid fa-chevron-down calc-select__arrow" />
                  </div>
                  {errors.category && <p className="calc-error">{errors.category}</p>}

                  {sel.category && (
                    <div className="calc-selected-pill">
                      <i className="fa-solid fa-circle-check" /> {sel.category}
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP 1: Scale & Visas ── */}
              {step === 1 && (
                <div className="calc-step" key="step-1">
                  <div className="calc-step__header">
                    <div className="calc-step__header-icon"><i className="fa-solid fa-users" /></div>
                    <div>
                      <h2 className="calc-step__title">Your setup scale</h2>
                      <p className="calc-step__sub">Tell us about the size and visa needs for your new business.</p>
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="calc-counter-row">
                    <div className="calc-counter-info">
                      <div className="calc-counter-label">Number of Business Activities</div>
                      <div className="calc-counter-note">
                        <i className="fa-solid fa-circle-info" /> 3 activities included. Additional activities cost AED 1,000 each.
                      </div>
                    </div>
                    <div className="calc-counter">
                      <button type="button" className="calc-counter__btn" onClick={() => adjustNum('activities', -1, 1, 10)} disabled={sel.activities <= 1}>
                        <i className="fa-solid fa-minus" />
                      </button>
                      <span className="calc-counter__val">{sel.activities}</span>
                      <button type="button" className="calc-counter__btn" onClick={() => adjustNum('activities', 1, 1, 10)} disabled={sel.activities >= 10}>
                        <i className="fa-solid fa-plus" />
                      </button>
                    </div>
                  </div>

                  {/* Shareholders */}
                  <div className="calc-counter-row">
                    <div className="calc-counter-info">
                      <div className="calc-counter-label">Number of Shareholders</div>
                      <div className="calc-counter-note">
                        <i className="fa-solid fa-circle-info" /> HOW MANY SHAREHOLDERS WILL YOUR COMPANY HAVE?
                      </div>
                    </div>
                    <div className="calc-counter">
                      <button type="button" className="calc-counter__btn" onClick={() => adjustNum('shareholders', -1, 1, 10)} disabled={sel.shareholders <= 1}>
                        <i className="fa-solid fa-minus" />
                      </button>
                      <span className="calc-counter__val">{sel.shareholders}</span>
                      <button type="button" className="calc-counter__btn" onClick={() => adjustNum('shareholders', 1, 1, 10)} disabled={sel.shareholders >= 10}>
                        <i className="fa-solid fa-plus" />
                      </button>
                    </div>
                  </div>

                  {/* Visas */}
                  <div className="calc-field-group">
                    <label className="calc-field-label">
                      How many Visas will you need? <span className="calc-required">*</span>
                    </label>
                    <div className="calc-visa-grid">
                      {VISA_OPTIONS.map(v => (
                        <button
                          key={v.id}
                          type="button"
                          className={`calc-visa-btn${sel.visas === v.id ? ' is-selected' : ''}`}
                          onClick={() => pick('visas', v.id)}
                        >
                          <span className="calc-visa-btn__num">{v.label}</span>
                          {v.cost > 0
                            ? <span className="calc-visa-btn__cost">{fmt(v.cost)}</span>
                            : <span className="calc-visa-btn__cost calc-visa-btn__cost--free">Included</span>
                          }
                        </button>
                      ))}
                    </div>
                    {errors.visas && <p className="calc-error">{errors.visas}</p>}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Business Profile ── */}
              {step === 2 && (
                <div className="calc-step" key="step-2">
                  <div className="calc-step__header">
                    <div className="calc-step__header-icon"><i className="fa-solid fa-clipboard-list" /></div>
                    <div>
                      <h2 className="calc-step__title">Tell us about your situation</h2>
                      <p className="calc-step__sub">This helps us recommend the best setup pathway for you.</p>
                    </div>
                  </div>

                  {/* Business Plan */}
                  <div className="calc-field-group">
                    <label className="calc-field-label">
                      Do you have a business plan? <span className="calc-required">*</span>
                    </label>
                    <div className="calc-yesno">
                      {['yes', 'no'].map(val => (
                        <button
                          key={val}
                          type="button"
                          className={`calc-yesno__btn${sel.businessPlan === val ? ' is-selected' : ''}`}
                          onClick={() => pick('businessPlan', val)}
                        >
                          <i className={`fa-solid ${val === 'yes' ? 'fa-circle-check' : 'fa-circle-xmark'}`} />
                          {val === 'yes' ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                    {errors.businessPlan && <p className="calc-error">{errors.businessPlan}</p>}
                    {sel.businessPlan === 'no' && (
                      <p className="calc-tip">
                        <i className="fa-solid fa-lightbulb" /> No problem — our advisors can help you create a business plan as part of the setup process.
                      </p>
                    )}
                  </div>

                  {/* UAE Residency */}
                  <div className="calc-field-group">
                    <label className="calc-field-label">
                      Are you currently living in the UAE? <span className="calc-required">*</span>
                    </label>
                    <div className="calc-yesno">
                      {['yes', 'no'].map(val => (
                        <button
                          key={val}
                          type="button"
                          className={`calc-yesno__btn${sel.inUAE === val ? ' is-selected' : ''}`}
                          onClick={() => pick('inUAE', val)}
                        >
                          <i className={`fa-solid ${val === 'yes' ? 'fa-circle-check' : 'fa-circle-xmark'}`} />
                          {val === 'yes' ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                    {errors.inUAE && <p className="calc-error">{errors.inUAE}</p>}
                    {sel.inUAE === 'no' && (
                      <p className="calc-tip">
                        <i className="fa-solid fa-plane" /> We handle remote setups globally — you don't need to be in Dubai to get started.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── STEP 3: Growth Outlook ── */}
              {step === 3 && (
                <div className="calc-step" key="step-3">
                  <div className="calc-step__header">
                    <div className="calc-step__header-icon"><i className="fa-solid fa-chart-line" /></div>
                    <div>
                      <h2 className="calc-step__title">Your growth outlook</h2>
                      <p className="calc-step__sub">Helps us match you with the right jurisdiction and structure.</p>
                    </div>
                  </div>

                  {/* Turnover */}
                  <div className="calc-field-group">
                    <label className="calc-field-label">
                      YOUR CURRENT OR FORECASTED ANNUAL TURNOVER FOR YOUR BUSINESS IN THE NEXT 12 MONTHS. <span className="calc-required">*</span>
                    </label>
                    <div className="calc-cards calc-cards--3">
                      {TURNOVER_OPTIONS.map(t => (
                        <button
                          key={t.id}
                          type="button"
                          className={`calc-card calc-card--compact${sel.turnover === t.id ? ' is-selected' : ''}`}
                          onClick={() => pick('turnover', t.id)}
                        >
                          <div className="calc-card__check"><i className="fa-solid fa-circle-check" /></div>
                          <div className="calc-card__label">{t.label}</div>
                        </button>
                      ))}
                    </div>
                    {errors.turnover && <p className="calc-error">{errors.turnover}</p>}
                  </div>

                  {/* Timeline */}
                  <div className="calc-field-group">
                    <label className="calc-field-label">
                      When do you plan to start your business? <span className="calc-required">*</span>
                    </label>
                    <div className="calc-cards calc-cards--3">
                      {TIMELINE_OPTIONS.map(t => (
                        <button
                          key={t.id}
                          type="button"
                          className={`calc-card${sel.timeline === t.id ? ' is-selected' : ''}`}
                          onClick={() => pick('timeline', t.id)}
                        >
                          <div className="calc-card__check"><i className="fa-solid fa-circle-check" /></div>
                          <div className="calc-card__icon"><i className={`fa-solid ${t.icon}`} /></div>
                          <div className="calc-card__label">{t.label}</div>
                          <p className="calc-card__desc">{t.desc}</p>
                        </button>
                      ))}
                    </div>
                    {errors.timeline && <p className="calc-error">{errors.timeline}</p>}
                  </div>
                </div>
              )}

              {/* ── STEP 4: Contact Details ── */}
              {step === 4 && (
                <div className="calc-step" key="step-4">
                  <div className="calc-step__header">
                    <div className="calc-step__header-icon"><i className="fa-solid fa-user" /></div>
                    <div>
                      <h2 className="calc-step__title">Almost there — your details</h2>
                      <p className="calc-step__sub">We'll have a dedicated advisor reach out within 24 hours with your personalised cost breakdown.</p>
                    </div>
                  </div>

                  <div className="calc-form-grid">
                    <div className="calc-form-field">
                      <label className="calc-field-label">
                        Full Name <span className="calc-required">*</span>
                      </label>
                      <input
                        type="text"
                        className={`calc-input${errors.name ? ' is-error' : ''}`}
                        placeholder="e.g. Mohammed Al Rashid"
                        value={sel.name}
                        onChange={e => pick('name', e.target.value)}
                      />
                      {errors.name && <p className="calc-error">{errors.name}</p>}
                    </div>

                    <div className="calc-form-field">
                      <label className="calc-field-label">
                        Email Address <span className="calc-required">*</span>
                      </label>
                      <input
                        type="email"
                        className={`calc-input${errors.email ? ' is-error' : ''}`}
                        placeholder="your@email.com"
                        value={sel.email}
                        onChange={e => pick('email', e.target.value)}
                      />
                      {errors.email && <p className="calc-error">{errors.email}</p>}
                    </div>

                    <div className="calc-form-field">
                      <label className="calc-field-label">
                        Phone Number <span className="calc-required">*</span>
                      </label>
                      <input
                        type="tel"
                        className={`calc-input${errors.phone ? ' is-error' : ''}`}
                        placeholder="+971 50 123 4567"
                        value={sel.phone}
                        onChange={e => pick('phone', e.target.value)}
                      />
                      {errors.phone && <p className="calc-error">{errors.phone}</p>}
                    </div>

                    <div className="calc-form-field">
                      <label className="calc-field-label">
                        Country <span className="calc-required">*</span>
                      </label>
                      <div className="calc-select-wrap">
                        <select
                          className={`calc-select${errors.country ? ' is-error' : ''}`}
                          value={sel.country}
                          onChange={e => pick('country', e.target.value)}
                        >
                          <option value="" disabled>— Select country —</option>
                          {COUNTRIES.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <i className="fa-solid fa-chevron-down calc-select__arrow" />
                      </div>
                      {errors.country && <p className="calc-error">{errors.country}</p>}
                    </div>
                  </div>

                  <p className="calc-step__privacy">
                    <i className="fa-solid fa-lock" /> Your information is kept strictly confidential and will never be shared with third parties.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="calc-nav">
                {step > 0 && (
                  <Button variant="neutral" className="calc-nav__back" onClick={goBack}>
                    <i className="fa-solid fa-arrow-left" /> Back
                  </Button>
                )}
                <Button variant="primary" className="calc-nav__next" onClick={goNext}>
                  {step === 4 ? <><i className="fa-solid fa-paper-plane" /> Submit Request</> : <>Continue <i className="fa-solid fa-arrow-right" /></>}
                </Button>
              </div>
            </div>

          ) : (

            /* ────── THANK YOU / CONFIRMATION ────── */
            <div className="calc-results">

              <div className="calc-results__header">
                <i className="fa-solid fa-circle-check calc-results__check-icon" />
                <h2 className="calc-results__title">Request Submitted!</h2>
                <p className="calc-results__sub">
                  Thank you, <strong>{sel.name.split(' ')[0]}</strong>. Our team is now reviewing
                  your details and will calculate a personalised cost estimate for your{' '}
                  <strong>{sel.category}</strong> business setup.
                </p>
              </div>

              <div className="calc-results__confirm-body">

                {/* What happens next */}
                <div className="calc-results__steps-panel">
                  <h3 className="calc-results__breakdown-title">What happens next?</h3>

                  <div className="calc-results__next-steps">
                    <div className="calc-results__next-step">
                      <div className="calc-results__next-step-num">1</div>
                      <div>
                        <div className="calc-results__next-step-title">Our Team Reviews Your Details</div>
                        <p className="calc-results__next-step-desc">
                          A dedicated Stratigi360 business setup advisor will analyse the information
                          you've provided — your business category, scale, visa needs, and growth outlook.
                        </p>
                      </div>
                    </div>

                    <div className="calc-results__next-step">
                      <div className="calc-results__next-step-num">2</div>
                      <div>
                        <div className="calc-results__next-step-title">We Calculate Your Personalised Cost</div>
                        <p className="calc-results__next-step-desc">
                          We'll prepare a detailed, accurate cost breakdown tailored to your business —
                          covering license fees, registration, office space, visas, and all government charges.
                        </p>
                      </div>
                    </div>

                    <div className="calc-results__next-step">
                      <div className="calc-results__next-step-num">3</div>
                      <div>
                        <div className="calc-results__next-step-title">We Reach Out Within 24 Hours</div>
                        <p className="calc-results__next-step-desc">
                          Your advisor will contact you at <strong>{sel.email}</strong> and{' '}
                          <strong>{sel.phone}</strong> with your full cost estimate and a step-by-step
                          setup guide — completely free and with no obligation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button variant="neutral" className="calc-results__restart" onClick={restart}>
                    <i className="fa-solid fa-rotate-left" /> Submit Another Request
                  </Button>
                </div>

                {/* Side CTA */}
                <div className="calc-results__cta-card">
                  <div className="calc-results__cta-icon">
                    <i className="fa-solid fa-headset" />
                  </div>
                  <h3>Can't Wait?</h3>
                  <p>
                    Connect with our team right now via WhatsApp or book a free consultation call
                    — and we'll walk you through everything live.
                  </p>
                  <ul className="calc-results__cta-features">
                    <li><i className="fa-solid fa-check" /> Exact, transparent cost breakdown</li>
                    <li><i className="fa-solid fa-check" /> Best jurisdiction recommendation</li>
                    <li><i className="fa-solid fa-check" /> Fast-track processing available</li>
                    <li><i className="fa-solid fa-check" /> 100% free, no commitment</li>
                  </ul>
                  <a
                    href={`https://wa.me/971045095911?text=Hi%2C%20I%20just%20submitted%20a%20cost%20calculator%20request%20for%20a%20${encodeURIComponent(sel.category)}%20business%20setup.`}
                    className="calc-results__whatsapp-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp" /> Chat on WhatsApp Now
                  </a>
                  <Button variant="secondary" href="/contact" className="calc-results__cta-btn">
                    Book a Free Consultation
                  </Button>
                  <p className="calc-results__cta-note">
                    <i className="fa-solid fa-clock" /> Average response time: under 2 hours during business hours.
                  </p>
                </div>

              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Calculator
