import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Cart from './pages/Cart'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'


const App = () => {
  return (
    <div className='font-Archivo'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/categories/:categoryName' element={<ProductCategory/>} />
          <Route path='/products/:productId' element={<ProductDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App