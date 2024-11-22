import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The first name of the user' })
  firstName: string;

  @Column()
  @ApiProperty({ description: 'The last name of the user' })
  lastName: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'The username of the user', uniqueItems: true })
  userName: string;

  @Column()
  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @Column({ default: true })
  @ApiProperty({
    description: 'Indicates if the user is active',
    default: true,
  })
  isActive: boolean;
}
