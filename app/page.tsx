import Image from 'next/image'
import Searchbar from '@/components/searchbar'
import HeroCarousel from '@/components/HeroCarousel'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">Smart Shopping Starts Here
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              ></Image>
            </p>
            <h1 className='head-text'>
              Unleash the power of
              <span className='text-primary'> TrackHub</span>
            </h1>
            <p className='mt-6 text-gray-100'>
              Track your favourite product just by a single click, Search → scroll to your product → Track → Register and done! Get notified when it reaches it's lowest price or comes back in stock!
            </p>
            <Searchbar/>
          </div>
          <HeroCarousel/>
        </div>

      </section>
      <section className='trending-section'>
        <h2 className='section-text'>Trending</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16 text-gray-400'>
          {allProducts?.slice() // Create a shallow copy of the array to avoid mutating the original
    .reverse().map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home