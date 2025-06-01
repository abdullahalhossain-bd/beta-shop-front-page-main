import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Index from "./pages/Index";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
           <Route path="/" element={<Index />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
