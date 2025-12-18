import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivyProvider } from '@privy-io/react-auth'
import Home from './pages/Home'
import EarlyAccess from './pages/EarlyAccess'
import Roadmap from './pages/Roadmap'

function App() {
  return (
    <PrivyProvider
      appId="cmj7qvm7c015sji0cqb9bdnxx"
      config={{
        loginMethods: ['email'],
        appearance: {
          theme: 'dark',
          accentColor: '#6cf2c2',
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/earlyaccess" element={<EarlyAccess />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </BrowserRouter>
    </PrivyProvider>
  )
}

export default App
