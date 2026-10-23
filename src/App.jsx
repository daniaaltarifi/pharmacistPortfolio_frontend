import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { About } from '@/components/about'
import { Accomplishments } from '@/components/accomplishments'
import { Awards } from '@/components/awards'
import { BackToTop } from '@/components/back-to-top'
import { BasicData } from '@/components/basic-data'
import { Contact } from '@/components/contact'
import { Education } from '@/components/education'
import { Events } from '@/components/events'
import { Experience } from '@/components/experience'
import { Hero } from '@/components/hero'
import { Memberships } from '@/components/memberships'
import { MotionProvider } from '@/components/motion-primitives'
import { Nav } from '@/components/nav'
import { News } from '@/components/news'
import { NewsDetail } from '@/components/news-detail'
import { Reports } from '@/components/reports'
import { SiteFooter } from '@/components/site-footer'
import { ReportDetail } from '@/components/report-detail'
import { Gallery } from '@/components/gallery'
import { Profile } from '@/components/profile'
import { Certifications } from '@/components/certifications'
import { TrainingsSkills } from '@/components/trainings-skills'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

function Home() {
  return (
    <>
      <Hero />
      <About />
    </>
  )
}

// Pages other than Home sit below the fixed 4rem header
function Page({ children }) {
  return <div className="pt-16">{children}</div>
}

export default function App() {
  return (
    <div className="theme-v2 min-h-screen font-body">
      <MotionProvider>
        <ScrollToTop />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Page><Experience /></Page>} />
            <Route path="/profile" element={<Page><Profile /></Page>} />
            <Route
              path="/news"
              element={
                <Page>
                  <News />
                  <Reports />
                </Page>
              }
            />
            <Route path="/news/:id" element={<Page><NewsDetail /></Page>} />
            <Route path="/reports" element={<Navigate to="/news#reports" replace />} />
            <Route path="/reports/:id" element={<Page><ReportDetail /></Page>} />
            <Route path="/memberships" element={<Page><Memberships /></Page>} />
            <Route path="/events" element={<Page><Events /></Page>} />
            <Route path="/accomplishments" element={<Page><Accomplishments /></Page>} />
            <Route path="/awards" element={<Page><Awards /></Page>} />
            <Route path="/skills" element={<Page><TrainingsSkills /></Page>} />
            <Route
              path="/overview"
              element={
                <Page>
                  <BasicData />
                  <Education />
                </Page>
              }
            />
            <Route path="/education" element={<Navigate to="/overview#education" replace />} />
            <Route path="/certifications" element={<Page><Certifications /></Page>} />
            <Route path="/gallery" element={<Page><Gallery /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <SiteFooter />
        <BackToTop />
      </MotionProvider>
    </div>
  )
}
