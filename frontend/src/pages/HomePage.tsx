import { Link } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";
import { Package, Lock, Shield, Receipt } from "lucide-react";

const problems = [
  {
    title: "Spreadsheet Stock-Outs & Oversells",
    problem:
      "Two customers buy the last item at the same time. You promise stock you don't have, lose trust, and deal with refunds.",
    solution:
      "Atomic, race-condition-safe stock deduction at the database layer. If the stock isn't there, the order is rejected instantly.",
    icon: <Package />,
  },
  {
    title: "Shared Logins & Untraceable Mistakes",
    problem:
      "Everyone uses the same password, anyone can edit prices or inventory, and nobody knows who changed what.",
    solution:
      "Role-based access control: admins manage products, regular users browse and place orders. Every write is logged.",
    icon: <Lock />,
  },
  {
    title: "Expensive & Insecure Legacy Tools",
    problem:
      "$50–$200/mo SaaS tools that email you plaintext resets and cut corners on security.",
    solution:
      "Secure by default: Argon2 hashing, JWT access + refresh token rotation, HTTP-only cookies, and rate-limited auth.",
    icon: <Shield />,
  },
  {
    title: "Manual Order Chaos",
    problem:
      "Orders come in via email, WhatsApp, or Slack. You scribble them in, forget to deduct stock, or charge the wrong price.",
    solution:
      "One order flow validates stock, locks the row, calculates the real total from the current price, and saves the record.",
    icon: <Receipt />,
  },
];

const HomePage = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="w-full">
      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 pt-16 pb-24 md:px-12 md:pt-24">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          Built for small sellers who outgrew spreadsheets
        </div>

        <h1 className="text-center text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
          Stop overselling.
          <br />
          <span className="bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Start trusting your stock.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-center text-lg leading-relaxed text-gray-400 md:text-xl">
          StockLock is a secure, full-stack inventory and order management
          platform. Replace the fragile spreadsheet and shared-password
          dashboard with atomic stock checks, role-based access, and
          authentication you can actually rely on.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/products"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/15 transition-all hover:bg-blue-600 active:scale-[0.98] sm:w-auto"
          >
            Browse Products
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          {!user ? (
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/10 active:scale-[0.98] sm:w-auto"
            >
              Create a free account
            </Link>
          ) : user.role === "admin" ? (
            <Link
              to="/products/new"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/10 active:scale-[0.98] sm:w-auto"
            >
              Add a product
            </Link>
          ) : (
            <Link
              to="/profile"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/10 active:scale-[0.98] sm:w-auto"
            >
              View your profile
            </Link>
          )}
        </div>

        <div className="mt-14 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { label: "Atomic stock safety", value: "Zero oversells" },
            { label: "Account security", value: "Argon2 + JWT rotation" },
            { label: "Admin controls", value: "Role-gated product edits" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/3 px-6 py-5 backdrop-blur"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {item.label}
              </p>
              <p className="mt-2 text-xl font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-12">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Problems you'll never deal with again
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Every feature in StockLock exists to solve a real pain I've seen
            side-hustles and small shops suffer through.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {problems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-[#121212] p-7 shadow-xl shadow-black/30 transition-all hover:border-white/20 hover:bg-[#161616]"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-400">
                    ✕
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-red-400/80">
                      The old way
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-400">
                      {item.problem}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80">
                      StockLock's fix
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-200">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-blue-500/15 via-indigo-500/10 to-purple-500/15 px-8 py-14 backdrop-blur md:px-16 md:py-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Why I built StockLock
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-300">
                I kept rebuilding the same secure inventory skeleton for
                freelance clients and got tired of the hand-waved demos that
                skip authentication, skip RBAC, and ignore what happens when two
                orders land at the exact same second.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-400">
                StockLock is small enough to read in an afternoon, but every
                opinionated call is a battle-tested one: refresh-token rotation,
                Argon2, HTTP-only cookies, Zod-validated inputs, dual-layer role
                checks, and database-level stock locking.
              </p>
            </div>

            <Link
              to="/register"
              className="flex-none rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-xl shadow-black/30 transition-all hover:bg-gray-100 active:scale-[0.98]"
            >
              Get started today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
