import { Resource } from "../Resource";

export class VideoResource extends Resource {
    constructor({ key, data }: { key: string; data: HTMLVideoElement }) {
        super(key, data);
    }
}