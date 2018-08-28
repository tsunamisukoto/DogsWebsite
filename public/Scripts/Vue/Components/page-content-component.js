Vue.component('page-content-component', {
    props: {
        uniqueName: {
            type: String,
            required: true
        },
        authenticated: {
            type: Boolean,
            required: true
        }
    },
    template: '\
    <div>\
        <div v-if="content" class="page-content">\
            <div v-if="editMode">\
                <input type="text" class="form-control" v-model="content.Title" />\
                <textarea class="form-control" v-model="content.Content" rows="8"></textarea>\
                <button @click="updateContent" v-if="authenticated">\
                    Save\
                </button>\
            </div>\
            <div v-else>\
                <h3 v-if="content.Title" v-html="content.Title"></h3>\
                <span v-if="content.Content" v-html="content.Content.replace(\'\\n\',\'<br/>\')"></span>\
                <span v-if="authenticated">\
                    <h4 v-if="(!content.Title) && (!content.Content)">\
                        You can configure content that appears here.\
                    </h4>\
                    <a @click="editMode = true" v-if="authenticated">\
                        Configure\
                    </a>\
                </span>\
            </div>\
        </div>\
    </div>',
    methods:
    {
        setContent: function (content) {
            content.Title = content.Title || '';
            content.Content = content.Content || '';
            this.content = content;
            this.editMode = false;
        },
        updateContent: function () {
            $.put("pagecontent/" + this.content._id, this.content, this.setContent);
        }
    },
    data: function () {
        return {
            content: null,
            editMode: false
        }
    },
    created: function () {
        $.get("pagecontent/" + this.uniqueName, this.setContent);
    }
}

);