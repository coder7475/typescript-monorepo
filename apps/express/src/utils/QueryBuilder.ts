import { AbstractQueryBuilder, QueryParams } from "@repo/db";
import { Query } from "mongoose";

export class MongooseQueryBuilder<T> extends AbstractQueryBuilder<T> {
  private mongooseQuery: Query<T[], T>;

  constructor(mongooseQuery: Query<T[], T>, queryParams: QueryParams) {
    super(queryParams);
    this.mongooseQuery = mongooseQuery;
  }

  filter() {
    if (this.queryParams.filter) {
      this.mongooseQuery = this.mongooseQuery.find(this.queryParams.filter);
    }
    return this;
  }

  search() {
    const { searchTerm, searchableFields } = this.queryParams;
    if (searchTerm && searchableFields?.length) {
      const searchQuery = {
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })),
      };
      this.mongooseQuery = this.mongooseQuery.find(searchQuery);
    }
    return this;
  }

  sort() {
    if (this.queryParams.sort) {
      this.mongooseQuery = this.mongooseQuery.sort(this.queryParams.sort);
    }
    return this;
  }

  selectFields() {
    if (this.queryParams.fields?.length) {
      const fields = this.queryParams.fields.join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    }
    return this;
  }

  paginate() {
    const page = this.queryParams.page ?? 1;
    const limit = this.queryParams.limit ?? 10;
    const skip = (page - 1) * limit;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }

  async exec(): Promise<T[]> {
    return await this.mongooseQuery.exec();
  }

  async getMeta() {
    const count = await this.mongooseQuery.model.countDocuments(
      this.queryParams.filter ?? {},
    );
    const page = this.queryParams.page ?? 1;
    const limit = this.queryParams.limit ?? 10;
    const totalPages = Math.ceil(count / limit);
    return { page, limit, totalCount: count, totalPages };
  }
}

// ? Example Usage
// const queryParams = {
//   filter: { status: "active" },
//   searchTerm: "apple",
//   searchableFields: ["name", "description"],
//   sort: "createdAt desc",
//   fields: ["name", "price"],
//   page: 2,
//   limit: 10,
// };

// For Mongoose
// const mongooseQuery = Model.find();
// const queryBuilder = new MongooseQueryBuilder(mongooseQuery, queryParams);
// const results = await queryBuilder
//   .filter()
//   .search()
//   .sort()
//   .selectFields()
//   .paginate()
//   .exec();
// const meta = await queryBuilder.getMeta();

// For SQL ORM (e.g. Knex)
// const sqlQuery = knex("products");
// const queryBuilder = new SQLQueryBuilder(sqlQuery, queryParams);
// ...
