import type { IApartment, SortBy, SortType } from "../types";

export default function sortApartments(
  data: IApartment[],
  sortBy?: SortBy,
  sortType?: SortType,
): IApartment[] {
  if (!sortBy && !sortType) return data;

  const isAscSort = sortType === "asc";

  return [...data].sort((a, b) => {
    switch (sortBy) {
      case "area":
        return isAscSort
          ? a.apartment_area - b.apartment_area
          : b.apartment_area - a.apartment_area;
      case "floor":
        return isAscSort ? a.floor - b.floor : b.floor - a.floor;
      case "price":
        return isAscSort ? a.price - b.price : b.price - a.price;
      default:
        return 0;
    }
  });
}
