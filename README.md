# [FinFlow! Personal Finance Dashboard](https://magenta-moxie-5b9ddb.netlify.app/)

A personal finance dashboard. View, filter, and add transactions with a live summary and spending charts.

- [Live demo](https://magenta-moxie-5b9ddb.netlify.app/)

---

## Running locally

```bash
git clone https://github.com/DaudIbrahim/FinFlow.git
cd FinFlow
npm i
npm run dev
```

Opens at `http://localhost:5173`

---

## Tech stack

- **React 18 + TypeScript** via Vite
- **Zustand** — global state
- **Tailwind CSS v4 + shadcn/ui** — styling
- **React Hook Form + Zod** — form handling and validation
- **Recharts** — charts
- **React Router v7** — routing

---

## Folder structure

```txt
src/
├── components/
│   ├── AddTransaction/   # Modal and form for adding a transaction
│   ├── Charts/           # Area chart (monthly spending trend) and donut chart (category breakdown)
│   ├── SummaryCards/     # Balance, income, and expense cards
│   ├── Transactions/     # List, row, status badge, and filters
│   └── ui/               # shadcn/ui primitives
├── constants/            # Typed arrays for categories, statuses, and types
├── data/                 # 30 mock transactions
├── hooks/
│   ├── useFilteredTransactions.ts   # Filter, search, sort, and pagination
│   └── useSpendingTrend.ts          # Monthly expense totals for the last 6 months
│   ├── useTransactionSummary.ts     # Derives balance, income, and expenses
├── pages/
│   └── Dashboard/
│       └── index.tsx     # Main page — pulls everything together
├── store/
│   └── useTransactionStore.ts  # Zustand store
├── types/
│   └── index.ts          # Transaction interface and type aliases
└── utils/                # formatCurrency, formatDate helpers
```

---

## State management — Zustand

I chose Zustand over Redux Toolkit and Context API because of how little it gets in the way. There is no provider to wrap, no actions and reducers to wire up separately — the store is a single file and it is immediately obvious what it does.

The store itself only holds the raw transactions array and an `addTransaction` action. All derived values — totals, filtered lists, chart data — are computed in custom hooks using `useMemo`, keeping the store minimal and the logic close to where it is used.

---

## Custom hooks

Three hooks handle all business logic, keeping it fully separated from the UI:

- `useTransactionSummary` — derives total balance, income, expenses, and a category breakdown from the store
- `useFilteredTransactions` — owns all filter, search, sort, and pagination state locally. A single _updateFilter_ function accepts partial updates and resets pagination automatically on any filter change
- `useSpendingTrend` — groups expense totals by month for the last 6 months and feeds the area chart

---

## Trade-offs and shortcuts

**No toast notifications** — the modal closes on successful submission with no explicit confirmation message. A toast would improve the feedback loop but was not critical to core functionality.

**Single page** — everything lives on one scrollable dashboard. Routing is set up and extending to multiple pages would be straightforward, but a single page made sense for this scope.

**UI polish** — functionality was prioritised over visual refinement. The interface is clean and consistent but there is room to improve spacing, typography, and responsive behaviour at smaller screen sizes.

---

## What I would improve with more time

- **Unit tests** — `useFilteredTransactions` and `useTransactionSummary` are pure enough to test straightforwardly with Vitest and React Testing Library
- **Accessibility** — keyboard navigation and ARIA labels on the modal and filter controls need more attention
- **UI polish** — better visual hierarchy, improved mobile layout, and micro-interactions on state changes
