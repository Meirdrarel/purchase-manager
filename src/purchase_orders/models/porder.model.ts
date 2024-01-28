import {Field, ObjectType} from "@nestjs/graphql";
import {
    Column,
    Model,
    PrimaryKey,
    Table,
    DataType,
    AllowNull,
    BelongsTo,
    ForeignKey,
    Index
} from "sequelize-typescript";
import {UserModel} from "../../users/user.model";

@Table
@ObjectType({ description: 'Purchase Order ' })
export class PurchaseOrder extends Model {

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUID)
    @Field(() => String, {nullable: false})
    id: string;

    @Index({name:'userId-client-number', unique: true})
    @ForeignKey(() => UserModel)
    @Column(DataType.UUID)
    userId: number;

    @BelongsTo(() => UserModel, 'userId')
    user: UserModel

    @Index('userId-client-number')
    @Column
    @Field(() => String, {nullable: false})
    client: string

    @Index('userId-client-number')
    @Column
    @Field(() => String,{nullable: false})
    number: string

}