import {Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import {UserModel} from "../users/user.model";

@Table({tableName: 'RefreshToken'})
export class RefreshTokenModel extends Model {

    @PrimaryKey
    @Column(DataType.UUID)
    tokenId: string

    @ForeignKey(() => UserModel)
    @Column
    userId: string

    @Unique(true)
    @Column
    token: string

    @Column
    expiresIn: Date

    @Column
    parentToken: string

    @Column
    tokenRank: number
}