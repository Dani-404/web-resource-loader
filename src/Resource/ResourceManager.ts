import { ImageResource } from "./Image/ImageResource";
import { VideoResource } from "./Video/VideoResource";
import { FontResource } from "./Font/FontResource";
import { AudioResource } from "./Audio/AudioResource";
import { ResourceList } from "./ResourceList";
import { ResourceType } from "./Types/ResourceType";

export default class ResourceManager extends EventTarget {
    images: ImageResource[];
    videos: VideoResource[];
    fonts: FontResource[];
    audios: AudioResource[];
    totalResources: number;

    constructor() {
        super();

        this.images = [];
        this.videos = [];
        this.fonts = [];
        this.audios = [];
        this.totalResources = 0;
    }

    public loadResources({ images = [], videos = [], fonts = [], audios = [] }: { images?: ResourceType[]; videos?: ResourceType[]; fonts?: ResourceType[]; audios?: ResourceType[] }): Promise<string> {
        return new Promise((resolve, reject) => {
            this.totalResources = images.length + videos.length + fonts.length + audios.length;

            const listOfPromise = [];

            for (let i in images) {
                const { key, src } = images[i];

                listOfPromise.push(this.loadResource({
                    type: ResourceList.IMAGE,
                    key,
                    src
                }));
            }

            for (let i in videos) {
                const { key, src } = videos[i];

                listOfPromise.push(this.loadResource({
                    type: ResourceList.VIDEO,
                    key,
                    src
                }));
            }

            for (let i in fonts) {
                const { key, src } = fonts[i];

                listOfPromise.push(this.loadResource({
                    type: ResourceList.FONT,
                    key,
                    src
                }));
            }

            for (let i in audios) {
                const { key, src } = audios[i];

                listOfPromise.push(this.loadResource({
                    type: ResourceList.AUDIO,
                    key,
                    src
                }));
            }

            this.dispatchEvent(new CustomEvent("start"));
            Promise.all(listOfPromise)
                .then(() => resolve(`[ResourceManager] All resources have been loaded (${images.length} images, ${videos.length} videos, ${fonts.length} fonts, ${audios.length} audios).`))
                .catch((e) => reject(`[ResourceManager ERROR] ${e}`));
        });
    }

    private loadResource({ type, key, src }: { type: ResourceList; key: string; src: string }): Promise<string> {
        return new Promise((resolve, reject) => {
            const instance = this;

            switch (type) {
                case ResourceList.IMAGE: {
                    if (this.getImage(key) != null) {
                        reject(`Duplicate image key ${key}.`)
                        return;
                    }

                    const image = new Image();

                    image.onload = function () {
                        const imageResource = new ImageResource({
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
                    if (this.getVideo(key) != null) {
                        reject(`Duplicate video key ${key}.`)
                        return;
                    }

                    const video = document.createElement("video") as HTMLVideoElement;

                    video.onloadeddata = function () {
                        const videoResource = new VideoResource({
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
                    break;
                }

                case ResourceList.FONT: {
                    if (this.getFont(key) != null) {
                        reject(`Duplicate font key ${key}.`)
                        return;
                    }

                    const fontFile = new FontFace(
                        key,
                        `url(${src})`,
                    );
                    document.fonts.add(fontFile);

                    fontFile.load().then(() => {
                        const fontResource = new FontResource({
                            key: key.toUpperCase(),
                            data: fontFile
                        });
                        instance.fonts.push(fontResource);
                        instance.emitProgress();

                        resolve(`Font ${key} loaded.`)
                    }).catch((e) => reject(`Impossible to load font ${key} (${src}).`))
                    break;
                }

                case ResourceList.AUDIO: {
                    if (this.getAudio(key) != null) {
                        reject(`Duplicate audio key ${key}.`)
                        return;
                    }

                    const audio = new Audio(src);

                    audio.onloadeddata = function () {
                        const audioResource = new AudioResource({
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

    public getImage(key: string): ImageResource | null {
        for (let i in this.images) {
            const image = this.images[i];
            if (image.key == key.toUpperCase())
                return image;
        }

        return null;
    }

    public getVideo(key: string): VideoResource | null {
        for (let i in this.videos) {
            const video = this.videos[i];
            if (video.key == key.toUpperCase())
                return video;
        }

        return null;
    }

    public getFont(key: string): FontResource | null {
        for (let i in this.fonts) {
            const font = this.fonts[i];
            if (font.key == key.toUpperCase())
                return font;
        }

        return null;
    }

    public getAudio(key: string): AudioResource | null {
        for (let i in this.audios) {
            const audio = this.audios[i];
            if (audio.key == key.toUpperCase())
                return audio;
        }

        return null;
    }
}