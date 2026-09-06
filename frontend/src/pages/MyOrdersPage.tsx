import { useMyOrders } from "../features/orders/hooks/useMyOrders";

const MyOrdersPage = () => {
  const { data: orders, isLoading, error } = useMyOrders();

  if (isLoading) {
    return <p>Loading your orders...</p>;
  }

  if (error) {
    return <p>Failed to load your orders. Please try again.</p>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="p-12 max-w-3xl mx-auto text-center text-zinc-400">
        <p className="text-lg font-medium">You haven't placed any orders yet</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
          <p className="text-zinc-400">You have no recent orders.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between gap-4 transition-colors hover:border-zinc-700"
            >
              {/* Header Row: Title and Status Badge */}
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0">
                  <h2
                    className="text-white font-semibold truncate"
                    title={order.product_name}
                  >
                    {order.product_name}
                  </h2>
                  <p className="text-zinc-400 text-sm mt-1">
                    Qty: {order.quantity} &bull;{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(order.created_at))}
                  </p>
                </div>

                <span
                  className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${
                    order.status === "confirmed"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Footer Row: Price */}
              <div className="flex justify-between items-end mt-2 pt-4 border-t border-zinc-800/50">
                <p className="text-zinc-500 text-sm">Total Amount</p>
                <p className="text-white font-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(order.total_price))}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
