import { Resource } from "../Resource";

export class ImageResource extends Resource {
    constructor({ key, data }: { key: string; data: HTMLImageElement }) {
        super(key, data)
    }
}