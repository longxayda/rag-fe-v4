/**
 * Ranking type: normalize BE value (any language) to a stable code for styling and i18n.
 * Display label should use t(`ranking.${code}`) with keys: nationalSpecial, national, provincial.
 */
export const RANKING_CODES = {
  NATIONAL_SPECIAL: 'nationalSpecial',
  NATIONAL: 'national',
  PROVINCIAL: 'provincial',
};

const VI_SPECIAL = 'quốc gia đặc biệt';
const VI_NATIONAL = 'quốc gia';
const VI_PROVINCIAL = 'cấp tỉnh';
const EN_SPECIAL = 'national special';
const EN_NATIONAL = 'national';
const EN_PROVINCIAL = 'provincial';
const ZH_SPECIAL = '国家特别';
const ZH_NATIONAL = '国家';
const ZH_PROVINCIAL = '省级';

/**
 * @param {string} [raw] - ranking_type / rankingType from API (any language)
 * @returns {'nationalSpecial'|'national'|'provincial'|null}
 */
export function normalizeRankingCode(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const lower = raw.toLowerCase().trim();
  if (
    lower === VI_SPECIAL ||
    lower === EN_SPECIAL ||
    lower.includes('đặc biệt') ||
    lower.includes('special') ||
    lower.includes(ZH_SPECIAL)
  )
    return RANKING_CODES.NATIONAL_SPECIAL;
  if (
    lower === VI_NATIONAL ||
    lower === EN_NATIONAL ||
    (lower.includes('quốc gia') && !lower.includes('đặc biệt')) ||
    lower.includes(ZH_NATIONAL)
  )
    return RANKING_CODES.NATIONAL;
  if (
    lower === VI_PROVINCIAL ||
    lower === EN_PROVINCIAL ||
    lower.includes('tỉnh') ||
    lower.includes('provincial') ||
    lower.includes(ZH_PROVINCIAL)
  )
    return RANKING_CODES.PROVINCIAL;
  return null;
}

/** Style configs by code (for badges/gradients). */
const STYLES = {
  nationalSpecial: {
    badge:
      'bg-heritage-red-100 dark:bg-heritage-red-900/50 text-heritage-red-800 dark:text-heritage-red-200 border-heritage-red-300 dark:border-heritage-red-700',
    badgeCompact: 'bg-heritage-red-600 text-white',
    accent: 'from-heritage-red-600 to-heritage-red-700',
    gradient: 'from-heritage-red-600 to-heritage-red-800',
    gradientBar: 'from-heritage-red-700 via-heritage-red-600 to-heritage-red-700',
  },
  national: {
    badge:
      'bg-heritage-gold-100 dark:bg-heritage-gold-900/50 text-heritage-gold-800 dark:text-heritage-gold-200 border-heritage-gold-300 dark:border-heritage-gold-700',
    badgeCompact: 'bg-heritage-gold-500 text-heritage-red-900',
    accent: 'from-heritage-gold-500 to-heritage-gold-600',
    gradient: 'from-heritage-gold-500 to-heritage-gold-700',
    gradientBar: 'from-heritage-gold-600 via-heritage-gold-500 to-heritage-gold-600',
  },
  provincial: {
    badge:
      'bg-heritage-jade-100 dark:bg-emerald-900/50 text-heritage-jade-800 dark:text-emerald-200 border-heritage-jade-300 dark:border-emerald-700',
    badgeCompact: 'bg-green-600 text-white',
    accent: 'from-heritage-jade-500 to-heritage-jade-600',
    gradient: 'from-green-500 to-green-700',
    gradientBar: 'from-heritage-jade-600 via-heritage-jade-500 to-heritage-jade-600',
  },
};

const DEFAULT_STYLE = {
  badge:
    'bg-heritage-earth-100 dark:bg-gray-700 text-heritage-earth-700 dark:text-gray-300 border-heritage-earth-300 dark:border-gray-600',
  badgeCompact: 'bg-gray-600 text-white',
  accent: 'from-heritage-earth-400 to-heritage-earth-500',
  gradient: 'from-gray-600 to-gray-800',
  gradientBar: 'from-heritage-earth-500 to-heritage-earth-600',
};

/**
 * @param {string} [raw] - ranking_type / rankingType from API
 * @returns {object} style keys: badge, badgeCompact, accent, gradient, gradientBar
 */
export function getRankingStyle(raw) {
  const code = normalizeRankingCode(raw);
  return code ? STYLES[code] : DEFAULT_STYLE;
}

/** For BentoGrid layout: need code to decide wide/tall. */
export function getRankingCode(raw) {
  return normalizeRankingCode(raw);
}
