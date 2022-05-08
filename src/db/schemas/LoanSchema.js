import Realm from "realm";
const LoanSchema = {
    name: 'Loan',
    properties: {
        _id: 'int',
        ward: 'string',
        room: 'string',
        dateOut: 'string',
        dateIn: 'string',
        books: 'BookSchema[]'
    },
    primaryKey: '_id'
}

export default LoanSchema;