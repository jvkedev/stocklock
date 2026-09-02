import { useState } from "react";
import { usePlaceOrder } from "../features/orders/hooks/usePlaceOrder";
import { useProducts } from "../features/products/hooks/useProducts";

const ProductPage = () => {
  const { data: products, isLoading, error } = useProducts();
  const { mutate: placeOrder, isPending } = usePlaceOrder();
  const [buyingProductId, setBuyingProductId] = useState<string | null>(null);

  const handleBuy = (productId: string) => {
    setBuyingProductId(productId);

    placeOrder(
      {
        productId,
        quantity: 1,
      },
      {
        onSuccess: () => {
          setBuyingProductId(null);
        },

        onError: () => {
          setBuyingProductId(null);
        },
      },
    );
  };

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Failed to load products.</p>;
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-12 max-w-7xl mx-auto text-center text-zinc-400">
        <p className="text-lg font-medium">No products available.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isOutOfStock = product.stock <= 0;
          const isBuying = buyingProductId === product.id;

          return (
            <article
              key={product.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-colors shadow-lg"
            >
              <div>
                <h2 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                  {product.name}
                </h2>

                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-white">
                    ${Number(product.price).toFixed(2)}
                  </span>

                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      isOutOfStock
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}
                  >
                    {isOutOfStock
                      ? "Out of stock"
                      : `${product.stock} in stock`}
                  </span>
                </div>

                <button
                  onClick={() => handleBuy(product.id)}
                  disabled={isOutOfStock || (isPending && isBuying)}
                  className="w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors text-white bg-blue-600 hover:bg-blue-500 hover:cursor-pointer active:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed"
                >
                  {isBuying
                    ? "Buying..."
                    : isOutOfStock
                      ? "Unavailable"
                      : "Buy Now"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ProductPage;
