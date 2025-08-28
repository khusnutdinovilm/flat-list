import { readFile } from "node:fs/promises";

import type { IApartment } from "../types";

const DATA_PATH = "server/data/apartments.json";

export default async function loadApartments(): Promise<IApartment[]> {
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
