import type { WeatherCoord } from "~/components/Weather/types";
import { coordUlyanovsk } from "~/constants/weather";

export const useCoords = () => useState<WeatherCoord>('coords', () => coordUlyanovsk);
