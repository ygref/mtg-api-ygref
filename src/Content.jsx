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
              {result.card_faces ? (
                <div>
                  {result.card_faces.map((card_faces, index) => (
                    <div key={index}>
                      <img src={card_faces.image_uris.small} />
                      <p>Card Name: {card_faces.name}</p>
                      <p>Mana Cost: {card_faces.mana_cost}</p>
                      <p>Card Type: {card_faces.type_line}</p>
                      <p>Oracle text: {card_faces.oracle_text}</p>
                      <p>
                        Power and Toughness: {card_faces.power}/{card_faces.toughness}
                      </p>
                      <p>Loyalty: {card_faces.loyalty}</p>
                      <p>Sets: {card_faces.set_name}</p>
                      <p>
                        Price USD:{" "}
                        {card_faces.prices && card_faces.prices.usd
                          ? card_faces.prices.usd
                          : result.prices && result.prices.usd
                          ? result.prices.usd
                          : "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <img src={result.image_uris.small} />
                  <p>Card Name: {result.name}</p>
                  <p>Mana Cost: {result.mana_cost}</p>
                  <p>Card Type: {result.type_line}</p>
                  <p>Oracle text: {result.oracle_text}</p>
                  <p>
                    Power and Toughness: {result.power}/{result.toughness}
                  </p>
                  <p>Loyalty: {result.loyalty}</p>
                  <p>Sets: {result.set_name}</p>
                  <p>Price USD: {result.prices.usd}</p>
                  <p>
                    <a href={result.purchase_uris.tcgplayer}>Purchase on TCGPlayer</a>{" "}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
