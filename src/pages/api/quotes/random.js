import { fetchRandomQuote } from "../../../lib/quotes";

export default async function handler(req, res) {
  try {
    const quote = await fetchRandomQuote();
    return res.status(200).json(quote);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
