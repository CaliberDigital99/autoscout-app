import fetch from 'node-fetch';
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
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();

    if (!data || !data.data || !data.data.search || !data.data.search.listings) {
      console.error("❌ Ongeldige API-response:", JSON.stringify(data));
      return res.status(500).json({ error: 'Ongeldige API-response van Autoscout24' });
    }

    res.status(200).json(data.data.search.listings.listings);
  } catch (error: any) {
    console.error("❌ Fout bij ophalen:", error);
    res.status(500).json({ error: error?.message || 'Onbekende fout' });
  }
}


