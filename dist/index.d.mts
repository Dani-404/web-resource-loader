declare class Resource {
    key: string;
    data: any;
    constructor({ key, data }: {
        key: string;
        data: any;
    });
    getData(): any;
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
    diverses: Resource[];
    totalResources: number;
    constructor();
    loadResources({ images, videos, fonts, audios, diverses, css, js }: {
        images?: ResourceType[];
        videos?: ResourceType[];
        fonts?: ResourceType[];
        audios?: ResourceType[];
        css?: ResourceType[];
        js?: ResourceType[];
        diverses?: ResourceType[];
    }): Promise<string>;
    private loadResource;
    private countTotalResources;
    private emitProgress;
    getImage(key: string): HTMLImageElement | null;
    getVideo(key: string): HTMLVideoElement | null;
    getFont(key: string): FontFace | null;
    getAudio(key: string): HTMLAudioElement | null;
    getDiverse(key: string): any;
    getCss(key: string): HTMLLinkElement | null;
    getJs(key: string): HTMLScriptElement | null;
}

declare enum ResourceList {
    IMAGE = 0,
    VIDEO = 1,
    FONT = 2,
    AUDIO = 3,
    DIVERSE = 4,
    JS = 5,
    CSS = 6
}

export { ResourceList, type ResourceType, ResourceManager as default };
