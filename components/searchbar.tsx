"use client"
import { scrapAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"

const isValidAmazonProductURL = (url: string) => {
  try{
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    //check  if name contains amazon.something
    if(hostname.includes('amazon.com') || 
    hostname.includes('amazon.in') || 
    hostname.includes('amzn.eu') || 
    hostname.endsWith('amazon')
    ) {
      return true;
    }

  }catch(error){
    return false;
  }
  return false;
}

const searchbar = () => {
  const [searchPrompt, setsearchPrompt] = useState('')
  const [Loading, setLoading] = useState(false)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isValidLink = isValidAmazonProductURL(searchPrompt);
      if(!isValidLink) return alert("Please provide a valid Amazon full link.\n Shortened(i.e. amzn.eu) links doesn't work currently.")
      try {
        setLoading(true)

        //Scrap the product page here
        const product = await scrapAndStoreProduct(searchPrompt)

      } catch (error) {
        console.log(error)
        
      } finally {
        setLoading(false);
      }
      
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input type="text"
        value={searchPrompt}
        onChange={(e)=> setsearchPrompt(e.target.value)}
        placeholder="Enter the product link"
        className="searchbar-input"/>
        <button type="submit" className="searchbar-btn"
        disabled={searchPrompt === ''}
        > 
            {Loading?'Searching...' : 'search'}
        </button>

    </form>
  )
}

export default searchbar