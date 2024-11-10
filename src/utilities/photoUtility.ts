import { config } from "@/configs/configs";
import { FileToLargeError } from "@/errors";
export function usePhotoUtility() {
    /**
     * Read data from an input element's file and convert into base64 strings for
     * HTMLImageElement source and JSON.
     * @param file File object extracted from HTMLInputElement file list.
     * @returns An tuple containing the source value for HTMLImageElement (with prefix)
     * and a string data for json.
     */
    async function fileToBase64Strings(file: File): Promise<[string, string]> {
        return new Promise((resolve, reject) => {
            if (file.size / Math.pow(1000, 2) > 2) {
                return reject(new FileToLargeError());
            }
            const fileReader = new FileReader();

            fileReader.onload = () => {
                const htmlImageSource = fileReader.result as string;
                const dataForJson = htmlImageSource
                    .replace(/^data:image\/(png|jpeg);base64,/, "");
                return resolve([htmlImageSource, dataForJson]);
            };

            fileReader.onerror = () => {
                return reject();
            };
            fileReader.readAsDataURL(file);
        });
    }

    /**
     * 
     * @param url The image's relative path returned by the server.
     * @returns The fullpath of the image, containing the server domain.
     */
    function getPhotoUrl(url: string): string {
        if (import.meta.env.MODE === "development") {
            return config.API_STATIC_FILES_URI_DEV + url;
        }
        return url;
    }

    /**
     * 
     * @returns The full path of a image which plays the role as a default image
     * when the main image doesn't exist or null.
     */
    function getDefaultPhotoUrl(): string {
        return "/images/default.jpg";
    }

    return { fileToBase64Strings, getPhotoUrl, getDefaultPhotoUrl };
}