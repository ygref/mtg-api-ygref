import { useState } from "react";

export function Content() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    const searchUrl = `https://api.scryfall.com/cards/search?q=${searchQuery}`;
    try {
      const response = await fetch(searchUrl);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Search for a Card Here:</h2>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      {searchResults && (
        <div>
          <h2>Search Results:</h2>

          {searchResults.data.map((result) => (
            <div key={result.id}>
              <img src={result.image_uris.small} />

              <p>Card Name: {result.name}</p>
              <p>Mana Cost: {result.mana_cost}</p>
              <p>Card Type: {result.type_line}</p>
              <p>Oracle text: {result.oracle_text}</p>
              <p>
                Power and Toughness: {result.power}/{result.toughness}
              </p>
              <p>Loyalty: {result.loyalty}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
