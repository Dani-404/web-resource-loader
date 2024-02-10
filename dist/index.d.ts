declare class Resource {
    key: string;
    data: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | FontFace;
    constructor(key: string, data: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | FontFace);
    getData(): HTMLImageElement | HTMLAudioElement | HTMLVideoElement | FontFace;
}

declare class ImageResource extends Resource {
    constructor({ key, data }: {
        key: string;
        data: HTMLImageElement;
    });
}

declare class VideoResource extends Resource {
    constructor({ key, data }: {
        key: string;
        data: HTMLVideoElement;
    });
}

declare class FontResource extends Resource {
    constructor({ key, data }: {
        key: string;
        data: FontFace;
    });
}

declare class AudioResource extends Resource {
    constructor({ key, data }: {
        key: string;
        data: HTMLAudioElement;
    });
}

type ResourceType = {
    key: string;
    src: string;
};

declare class ResourceManager extends EventTarget {
    images: ImageResource[];
    videos: VideoResource[];
    fonts: FontResource[];
    audios: AudioResource[];
    totalResources: number;
    constructor();
    loadResources({ images, videos, fonts, audios }: {
        images?: ResourceType[];
        videos?: ResourceType[];
        fonts?: ResourceType[];
        audios?: ResourceType[];
    }): Promise<string>;
    private loadResource;
    private countTotalResources;
    private emitProgress;
    getImage(key: string): ImageResource | null;
    getVideo(key: string): VideoResource | null;
    getFont(key: string): FontResource | null;
    getAudio(key: string): AudioResource | null;
}

declare enum ResourceList {
    IMAGE = 0,
    VIDEO = 1,
    FONT = 2,
    AUDIO = 3
}

export { ResourceList, type ResourceType, ResourceManager as default };
