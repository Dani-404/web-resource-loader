import { Resource } from "./Resource";
import { ResourceList } from "./ResourceList";
import { ResourceType } from "./Types/ResourceType";

export default class ResourceManager extends EventTarget {
    images: Resource[];
    videos: Resource[];
    fonts: Resource[];
    audios: Resource[];
    css: Resource[];
    js: Resource[];
    diverses: Resource[];
    totalResources: number;

    constructor() {
        super();

        this.images = [];
        this.videos = [];
        this.fonts = [];
        this.audios = [];
        this.css = [];
        this.js = [];
        this.diverses = [];
        this.totalResources = 0;
    }

    public loadResources({ images = [], videos = [], fonts = [], audios = [], diverses = [], css = [], js = [] }: { images?: ResourceType[]; videos?: ResourceType[]; fonts?: ResourceType[]; audios?: ResourceType[]; css?: ResourceType[]; js?: ResourceType[], diverses?: ResourceType[] }): Promise<string> {
        return new Promise((resolve, reject) => {
            this.totalResources = images.length + videos.length + fonts.length + audios.length + diverses.length + css.length + js.length;

            const listOfPromise = [];

            for (let i in images) {
                const { key, src } = images[i];

                const countItems = images.filter((image) => image.key.toUpperCase() == key.toUpperCase());
                if (countItems.length > 1)
                    console.warn(`[WARNING] Duplicate image key ${key}`)

                listOfPromise.push(this.loadResource({
                    type: ResourceList.IMAGE,
                    key,
                    src
                }));
            }

            for (let i in videos) {
                const { key, src } = videos[i];

                const countItems = videos.filter((video) => video.key.toUpperCase() == key.toUpperCase());
                if (countItems.length > 1)
                    console.warn(`[WARNING] Duplicate video key ${key}`)

                listOfPromise.push(this.loadResource({
                    type: ResourceList.VIDEO,
                    key,
                    src
                }));
            }

            for (let i in fonts) {
                const { key, src } = fonts[i];

                const countItems = fonts.filter((font) => font.key.toUpperCase() == key.toUpperCase());
                if (countItems.length > 1)
                    console.warn(`[WARNING] Duplicate font key ${key}`)

                listOfPromise.push(this.loadResource({
                    type: ResourceList.FONT,
                    key,
                    src
                }));
            }

            for (let i in audios) {
                const { key, src } = audios[i];

                const countItems = audios.filter((audio) => audio.key.toUpperCase() == key.toUpperCase());
                if (countItems.length > 1)
                    console.warn(`[WARNING] Duplicate audio key ${key}`)

                listOfPromise.push(this.loadResource({
                    type: ResourceList.AUDIO,
                    key,
                    src
                }));
            }

            for (let i in diverses) {
                const { key, src } = diverses[i];

                const countItems = diverses.filter((diverse) => diverse.key.toUpperCase() == key.toUpperCase());
                if (countItems.length > 1)
                    console.warn(`[WARNING] Duplicate diverse key ${key}`)

                listOfPromise.push(this.loadResource({
                    type: ResourceList.DIVERSE,
                    key,
                    src
                }));
            }

            for (let i in css) {
                const { key, src } = css[i];

                const countItems = css.filter((cssFile) => cssFile.key.toUpperCase() == key.toUpperCase());
                if (countItems.length > 1)
                    console.warn(`[WARNING] Duplicate css key ${key}`)

                listOfPromise.push(this.loadResource({
                    type: ResourceList.CSS,
                    key,
                    src
                }));
            }

            for (let i in js) {
                const { key, src } = js[i];

                const countItems = js.filter((jsFile) => jsFile.key.toUpperCase() == key.toUpperCase());
                if (countItems.length > 1)
                    console.warn(`[WARNING] Duplicate js key ${key}`)

                listOfPromise.push(this.loadResource({
                    type: ResourceList.JS,
                    key,
                    src
                }));
            }

            this.dispatchEvent(new CustomEvent("start"));
            Promise.all(listOfPromise)
                .then(() => resolve(`[ResourceManager] All resources have been loaded (${images.length} images, ${videos.length} videos, ${fonts.length} fonts, ${audios.length} audios, ${diverses.length} diverses files, ${js.length} js files, ${css.length} css files).`))
                .catch((e) => reject(`[ResourceManager ERROR] ${e}`));
        });
    }

    private loadResource({ type, key, src }: { type: ResourceList; key: string; src: string }): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const instance = this;

            switch (type) {
                case ResourceList.IMAGE: {
                    const image = new Image();

                    image.onload = function () {
                        const imageResource = new Resource({
                            key: key.toUpperCase(),
                            data: image
                        });
                        instance.images.push(imageResource);
                        instance.emitProgress();

                        resolve(`Image ${key} loaded.`)
                    };

                    image.onerror = function () {
                        reject(`Impossible to load image ${key} (${src}).`)
                    };

                    image.src = src;
                    break;
                }

                case ResourceList.VIDEO: {
                    const video = document.createElement("video") as HTMLVideoElement;

                    video.onloadeddata = function () {
                        const videoResource = new Resource({
                            key: key.toUpperCase(),
                            data: video
                        });
                        instance.videos.push(videoResource);
                        instance.emitProgress();

                        resolve(`Video ${key} loaded.`)
                    };

                    video.onerror = function () {
                        reject(`Impossible to load video ${key} (${src}).`)
                    };

                    video.src = src;
                    video.load();
                    break;
                }

                case ResourceList.FONT: {
                    const fontFile = new FontFace(
                        key,
                        `url(${src})`,
                    );
                    document.fonts.add(fontFile);

                    try {
                        const fontLoad = await fontFile.load();

                        const fontResource = new Resource({
                            key: key.toUpperCase(),
                            data: fontLoad
                        });
                        instance.fonts.push(fontResource);
                        instance.emitProgress();

                        resolve(`Font ${key} loaded.`)
                    }
                    catch (e) {
                        reject(`Impossible to load font ${key} (${src}).`)
                    }
                    break;
                }

                case ResourceList.AUDIO: {
                    const audio = new Audio(src);

                    audio.onloadeddata = function () {
                        const audioResource = new Resource({
                            key: key.toUpperCase(),
                            data: audio
                        });
                        instance.audios.push(audioResource);
                        instance.emitProgress();

                        resolve(`Audio ${key} loaded.`)
                    };

                    audio.onerror = function () {
                        reject(`Impossible to load audio ${key} (${src}).`)
                    };
                    break;
                }

                case ResourceList.DIVERSE: {
                    try {
                        let file = await fetch(src);

                        if (file == null || !file.ok) {
                            reject(`Impossible to load diverse file ${key} (${src}).`)
                            return;
                        }

                        const diverseResource = new Resource({
                            key: key.toUpperCase(),
                            data: file
                        });
                        instance.diverses.push(diverseResource);
                        instance.emitProgress();

                        resolve(`Diverse file ${key} loaded.`)
                    }
                    catch (e) {
                        reject(`Impossible to load diverse file ${key} (${src}).`)
                    }
                    break;
                }

                case ResourceList.JS: {
                    const script = document.createElement("script");

                    script.onload = function () {
                        const jsResource = new Resource({
                            key: key.toUpperCase(),
                            data: script
                        });
                        instance.js.push(jsResource);
                        instance.emitProgress();

                        resolve(`JS ${key} loaded.`)
                    };

                    script.onerror = function () {
                        reject(`Impossible to load js ${key} (${src}).`)
                    };

                    script.src = src;
                    document.head.appendChild(script);
                    break;
                }

                case ResourceList.CSS: {
                    let link = document.createElement("link");
                    link.type = 'text/css';
                    link.rel = 'stylesheet';

                    link.onload = function () {
                        const cssResource = new Resource({
                            key: key.toUpperCase(),
                            data: link
                        });
                        instance.css.push(cssResource);
                        instance.emitProgress();

                        resolve(`CSS ${key} loaded.`)
                    };

                    link.onerror = function () {
                        reject(`Impossible to load css ${key} (${src}).`)
                    };

                    link.href = src;
                    document.head.appendChild(link);
                    break;
                }
            }
        });
    }

    private countTotalResources(): number {
        return this.images.length + this.videos.length + this.fonts.length + this.audios.length
    }

    private emitProgress(): void {
        const loadedResources = this.countTotalResources();

        this.dispatchEvent(new CustomEvent("progress", {
            detail: {
                totalResources: this.totalResources,
                loadedResources: loadedResources,
                percentage: (loadedResources / this.totalResources) * 100
            }
        }));
    }

    public getImage(key: string): HTMLImageElement | null {
        for (let i in this.images) {
            const image = this.images[i];

            if (image.key == key.toUpperCase())
                return image.getData() as HTMLImageElement;
        }

        return null;
    }

    public getVideo(key: string): HTMLVideoElement | null {
        for (let i in this.videos) {
            const video = this.videos[i];

            if (video.key == key.toUpperCase())
                return video.getData() as HTMLVideoElement;
        }

        return null;
    }

    public getFont(key: string): FontFace | null {
        for (let i in this.fonts) {
            const font = this.fonts[i];

            if (font.key == key.toUpperCase())
                return font.getData() as FontFace;
        }

        return null;
    }

    public getAudio(key: string): HTMLAudioElement | null {
        for (let i in this.audios) {
            const audio = this.audios[i];

            if (audio.key == key.toUpperCase())
                return audio.getData() as HTMLAudioElement;
        }

        return null;
    }

    public getDiverse(key: string): any {
        for (let i in this.diverses) {
            const diverse = this.diverses[i];

            if (diverse.key == key.toUpperCase())
                return diverse.getData();
        }

        return null;
    }

    public getCss(key: string): HTMLLinkElement | null {
        for (let i in this.css) {
            const cssFile = this.css[i];

            if (cssFile.key == key.toUpperCase())
                return cssFile.getData() as HTMLLinkElement;
        }

        return null;
    }

    public getJs(key: string): HTMLScriptElement | null {
        for (let i in this.js) {
            const jsFile = this.js[i];

            if (jsFile.key == key.toUpperCase())
                return jsFile.getData() as HTMLScriptElement;
        }

        return null;
    }
}