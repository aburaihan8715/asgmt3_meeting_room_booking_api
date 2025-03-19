import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public queryObj: Record<string, unknown>;

  constructor(
    modelQuery: Query<T[], T>,
    queryObj: Record<string, unknown>,
  ) {
    this.modelQuery = modelQuery;
    this.queryObj = queryObj;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.queryObj?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.queryObj };
    const excludeFields = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'fields',
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    this.modelQuery = this.modelQuery.find(
      JSON.parse(queryStr) as FilterQuery<T>,
    );
    return this;
  }

  sort() {
    const sort =
      (this?.queryObj?.sort as string)?.split(',')?.join(' ') ||
      '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  fields() {
    const fields =
      (this?.queryObj?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  // paginate() {
  //   const limit = this.queryObj?.limit ? Number(this.queryObj.limit) : null;

  //   if (limit) {
  //     const page = Number(this.queryObj?.page) || 1;
  //     const skip = (page - 1) * limit;
  //     this.modelQuery = this.modelQuery.skip(skip).limit(limit);
  //   }

  //   return this;
  // }

  // async countTotal() {
  //   const totalQueries = this.modelQuery.getFilter();
  //   const total = await this.modelQuery.model.countDocuments(totalQueries);
  //   const page = Number(this?.query?.page) || 1;
  //   const limit = this?.query?.limit ? Number(this.query.limit) : total;

  //   const totalPage = limit > 0 ? Math.ceil(total / limit) : 1;

  //   return {
  //     page,
  //     limit,
  //     total,
  //     totalPage,
  //   };
  // }

  paginate() {
    const page = Math.max(1, Number(this.queryObj.page) || 1);
    const limit = Math.max(1, Number(this.queryObj.limit) || 10);
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  async calculatePaginate() {
    const page = Math.max(1, Number(this.queryObj.page) || 1);
    const limit = Math.max(1, Number(this.queryObj.limit) || 10);

    const finalFilter = this.modelQuery.getQuery();
    const totalDocs =
      await this.modelQuery.model.countDocuments(finalFilter);
    const totalPage = Math.ceil(totalDocs / limit);

    return { page, limit, totalDocs, totalPage };
  }
}

export default QueryBuilder;
