import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, LayoutGrid, List,
  X, ChevronDown, Mountain, Star, Clock,
  TrendingUp, ArrowUpDown, Filter
} from 'lucide-react';
import { treks } from '../data/treks';
import TrekCard from '../components/ui/TrekCard';
import TrekListItem from '../components/ui/TrekListItem';
import Pagination from '../components/ui/Pagination';
import { cn, getDifficultyColor, formatPrice } from '../utils/cn';

/* ─── Constants ────────────────────────────────────────────── */
const DIFFICULTIES = ['Easy', 'Moderate', 'Moderate-Hard', 'Hard'];
const REGIONS = ['Uttarakhand', 'Himachal Pradesh'];
const SEASONS = ['Winter (Dec–Apr)', 'Spring (Apr–Jun)', 'Monsoon (Jul–Sep)', 'Autumn (Sep–Nov)'];
const DURATION_OPTS = [
  { label: 'Weekend (1–3 days)', min: 0, max: 3 },
  { label: 'Short (4–6 days)', min: 4, max: 6 },
  { label: 'Week+ (7–10 days)', min: 7, max: 10 },
  { label: 'Expedition (10+ days)', min: 11, max: 99 },
];
const SORT_OPTS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Rating: High → Low' },
  { value: 'duration-asc', label: 'Duration: Short → Long' },
  { value: 'difficulty-asc', label: 'Difficulty: Easy First' },
];
const DIFFICULTY_ORDER = { Easy: 0, Moderate: 1, 'Moderate-Hard': 2, Hard: 3 };
const PER_PAGE = 6;

/* ─── Filter Checkbox ───────────────────────────────────────── */
const CheckItem = ({ label, checked, onChange, badge, badgeColor }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group">
    <div
      className={cn(
        'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0',
        checked
          ? 'bg-primary-600 border-primary-600'
          : 'border-dark-200 group-hover:border-primary-400 bg-white'
      )}
      onClick={onChange}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    <span className="text-sm text-dark-600 group-hover:text-dark-900 transition-colors flex-1 select-none" onClick={onChange}>
      {label}
    </span>
    {badge && (
      <span className={cn('text-2xs font-semibold px-2 py-0.5 rounded-full', badgeColor ?? 'bg-dark-100 text-dark-500')}>
        {badge}
      </span>
    )}
  </label>
);

/* ─── Filter Section Collapsible ───────────────────────────── */
const FilterSection = ({ title, icon: Icon, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-dark-100 pb-5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3"
      >
        <div className="flex items-center gap-2 text-sm font-bold text-dark-800">
          {Icon && <Icon className="w-4 h-4 text-primary-500" />}
          {title}
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-dark-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2.5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Filter Sidebar ────────────────────────────────────────── */
const FilterSidebar = ({ filters, onFiltersChange, onClear, totalResults }) => {
  const toggle = (key, value) => {
    const current = filters[key] ?? [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  const hasAny = Object.values(filters).some((v) => v?.length > 0);

  return (
    <div className="bg-white rounded-3xl shadow-card p-6 flex flex-col gap-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary-600" />
          <span className="font-bold text-dark-900 text-sm">Filters</span>
          {hasAny && (
            <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-2xs font-bold flex items-center justify-center">
              {Object.values(filters).reduce((a, v) => a + (v?.length ?? 0), 0)}
            </span>
          )}
        </div>
        {hasAny && (
          <button
            onClick={onClear}
            className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Clear All
          </button>
        )}
      </div>

      <p className="text-xs text-dark-400 -mt-2 font-medium">
        {totalResults} trek{totalResults !== 1 ? 's' : ''} found
      </p>

      {/* Difficulty */}
      <FilterSection title="Difficulty" icon={TrendingUp}>
        {DIFFICULTIES.map((d) => (
          <CheckItem
            key={d}
            label={d}
            checked={filters.difficulty?.includes(d)}
            onChange={() => toggle('difficulty', d)}
            badge={d}
            badgeColor={getDifficultyColor(d)}
          />
        ))}
      </FilterSection>

      {/* Region */}
      <FilterSection title="Region" icon={Mountain}>
        {REGIONS.map((r) => (
          <CheckItem
            key={r}
            label={r}
            checked={filters.region?.includes(r)}
            onChange={() => toggle('region', r)}
          />
        ))}
      </FilterSection>

      {/* Duration */}
      <FilterSection title="Duration" icon={Clock}>
        {DURATION_OPTS.map((d) => (
          <CheckItem
            key={d.label}
            label={d.label}
            checked={filters.duration?.includes(d.label)}
            onChange={() => toggle('duration', d.label)}
          />
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Max Budget" icon={Star} defaultOpen={false}>
        <div className="space-y-2">
          {[
            { label: 'Under ₹8,000', max: 8000 },
            { label: '₹8,000 – ₹12,000', max: 12000 },
            { label: '₹12,000 – ₹18,000', max: 18000 },
            { label: 'Over ₹18,000', max: 999999 },
          ].map((p) => (
            <CheckItem
              key={p.label}
              label={p.label}
              checked={filters.price?.includes(p.label)}
              onChange={() => toggle('price', p.label)}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  );
};

/* ─── Main Treks Page ───────────────────────────────────────── */
export default function Treks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: [],
    region: [],
    duration: [],
    price: [],
  });

  // Sync query to URL
  useEffect(() => {
    const params = {};
    if (query) params.q = query;
    setSearchParams(params, { replace: true });
    setPage(1);
  }, [query]);

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [filters, sort]);

  /* ── Filtering ─────────────────────────────────────────── */
  const filtered = useMemo(() => {
    let result = [...treks];

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q) ||
          t.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    // Difficulty
    if (filters.difficulty.length)
      result = result.filter((t) => filters.difficulty.includes(t.difficulty));

    // Region
    if (filters.region.length)
      result = result.filter((t) => filters.region.includes(t.region));

    // Duration
    if (filters.duration.length) {
      result = result.filter((t) =>
        filters.duration.some((label) => {
          const opt = DURATION_OPTS.find((o) => o.label === label);
          return opt && t.duration >= opt.min && t.duration <= opt.max;
        })
      );
    }

    // Price
    if (filters.price.length) {
      result = result.filter((t) =>
        filters.price.some((label) => {
          if (label === 'Under ₹8,000') return t.price < 8000;
          if (label === '₹8,000 – ₹12,000') return t.price >= 8000 && t.price < 12000;
          if (label === '₹12,000 – ₹18,000') return t.price >= 12000 && t.price < 18000;
          if (label === 'Over ₹18,000') return t.price >= 18000;
          return false;
        })
      );
    }

    return result;
  }, [query, filters]);

  /* ── Sorting ───────────────────────────────────────────── */
  const sorted = useMemo(() => {
    const r = [...filtered];
    switch (sort) {
      case 'price-asc':    return r.sort((a, b) => a.price - b.price);
      case 'price-desc':   return r.sort((a, b) => b.price - a.price);
      case 'rating':       return r.sort((a, b) => b.rating - a.rating);
      case 'duration-asc': return r.sort((a, b) => a.duration - b.duration);
      case 'difficulty-asc':
        return r.sort((a, b) =>
          (DIFFICULTY_ORDER[a.difficulty] ?? 99) - (DIFFICULTY_ORDER[b.difficulty] ?? 99)
        );
      default: return r;
    }
  }, [filtered, sort]);

  /* ── Pagination ────────────────────────────────────────── */
  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const clearFilters = () =>
    setFilters({ difficulty: [], region: [], duration: [], price: [] });

  const hasFilters = Object.values(filters).some((v) => v.length > 0) || query;
  const activeFilterCount = Object.values(filters).reduce((a, v) => a + v.length, 0);

  return (
    <div className="min-h-screen bg-surface">
      {/* ── Page Hero ─────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-primary-950 via-dark-900 to-secondary-900 pt-32 pb-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />

        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <Mountain className="w-4 h-4" /> Himalayan Expeditions
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              All Trek Packages
            </h1>
            <p className="text-white/65 text-lg mb-8 max-w-xl">
              14 hand-crafted Himalayan journeys across Uttarakhand and Himachal Pradesh.
              Find your perfect adventure.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400 z-10" />
              <input
                id="trek-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, region, or highlight..."
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/95 backdrop-blur-sm text-dark-800 text-sm font-medium
                           placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-lg"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-dark-200 flex items-center justify-center hover:bg-dark-300 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-dark-600" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────── */}
      <div className="section-container py-10">
        <div className="flex gap-7">

          {/* ── Desktop Filter Sidebar ─────────────────── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onClear={clearFilters}
              totalResults={sorted.length}
            />
          </aside>

          {/* ── Right: Toolbar + Grid ──────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-card border border-dark-100 text-sm font-semibold text-dark-700 hover:bg-primary-50 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-2xs font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Result count */}
                <p className="text-sm text-dark-500 font-medium hidden sm:block">
                  <span className="font-bold text-dark-800">{sorted.length}</span> trek{sorted.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Sort */}
                <div className="relative">
                  <select
                    id="trek-sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-white border border-dark-100 text-sm font-semibold text-dark-700
                               focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer shadow-sm hover:border-primary-300 transition-colors"
                  >
                    {SORT_OPTS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-400 pointer-events-none" />
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-400 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="flex bg-white rounded-xl border border-dark-100 p-1 shadow-sm">
                  <button
                    onClick={() => setView('grid')}
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
                      view === 'grid' ? 'bg-primary-600 text-white shadow-sm' : 'text-dark-400 hover:text-dark-700'
                    )}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200',
                      view === 'list' ? 'bg-primary-600 text-white shadow-sm' : 'text-dark-400 hover:text-dark-700'
                    )}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {(activeFilterCount > 0 || query) && (
              <div className="flex flex-wrap gap-2 mb-5">
                {query && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-100">
                    🔍 "{query}"
                    <button onClick={() => setQuery('')} className="hover:text-primary-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {Object.entries(filters).flatMap(([key, vals]) =>
                  vals.map((v) => (
                    <span
                      key={`${key}-${v}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-100 text-dark-700 text-xs font-semibold"
                    >
                      {v}
                      <button
                        onClick={() => setFilters((f) => ({ ...f, [key]: f[key].filter((x) => x !== v) }))}
                        className="hover:text-dark-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
                <button
                  onClick={() => { clearFilters(); setQuery(''); }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 border border-red-100 transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Trek Grid / List */}
            <AnimatePresence mode="wait">
              {paginated.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-24 bg-white rounded-3xl border border-dark-100"
                >
                  <p className="text-5xl mb-4">🏔️</p>
                  <h3 className="text-xl font-bold text-dark-800 mb-2">No Treks Found</h3>
                  <p className="text-dark-500 mb-6 text-sm">
                    Try adjusting your search or filters to find your adventure.
                  </p>
                  <button
                    onClick={() => { clearFilters(); setQuery(''); }}
                    className="px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`${view}-${page}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={
                    view === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                      : 'flex flex-col gap-5'
                  }
                >
                  {paginated.map((trek, i) =>
                    view === 'grid' ? (
                      <TrekCard key={trek.id} trek={trek} index={i} />
                    ) : (
                      <TrekListItem key={trek.id} trek={trek} index={i} />
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
              />
            )}

            {/* Page info */}
            {sorted.length > 0 && (
              <p className="text-center text-sm text-dark-400 mt-4 font-medium">
                Showing {Math.min((page - 1) * PER_PAGE + 1, sorted.length)}–
                {Math.min(page * PER_PAGE, sorted.length)} of {sorted.length} treks
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ──────────────────────────── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              key="mobile-filter-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark-900/60 backdrop-blur-sm z-70"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              key="mobile-filter-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed top-0 left-0 h-full w-80 bg-white z-80 overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-dark-100 sticky top-0 bg-white z-10">
                <span className="font-bold text-dark-900">Filters</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-xl bg-dark-100 flex items-center justify-center hover:bg-dark-200 transition-colors"
                >
                  <X className="w-4 h-4 text-dark-600" />
                </button>
              </div>
              <div className="p-5">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClear={clearFilters}
                  totalResults={sorted.length}
                />
              </div>
              <div className="sticky bottom-0 bg-white border-t border-dark-100 p-4">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 transition-colors"
                >
                  Show {sorted.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
