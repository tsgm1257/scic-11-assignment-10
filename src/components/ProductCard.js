import Link from "next/link";

export default function ProductCard({ product }) {
  const short = product.description?.length > 80
    ? product.description.slice(0, 80) + "..."
    : product.description;

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{short}</p>
      <p className="font-medium mt-2">${product.price}</p>
      <Link className="text-blue-600 underline mt-2 inline-block" href={`/products/${product._id}`}>
        Details
      </Link>
    </div>
  );
}
