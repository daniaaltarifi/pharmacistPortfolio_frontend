// Navbar items. An item with `children` renders as a dropdown group.
export const routes = [
  { path: '/overview', label: 'Overview' },
  { path: '/profile', label: 'Profile' },
  { path: '/experience', label: 'Experience' },
  { path: '/news', label: 'News & Reports' },
  { path: '/events', label: 'Events' },
  {
    label: 'Achievements',
    children: [
      { path: '/accomplishments', label: 'Accomplishments' },
      { path: '/awards', label: 'Awards' },
      { path: '/memberships', label: 'Memberships' },
    ],
  },
  { path: '/skills', label: 'Skills' },
  { path: '/certifications', label: 'Certifications' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
]
