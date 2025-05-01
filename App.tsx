import { useEffect, useState } from 'react';

type Listing = {
  id: string;
  vehicle: {
    classification: {
      make: { formatted: string };
      model: { formatted: string };
    };
    condition: {
      mileageInKm: { formatted: string };
    };
  };
  prices: {
    public: {
      amountInEUR: { formatted: string };
    };
  };
};

export default function App() {
  const [data, setData] = useState<Listing[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/listings')
      .then(res => res.json())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) return <p>Fout bij ophalen gegevens</p>;
  if (!data) return <p>Bezig met laden...</p>;

  return (
    <div>
      {data.map((listing) => (
        <div key={listing.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>{listing.vehicle.classification.make.formatted} {listing.vehicle.classification.model.formatted}</h3>
          <p>Prijs: {listing.prices.public.amountInEUR.formatted}</p>
          <p>Kilometerstand: {listing.vehicle.condition.mileageInKm.formatted}</p>
        </div>
      ))}
    </div>
  );
}