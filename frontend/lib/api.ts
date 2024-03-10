import qs from 'qs';

export function getStrapiURL(path = '') {
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:1337'}${path}`;
}

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {},
) {
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ''}`,
  )}`;

  console.log(requestUrl)

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error('An error occurred please try again');
  }

  const data = await response.json();
  return data;
}
