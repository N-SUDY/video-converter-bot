import fs from 'fs';
import fetch from 'node-fetch';
import { tempFolder } from '../config';

export class FileService {
    async downloadFile(url: URL, outputFilename: string) {
        if (!fs.existsSync(tempFolder)) {
            await fs.promises.mkdir(tempFolder);
        }

        const path = `${tempFolder}/${outputFilename}`;
        const fileStream = fs.createWriteStream(path);

        const response = await fetch(url);
        response.body?.pipe(fileStream);

        return new Promise<void>((resolve, reject) => {
            fileStream.on("finish", resolve);
            fileStream.on("error", reject)
        });
    }

    async deleteFile(filename: string) {
        await fs.promises.rm(filename);
    }
}