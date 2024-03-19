import { Model, ModelCtor } from 'sequelize-typescript';
import { CreationAttributes } from 'sequelize/types';
import { FindOptions, WhereOptions } from 'sequelize';
import { IRepository } from 'src/common/interfaces/IRepository';

export class BaseRepository<T extends Model> implements IRepository<T> {
  model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  async create(entity: CreationAttributes<T>): Promise<T> {
    return this.model.create(entity);
  }

  async read(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async update(id: number, entity: T): Promise<[number, T[]]> {
    const where: WhereOptions = { id };
    return this.model.update(entity, { where, returning: true });
  }

  async delete(id: number): Promise<number> {
    const where: WhereOptions = { id };
    return this.model.destroy({ where });
  }

  async findOne(options?: FindOptions<T>): Promise<T | null> {
    return this.model.findOne(options);
  }

  async findAll(options?: FindOptions<T>): Promise<T[]> {
    return this.model.findAll(options);
  }

  async search(criteria: {
    filters?: FindOptions<T>['where'];
    page?: number;
    pageSize?: number;
    orderBy?: { field: string; direction: 'ASC' | 'DESC' };
  }): Promise<T[]> {
    const { filters, page, pageSize, orderBy } = criteria;

    const options: FindOptions<T> = {
      where: filters ? filters : {},
      limit: pageSize,
      offset: page && pageSize ? (page - 1) * pageSize : undefined,
      order: orderBy ? [[orderBy.field, orderBy.direction]] : undefined,
    };

    return this.model.findAll(options);
  }
}
