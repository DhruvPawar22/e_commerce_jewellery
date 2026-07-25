import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
// import { ProductDetailPage } from './pages/ProductDetailPage'
// import { CartPage } from './pages/CartPage'
// import { AboutPage } from './pages/AboutPage'
// import { ContactPage } from './pages/ContactPage'
// import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          {/* <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
