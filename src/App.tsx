import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { SearchResultsPage } from './pages/SearchResultsPage'
import { VetProfilePage } from './pages/VetProfilePage'
import { ClinicsPage } from './pages/ClinicsPage'
import { ClinicProfilePage } from './pages/ClinicProfilePage'
import { RegisterPage } from './pages/RegisterPage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { PlansPage } from './pages/PlansPage'
import { DashboardPage } from './pages/DashboardPage'
import { IssueCertificatePage } from './pages/IssueCertificatePage'
import { VerifyCertificatePage } from './pages/VerifyCertificatePage'
import { NotFoundPage } from './pages/NotFoundPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/buscar" element={<SearchResultsPage />} />
          <Route path="/veterinario/:id" element={<VetProfilePage />} />
          <Route path="/clinicas" element={<ClinicsPage />} />
          <Route path="/clinica/:id" element={<ClinicProfilePage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/como-funciona" element={<HowItWorksPage />} />
          <Route path="/planes" element={<PlansPage />} />
          <Route path="/panel" element={<DashboardPage />} />
          <Route path="/certificado" element={<IssueCertificatePage />} />
          <Route path="/verificar" element={<VerifyCertificatePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
