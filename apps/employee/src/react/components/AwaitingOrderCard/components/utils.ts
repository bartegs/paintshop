export function handleDeletingAwaitingOrders(url: string) {
  // this should be useFetch hook which returns data, and errors

  fetch(url, {
    method: "DELETE",
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}
