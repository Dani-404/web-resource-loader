
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
    src: "assets/images/myImage.png"
},
{
    key: "myImageOtherKey",
    src: "assets/images/mySecondImage.png"
}]

const videosList = [{
    key: "video",
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
    audios: audiosList
}).then((message) => {
    // all resources are loaded, do what you want after
    console.log(message);

    const theSecondImage = resourceManager.getImage("myImageOtherKey");

    if (theSecondImage == null) {
        console.log("impossible to find the image with key myImageOtherKey")
    } else {
        const imageData = theSecondImage.getData(); // return HTMLImageElement
        console.log("imageData", imageData)
    }
}).catch((err) => console.error(err))
```

You need define one key for each item. The keys are unique for each category.
Methods available for fetch your resoures are: 
- **getImage(key)**
- **getVideo(key)**
- **getFont(key)**
- **getAudio(key)**

use the parameter **data** or the method **getData()** for get your resource data.