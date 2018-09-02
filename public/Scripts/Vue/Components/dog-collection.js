Vue.component('dog-collection', {
    props: {
        category: {
            type: String,
            required: true
        },
        authenticated: {
            type: Boolean,
            required: true
        },
    },
    template: '\
    <div>\
        <button @click="addDog" class="button btn-primary">Add {{category}}</button>\
        <div v-for="(dog, dogIndex) in dogs" >\
            <dog-component :dog="dog" :dogIndex="dogIndex" :authenticated="authenticated">\
            </dog-component>\
        </div>\
        <h4 v-if="dogs.length == 0">\
            We do not have any {{category}}s at the moment.\
        </h4>\
    </div>',
    methods:
    {
        setDogs: function (dogs) {
            for (var i = 0 ; i < dogs.length; i++)
                dogs[i] = this.mapDog(dogs[i]);
            this.dogs = dogs;
            this.loading = false;
        },
        addDog: function (dogs) {
            var createdDog = {
                Name: "New Dog",
                Category: this.category,
                Nickname: "New Dog",
                Grading: "",
                Achievements: [],
                Images: []
            };
            $.post("dogs/", createdDog, this.newDog);

        },
        mapDog: function (dog) {
            dog.Achievements = dog.Achievements || [];
            return dog;
        },
        newDog: function(dog){
            this.dogs.push(this.mapDog(dog));
        },
        deleteDog: function () {
            $.delete("dogs/" + this.dog._id, this.setDeleted);

        },
        editDog: function () {
            this.editing = true;
        },
        setDeleted: function () {
            this.deleted = true;
        }
    },
    data: function () {
        return {
            dogs: [],
            editing: false,
            loading: true
        }
    },
    created: function () {
        $.get("dogs/" + this.category, this.setDogs);
    }
}

);