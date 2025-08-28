import type { IApartment } from "../types";

const PER_PAGE = 20;

export default function getPaginated(
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
