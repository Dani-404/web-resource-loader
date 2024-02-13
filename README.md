## web-resource-loader
[![NPM version](https://img.shields.io/npm/v/web-resource-loader.svg?style=flat-square)](https://www.npmjs.com/package/web-resource-loader)
[![Downloads](https://img.shields.io/npm/dm/web-resource-loader.svg?style=flat-square)](https://www.npmjs.com/package/web-resource-loader)
<br />
Load all resources (images, videos, fonts, audio, css and js files) asynchronously and wait for complete.

### Installation
```bash
npm i web-resource-loader
```

### Simple usage example
```javascript
import ResourceManager from 'web-resource-loader'

const resourceManager = new ResourceManager();

resourceManager.loadResources({
    images: [{
        key: "myKey",
        src: "https://i.imgur.com/rsjPao4.gif"
    }]
}).then((message) => {
    // all resources are loaded, do what you want after
    console.log(message);

    const myLoadedImage = resourceManager.getImage("myKey"); // return an HTMLImageElement

    if (myLoadedImage == null) {
        console.log("impossible to find the image with key myKey")
    } else {
        document.body.appendChild(myLoadedImage);
        console.log(myLoadedImage)
    }
}).catch((err) => console.error(err));
```

### Advanced usage
```javascript
import ResourceManager from 'web-resource-loader'

const resourceManager = new ResourceManager();

const imagesList = [{
    key: "myImageKey",
    src: "assets/images/myImage.png"
},
{
    key: "myImageOtherKey",
    src: "https://i.imgur.com/rsjPao4.gif"
}]

const videosList = [{
    key: "videoKey",
    src: "assets/videos/video.mp4"
}]

const fontsList = [{
    key: "myFont",
    src: "assets/fonts/myFont.ttf"
}]

const audiosList = [{
    key: "alert",
    src: "assets/audios/alert.mp3"
}]

const diversesList = [{
    key: "3dmodel",
    src: "assets/3d/model.glb"
},
{
    key: "myJson",
    src: "http://example.com/myJson.json"
}]

const cssList = [{
    key: "myCssFile",
    src: "assets/css/file.css"
}]

const jsList = [{
    key: "myJsFile",
    src: "assets/js/file.js"
}]

resourceManager.addEventListener("start", () => {
    console.log("Resource loading starts")
})

resourceManager.addEventListener("progress", (e) => {
    // e.detail.totalResources display total resources to load
    // e.detail.loadedResources display loaded resources
    // e.detail.percentage display percentage
    console.log("Progress", e.detail)
})

resourceManager.loadResources({
    images: imagesList,
    videos: videosList,
    fonts: fontsList,
    audios: audiosList,
    diverses: diversesList, // return an fetch() response
    css: cssList, // append automatically in <head></head>
    js: jsList // append automatically in <head></head>
}).then(async (message) => {
    // all resources are loaded, do what you want after
    console.log(message);

    const myJson = await resourceManager.getDiverse("myJson").json(); // return an JSON parsed data
    console.log(myJson);
}).catch((err) => console.error(err));
```

You need define one key for each item. The keys are unique for each category.
Methods available for fetch your resoures are: 
- **getImage(key)**
- **getVideo(key)**
- **getFont(key)**
- **getAudio(key)**
- **getDiverse(key)**
- **getJs(key)**
- **getCss(key)**