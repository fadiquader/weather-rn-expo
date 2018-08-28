import { WEATHER_API_KEY, WEATHER_API_URL } from '../utils/constants';

export function fetchCityTemp(city, country=null) {
  const queryParams = [city,];
  if(country) queryParams.push(country);
  // return fetch(`${WEATHER_API_URL}?q=${city},${country}&appid=${WEATHER_API_KEY}&units=metric`);
  return fetch(`${WEATHER_API_URL}?q=${queryParams.join(',')}&appid=${WEATHER_API_KEY}&units=metric`);
}

export function fetchTempByLocation(lat=25, lon=25) {
  return fetch(`${WEATHER_API_URL}?q=lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
}
