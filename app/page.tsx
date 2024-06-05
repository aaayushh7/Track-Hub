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
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>

      </section>
      <section className='trending-section'>
        <h2 className='section-text'>Trending</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16 text-gray-400'>
          {allProducts?.slice() // Create a shallow copy of the array to avoid mutating the original
            .reverse().map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </section>


      <footer className="bg-white rounded-lg shadow mt-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="" className="hover:underline"></a>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>

            <li>
              <a href="" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
      </footer>


    </>
  )
}

export default Home