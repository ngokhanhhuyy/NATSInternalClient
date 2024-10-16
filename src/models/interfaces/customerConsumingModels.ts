import type { CustomerBasicModel } from "../customerModels";

export interface ICustomerConsumingBasicModel {
    customer: CustomerBasicModel
}

export interface ICustomerConsumingListModel {
    customerId: number | null;
}