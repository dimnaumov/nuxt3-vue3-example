import type { WeatherCoord } from "~/components/Weather/types";
import { coordDefault } from "~/constants/weather";

type userStore = {
  coordsByGeolocation: WeatherCoord | null;
  coordsByIp: WeatherCoord | null;
  ip: string;
  coordsSource: CoordSource;
}

export type CoordSource = 'geolocation' | 'ip' | 'default';

export const useUserStore = defineStore('user', {
  state: () => ({
    coordsByGeolocation: null,
    coordsByIp: null,
    ip: '',
    coordsSource: 'default',
  }) as userStore,

  getters: {
    coordsType(state): CoordSource {
      if (state.coordsByGeolocation) return 'geolocation';

      if (state.coordsByIp) return 'ip';

      return 'default';
    },

    coords(state): WeatherCoord {
      return state.coordsByGeolocation || state.coordsByIp || coordDefault;
      // return state.coordsByIp || coordDefault;
    },
  },

  actions: {
    setCoordsByGeolocation(coords: WeatherCoord) {
      console.warn('setCoordsByGeolocation', coords);

      this.coordsByGeolocation = coords;
    },

    setCoordsByIp(coords: WeatherCoord) {
      this.coordsByIp = coords;
    },

    setIp(ip: string) {
      this.ip = ip;
    },
  },
});
