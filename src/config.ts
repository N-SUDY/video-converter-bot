import { Video } from "./models";

export const video = new Video();
export const tempFolder = "temp";
export const videoExtensions = [".mp4", ".avi", ".mov", ".wmv", ".mkv"];
export const extensionsKeyboard = [
    [{ text: "MP4", callback_data: ".mp4" }, { text: "AVI", callback_data: ".avi" }],
    [{ text: "MOV", callback_data: ".mov" }, { text: "WMV", callback_data: ".wmv" }],
    [{ text: "MKV", callback_data: ".mkv" }]
];