import { server } from '../../lib/api'
import { DeleteListingData, DeleteListingVariables, ListingsData } from '../../lib/types'

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

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`

export default function Listings({ title }: ListingsProps) {
  async function fetchListings () {
    const { data: listings } = await server.fetch<ListingsData>({ query: LISTINGS })
    console.log(listings)
  }

  async function deleteListing () {
    const { data } = await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id: '6564b583c96a0fd1d59ba427'
      }
    })

    console.log(data.deleteListing)
  }

  return (
    <div>
      {`Hello from ${title}!`}

      <button onClick={fetchListings}>Fetch Listings</button>
      <button onClick={deleteListing}>Delete Listing</button>
    </div>
  )
}