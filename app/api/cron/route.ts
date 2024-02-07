import { NextResponse } from "next/server";
import { Request } from "express"; // Import Request type

import {
  getLowestPrice,
  getHighestPrice,
  getAveragePrice,
  getEmailNotifType,
} from "@/lib/utils";
import { connectToDB } from "@/lib/mongoose";
import Product from "@/lib/models/product.model";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";

export const maxDuration = 300; // Changed maxDuration to 300 seconds
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    await connectToDB(); // Ensure proper database connection

    const products = await Product.find({});

    if (products.length === 0) {
      throw new Error("No products fetched");
    }

    const updatedProducts = await Promise.all(
      products.map(async (currentProduct: any) => {
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) {
          console.error("Scraping failed for product:", currentProduct.url);
          return null;
        }

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        const updatedProduct = await Product.findOneAndUpdate(
          { url: scrapedProduct.url },
          {
            ...scrapedProduct,
            priceHistory: updatedPriceHistory,
            lowestPrice: getLowestPrice(updatedPriceHistory),
            highestPrice: getHighestPrice(updatedPriceHistory),
            averagePrice: getAveragePrice(updatedPriceHistory),
          },
          { new: true } // Return the updated document
        );

        const emailNotifType = getEmailNotifType(
          scrapedProduct,
          currentProduct
        );

        if (emailNotifType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };
          const emailContent = await generateEmailBody(
            productInfo,
            emailNotifType
          );
          const userEmails = updatedProduct.users.map((user: any) => user.email);
          await sendEmail(emailContent, userEmails);
        }

        return updatedProduct;
      })
    );

    return NextResponse.json({
      message: "Ok",
      data: updatedProducts.filter(Boolean), // Filter out null values
    });
  } catch (error: any) {
    console.error("Failed to get all products:", error.message);
    throw error; // Rethrow original error
  }
}
