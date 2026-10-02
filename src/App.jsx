import { useMemo, useState } from 'react';
import {
  IconActivity, IconArrowDown, IconArrowDownRight, IconArrowRight, IconArrowUpRight,
  IconBell, IconBuildingStore, IconCalendarEvent, IconCar, IconChartBar,
  IconCheck, IconChevronDown, IconChevronRight, IconClock, IconCreditCard,
  IconExternalLink, IconFilter, IconLayoutDashboard, IconListDetails,
  IconMail, IconMenu2, IconMessageCircle, IconPlus, IconSearch,
  IconSettings, IconSparkles, IconUsersGroup, IconWorldWww, IconX, IconDotsVertical,
} from '@tabler/icons-react';

const inventory = [
  { id: 'ST-2041', name: '2017 Chevrolet Silverado 1500 LT', price: 21900, mileage: '92k mi', photo: '/assets/vehicle-silverado.jpg', badge: 'Just in' },
  { id: 'ST-2038', name: '2019 Jeep Cherokee Limited', price: 16400, mileage: '88k mi', photo: '/assets/vehicle-cherokee.jpg', badge: 'Clean title' },
  { id: 'ST-2035', name: '2016 Toyota Camry XLE', price: 14900, mileage: '123k mi', photo: '/assets/vehicle-camry.jpg', badge: 'Great value' },
  { id: 'ST-2031', name: '2019 RAM 1500 Express', price: 24900, mileage: '81k mi', photo: '/assets/vehicle-ram.jpg', badge: '4×4' },
];

const initialLeads = [
  { id: 1, name: 'Maya Thompson', initials: 'MT', vehicle: '2017 Silverado 1500', source: 'Website', stage: 'New Inquiry', age: '8 min ago', value: 21900, tint: 'amber' },
  { id: 2, name: 'Ethan Brooks', initials: 'EB', vehicle: '2019 Jeep Cherokee', source: 'Phone', stage: 'Contacted', age: '42 min ago', value: 16400, tint: 'blue' },
  { id: 3, name: 'Sofia Rivera', initials: 'SR', vehicle: '2016 Toyota Camry', source: 'Website', stage: 'Appointment Set', age: '1 hr ago', value: 14900, tint: 'green' },
  { id: 4, name: 'Noah Bennett', initials: 'NB', vehicle: '2019 RAM 1500', source: 'Walk-in', stage: 'New Inquiry', age: '2 hrs ago', value: 24900, tint: 'violet' },
  { id: 5, name: 'Ava Mitchell', initials: 'AM', vehicle: 'Trade appraisal', source: 'Website', stage: 'Contacted', age: '3 hrs ago', value: 0, tint: 'rose' },
  { id: 6, name: 'Liam Foster', initials: 'LF', vehicle: '2017 Silverado 1500', source: 'Referral', stage: 'Sold', age: 'Yesterday', value: 20500, tint: 'blue' },
];

const tasksSeed = [
  { id: 1, time: '9:15 AM', title: 'Call Maya about the Silverado', meta: 'New website inquiry · 8 min ago', done: false },
  { id: 2, time: '10:30 AM', title: 'Confirm Sofia’s test drive', meta: '2016 Toyota Camry XLE', done: false },
  { id: 3, time: '11:00 AM', title: 'Review trade-in photos', meta: 'Ethan Brooks · 2014 Honda Accord', done: false },
  { id: 4, time: '1:45 PM', title: 'Delivery follow-up', meta: 'Liam Foster · sold yesterday', done: true },
];

const plans = [
  {
    name: 'Starter', price: '$99', label: 'The online showroom', accent: 'silver',
    copy: 'A polished home for your inventory and every new inquiry.',
    features: ['Dealer-branded website', 'Inventory listings & vehicle pages', 'Lead capture forms', 'Mobile-ready design'],
    icon: IconWorldWww,
  },
  {
    name: 'Growth', price: '$249', label: 'The sales floor', accent: 'gold', popular: true,
    copy: 'Everything in Starter, plus a sales desk that keeps the next move clear.',
    features: ['Everything in Starter', 'Lead pipeline & contact history', 'Daily agenda & follow-up queue', 'Inventory search & matchmaker'],
    icon: IconUsersGroup,
  },
  {
    name: 'Dealer Suite', price: '$499', label: 'The whole operation', accent: 'violet',
    copy: 'The complete toolkit for owners, managers, and growing teams.',
    features: ['Everything in Growth', 'Dealer admin & team roles', 'Sales and inventory insights', 'Deal review & store settings'],
    icon: IconChartBar,
  },
];

const stages = ['New Inquiry', 'Contacted', 'Appointment Set', 'Sold'];

function Brand({ compact = false }) {
  return <a className={`brand ${compact ? 'brand-compact' : ''}`} href="/" aria-label="Car Guy Portal home">
    <span className="brand-icon"><IconCar size={24} stroke={1.8} /></span>
    <span>CAR GUY <b>PORTAL</b></span>
  </a>;
}

function MarketingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <div className="header-inner">
      <Brand />
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <IconX /> : <IconMenu2 />}
      </button>
      <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        <a href="#platform" onClick={() => setMenuOpen(false)}>Platform</a>
        <a href="#packages" onClick={() => setMenuOpen(false)}>Packages</a>
        <a href="/demo">Live demo <span className="nav-dot" /></a>
        <a href="/portal" className="signin-link" onClick={() => setMenuOpen(false)}>Dealer portal <IconArrowUpRight size={15} /></a>
      </nav>
    </div>
  </header>;
}

function BrowserDots() {
  return <span className="browser-dots" aria-hidden="true"><i /><i /><i /></span>;
}

function VehiclePreview({ car, compact = false }) {
  return <article className={`vehicle-preview ${compact ? 'vehicle-preview-compact' : ''}`}>
    <img src={car.photo} alt="" />
    <div className="vehicle-preview-info">
      <span>{car.badge}</span>
      <b>{car.name}</b>
      <small>{car.mileage} · {car.id}</small>
      <strong>${car.price.toLocaleString()}</strong>
    </div>
  </article>;
}

function ProductStack() {
  return <div className="product-stack" aria-label="Preview of the dealership website and sales dashboard">
    <div className="showroom-window">
      <div className="window-bar"><BrowserDots /><span>summitmotors.demo</span><IconExternalLink size={14} /></div>
      <div className="showroom-topline"><Brand compact /><div><span>Inventory</span><span>Financing</span><span>About</span></div><button>Browse vehicles <IconArrowRight size={13} /></button></div>
      <div className="showroom-content">
        <p className="mini-kicker">SUMMIT MOTOR CO. · GREAT FALLS, MT</p>
        <h2>Good cars.<br />Good people.</h2>
        <p>Find your next truck, SUV, or everyday driver.</p>
        <div className="vehicle-preview-row">{inventory.slice(0, 3).map((car) => <VehiclePreview key={car.id} car={car} compact />)}</div>
      </div>
    </div>
    <div className="desk-window">
      <div className="desk-top"><span className="desk-mark"><IconLayoutDashboard size={16} /> Desk overview</span><span className="demo-pill"><i /> Sample workspace</span><button aria-label="Dashboard options"><IconDotsVertical size={14} /></button></div>
      <div className="desk-mini-stats">
        <div><span>Open leads</span><b>24</b><small><IconArrowUpRight size={12} /> 12% this month</small></div>
        <div><span>Appointments</span><b>08</b><small>Today</small></div>
        <div><span>In inventory</span><b>48</b><small>3 aging alerts</small></div>
      </div>
      <div className="desk-mini-list"><span>Recent leads</span><b>Maya Thompson <i>New inquiry</i></b><b>Ethan Brooks <i className="contacted">Contacted</i></b><b>Sofia Rivera <i className="appt">Appointment set</i></b></div>
    </div>
    <div className="stack-sticker"><IconSparkles size={15} /> One connected lot</div>
  </div>;
}

function PricingCard({ plan }) {
  const PlanIcon = plan.icon;
  return <article className={`plan-card plan-${plan.accent} ${plan.popular ? 'plan-popular' : ''}`}>
    {plan.popular && <span className="popular-label">MOST POPULAR</span>}
    <div className="plan-heading">
      <span className="plan-icon"><PlanIcon size={22} stroke={1.8} /></span>
      <div><span className="plan-label">{plan.label}</span><h3>{plan.name}</h3></div>
    </div>
    <p className="plan-copy">{plan.copy}</p>
    <p className="plan-price"><strong>{plan.price}</strong><span>/ month</span></p>
    <p className="price-note">Sample pricing · adjust before launch</p>
    <a className={plan.popular ? 'button button-gold button-wide' : 'button button-outline button-wide'} href={`/demo?plan=${encodeURIComponent(plan.name.toLowerCase().replaceAll(' ', '-'))}`}>Explore this package <IconArrowRight size={16} /></a>
    <div className="plan-divider" />
    <p className="feature-caption">INCLUDED</p>
    <ul>{plan.features.map((feature) => <li key={feature}><IconCheck size={16} />{feature}</li>)}</ul>
  </article>;
}

function MarketingSite() {
  const [faqOpen, setFaqOpen] = useState(0);
  const faqs = [
    ['Do I need to use all three packages?', 'No. Start with the public dealership website, add the sales desk when you want a shared lead workflow, and move to Dealer Suite when your team needs owner-level controls and reporting.'],
    ['Can I try the portal before choosing?', 'Yes. The demo workspace is open to explore, with sample inventory, leads, tasks, and dealership analytics. No account or payment is needed for this portfolio demo.'],
    ['Are the displayed prices final?', 'No. They are example rates for this portfolio concept, not a live offer. Final pricing, limits, and billing would be set before a commercial launch.'],
  ];

  return <div className="marketing-page">
    <MarketingHeader />
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-photo" src="/assets/dealer-hero.png" alt="A pickup parked at an independent dealership at dusk" />
        <div className="hero-shade" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span /> DEALER SOFTWARE · BUILT FOR THE FLOOR</p>
            <h1 id="hero-title">Everything<br />behind the <em>sale.</em></h1>
            <p className="hero-lede">Your inventory, leads, and dealership operations — finally working together, from first click to signed deal.</p>
            <div className="hero-actions">
              <a href="/demo" className="button button-gold">Explore the demo <IconArrowRight size={17} /></a>
              <a href="#packages" className="button button-glass">See packages <IconChevronRight size={16} /></a>
            </div>
            <div className="hero-modules" aria-label="Three connected product modules">
              <span><IconWorldWww />Inventory website</span>
              <i />
              <span><IconUsersGroup />Sales desk</span>
              <i />
              <span><IconChartBar />Dealer portal</span>
            </div>
          </div>
          <ProductStack />
        </div>
        <a href="#platform" className="hero-scroll">SCROLL TO SEE THE WHOLE LOT <IconArrowDown size={14} /></a>
      </section>


      <section className="pricing-section section-wrap" id="packages">
        <div className="pricing-intro">
          <div><p className="eyebrow eyebrow-dark"><span /> PACKAGES THAT FIT YOUR DEALERSHIP</p><h2>One platform. Three ways to grow.</h2></div>
          <p>Every package builds on the one before it. Start with the showroom, bring your sales team in, then add the owner’s view when you’re ready.</p>
        </div>
        <div className="plan-grid">{plans.map((plan) => <PricingCard key={plan.name} plan={plan} />)}</div>
        <p className="pricing-disclaimer">Illustrative monthly pricing for this portfolio demo. Final feature limits and commercial rates are not yet configured.</p>
      </section>

      <section className="platform-section section-wrap" id="platform">
        <div className="section-heading">
          <p className="eyebrow eyebrow-dark"><span /> ONE LOT. ONE VIEW.</p>
          <h2>A better day at<br />the dealership.</h2>
          <p>Three tools, designed to feel like one. Start with your storefront, add the sales desk, and bring the whole operation into view.</p>
        </div>
        <div className="module-list">
          <article className="module-row">
            <div className="module-number">01 / SHOWROOM</div>
            <div className="module-icon"><IconWorldWww /></div>
            <div className="module-info"><h3>Your lot, open online.</h3><p>A sharp, mobile-ready dealership website with searchable inventory, vehicle pages, and a direct path to inquire.</p></div>
            <div className="module-note"><IconCar /><span>Website + inventory</span></div>
          </article>
          <article className="module-row">
            <div className="module-number">02 / SALES DESK</div>
            <div className="module-icon"><IconUsersGroup /></div>
            <div className="module-info"><h3>Every lead has a next step.</h3><p>Keep conversations, appointments, trade details, and follow-ups moving in one shared sales workflow.</p></div>
            <div className="module-note"><IconActivity /><span>Leads + daily work</span></div>
          </article>
          <article className="module-row">
            <div className="module-number">03 / DEALER PORTAL</div>
            <div className="module-icon"><IconChartBar /></div>
            <div className="module-info"><h3>The whole store in view.</h3><p>Give owners and managers a clear read on inventory, pending deals, team activity, and store performance.</p></div>
            <div className="module-note"><IconBuildingStore /><span>Admin + reporting</span></div>
          </article>
        </div>
      </section>

      <section className="demo-band">
        <div className="demo-band-inner">
          <div><p className="eyebrow"><span /> NO SALES PITCH REQUIRED</p><h2>Take the keys.<br /><em>Click around.</em></h2><p>Try the sales desk, browse sample inventory, or switch over to the dealer portal. It’s a demo workspace — no sign-in needed.</p><a href="/demo" className="button button-gold">Open the live demo <IconArrowRight size={17} /></a></div>
          <div className="demo-preview" aria-label="Sample dealer dashboard preview">
            <div className="demo-preview-head"><span><IconLayoutDashboard size={16} /> Sales Desk</span><span className="demo-pill"><i /> LIVE DEMO</span></div>
            <div className="demo-preview-numbers"><div><small>Open leads</small><b>24</b><span>↑ 12% this month</span></div><div><small>Appointments</small><b>08</b><span>Today’s schedule</span></div><div><small>Inventory</small><b>48</b><span>3 need attention</span></div></div>
            <div className="preview-task"><span className="task-check"><IconCheck size={14} /></span><span><b>Follow up with Maya</b><small>2017 Silverado · Website lead</small></span><span className="task-time">9:15 AM</span></div>
            <div className="preview-task"><span className="task-check task-check-open" /><span><b>Confirm test drive</b><small>Sofia Rivera · Camry XLE</small></span><span className="task-time">10:30 AM</span></div>
          </div>
        </div>
      </section>

      <section className="faq-section section-wrap" id="faq">
        <div className="faq-title"><p className="eyebrow eyebrow-dark"><span /> GOOD QUESTIONS</p><h2>Before you<br />take it for a spin.</h2></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <article className={`faq-item ${faqOpen === index ? 'faq-open' : ''}`} key={question}>
          <button aria-expanded={faqOpen === index} onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}><span>{question}</span><IconChevronDown size={18} /></button>
          {faqOpen === index && <p>{answer}</p>}
        </article>)}</div>
      </section>

      <section className="closing-cta">
        <div><p className="eyebrow"><span /> YOUR NEXT DEAL STARTS HERE</p><h2>Bring the whole<br />lot together.</h2><p>Give the demo a spin. See how your dealership could run with the right tools in one place.</p><a href="/demo" className="button button-gold">Explore the demo <IconArrowRight size={17} /></a></div>
        <div className="closing-side"><span className="closing-icon"><IconCar size={34} /></span><b>Car Guy Portal</b><small>Built around the way independent dealers work.</small><a href="#packages">Compare the three packages <IconArrowUpRight size={15} /></a></div>
      </section>
    </main>
    <SiteFooter />
  </div>;
}

function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-top"><Brand /><p>Less juggling. More selling.</p><a className="footer-demo" href="/demo">Open the demo <IconArrowUpRight size={15} /></a></div>
    <div className="footer-bottom"><span>© 2026 Car Guy Portal · Portfolio concept</span><span>Sample dealership data · No live accounts or billing</span><a href="https://github.com/ohgeeceee" target="_blank" rel="noreferrer">Built by ohgeeceee <IconExternalLink size={13} /></a></div>
  </footer>;
}

function Metric({ label, value, note, icon: MetricIcon, tone = 'gold', trend = true }) {
  return <article className="metric-card">
    <div className={`metric-icon metric-${tone}`}><MetricIcon size={18} /></div>
    <span className="metric-label">{label}</span>
    <strong>{value}</strong>
    <small className={trend ? 'positive-note' : ''}>{trend && <IconArrowUpRight size={13} />}{note}</small>
  </article>;
}

function DashboardSidebar({ admin, active, onNavigate }) {
  const links = [
    { key: 'overview', label: 'Overview', icon: IconLayoutDashboard },
    { key: 'leads', label: 'Leads', icon: IconUsersGroup, count: '24' },
    { key: 'inventory', label: 'Inventory', icon: IconCar },
    { key: 'agenda', label: admin ? 'Pending deals' : 'Today’s agenda', icon: IconCalendarEvent, count: admin ? '3' : '4' },
    { key: 'followups', label: 'Follow-ups', icon: IconMessageCircle },
    ...(admin ? [{ key: 'reports', label: 'Reports', icon: IconChartBar }] : []),
  ];
  return <aside className="dash-sidebar">
    <Brand compact />
    <div className="store-switch"><span className="store-avatar">S</span><span><b>Summit Motor Co.</b><small>Sample dealership</small></span><IconChevronDown size={15} /></div>
    <p className="side-label">WORKSPACE</p>
    <nav>{links.map(({ key, label, icon: LinkIcon, count }) => <button key={key} className={active === key ? 'side-active' : ''} onClick={() => onNavigate(key)}><LinkIcon size={18} /><span>{label}</span>{count && <i>{count}</i>}</button>)}</nav>
    <div className="sidebar-bottom">
      <a href="/" className="side-back"><IconArrowDownRight size={16} /> Back to website</a>
      <button onClick={() => onNavigate('settings')}><IconSettings size={18} /><span>Settings</span></button>
      <div className="user-chip"><span className="user-avatar">JD</span><span><b>Jordan Davis</b><small>{admin ? 'Store owner' : 'Sales manager'}</small></span><IconDotsIcon /></div>
    </div>
  </aside>;
}

function IconDotsIcon() { return <IconDotsVertical size={15} aria-hidden="true" />; }

function DashboardTopbar({ admin, setAdmin, onOpenLead, notice, setNotice }) {
  return <div className="dash-topbar">
    <div className="breadcrumb"><span>Summit Motor Co.</span><IconChevronRight size={14} /><b>{admin ? 'Dealer Portal' : 'Sales Desk'}</b><span className="sample-badge">SAMPLE DATA</span></div>
    <div className="dash-top-actions">
      <div className="mode-switch" aria-label="Switch demo workspace"><button className={!admin ? 'mode-selected' : ''} onClick={() => setAdmin(false)}>Sales Desk</button><button className={admin ? 'mode-selected' : ''} onClick={() => setAdmin(true)}>Dealer Portal</button></div>
      <button className="icon-button" aria-label="Search" onClick={() => document.querySelector('.global-search input')?.focus()}><IconSearch size={18} /></button>
      <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setNotice(!notice)}><IconBell size={18} /><i /></button>
      <span className="top-avatar">JD</span>
      {notice && <div className="notification-popover"><b>You’re all caught up</b><span>No new alerts in this sample workspace.</span></div>}
      <button className="mobile-back" onClick={() => { window.location.href = '/'; }} aria-label="Back to marketing website"><IconWorldWww size={18} /></button>
      <button className="new-lead-top" onClick={onOpenLead}><IconPlus size={16} /> New lead</button>
    </div>
  </div>;
}

function AdminOverview() {
  const aging = [
    { label: '0–30 days', value: 18, color: 'age-green' },
    { label: '31–60 days', value: 14, color: 'age-gold' },
    { label: '61–90 days', value: 9, color: 'age-orange' },
    { label: '90+ days', value: 7, color: 'age-red' },
  ];
  const sales = [
    { initials: 'JD', name: 'Jordan Davis', units: 12, gross: '$28,400' },
    { initials: 'KM', name: 'Kai Morgan', units: 9, gross: '$22,150' },
    { initials: 'AP', name: 'Avery Parker', units: 7, gross: '$18,920' },
  ];
  return <>
    <div className="dashboard-heading"><div><p className="eyebrow eyebrow-dark"><span /> OWNER VIEW</p><h1>Good morning, Jordan.</h1><p>Here’s the pulse of Summit Motor Co.</p></div><button className="date-range"><IconCalendarEvent size={16} /> This month <IconChevronDown size={14} /></button></div>
    <div className="metrics-grid">
      <Metric label="Store gross" value="$68,420" note="12.4% vs last month" icon={IconCreditCard} />
      <Metric label="Vehicles sold" value="28" note="6 ahead of last month" icon={IconCar} tone="blue" />
      <Metric label="Active leads" value="24" note="8 need a next step" icon={IconUsersGroup} tone="violet" trend={false} />
      <Metric label="In inventory" value="48" note="3 units aging 90+ days" icon={IconBuildingStore} tone="green" trend={false} />
    </div>
    <div className="admin-panels">
      <section className="dashboard-panel inventory-pulse">
        <div className="panel-heading"><div><h2>Inventory pulse</h2><p>48 vehicles on the lot</p></div><button className="subtle-link">View inventory <IconArrowUpRight size={14} /></button></div>
        <div className="aging-list">{aging.map((item) => <div className="aging-row" key={item.label}><span>{item.label}</span><div className="aging-track"><i className={item.color} style={{ width: `${item.value / 48 * 100}%` }} /></div><b>{item.value}</b></div>)}</div>
        <div className="panel-alert"><IconClock size={16} /><span><b>3 vehicles need a look.</b> Two have been on the lot for over 90 days.</span><IconChevronRight size={16} /></div>
      </section>
      <section className="dashboard-panel pending-panel">
        <div className="panel-heading"><div><h2>Pending desk deals</h2><p>Waiting for a manager</p></div><span className="pending-count">03 TO REVIEW</span></div>
        {[
          ['MT', 'Maya Thompson', '2017 Silverado 1500', '$20,500', 'Trade review'],
          ['EB', 'Ethan Brooks', '2019 Jeep Cherokee', '$15,900', 'Price approval'],
          ['SR', 'Sofia Rivera', '2016 Toyota Camry', '$14,200', 'Desk deal'],
        ].map(([initials, name, vehicle, price, status]) => <div className="pending-deal" key={name}><span className="lead-avatar avatar-amber">{initials}</span><span className="pending-name"><b>{name}</b><small>{vehicle}</small></span><span className="pending-status">{status}</span><b className="pending-price">{price}</b><button aria-label={`Review ${name}'s deal`}><IconChevronRight size={16} /></button></div>)}
        <button className="panel-footer-link">Review all desk deals <IconArrowRight size={15} /></button>
      </section>
      <section className="dashboard-panel leaderboard-panel">
        <div className="panel-heading"><div><h2>Sales leaderboard</h2><p>Month to date</p></div><button className="subtle-link">Full report <IconArrowUpRight size={14} /></button></div>
        {sales.map((person, index) => <div className="leader-row" key={person.name}><span className={`rank rank-${index + 1}`}>{String(index + 1).padStart(2, '0')}</span><span className="lead-avatar">{person.initials}</span><b>{person.name}</b><span>{person.units} sold</span><strong>{person.gross}</strong></div>)}
      </section>
      <section className="dashboard-panel activity-panel">
        <div className="panel-heading"><div><h2>Store activity</h2><p>Across the whole team</p></div><button className="subtle-link">Activity log <IconArrowUpRight size={14} /></button></div>
        <div className="activity-row"><span className="activity-icon activity-lead"><IconUsersGroup size={15} /></span><span><b>New website lead</b><small>Maya Thompson · 2017 Silverado</small></span><time>8m</time></div>
        <div className="activity-row"><span className="activity-icon activity-deal"><IconCheck size={15} /></span><span><b>Deal marked ready for review</b><small>Ethan Brooks · 2019 Jeep Cherokee</small></span><time>32m</time></div>
        <div className="activity-row"><span className="activity-icon activity-stock"><IconCar size={15} /></span><span><b>Vehicle added to inventory</b><small>2020 Subaru Forester Premium</small></span><time>2h</time></div>
      </section>
    </div>
  </>;
}

function LeadCard({ lead, onStageChange }) {
  return <article className="lead-card">
    <div className="lead-card-head"><span className={`lead-avatar avatar-${lead.tint}`}>{lead.initials}</span><button className="dots-button" aria-label={`More options for ${lead.name}`}><IconDotsVertical size={15} /></button></div>
    <b className="lead-name">{lead.name}</b><span className="lead-vehicle">{lead.vehicle}</span>
    <div className="lead-card-meta"><span><IconWorldWww size={13} />{lead.source}</span><span><IconClock size={13} />{lead.age}</span></div>
    {lead.value > 0 && <div className="lead-card-bottom"><strong>${lead.value.toLocaleString()}</strong><select aria-label={`Update ${lead.name} stage`} value={lead.stage} onChange={(event) => onStageChange(lead.id, event.target.value)}><option>{lead.stage}</option>{stages.filter((stage) => stage !== lead.stage).map((stage) => <option key={stage}>{stage}</option>)}</select></div>}
  </article>;
}

function LeadsView({ leads, setLeads, openLead }) {
  const [layout, setLayout] = useState('board');
  const [filter, setFilter] = useState('All leads');
  const filtered = leads.filter((lead) => filter === 'All leads' || lead.stage === filter);
  const updateStage = (id, stage) => setLeads((current) => current.map((lead) => lead.id === id ? { ...lead, stage } : lead));
  return <>
    <div className="dashboard-heading"><div><p className="eyebrow eyebrow-dark"><span /> SALES DESK / LEADS</p><h1>Lead pipeline</h1><p>Keep every conversation moving to its next step.</p></div><button className="button button-dark" onClick={openLead}><IconPlus size={16} /> Add a lead</button></div>
    <div className="leads-toolbar"><div className="lead-filters"><button className={filter === 'All leads' ? 'filter-active' : ''} onClick={() => setFilter('All leads')}>All leads <span>{leads.length}</span></button>{['New Inquiry', 'Contacted', 'Appointment Set'].map((stage) => <button className={filter === stage ? 'filter-active' : ''} onClick={() => setFilter(stage)} key={stage}>{stage}</button>)}</div><div className="view-controls"><button className={layout === 'board' ? 'view-active' : ''} aria-label="Board view" onClick={() => setLayout('board')}><IconLayoutDashboard size={17} /></button><button className={layout === 'list' ? 'view-active' : ''} aria-label="List view" onClick={() => setLayout('list')}><IconListDetails size={17} /></button><button className="filter-button"><IconFilter size={16} /> Filter</button></div></div>
    {layout === 'board' ? <div className="kanban-board">{stages.map((stage) => <section className="kanban-column" key={stage}><div className="kanban-heading"><span><i className={`stage-dot stage-${stage.toLowerCase().replaceAll(' ', '-')}`} />{stage}</span><b>{filtered.filter((lead) => lead.stage === stage).length}</b></div>{filtered.filter((lead) => lead.stage === stage).map((lead) => <LeadCard key={lead.id} lead={lead} onStageChange={updateStage} />)}{stage === 'New Inquiry' && <button className="add-card-button" onClick={openLead}><IconPlus size={14} /> Add lead</button>}</section>)}</div> : <div className="leads-table-wrap"><table className="leads-table"><thead><tr><th>Customer</th><th>Vehicle interest</th><th>Source</th><th>Stage</th><th>Value</th><th>Last activity</th></tr></thead><tbody>{filtered.map((lead) => <tr key={lead.id}><td><span className={`lead-avatar avatar-${lead.tint}`}>{lead.initials}</span><b>{lead.name}</b></td><td>{lead.vehicle}</td><td>{lead.source}</td><td><select value={lead.stage} onChange={(event) => updateStage(lead.id, event.target.value)}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></td><td>{lead.value ? `$${lead.value.toLocaleString()}` : '—'}</td><td>{lead.age}</td></tr>)}</tbody></table></div>}
  </>;
}

function InventoryView({}) {
  const [query, setQuery] = useState('');
  const [condition, setCondition] = useState('All vehicles');
  const filtered = inventory.filter((car) => `${car.name} ${car.id}`.toLowerCase().includes(query.toLowerCase()) && (condition === 'All vehicles' || car.badge === condition));
  return <>
    <div className="dashboard-heading"><div><p className="eyebrow eyebrow-dark"><span /> SALES DESK / STOCK</p><h1>Inventory</h1><p>A working view of the vehicles on your lot.</p></div><button className="button button-dark"><IconPlus size={16} /> Add vehicle</button></div>
    <div className="inventory-toolbar"><label className="global-search inventory-search"><IconSearch size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search make, model, stock number…" /></label><select value={condition} onChange={(event) => setCondition(event.target.value)}><option>All vehicles</option>{['Just in', 'Clean title', 'Great value', '4×4'].map((badge) => <option key={badge}>{badge}</option>)}</select><button className="filter-button"><IconFilter size={16} /> More filters</button><span>{filtered.length} vehicles shown</span></div>
    <div className="inventory-grid">{filtered.map((car) => <article className="inventory-card" key={car.id}><div className="inventory-photo"><img src={car.photo} alt={`${car.name} sample vehicle`} /><span>{car.badge}</span><button aria-label={`More options for ${car.name}`}><IconDotsVertical size={15} /></button></div><div className="inventory-card-body"><small>{car.id} · USED</small><h3>{car.name}</h3><div><span>{car.mileage}</span><span>Automatic</span><span>Clean title</span></div><footer><b>${car.price.toLocaleString()}</b><button>View details <IconArrowUpRight size={14} /></button></footer></div></article>)}</div>
  </>;
}

function AgendaView({ tasks, setTasks, admin }) {
  return <>
    <div className="dashboard-heading"><div><p className="eyebrow eyebrow-dark"><span /> SALES DESK / TODAY</p><h1>{admin ? 'Pending desk deals' : 'Today’s agenda'}</h1><p>{admin ? 'Keep approvals and the deal desk moving.' : 'The next right thing, all in one place.'}</p></div><button className="date-range"><IconCalendarEvent size={16} /> Today <IconChevronDown size={14} /></button></div>
    <section className="dashboard-panel agenda-panel"><div className="panel-heading"><div><h2>{admin ? 'Awaiting review' : 'On your schedule'}</h2><p>{tasks.filter((task) => !task.done).length} items left · sample schedule</p></div><span className="pending-count">{tasks.filter((task) => !task.done).length} OPEN</span></div>
      {tasks.map((task) => <button key={task.id} className={`agenda-task ${task.done ? 'task-done' : ''}`} onClick={() => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))}><span className={`task-check ${task.done ? 'task-check-done' : ''}`}>{task.done && <IconCheck size={14} />}</span><time>{task.time}</time><span><b>{task.title}</b><small>{task.meta}</small></span><IconChevronRight className="task-chevron" size={16} /></button>)}
      <button className="add-task-button"><IconPlus size={15} /> Add a task</button>
    </section>
  </>;
}

function FollowupsView({ leads }) {
  return <>
    <div className="dashboard-heading"><div><p className="eyebrow eyebrow-dark"><span /> SALES DESK / FOLLOW-UPS</p><h1>Stay in the conversation.</h1><p>Every handoff and check-in has somewhere to land.</p></div><button className="button button-dark"><IconPlus size={16} /> New follow-up</button></div>
    <div className="followup-columns"><section className="dashboard-panel"><div className="panel-heading"><div><h2>Needs a next step</h2><p>Leads that are still waiting</p></div><span className="pending-count">4 TO DO</span></div>{leads.filter((lead) => lead.stage !== 'Sold').slice(0, 4).map((lead, index) => <article className="followup-row" key={lead.id}><span className={`followup-clock ${index === 0 ? 'followup-now' : ''}`}><IconClock size={16} /></span><span><b>{lead.name}</b><small>{lead.vehicle} · {lead.source}</small></span><button>{index === 0 ? 'Due now' : `${index + 1}h`}</button></article>)}</section><section className="followup-note"><IconMessageCircle size={20} /><h2>Good follow-up feels human.</h2><p>Keep the context with the lead: what they’re looking for, what they traded, and what you promised to do next.</p><div><IconCheck size={16} /> Notes stay with the customer</div><div><IconCheck size={16} /> Appointments stay on the agenda</div></section></div>
  </>;
}

function ReportsView() {
  return <>
    <div className="dashboard-heading"><div><p className="eyebrow eyebrow-dark"><span /> DEALER PORTAL / REPORTS</p><h1>See the whole store.</h1><p>Sample performance overview for Summit Motor Co.</p></div><button className="date-range"><IconCalendarEvent size={16} /> This month <IconChevronDown size={14} /></button></div>
    <AdminOverview />
  </>;
}

function NewLeadModal({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [source, setSource] = useState('Website');
  const submit = (event) => { event.preventDefault(); if (name.trim()) onSave({ name: name.trim(), vehicle: vehicle.trim() || 'Vehicle of interest', source }); };
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <form className="lead-modal" onSubmit={submit} aria-labelledby="modal-title"><div className="modal-heading"><div><p className="eyebrow eyebrow-dark"><span /> SALES DESK</p><h2 id="modal-title">New lead</h2></div><button type="button" className="icon-button" aria-label="Close" onClick={onClose}><IconX size={18} /></button></div><p className="modal-subtitle">Add someone to the sample sales pipeline.</p><label>Customer name<input autoFocus required value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Alex Morgan" /></label><label>Vehicle of interest<input value={vehicle} onChange={(event) => setVehicle(event.target.value)} placeholder="e.g. 2019 Jeep Cherokee" /></label><label>Lead source<select value={source} onChange={(event) => setSource(event.target.value)}><option>Website</option><option>Phone</option><option>Walk-in</option><option>Referral</option></select></label><div className="modal-actions"><button type="button" className="button button-quiet" onClick={onClose}>Cancel</button><button className="button button-gold" type="submit"><IconPlus size={16} /> Add to pipeline</button></div><p className="modal-note">This demo uses local sample data only. Nothing is sent or stored.</p></form>
  </div>;
}

function DemoWorkspace({ adminDefault = false }) {
  const [admin, setAdmin] = useState(adminDefault);
  const [active, setActive] = useState('overview');
  const [leads, setLeads] = useState(initialLeads);
  const [tasks, setTasks] = useState(tasksSeed);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState(false);

  const visibleLeads = useMemo(() => leads.filter((lead) => `${lead.name} ${lead.vehicle} ${lead.source}`.toLowerCase().includes(query.toLowerCase())), [leads, query]);
  const pageTitle = active === 'overview' ? (admin ? 'Dealer Portal' : 'Sales Desk') : active[0].toUpperCase() + active.slice(1);
  const saveLead = (newLead) => {
    const initials = newLead.name.split(/\s+/).map((word) => word[0]).join('').slice(0, 2).toUpperCase();
    setLeads((current) => [{ id: Math.max(...current.map((lead) => lead.id), 0) + 1, initials, stage: 'New Inquiry', age: 'just now', value: 0, tint: 'amber', ...newLead }, ...current]);
    setActive('leads'); setModalOpen(false);
  };

  return <div className="workspace-shell">
    <DashboardSidebar admin={admin} active={active} onNavigate={setActive} />
    <div className="workspace-main">
      <DashboardTopbar admin={admin} setAdmin={setAdmin} onOpenLead={() => setModalOpen(true)} notice={notice} setNotice={setNotice} />
      <main className="workspace-content">
        {active !== 'overview' && <div className="global-search-row"><label className="global-search"><IconSearch size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the workspace…" /></label><button className="help-link"><IconMail size={15} /> Help</button></div>}
        {active === 'overview' && admin && <AdminOverview />}
        {active === 'overview' && !admin && <>
          <div className="dashboard-heading"><div><p className="eyebrow eyebrow-dark"><span /> YOUR SALES FLOOR</p><h1>Let’s move the next one.</h1><p>Here’s where your day stands at Summit Motor Co.</p></div><button className="button button-dark" onClick={() => setModalOpen(true)}><IconPlus size={16} /> Add a lead</button></div>
          <div className="metrics-grid sales-metrics"><Metric label="Open leads" value="24" note="12% vs last month" icon={IconUsersGroup} /><Metric label="Appointments" value="08" note="On today’s agenda" icon={IconCalendarEvent} tone="blue" trend={false} /><Metric label="Test drives" value="05" note="3 still to confirm" icon={IconCar} tone="green" trend={false} /><Metric label="Follow-ups due" value="04" note="Don’t leave them hanging" icon={IconClock} tone="rose" trend={false} /></div>
          <div className="section-mini-head"><div><h2>Lead pipeline</h2><p>Every conversation, one next step at a time.</p></div><button onClick={() => setActive('leads')}>Open pipeline <IconArrowRight size={15} /></button></div>
          <div className="kanban-board kanban-preview">{stages.slice(0, 3).map((stage) => <section className="kanban-column" key={stage}><div className="kanban-heading"><span><i className={`stage-dot stage-${stage.toLowerCase().replaceAll(' ', '-')}`} />{stage}</span><b>{visibleLeads.filter((lead) => lead.stage === stage).length}</b></div>{visibleLeads.filter((lead) => lead.stage === stage).slice(0, 2).map((lead) => <LeadCard key={lead.id} lead={lead} onStageChange={(id, next) => setLeads((current) => current.map((item) => item.id === id ? { ...item, stage: next } : item))} />)}{stage === 'New Inquiry' && <button className="add-card-button" onClick={() => setModalOpen(true)}><IconPlus size={14} /> Add lead</button>}</section>)}</div>
          <section className="dashboard-panel agenda-inline"><div className="panel-heading"><div><h2>On the agenda</h2><p>Your next few moves</p></div><button className="subtle-link" onClick={() => setActive('agenda')}>See all <IconArrowUpRight size={14} /></button></div>{tasks.slice(0, 2).map((task) => <button className={`agenda-task ${task.done ? 'task-done' : ''}`} key={task.id} onClick={() => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))}><span className={`task-check ${task.done ? 'task-check-done' : ''}`}>{task.done && <IconCheck size={14} />}</span><time>{task.time}</time><span><b>{task.title}</b><small>{task.meta}</small></span><IconChevronRight size={16} /></button>)}</section>
        </>}
        {active === 'leads' && <LeadsView leads={visibleLeads} setLeads={setLeads} openLead={() => setModalOpen(true)} />}
        {active === 'inventory' && <InventoryView />}
        {active === 'agenda' && <AgendaView tasks={tasks} setTasks={setTasks} admin={admin} />}
        {active === 'followups' && <FollowupsView leads={visibleLeads} />}
        {active === 'reports' && <ReportsView />}
        {active === 'settings' && <section className="settings-view"><p className="eyebrow eyebrow-dark"><span /> WORKSPACE SETTINGS</p><h1>Make it yours.</h1><p>This is a preview of the dealer settings area. Account, team, and website controls are illustrative in this demo.</p><div className="settings-option"><span><IconBuildingStore /><b>Store profile</b></span><small>Summit Motor Co. · Great Falls, Montana</small><IconChevronRight /></div><div className="settings-option"><span><IconUsersGroup /><b>Team &amp; permissions</b></span><small>3 sample team members</small><IconChevronRight /></div><div className="settings-option"><span><IconWorldWww /><b>Dealer website</b></span><small>summitmotors.demo</small><IconChevronRight /></div></section>}
      </main>
      <footer className="workspace-footer"><span>Car Guy Portal · Interactive portfolio demo</span><span>Sample data only · No account, API, or billing connected</span></footer>
    </div>
    {modalOpen && <NewLeadModal onClose={() => setModalOpen(false)} onSave={saveLead} />}
  </div>;
}

export function App() {
  const path = window.location.pathname;
  if (path.startsWith('/demo')) return <DemoWorkspace />;
  if (path.startsWith('/portal')) return <DemoWorkspace adminDefault />;
  return <MarketingSite />;
}
