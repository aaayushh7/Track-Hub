"use server"
import { scrapeAmazonProduct } from "../scraper";

export async function scrapAndStoreProduct(productUrl: string) {
    if(!productUrl) return;

    try {
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
    } catch (error: any) {
        throw new Error(`failed to create/update this product : ${error.message}`)
    }
}