interface Listing {
    id: string;
    title: string;
    image: string;
    address: string;
    price: number;
    numOfGuests: number;
    numOfBeds: number;
    numOfBaths: number;
    rating: number;
}

const listings: Listing[] = [
    {
        id: '001',
        title: 'Title 1',
        image: 'https://via.placeholder.com/150',
        address: 'Address 1',
        price: 100,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 1,
        rating: 5
    },
    {
        id: '002',
        title: 'Title 2',
        image: 'https://via.placeholder.com/150',
        address: 'Address 2',
        price: 200,
        numOfGuests: 3,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 4
    },
    {
        id: '003',
        title: 'Title 3',
        image: 'https://via.placeholder.com/150',
        address: 'Address 3',
        price: 300,
        numOfGuests: 4,
        numOfBeds: 3,
        numOfBaths: 3,
        rating: 3
    },
    {
        id: '004',
        title: 'Title 4',
        image: 'https://via.placeholder.com/150',
        address: 'Address 4',
        price: 400,
        numOfGuests: 5,
        numOfBeds: 4,
        numOfBaths: 4,
        rating: 2
    },
    {
        id: '005',
        title: 'Title 5',
        image: 'https://via.placeholder.com/150',
        address: 'Address 5',
        price: 500,
        numOfGuests: 6,
        numOfBeds: 5,
        numOfBaths: 5,
        rating: 1
    }
]

export default listings