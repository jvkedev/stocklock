import { useState } from "react";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlaceOrder } from "../features/orders/hooks/usePlaceOrder";
import { useProducts } from "../features/products/hooks/useProducts";
import { useAuthStore } from "../features/auth/store/auth.store";
import { toast } from "sonner";
import { getApiErrorMessage } from "../shared/api/error";

const ProductPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { data: products, isLoading, error } = useProducts();
  const { mutate: placeOrder, isPending } = usePlaceOrder();
  const [buyingProductId, setBuyingProductId] = useState<string | null>(null);
  const isAdmin = user?.role === "admin";

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
          toast.success("Order placed successfully!");
        },
        onError: (error) => {
          setBuyingProductId(null);
          toast.error(getApiErrorMessage(error));
        },
      },
    );
  };

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Failed to load products. Please try again.</p>;
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
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-white line-clamp-1">
                    {product.name}
                  </h2>

                  {isAdmin && (
                    <button
                      type="button"
                      aria-label={`Edit ${product.name}`}
                      onClick={() => navigate(`/products/${product.id}/edit`)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/80 text-zinc-200 transition-all hover:border-blue-500/60 hover:bg-blue-500/10 hover:text-blue-300"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                </div>

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
