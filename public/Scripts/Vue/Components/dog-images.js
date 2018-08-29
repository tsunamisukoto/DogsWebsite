Vue.component('dog-images', {
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    template: '\
         <div class="dog-images">\
            <div>\
                <div class="nav nav-left"></div>\
                <div v-for="image in images">\
                    <img :src="\'Images/Puppies/\'+ image" />\
                </div>\
                <div class="nav nav-right"></div>\
            </div>\
        </div>'
}

);