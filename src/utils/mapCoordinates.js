function toFiniteNumber(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

/**
 * Parse map coordinates into canonical [lng, lat].
 * Supports:
 * - [lng, lat]
 * - legacy JSON string: "[lng, lat]"
 */
export function parseMapCoordinates(rawCoordinates) {
  if (rawCoordinates == null) return null;

  let candidate = rawCoordinates;

  if (typeof candidate === 'string') {
    const trimmed = candidate.trim();
    if (!trimmed) return null;

    try {
      candidate = JSON.parse(trimmed);
    } catch {
      return null;
    }
  }

  if (!Array.isArray(candidate) || candidate.length !== 2) {
    return null;
  }

  const lng = toFiniteNumber(candidate[0]);
  const lat = toFiniteNumber(candidate[1]);

  if (lng === null || lat === null) {
    return null;
  }

  if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
    return null;
  }

  return [lng, lat];
}

export function toLeafletLatLng(rawCoordinates) {
  const lngLat = parseMapCoordinates(rawCoordinates);
  return lngLat ? [lngLat[1], lngLat[0]] : null;
}
