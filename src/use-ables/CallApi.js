//reusable component for api call's
export default async function callApi(url) {
  const res = await fetch(url);
  return await res.json();
}
