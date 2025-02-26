
import { Property } from "@/types";

interface PropertyPriceProps {
  price: Property["price"];
  className?: string;
}

export const PropertyPrice = ({ price, className = "" }: PropertyPriceProps) => {
  return (
    <p className={className}>
      <span className="font-semibold">${price}</span>
      <span className="text-gray-500"> night</span>
    </p>
  );
};
