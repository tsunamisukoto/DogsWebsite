Vue.component('auth-component', {
    template: '\
    <div>\
        <div v-if="!authenticated && show">\
            <a @click="loggingIn = true" v-if="!loggingIn">Login</a>\
            <div v-else>\
                <strong>Usermname</strong><br/>\
                <input type="text" v-model="currentUsername"/>\
                <strong>Password</strong><br/>\
                <input type="password" v-model="currentPassword" style="width:100%"/>\
                <button class="btn-primary" @click="logIn">Login</button>\
            </div>\
        </div>\
    </div>',
    methods:
    {
        logIn: function () {
            $.post("auth", { unm: this.currentUsername, pwd: this.currentPassword }, this.setAuthenticated);
        },
        setAuthenticated: function (auth) {
            this.authenticated = ((auth === true) || (auth == "true"));
            if (this.authenticated)
                this.$emit("authed");
        }
    },
    props: {
        show: {
            type: Boolean
        }
    },
    data: function () {
        return {
            loggingIn: false,
            currentPassword: '',
            currentUsername: '',
            authenticated: false
        }
    },
    created: function () {
        $.get("auth", this.setAuthenticated);
    }
}

);