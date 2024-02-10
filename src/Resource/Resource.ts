export class Resource {
    key: string;
    data: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | FontFace;

    constructor(key: string, data: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | FontFace) {
        this.key = key;
        this.data = data;
    }

    public getData(): HTMLImageElement | HTMLAudioElement | HTMLVideoElement | FontFace {
        return this.data;
    }
}