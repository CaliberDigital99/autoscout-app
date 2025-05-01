import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const query = `
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

  const auth = Buffer.from('be-2142197877:sjbmybZFty1EM1nqpnqEAFl7KhYNlc').toString('base64');

  try {
    const response = await fetch('https://listing-search.api.autoscout24.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data.data.search.listings.listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
}