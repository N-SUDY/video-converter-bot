import { videoExtensions } from "../config";
import { Video } from "../models";
import { ValidationStatus } from "../types/types";

export class FileValidator {
    private readonly maxFileSize: number = 20971520;

    public validateFileName(fileName: string): boolean {
        if (fileName === "") {
            return false;
        }
    
        return true;
    }
    
    public validateFileExtension(extension: string, extensions: string[]): boolean {
        if (extension === "" || !extensions.includes(extension.toLowerCase())) {
            return false;
        }
    
        return true;
    }
    
    public validateFileSize(fileSize: number): boolean {
        if (fileSize > this.maxFileSize) {
            return false;
        }
    
        return true;
    }

    public validateFile(video: Video): ValidationStatus {
        if (!video.extension || !video.name || !video.size) {
            return { message: "❌Internal error!❌", status: false };
        }

        if (!this.validateFileName(video.name) || !this.validateFileExtension(video.extension, videoExtensions)) {
            return { message: "❌Wrong filename or extension!❌", status: false };
        }

        if (!this.validateFileSize(video.size)) {
            return { message: "❌Too big file! The maximum size - 20 MB❌", status: false };
        }

        return { message: "OK", status: true };
    }
}
