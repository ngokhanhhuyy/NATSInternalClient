import type {
    IProductExportableUpdateHistoryModel,
    IProductExportableItemUpdateHistoryModel } from "@/models/interfaces";
import type {
    OrderUpdateHistoryResponseDto,
    OrderItemUpdateHistoryDataDto } from "@/services/dtos/responseDtos";
import { UserBasicModel } from "./userModels";
import { DateTimeDisplayModel } from "@/models/dateTimeModels";

export class OrderUpdateHistoryModel implements IProductExportableUpdateHistoryModel {
    public updatedDateTime: DateTimeDisplayModel;
    public updatedUser: UserBasicModel;
    public updatedReason: string | null;
    public oldStatsDateTime: DateTimeDisplayModel;
    public oldNote: string;
    public oldItems: OrderItemUpdateHistoryModel[];
    public newStatsDateTime: DateTimeDisplayModel;
    public newNote: string;
    public newItems: OrderItemUpdateHistoryModel[];

    constructor(responseDto: OrderUpdateHistoryResponseDto) {
        this.updatedDateTime = new DateTimeDisplayModel(responseDto.updatedDateTime);
        this.updatedUser = new UserBasicModel(responseDto.updatedUser);
        this.updatedReason = responseDto.updatedReason;
        this.oldStatsDateTime = new DateTimeDisplayModel(responseDto.oldStatsDateTime);
        this.oldNote = responseDto.oldNote ?? "";
        this.oldItems = responseDto.oldItems?.map(i => new OrderItemUpdateHistoryModel(i))
            ?? [];
        this.newStatsDateTime = new DateTimeDisplayModel(responseDto.newStatsDateTime);
        this.newNote = responseDto.newNote ?? "";
        this.newItems = responseDto.newItems?.map(i => new OrderItemUpdateHistoryModel(i))
            ?? [];
    }
}

export class OrderItemUpdateHistoryModel implements IProductExportableItemUpdateHistoryModel {
    public id: number;
    public productAmountPerUnit: number;
    public vatAmountPerUnit: number;
    public quantity: number;
    public productName: string;

    constructor(dataDto: OrderItemUpdateHistoryDataDto) {
        this.id = dataDto.id;
        this.productAmountPerUnit = dataDto.productAmountPerUnit;
        this.vatAmountPerUnit = dataDto.vatAmountPerUnit;
        this.quantity = dataDto.quantity;
        this.productName = dataDto.productName;
    }
}