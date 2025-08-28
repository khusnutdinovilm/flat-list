export interface IApartment {
  id: number;
  apartment_layout: string;
  rooms_count: number;
  apartment_area: number;
  apartment_number: string;
  floor: number;
  floor_house: number;
  price: number;
}

export type SortBy = "area" | "floor" | "price";
export type SortType = "asc" | "desc";

export interface IApartmentsQuery {
  page?: string;
  rooms?: string;
  min_price?: string;
  max_price?: string;
  min_area?: string;
  max_area?: string;
  sort_by?: SortBy;
  sort_type?: SortType;
}

export interface IAparmentStats {
  min_price: number;
  max_price: number;
  min_area: number;
  max_area: number;
}
