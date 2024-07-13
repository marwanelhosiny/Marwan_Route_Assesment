
export class ApiFeatures {

    constructor(query , mongooseQuery){
        this.query = query;
        this.mongooseQuery = mongooseQuery;
    }

    pagination({page = 1 , size = 2}){
        if( page<0)page = 1
        if( size<0)size = 2
    
        const limit = +size
        const skip =  +(page -1) * limit

        this.mongooseQuery.limit( limit ).skip( skip )
    
        return this
    }
    sort(sortBy) {
        if (!sortBy) {
            this.mongooseQuery.sort({ createdAt: 1 });
            return this;
        }

        const order = sortBy.split(' ');
        const key = order[0];
        const value = order[1];

        this.mongooseQuery.sort({ [key]: value });

        return this;
    }


    filter(filter) {
        const queryFilter = {};

        if (filter.categoryName) {
            queryFilter.name = { $regex: filter.categoryName, $options: 'i' };
        }



        this.mongooseQuery.find(queryFilter);

        return this;
    }
    
}