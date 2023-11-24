import { Database, Listing } from '@/lib/types'
import { ObjectId } from 'mongodb'

const listingResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => await db.listings.find({}).toArray()
  },

  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deletedListing = await db.listings.findOneAndDelete({
        _id: new ObjectId(id)
      })

      if (!deletedListing)
        throw new Error(
          `Failed to delete listing with id: ${id}. Check id and try again.`
        )

      return deletedListing
    }
  },

  Listing: {
    id: (listing: Listing) => listing._id.toString()
  }
}

export default listingResolvers