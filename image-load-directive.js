(function () {
  'use strict';

  angular.module('image-load', [])
    .config(function ($httpProvider) {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
    .directive('imageLoad', function ($compile, $http) {
      var orientation = null;

      var setOrientation = function (code) {
        orientation = code;
      };

      var getOrientation = function () {
        return orientation;
      };

      return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
          var imageUrl = null;
          scope.$watch(function () {
              // Return the model associated
              return ctrl.$modelValue;
            },
            function () {
              // If model is setted, this value is the image url
              if (ctrl.$modelValue) {
                imageUrl = ctrl.$modelValue;
              }

              // Resetting orientation
              setOrientation(null);

              // Check if url is defined
              if (imageUrl) {
                // Getting image Binary Data
                $.ajax({
                  url: imageUrl,
                  type: 'GET',
                  // Response as Blob file
                  dataType: 'binary',
                  //Dont process the file
                  processData: false,
                })
                  //$http({method: 'GET', url: imageUrl, responseType: 'arraybuffer'})
                  .done(function (response, status, headers, config) {
                    // Loading and extracting Exif data
                    loadImage.parseMetaData(
                      // Response as Blob
                      response,
                      function (data) {
                        // If exists Exif meta data, then get Orientation
                        if (data.exif) {
                          // Set File orientation to correct rotation
                          setOrientation(data.exif.get('Orientation'));
                          // Load balanced image with right width, height and class
                        }
                        loadImage(
                          imageUrl,
                          function (img) {
                            var currentNode = element.children()[0];
                            if (img.type === "error") {
                              /// TODO
                            } else {
                              // Updating DOM object
                              var e = $compile(img)(scope);
                              // Concat previews element classes with the new element
                              e.addClass(currentNode.className);
                              // Replace the DOM element
                              while (element[0].firstChild) {
                                element[0].removeChild(element[0].firstChild);
                              }
                              element.append(e);
                            }
                          },
                          {
                            // Render as canvas
                            canvas: true,
                            // Rotation
                            orientation: getOrientation(),
                            // Get width and height by attribute passed in view
                            maxHeight: attrs.height,
                            maxWidth: attrs.width
                          }
                        );
                      },
                      {
                        maxMetaDataSize: 262144,
                        disableImageHead: false
                      }
                    );
                  })
                  .fail(function (response, status, headers, config) {
                    /// TODO
                  })
              }
            }
          );
        }
      };
    });

}).call(this);