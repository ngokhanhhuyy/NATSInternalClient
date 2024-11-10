import { AuthorizationError } from "@/errors";

type PermissionResponseDto = boolean | ResponseDtos.IUpsertableExistingAuthorization;
type HasPermission<TResponseDto> = (permissionResponseDto: TResponseDto) => boolean;

export async function useAuthorizationComposable<TResponseDto extends PermissionResponseDto>(
        getPermissionAsync: () => Promise<TResponseDto>,
        hasPermission: HasPermission<TResponseDto> = (responseDto) => !!responseDto)
            : Promise<TResponseDto> {
    const permissionResult = await getPermissionAsync();
    if (!hasPermission(permissionResult)) {
        throw new AuthorizationError();
    }

    return permissionResult;
}