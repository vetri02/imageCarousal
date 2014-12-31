var carousel = function() {

    "use strict"

    return {

        init: function() {

            var self = this;

            this.imgContainer = document.getElementById('imgContainer');
            this.imgs = document.getElementsByClassName('image');
            this.imgBlockWidth = this.imgs[0].offsetWidth;
            this.imgsLength = this.imgs.length;
            this.firstval = 0;
            this.imageview = document.getElementById('imageview');
            this.zoom = document.getElementById("zoom");

            //Start Carousal
            this.startCarousal();

            for (var i = 0; i < self.imgsLength; i++) {

                (function(i) { // Closure for remembering the index

                    self.imgs[i].addEventListener("mouseover", function(e) {
                        self.mouseEnterImg(e, self.imgs[i].firstChild);
                        
                    });

                    self.imgs[i].addEventListener("mousemove", function(e) {
                        self.mouseEnterImg(e, self.imgs[i].firstChild);
                    });

                    self.imgs[i].addEventListener("mouseout", function() {
                        self.mouseLeaveImg();
                    });

                })(i);

            }




        },
        mouseEnterImg: function(e, imgInp) {

            var self = this;

            clearTimeout(self.runCarousel);

            var x, y;
            if (e) {
                x = e.clientX;
                y = e.clientY;
            } else {
                x = event.clientX;
                y = event.clientY;
            }

            console.log(x);
            console.log(y);



            var zoomCtx = this.zoom.getContext("2d");
            var img = new Image();
            img.src = imgInp.src



            zoomCtx.drawImage(img, x, y, 200, 100, 0, 0, 300, 150);
            console.log(this.zoom.style);

            this.zoom.style.display = "block";

        },
        mouseLeaveImg: function() {

            var self = this;

            self.startCarousal();
            this.zoom.style.display = "none";

        },
        setCarousal: function() {

            var self = this;

            this.firstval += 10; // move 10px on each iteration can make it as a option with time constraint


            this.imgContainer.style.left = "-" + this.firstval + "px";
            if (this.firstval >= (this.imgBlockWidth * this.imgsLength)) {
                this.imgContainer.style.left = "0";
                this.firstval = 0;
                this.startCarousal(3000);
                return;
            }

            if (!(this.firstval % this.imgBlockWidth)) {
                this.startCarousal(3000);
                return;
            }

            this.runCarousel = setTimeout(self.setCarousal.bind(this), 20); // Run continously

        },
        startCarousal: function(timeout) {
            var self = this,
                timeout = timeout || 20;

            clearTimeout(self.runCarousel);
            this.runCarousel = setTimeout(self.setCarousal.bind(this), timeout); // Run continously
        }

    }

}();

carousel.init();
