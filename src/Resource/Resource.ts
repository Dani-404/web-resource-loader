export class Resource {
    key: string;
    data: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | FontFace | HTMLScriptElement | HTMLLinkElement;

    constructor({key, data} : { key: string, data: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | FontFace | HTMLScriptElement | HTMLLinkElement}) {
        this.key = key;
        this.data = data;
    }

    public getData(): HTMLImageElement | HTMLAudioElement | HTMLVideoElement | FontFace | HTMLScriptElement | HTMLLinkElement {
        return this.data;
    }
}