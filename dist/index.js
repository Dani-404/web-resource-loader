"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ResourceList: () => ResourceList,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/Resource/Resource.ts
var Resource = class {
  constructor(key, data) {
    this.key = key;
    this.data = data;
  }
  getData() {
    return this.data;
  }
};

// src/Resource/Image/ImageResource.ts
var ImageResource = class extends Resource {
  constructor({ key, data }) {
    super(key, data);
  }
};

// src/Resource/Video/VideoResource.ts
var VideoResource = class extends Resource {
  constructor({ key, data }) {
    super(key, data);
  }
};

// src/Resource/Font/FontResource.ts
var FontResource = class extends Resource {
  constructor({ key, data }) {
    super(key, data);
  }
};

// src/Resource/Audio/AudioResource.ts
var AudioResource = class extends Resource {
  constructor({ key, data }) {
    super(key, data);
  }
};

// src/Resource/ResourceList.ts
var ResourceList = /* @__PURE__ */ ((ResourceList2) => {
  ResourceList2[ResourceList2["IMAGE"] = 0] = "IMAGE";
  ResourceList2[ResourceList2["VIDEO"] = 1] = "VIDEO";
  ResourceList2[ResourceList2["FONT"] = 2] = "FONT";
  ResourceList2[ResourceList2["AUDIO"] = 3] = "AUDIO";
  return ResourceList2;
})(ResourceList || {});

// src/Resource/ResourceManager.ts
var ResourceManager = class extends EventTarget {
  constructor() {
    super();
    this.images = [];
    this.videos = [];
    this.fonts = [];
    this.audios = [];
    this.totalResources = 0;
  }
  loadResources({ images = [], videos = [], fonts = [], audios = [] }) {
    return new Promise((resolve, reject) => {
      this.totalResources = images.length + videos.length + fonts.length + audios.length;
      const listOfPromise = [];
      for (let i in images) {
        const { key, src } = images[i];
        const countItems = images.filter((image) => image.key.toUpperCase() == key.toUpperCase());
        if (countItems.length > 1)
          console.warn(`[WARNING] Duplicate image key ${key}`);
        listOfPromise.push(this.loadResource({
          type: 0 /* IMAGE */,
          key,
          src
        }));
      }
      for (let i in videos) {
        const { key, src } = videos[i];
        const countItems = videos.filter((video) => video.key.toUpperCase() == key.toUpperCase());
        if (countItems.length > 1)
          console.warn(`[WARNING] Duplicate video key ${key}`);
        listOfPromise.push(this.loadResource({
          type: 1 /* VIDEO */,
          key,
          src
        }));
      }
      for (let i in fonts) {
        const { key, src } = fonts[i];
        const countItems = fonts.filter((font) => font.key.toUpperCase() == key.toUpperCase());
        if (countItems.length > 1)
          console.warn(`[WARNING] Duplicate font key ${key}`);
        listOfPromise.push(this.loadResource({
          type: 2 /* FONT */,
          key,
          src
        }));
      }
      for (let i in audios) {
        const { key, src } = audios[i];
        const countItems = audios.filter((audio) => audio.key.toUpperCase() == key.toUpperCase());
        if (countItems.length > 1)
          console.warn(`[WARNING] Duplicate audio key ${key}`);
        listOfPromise.push(this.loadResource({
          type: 3 /* AUDIO */,
          key,
          src
        }));
      }
      this.dispatchEvent(new CustomEvent("start"));
      Promise.all(listOfPromise).then(() => resolve(`[ResourceManager] All resources have been loaded (${images.length} images, ${videos.length} videos, ${fonts.length} fonts, ${audios.length} audios).`)).catch((e) => reject(`[ResourceManager ERROR] ${e}`));
    });
  }
  loadResource({ type, key, src }) {
    return new Promise((resolve, reject) => {
      const instance = this;
      switch (type) {
        case 0 /* IMAGE */: {
          const image = new Image();
          image.onload = function() {
            const imageResource = new ImageResource({
              key: key.toUpperCase(),
              data: image
            });
            instance.images.push(imageResource);
            instance.emitProgress();
            resolve(`Image ${key} loaded.`);
          };
          image.onerror = function() {
            reject(`Impossible to load image ${key} (${src}).`);
          };
          image.src = src;
          break;
        }
        case 1 /* VIDEO */: {
          const video = document.createElement("video");
          video.onloadeddata = function() {
            const videoResource = new VideoResource({
              key: key.toUpperCase(),
              data: video
            });
            instance.videos.push(videoResource);
            instance.emitProgress();
            resolve(`Video ${key} loaded.`);
          };
          video.onerror = function() {
            reject(`Impossible to load video ${key} (${src}).`);
          };
          video.src = src;
          video.load();
          break;
        }
        case 2 /* FONT */: {
          const fontFile = new FontFace(
            key,
            `url(${src})`
          );
          document.fonts.add(fontFile);
          fontFile.load().then(() => {
            const fontResource = new FontResource({
              key: key.toUpperCase(),
              data: fontFile
            });
            instance.fonts.push(fontResource);
            instance.emitProgress();
            resolve(`Font ${key} loaded.`);
          }).catch((e) => reject(`Impossible to load font ${key} (${src}).`));
          break;
        }
        case 3 /* AUDIO */: {
          const audio = new Audio(src);
          audio.onloadeddata = function() {
            const audioResource = new AudioResource({
              key: key.toUpperCase(),
              data: audio
            });
            instance.audios.push(audioResource);
            instance.emitProgress();
            resolve(`Audio ${key} loaded.`);
          };
          audio.onerror = function() {
            reject(`Impossible to load audio ${key} (${src}).`);
          };
          break;
        }
      }
    });
  }
  countTotalResources() {
    return this.images.length + this.videos.length + this.fonts.length + this.audios.length;
  }
  emitProgress() {
    const loadedResources = this.countTotalResources();
    this.dispatchEvent(new CustomEvent("progress", {
      detail: {
        totalResources: this.totalResources,
        loadedResources,
        percentage: loadedResources / this.totalResources * 100
      }
    }));
  }
  getImage(key) {
    for (let i in this.images) {
      const image = this.images[i];
      if (image.key == key.toUpperCase())
        return image;
    }
    return null;
  }
  getVideo(key) {
    for (let i in this.videos) {
      const video = this.videos[i];
      if (video.key == key.toUpperCase())
        return video;
    }
    return null;
  }
  getFont(key) {
    for (let i in this.fonts) {
      const font = this.fonts[i];
      if (font.key == key.toUpperCase())
        return font;
    }
    return null;
  }
  getAudio(key) {
    for (let i in this.audios) {
      const audio = this.audios[i];
      if (audio.key == key.toUpperCase())
        return audio;
    }
    return null;
  }
};

// src/index.ts
var src_default = ResourceManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResourceList
});
//# sourceMappingURL=index.js.map