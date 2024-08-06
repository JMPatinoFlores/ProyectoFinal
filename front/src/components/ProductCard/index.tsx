import Link from "next/link";
import Rating from '../rating';

interface Hotel {
  id: string; 
  name: string;
  country: string;
  city: string;
  rating:string;
  images: string[];
}

interface ProductCardProps {
  hotel: Hotel;
}

function ProductCard({ hotel }: ProductCardProps) {
  console.log(hotel)  
  return (
    <div className="w-full max-w-xs">
       <Link href={`/hotel-detail/${hotel.id}`} className="group block">
        <div className="overflow-hidden rounded-lg transition-shadow shadow-none group-hover:shadow-lg">
          <img
            src={hotel.images}
            alt="Hotel Image"
            width={300}
            height={300}
            className="w-full rounded aspect-square object-cover group-hover:scale-105 transition-transform"
          />
          <div className="p-2 md:p-4 flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium">{hotel.name}</div>
              {/* <div className="text-primary font-medium">${100}</div> */}
              <Rating rating={hotel.rating} />
            </div>
            <div className="flex items-center text-muted-foreground">
              <span>
                {hotel.city}, {hotel.country}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground">
              {/* <span>{5} km de distancia</span> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;