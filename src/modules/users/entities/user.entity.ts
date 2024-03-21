import {
  Column,
  DataType,
  Model,
  Table,
  BeforeCreate,
  BeforeUpdate,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ValidationService } from '../services/validation.service';
import * as bcrypt from 'bcrypt';
@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'firstName',
  })
  @Length(2, 255)
  @IsNotEmpty()
  firstName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'lastName',
  })
  @Length(2, 255)
  @IsNotEmpty()
  lastName!: string;

  // userName property
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    field: 'userName',
  })
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric('en-US')
  @Length(3, 20)
  userName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  @Length(8, 255)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  password!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  @IsPhoneNumber()
  @Matches(/^[0-9]+$/)
  phone?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'canLogin',
  })
  canLogin: boolean;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: 'createdAt',
  })
  @CreatedAt
  createdAt: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: 'updatedAt',
  })
  @UpdatedAt
  updatedAt: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  deleted?: boolean;

  @BeforeCreate
  static async hashPassword(user: User) {
    if (user.canLogin && user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  @BeforeUpdate
  static async validate(user: User) {
    const validationService = new ValidationService();
    await validationService.validate(user);
  }
}
