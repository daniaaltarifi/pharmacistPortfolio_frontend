export const competencyElements = [
  { number: '01', symbol: 'St', name: 'Strategic Leadership', detail: 'Board' },
  { number: '02', symbol: 'Rq', name: 'Regulatory & Quality', detail: 'GMP' },
  { number: '03', symbol: 'Cp', name: 'Clinical Pharmacy', detail: 'BCPS' },
  { number: '04', symbol: 'Hi', name: 'He' },
]

// Fallback copy, used only when the API is unreachable. Source of truth is the DB.
export const skillElements = [
  { symbol: 'Es', name: 'Executive Strategy' },
  { symbol: 'Ma', name: 'Mergers & Acquisitions' },
  { symbol: 'Ra', name: 'Regulatory Affairs' },
  { symbol: 'Gm', name: 'GMP / GDP Compliance' },
  { symbol: 'Pe', name: 'Pharmacoeconomics' },
  { symbol: 'Sc', name: 'Supply Chain Resilience' },
  { symbol: 'Cg', name: 'Clinical Governance' },
  { symbol: 'Pl', name: 'P&L Management' },
  { symbol: 'Dh', name: 'Digital Health' },
  { symbol: 'Ps', name: 'Public Speaking' },
  { symbol: 'Cm', name: 'Change Management' },
]


// Sample events participated in — replace with real ones (newest first is not required; the page sorts by date)
// Fallback copy, used only when the API is unreachable. Source of truth is the DB.
export const events = [
  {
    id: 'fip-congress-2026',
    eventDate: '2026-09-18',
    role: 'Keynote speaker',
    title: 'FIP World Congress — Industrial Section',
    summary:
    'Delivered the keynote on regulation as a growth engine, arguing that early engagement with authorities shortens time-to-patient across MENA.',
    location: 'Copenhagen, Denmark',
    imageUrl: '/images/v2/boardroom.png',
  },
  {
    id: 'women-in-pharma-forum',
    eventDate: '2026-06-09',
    role: 'Panelist',
    title: 'Women in Pharma Leadership Forum',
    summary: 'Joined a panel on building the next generation of pharmacist executives in the Middle East.',
    location: 'Abu Dhabi, UAE',
    imageUrl: '/images/v2/pharmacy-night.png',
  },
  {
    id: 'gmp-roundtable',
    eventDate: '2026-03-25',
    role: 'Moderator',
    title: 'Sterile Manufacturing GMP Roundtable',
    summary: 'Moderated a closed-door session with regional quality heads on inspection readiness and data integrity.',
    location: 'Riyadh, Saudi Arabia',
    imageUrl: '/images/v2/capsules.png',
  },
  {
    id: 'mena-reg-summit-2025',
    eventDate: '2025-11-12',
    role: 'Keynote speaker',
    title: 'MENA Regulatory Summit 2025',
    summary: 'Opening keynote on harmonising product registration timelines across GCC and Levant authorities.',
    location: 'Dubai, UAE',
    imageUrl: '/images/v2/molecule.png',
  },
  {
    id: 'just-guest-lecture',
    eventDate: '2025-04-15',
    role: 'Guest lecturer',
    title: 'Regulatory Affairs Beyond Registration',
    summary: 'Lectured 5th-year pharmacy students on lifecycle strategy, pricing and post-approval data.',
    location: 'Irbid, Jordan',
    imageUrl: '/images/v2/research.png',
  },
  {
    id: 'pricing-workshop',
    eventDate: '2024-10-02',
    role: 'Workshop lead',
    title: 'External Reference Pricing Workshop',
    summary: 'Led a hands-on workshop for market access teams on reference baskets and reimbursement strategy.',
    location: 'Amman, Jordan',
    imageUrl: '/images/v2/boardroom.png',
  },
]

// Sample honours — replace with real recognitions

// Fallback copy, used only when the API is unreachable. Source of truth is the DB.
export const newsItems = [
  {
    id: 'fip-congress-2026',
    category: { id: 'keynote', name: 'Keynote' },
    publishedAt: '2026-09-18',
    title: 'Keynote at the FIP World Congress: regulation as a growth engine',
    description:
      'Dr. Hassan argued that early, proactive engagement with regulators shortens time-to-patient and lowers the cost of compliance across MENA markets.',
    imageUrl: '/images/v2/boardroom.png',
  },
  {
    id: 'sterile-plant-milestone',
    category: { id: 'company', name: 'Company' },
    publishedAt: '2026-07-02',
    title: 'Sterile injectables plant passes its third consecutive GMP inspection',
    description: 'The facility now supplies 40% of the region’s oncology injectables with zero critical findings.',
    imageUrl: '/images/v2/capsules.png',
  },
  {
    id: 'just-course-cohort',
    category: { id: 'academia', name: 'Academia' },
    publishedAt: '2026-05-21',
    title: 'Regulatory Affairs course at JUST welcomes its largest cohort',
    description: 'Fifth-year pharmacy students begin the 3-credit-hour programme on eCTD, bioequivalence and lifecycle strategy.',
    imageUrl: '/images/v2/research.png',
  },
  {
    id: 'clinic-network',
    category: { id: 'patient-care', name: 'Patient Care' },
    publishedAt: '2026-03-10',
    title: 'Pharmacist-led clinics pass 2 million consultations a year',
    description: 'Chronic disease clinics across 140 branches continue to expand access to medication reviews.',
    imageUrl: '/images/v2/pharmacy-night.png',
  },
  {
    id: 'pricing-report',
    category: { id: 'insight', name: 'Insight' },
    publishedAt: '2026-01-28',
    title: 'New report maps external reference pricing across MENA',
    description: 'A regional pricing matrix shows how reference baskets shape launch sequencing and reimbursement.',
    imageUrl: '/images/v2/molecule.png',
  },
]
