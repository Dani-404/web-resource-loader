import { Resource } from "../Resource";

export class FontResource extends Resource {
    constructor({ key, data }: { key: string; data: FontFace }) {
        super(key, data)
    }
}