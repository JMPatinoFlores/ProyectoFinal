import Link from "next/link";

interface Hotel {
  name: string;
  price: number;
  country: string;
  city: string;
  distance: number;
  image: string;
}

interface ProductCardProps {
  hotel: Hotel;
}

function ProductCard({ hotel }: ProductCardProps) {
  return (
    <div className="w-full max-w-xs">
      <Link href="#" className="group block">
        <div className="overflow-hidden rounded-lg transition-shadow shadow-none group-hover:shadow-lg">
          <img
            src={hotel.image}
            alt="Hotel Image"
            width={300}
            height={300}
            className="w-full rounded aspect-square object-cover group-hover:scale-105 transition-transform"
          />
          <div className="p-2 md:p-4 flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium">{hotel.name}</div>
              <div className="text-primary font-medium">${hotel.price}</div>
            </div>
            <div className="flex items-center text-muted-foreground">
              <span>
                {hotel.city}, {hotel.country}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <span>{hotel.distance} km de distancia</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
