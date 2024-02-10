
## web-resource-loader
Load all resources (images, videos, fonts, audio) asynchronously and wait for complete.

### Installation
```bash
npm install web-resource-loader
```

### Usage
```javascript
import ResourceManager from 'web-resource-loader'

const resourceManager = new ResourceManager();

const imagesList = [{
    key: "myImageKey",
    src: "./assets/images/myImage.png"
},
{
    key: "myImageOtherKey",
    src: "./assets/images/mySecondImage.png"
}]

const videosList = [{
    key: "video",
    src: "./assets/video/video.mp4"
}]

const fontsList = [{
    key: "myFont",
    src: "./assets/audio/myFont.ttf"
}]

const audiosList = [{
    key: "alert",
    src: "./assets/audio/alert.mp3"
}]

resourceManager.loadResources({
    images: imagesList,
    videos: videosList,
    fonts: fontsList,
    audios: audiosList
}).then((message) => {
    // all resources are loaded do what you want after
    console.log(message);

    const theSecondImage = resourceManager.getImage("theSecondImage");

    if (theSecondImage == null) {
        console.log("theSecondImage not loaded")
    } else {
        theSecondImage.getData(); // return HTMLImageElement
    }
}).catch((err) => console.error(err))

resourceManager.addEventListener("start", () => {
    console.log("Resource loading starts")
})

resourceManager.addEventListener("progress", (e: any) => {
    // e.detail.totalResources display total resources to load
    // e.detail.loadedResources display loaded resources
    // e.detail.percentage display percentage
    console.log("Progress", e.detail)
})
```

You need define one key for each item. The keys are unique for each category.
Methods available for fetch your resoures are: 
- **getImage(key)**
- **getVideo(key)**
- **getFont(key)**
- **getAudio(key)**

use the paramater **data** or the method **getData()** for get your resource data.