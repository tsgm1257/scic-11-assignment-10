import Link from "next/link";

export default function ProductCard({ product }) {
  const short =
    product.description?.length > 80
      ? product.description.slice(0, 80) + "..."
      : product.description;
  const img =
    product.imageUrl ||
    `https://via.placeholder.com/600x400?text=${encodeURIComponent(
      product.name
    )}`;

  return (
    <div className="border rounded-lg overflow-hidden transition hover:shadow-md bg-white dark:bg-gray-900">
      <div className="relative aspect-[4/3] bg-gray-50 dark:bg-gray-900">
        <img
          src={img}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {product.category && (
          <span className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full border bg-white/80 dark:bg-gray-900/70 backdrop-blur">
            {product.category}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{short}</p>
        <p className="font-medium mt-2">${product.price}</p>
        <Link
          className="text-blue-600 underline mt-2 inline-block"
          href={`/products/${product._id}`}
        >
          Details
        </Link>
      </div>
    </div>
  );
}
