import { server } from '../../lib/api'

interface ListingsProps {
  title: string
}

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      rating
    }
  }
`

export default function Listings({ title }: ListingsProps) {
  async function fetchListings () {
    const { data: listings } = await server.fetch({ query: LISTINGS })
    console.log(listings)
  }

  return (
    <div>
      {`Hello from ${title}!`}

      <button onClick={fetchListings}>Fetch Listings</button>
    </div>
  )
}