declare global {
    type ExpensePhotoResponseDto = InstanceType<typeof ResponseDtos.Expense.Photo>;

    namespace ResponseDtos {
        namespace Expense {
            class Photo implements IPhoto {
                id: number;
                url: string;
            }
        }
    }
}

export { };