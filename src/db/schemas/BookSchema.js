import Realm from "realm";
import LoanSchema from "./LoanSchema";

const BookSchema = {
    name: 'Book',
    primaryKey: '_id',
    properties: {
        _id: 'int',
        name: 'string',
        language: 'string',
        amount: 'int',
        purchaseDate: 'string',
        active: 'bool',
        assignee: {
            type: 'linkingbjects',
            objectType: 'LoanSchema',
            property: 'books'
        }
    }
}

export default BookSchema;