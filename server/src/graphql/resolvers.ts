import listings from '../listings'

const resolvers = {
    Query: {
        listings: () => listings
    },

    Mutation: {
        deleteListing: (_root: undefined, { id }: { id: string }) => {
            for (const listing of listings) {
                if (listing.id === id) {
                    return listings.splice(listings.indexOf(listing), 1)[0]
                }
            }

            throw new Error('Failed to delete listing')
        }
    }
}

export default resolvers