import { Model, ModelCtor } from 'sequelize-typescript';
import { CreationAttributes } from 'sequelize/types';
import { FindOptions } from 'sequelize';

export interface IRepository<T extends Model> {
  model: ModelCtor<T>;

  create(entity: CreationAttributes<T>): Promise<T>;
  read(id: number): Promise<T | null>;
  update(id: number, entity: T): Promise<[number, T[]]>;
  delete(id: number): Promise<number>;
  findOne(options?: FindOptions<T>): Promise<T | null>;
  findAll(options?: FindOptions<T>): Promise<T[]>;

  //search(criteria: any): Promise<T[]>;
  search(criteria: any): Promise<T[]>;
}
