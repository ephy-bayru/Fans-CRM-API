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
  })
  @Length(2, 255)
  @IsNotEmpty()
  firstName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  @Length(2, 255)
  @IsNotEmpty()
  lastName!: string;

  // userName property
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
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

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  deleted?: boolean;

  @BeforeCreate
  @BeforeUpdate
  static async validate(user: User) {
    const validationService = new ValidationService();
    await validationService.validate(user);
  }
}
