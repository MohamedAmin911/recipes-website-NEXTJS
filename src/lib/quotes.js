export async function fetchRandomQuote() {
  const response = await fetch("https://dummyjson.com/quotes/random", {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch a random quote.");
  }

  const data = await response.json();

  return {
    id: data.id,
    quote: data.quote,
    author: data.author,
  };
}
