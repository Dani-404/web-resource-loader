declare class Resource {
    key: string;
    data: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | FontFace | HTMLScriptElement | HTMLLinkElement;
    constructor({ key, data }: {
        key: string;
        data: HTMLImageElement | HTMLAudioElement | HTMLVideoElement | FontFace | HTMLScriptElement | HTMLLinkElement;
    });
    getData(): HTMLImageElement | HTMLAudioElement | HTMLVideoElement | FontFace | HTMLScriptElement | HTMLLinkElement;
}

type ResourceType = {
    key: string;
    src: string;
};

declare class ResourceManager extends EventTarget {
    images: Resource[];
    videos: Resource[];
    fonts: Resource[];
    audios: Resource[];
    css: Resource[];
    js: Resource[];
    totalResources: number;
    constructor();
    loadResources({ images, videos, fonts, audios, css, js }: {
        images?: ResourceType[];
        videos?: ResourceType[];
        fonts?: ResourceType[];
        audios?: ResourceType[];
        css?: ResourceType[];
        js?: ResourceType[];
    }): Promise<string>;
    private loadResource;
    private countTotalResources;
    private emitProgress;
    getImage(key: string): HTMLImageElement | null;
    getVideo(key: string): HTMLVideoElement | null;
    getFont(key: string): FontFace | null;
    getAudio(key: string): HTMLAudioElement | null;
    getCss(key: string): HTMLLinkElement | null;
    getJs(key: string): HTMLScriptElement | null;
}

declare enum ResourceList {
    IMAGE = 0,
    VIDEO = 1,
    FONT = 2,
    AUDIO = 3,
    JS = 4,
    CSS = 5
}

export { ResourceList, type ResourceType, ResourceManager as default };
