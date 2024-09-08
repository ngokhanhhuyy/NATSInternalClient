import { useApiClient } from "./apiClient";
import type { ResourceAccessRequestDto } from "./dtos/requestDtos";
import type { ResourceAccessResponseDto } from "./dtos/responseDtos";

export function useResourceAccessService() {
    const apiClient = useApiClient();
}