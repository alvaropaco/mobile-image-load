# mobile-image-load
This directive allow to load and render some image through various EXIF orientation flags, in both landscape and portrait orientation.

## Installing
To install the component just:
```bash
$ bower install mobile-image-load -save
```

Then, include the necessary files into your index.html as the example below:

```html
    <script src="bower_components/Blob/Blob.js"></script>
    <script src="bower_components/blueimp-load-image/js/load-image.all.min.js"></script>
    <script src="bower_components/mobile-image-load/image-load-directive.js"></script>
```

After that, you can import the new directive using 'image-load' tag.

## Usage

This directive just work with .jpg, .gif or .png images. To correct the image orientation just add `image-load` to a parent `<div>` in your image. See the example below:
```html
<div data-ng-click="openPhotoUploadModal()" class="div80_80" height="80" width="80" ng-model="photo" image-load>
    <img src="http://localhost/statics//upload/users/profile/photo/SEJTAZ/image.jpg" class="user photo-img img80_80" ng-model="account.photo">
</div>
```
## Options
You can set some options to image render as:
- *Height*: set the height of the generated canvas just imputing the `height` attribute to the `<div>`
- *Width*: set the width of the generated canvas just imputing the `width` attribute to the `<div>`
- *Class*: setting the `class` attribute to the `<div>`, the directive replaces automatically the default style for the canvas canvas.
