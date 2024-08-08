import type { WeatherCoord } from "~/components/Weather/types";
import { coordDefault } from "~/constants/weather";

export const useCoords = () => useState<WeatherCoord>('coords', () => coordDefault);
