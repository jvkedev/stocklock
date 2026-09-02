// Fires two genuinely concurrent orders for the same product to verify
// the atomic stock-decrement in order.service.ts prevents overselling.
// Reset the target product's stock to 1 before running.

const ACCESS_TOKEN = "PASTE YOUR CURRENT ACCESS TOKEN";
const PRODUCT_ID = "PASTE YOUR PRODUCT ID OF STOCK 1";

const makeRequest = async (label) => {
  const res = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      productId: PRODUCT_ID,
      quantity: 1,
    }),
  });

  const text = await res.text();

  console.log(`-----${label}-----`);
  console.log("status", res.status);
  console.log("raw body", text);

  return { status: res.status, text };
};

// using all js starts both requests without waiting for A to finish before starting B.
await Promise.all([makeRequest("Request A"), makeRequest("Request B")]);

// To run it
// cd backend
// node scripts/race-test.mjs
