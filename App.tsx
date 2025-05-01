import { gql, useQuery } from '@apollo/client';
const GET_LISTINGS = gql`
  query {
    search {
      listings(locale: nl_BE, metadata: { page: 1 }) {
        listings {
          id
          vehicle {
            classification {
              make { formatted }
              model { formatted }
            }
            condition {
              mileageInKm { formatted }
            }
          }
          prices {
            public {
              amountInEUR { formatted }
            }
          }
        }
      }
    }
  }
`;

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
  const { loading, error, data } = useQuery(GET_LISTINGS);

  if (loading) return <p>Bezig met laden...</p>;
  if (error) return <p>Fout bij ophalen data</p>;

  const listings: Listing[] = data.search.listings.listings;

  return (
    <div>
      {listings.map((listing) => (
        <div key={listing.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>{listing.vehicle.classification.make.formatted} {listing.vehicle.classification.model.formatted}</h3>
          <p>Prijs: {listing.prices.public.amountInEUR.formatted}</p>
          <p>Kilometerstand: {listing.vehicle.condition.mileageInKm.formatted}</p>
        </div>
      ))}
    </div>
  );
}

