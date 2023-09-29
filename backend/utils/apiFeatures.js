class APIFeatures {
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    search(){
        let keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {}
        this.query.find({...keyword})
        return this;
    }
    filter(){
        const queryStrCopy = {...this.queryString};
        const removeFields = ['keyword','limit','page' ];
        removeFields.forEach(val=>delete queryStrCopy[val]);
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g,match=>`$${match}`);
        this.query.find(JSON.parse(queryStr));
        return this;
    }
    paginate(resPerPage){
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}
module.exports=APIFeatures;