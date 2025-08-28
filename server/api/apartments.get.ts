import { readFile } from "node:fs/promises";

import type {
  IAparmentStats,
  IApartment,
  IApartmentsQuery,
  SortBy,
  SortType,
} from "../modules/apartment/types";

const DATA_PATH = "server/data/apartments.json";

async function loadApartments(): Promise<IApartment[]> {
  try {
    const rawData = await readFile(DATA_PATH, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Ошибка чтения файла с квартирами:", error);

    throw createError({
      status: 500,
      statusMessage: "Не удалось получить данные по квартирам",
    });
  }
}

function calculateStats(data: IApartment[]): IAparmentStats {
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

function filterApartments(data: IApartment[], query: IApartmentsQuery): IApartment[] {
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

function parseRooms(roomsStr: string): number[] {
  return roomsStr.split(",").map(r => Number(r.trim()));
}

const PER_PAGE = 20;

function getPaginated(
  data: IApartment[],
  queryPage?: string,
): {
  paginated: IApartment[];
  current_page: number;
  last_page: number;
  per_page: number;
  found: number;
} {
  const current_page = queryPage ? Number(queryPage) : 1;

  const start = (current_page - 1) / PER_PAGE;
  const end = start + 20;
  const paginated = [...data].slice(start, end);

  const last_page = Math.ceil(data.length / PER_PAGE);

  return {
    paginated,
    current_page,
    last_page,
    per_page: PER_PAGE,
    found: data.length,
  };
}

function sortApartments(data: IApartment[], sortBy?: SortBy, sortType?: SortType): IApartment[] {
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

export default defineEventHandler(async event => {
  try {
    const query = getQuery<IApartmentsQuery>(event);

    const allApartments = await loadApartments();
    const total = allApartments.length;

    const stats = calculateStats(allApartments);

    let apartments = filterApartments(allApartments, query);
    apartments = sortApartments(allApartments, query.sort_by, query.sort_type);

    const { paginated, current_page, found, last_page, per_page } = getPaginated(
      apartments,
      query.page,
    );

    return {
      data: {
        items: paginated,
        stats,
      },
      meta: {
        current_page,
        total,
        last_page,
        found,
        per_page,
      },
    };
  } catch (error) {
    console.error("Ошибка обработки запроса:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка при получении списка квартир",
    });
  }
});
