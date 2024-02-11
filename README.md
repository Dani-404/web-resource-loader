
## web-resource-loader
Load all resources (images, videos, fonts, audio) asynchronously and wait for complete.

### Installation
```bash
npm install web-resource-loader
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

    const myLoadedImage = resourceManager.getImage("myKey");

    if (myLoadedImage == null) {
        console.log("impossible to find the image with key myKey")
    } else {
        const imageData = myLoadedImage.getData(); // return HTMLImageElement
        console.log("imageData", imageData)
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
}).catch((err) => console.error(err));
```

You need define one key for each item. The keys are unique for each category.
Methods available for fetch your resoures are: 
- **getImage(key)**
- **getVideo(key)**
- **getFont(key)**
- **getAudio(key)**

use the parameter **data** or the method **getData()** for get your resource data.