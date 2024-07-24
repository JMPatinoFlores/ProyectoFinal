import Link from "next/link";

function ProductCard() {
  return (
    <div className="w-full max-w-xs">
      <Link href="#" className="group block">
        <div className="overflow-hidden rounded-lg transition-shadow shadow-none group-hover:shadow-lg">
          <img
            src="/hotel.jpg"
            alt="Hotel Image"
            width={300}
            height={300}
            className="w-full rounded aspect-square object-cover group-hover:scale-105 transition-transform"
          />
          <div className="p-2 md:p-4 flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium">Hotel Palacio</div>
              <div className="text-primary font-medium">$99.99 USD</div>
            </div>
            <div className="flex items-center text-muted-foreground">
              <span>Madrid, España</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <span>2.5 km del centro</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
