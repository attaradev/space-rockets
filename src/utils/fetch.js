export const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

export function getSpaceXUrl(path, options) {
  const searchParams = new URLSearchParams();

  Object.keys(options || {}).forEach((property) => {
    searchParams.append(property, options[property]);
  });

  const spaceXApiBase = process.env.REACT_APP_SPACEX_API_URL;
  return `${spaceXApiBase}${path}?${searchParams.toString()}`;
}

export const isReachingEnd = (data, pageSize = 12) =>
  data?.[0]?.length === 0 || (data && data[data.length - 1]?.length < pageSize);
