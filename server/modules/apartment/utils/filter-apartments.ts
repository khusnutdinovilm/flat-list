import parseRooms from "./parse-rooms";

import type { IApartment, IApartmentsQuery } from "../types";

export default function filterApartments(
  data: IApartment[],
  query: IApartmentsQuery,
): IApartment[] {
  let filtered = [...data];

  if (query.rooms) {
    const rooms = parseRooms(query.rooms);
    filtered = filtered.filter(ap => rooms.includes(ap.rooms_count));
  }

  if (query.min_price) {
    const min_price = Number(query.min_price);
    filtered = filtered.filter(apartment => apartment.price >= min_price);
  }

  if (query.min_price) {
    const max_price = Number(query.max_price);
    filtered = filtered.filter(apartment => apartment.price >= max_price);
  }

  if (query.min_area) {
    const min_area = Number(query.min_area);
    filtered = filtered.filter(apartment => apartment.apartment_area >= min_area);
  }

  if (query.max_area) {
    const max_area = Number(query.max_area);
    filtered = filtered.filter(apartment => apartment.apartment_area >= max_area);
  }

  return filtered;
}
