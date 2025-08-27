import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormPage from './pages/FormPage'
import DashboardPage from './pages/DashBoardPage'
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./components/RequireAuth";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/form" element={<FormPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
