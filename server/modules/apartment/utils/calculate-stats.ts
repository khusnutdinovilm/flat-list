import type { IAparmentStats, IApartment } from "../types";

export default function calculateStats(data: IApartment[]): IAparmentStats {
  return data.reduce(
    (acc, item) => ({
      min_price: item.price <= acc.min_price ? item.price : acc.min_price,
      max_price: item.price >= acc.max_price ? item.price : acc.max_price,
      min_area: item.apartment_area <= acc.min_area ? item.apartment_area : acc.min_area,
      max_area: item.apartment_area >= acc.max_area ? item.apartment_area : acc.max_area,
    }),
    { min_price: +Infinity, max_price: 0, min_area: +Infinity, max_area: 0 },
  );
}
