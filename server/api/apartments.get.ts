import type { IApartmentsQuery } from "../modules/apartment/types";
import calculateStats from "../modules/apartment/utils/calculate-stats";
import filterApartments from "../modules/apartment/utils/filter-apartments";
import getPaginated from "../modules/apartment/utils/get-paginated";
import loadApartments from "../modules/apartment/utils/load-apartments-from-json";
import sortApartments from "../modules/apartment/utils/sort-apartments";

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
