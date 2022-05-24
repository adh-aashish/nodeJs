class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginate() {
    // 4) Pagination
    // page=2&limit=10 , page1=1-10, page2= 11-20
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  limitFields() {
    //3) Field Limiting (donot show these fields in api)
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  sort() {
    //2) Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy); //sort('price ratingAverage')
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  filter() {
    // 1.1) Filtering
    // eslint-disable-next-line prefer-object-spread
    const queryObj = Object.assign({}, this.queryString); //for shallow copy of req.query obj
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

    // 1.2) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    //replace [gte] by [$gte]
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
    // let query = Tour.find(JSON.parse(queryStr));
  }
}

module.exports = APIFeatures;
