Vue.component('dog-images', {
    props: {
        images: {
            type: Array,
            required: true
        },
        directory: {
            type: String,
            required: true
        }
    },
    template: '\
        <div>\
            <div class="dog-images" v-if="images.length != 0">\
                <div class="nav nav-left" onclick="scrollDiv($(this).parent().find(\'.scrollable-parent\')[0],-300)"><i class="fa fa-angle-left"></i></div>\
                <div>\
                    <div class="scrollable-parent">\
                        <img v-for="image in images" :src="\'Images/\'+ directory +\'/\'+ image" />\
                    </div>\
                </div>\
                <div class="nav nav-right" onclick="scrollDiv($(this).parent().find(\'.scrollable-parent\')[0], 300)"><i class="fa fa-angle-right"></i></div>\
            </div>\
        </div>'
}

);