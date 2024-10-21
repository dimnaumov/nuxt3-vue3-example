import type { WeatherCoord } from "~/components/Weather/types";
import { coordDefault } from "~/constants/weather";

type userStore = {
  coords: WeatherCoord;
  ip: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    coords: coordDefault,
    ip: '',
  }) as userStore,

  actions: {
    setCoords(coords: WeatherCoord) {
      this.coords = coords;
    },
    setIp(ip: string) {
      this.ip = ip;
    },
  },
});
