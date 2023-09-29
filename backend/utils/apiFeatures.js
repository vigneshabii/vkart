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
        console.log(queryStrCopy);
        const removeFields = ['keyword','limit','page'];
        removeFields.forEach(val=>delete queryStrCopy[val]);
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g,match=>`$${match}`);
        console.log(queryStr)
        this.query.find(JSON.parse(queryStr));
        return this;
    }
}
module.exports=APIFeatures;