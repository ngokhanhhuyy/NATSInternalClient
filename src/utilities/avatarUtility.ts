export class AvatarUtility {
    getDefaultAvatarUrlByFullName(fullName: string): string {
        return "https://ui-avatars.com/api/?name=" +
                `${fullName.replace(" ", "+")}&background=random&size=256`;
    }
}

export function useAvatarUtility() {
    return new AvatarUtility();
}