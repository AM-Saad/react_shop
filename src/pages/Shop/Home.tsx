// import Header from '../components/Layout/Header'
import Categories from '@/components/Shop/Category/Categories'
import FeaturedProducts from '@/components/Shop/FeaturedProducts/FeaturedProducts'
import MainProducts from '@/components/Shop/MainProducts/MainProducts'
const Shop = () => {
  return (
    <div className="min-h-full  mx-auto py-16 px-4  sm:px-6 lg:max-w-7xl lg:px-8">
      <Categories />
      <FeaturedProducts />
      <MainProducts />
    </div>
  )
}

export default Shop