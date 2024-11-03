declare global {
    interface ICreatorTrackableListRequestDto extends ISortableListRequestDto {
       createdUserId?: number;
   }
}

export { };