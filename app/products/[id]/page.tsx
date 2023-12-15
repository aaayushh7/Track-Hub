import PriceInfoCard from "@/components/PriceInfoCard";
import { getProductById } from "@/lib/actions"
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { format } from "path";

type Props = {
  params: {id: string }
}
const ProductDetails = async ({ params: {id} }: Props) => {
  const product: Product = await getProductById(id);
  if(!product) redirect('/');

  return (
    <div className="product-container">
      <div className="flex gap-28 cl:flex-row flex-col">
        <div className="product-image">
          <Image 
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-gray-200 font-semibold">{product.title}</p>
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-gray-100 opacity-50"
              >
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image 
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                  />
                  <p className="text-base font-semibold text-[#D46F77]">
                    {product.reviewsCount}
                  </p>
              </div>
              <div className="p-2 bg-slate-400 rounded-10">
                <Image 
                src="/assets/icons/bookmark.svg"
                alt="bookmark"
                width={20}
                height={20}
                />
              </div>

              <div className="p-2 bg-slate-400 rounded-10">
                <Image 
                src="/assets/icons/share.svg"
                alt="bookmark"
                width={20}
                height={20}
                />
              </div>
            </div>
          </div>

          <div  className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-gray-100 font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-[21px] text-gray-200 opacity-50 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || '20+'}
                  </p>
                </div>
                <div className="product-reviews">
                  <Image 
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm font-semibold">
                    {product.reviewsCount}+ Reviews
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-100 opacity-70">
                <span className="text-primary-green font-semibold">93% </span> of buyers have recommended this,
              </p>
            </div>
          </div>

          <div className="my-7 flex  flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(product.currentPrice)}`}
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(product.averagePrice)}`}
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(product.highestPrice)}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails