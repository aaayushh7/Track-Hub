import { getProductById } from "@/lib/actions"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: {id: string }
}
const ProductDetails = async ({ params: {id} }: Props) => {
  const product = await getProductById(id);
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
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails