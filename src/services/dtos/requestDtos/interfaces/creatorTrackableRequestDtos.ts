declare global {
    interface ICreatorTrackableListRequestDto extends IOrderableListRequestDto {
       createdUserId: number | null;
   }
}

export { };