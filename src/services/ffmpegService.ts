import Ffmpeg from 'fluent-ffmpeg'
import { FileService } from '../services';
import { Video } from '../models';
import { tempFolder } from '../config';

export class FFmpegService {
    private async convert(inputPath: string, outputPath: string) {
        return new Promise<void>((resolve, reject) => {
            Ffmpeg(inputPath)
                .input(inputPath)
                .output(outputPath)
                .on('end', resolve)
                .on('error', (err) => reject(err))
                .run();
        });
    }

    public async convertVideo(video: Video, newExtenstion: string) {
        if (!video.url) {
            return;
        }

        const inputPath = `${tempFolder}/${video.name}${video.extension}`;
        const outputPath = `${tempFolder}/${video.name}${newExtenstion}`;

        const fileService = new FileService();
        const filename = `${video.name}${video.extension}`;

        await fileService.downloadFile(video.url, filename);
        await this.convert(inputPath, outputPath);
    }
}