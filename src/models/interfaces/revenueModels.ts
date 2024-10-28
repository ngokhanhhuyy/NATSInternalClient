declare global {
    interface IRevenueListModel extends ICustomerEngageableListModel {
        items: IRevenueBasicModel[];
    }

    interface IRevenueBasicModel extends ICustomerEngageableBasicModel {
        amountAfterVat: number;
    }
}

export { };