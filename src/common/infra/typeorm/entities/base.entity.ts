import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('base')
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
}
