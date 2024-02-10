import { Resource } from "../Resource";

export class AudioResource extends Resource {
    constructor({ key, data }: { key: string; data: HTMLAudioElement }) {
        super(key, data)
    }
}