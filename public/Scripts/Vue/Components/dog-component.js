Vue.component('dog-component', {
    props: {
        dog: {
            type: Object,
            required: true
        },
        authenticated: {
            type: Boolean,
            required: true
        },
        dogIndex: {
            type: Number,
            default: 0
        }
    },
    template: '\
    <div>\
        <div class="layout-table" v-show="!deleted" v-if="!editing">\
            <div class="dog-name">\
                <span v-if="dog.Name" v-html="dog.Name" ></span>\
                <a @click="deleteDog(dog)" v-if="authenticated" class="command">\
                    Delete\
                </a>\
                <a @click="editDog(dog)"  v-if="authenticated" class="command">\
                    Edit\
                </a>\
            </div>\
            <div class="heading">\
                <div v-if="dog.Nickname" v-html="dog.Nickname" class="dog-nickname">\
                </div>\
                <div v-if="dog.Grading" v-html="dog.Grading" class="dog-grading">\
                </div>\
		    </div>\
			<div>\
                <div class="dog-info-one">\
				    <div class="dog-images">\
					    <div v-for="image in dog.Images">\
						    <img :src="\'Images/\'+dog.Nickname + \'/\'+ image"/>\
					    </div>\
				    </div>\
                    <div class="dog-parents">\
                        <div class="dog-sire" v-if="dog.Sire">\
                        </div>\
                        <div class="dog-dame"  v-if="dog.Dame">\
                        </div>\
                    </div>\
                </div>\
                <div class="dog-achievements" v-if="dog.Achievements.length != 0">\
					<strong>Achievements</strong>\
					<ul>\
						<li v-for="achievementGrouping in dog.Achievements">\
							<strong>{{achievementGrouping.Grouping }}</strong>\
					        <ul>\
						        <li v-for="achievement in achievementGrouping.Achievements">\
                                    {{achievement.Name}}\
                                </li>\
                            </ul>\
						</li>\
					</ul>\
				</div>\
			</div>\
		</div>\
        <div v-else>\
            <div class="form-group">\
                <strong>Full Name</strong><br/>\
                <input type="text" class="form-control" v-model="dog.Name"/><br/>\
            </div>\
            <div class="form-group">\
                <strong>Nickname</strong><br/>\
                <input type="text" class="form-control" v-model="dog.Nickname"/><br/>\
            </div>\
            <div class="form-group">\
                <strong>Grading</strong><br/>\
                <input type="text" class="form-control" v-model="dog.Grading"/><br/>\
            </div>\
            <div class="form-group">\
                <strong>Achievements</strong>\
                <a @click="addGrouping(dog)">Add Grouping</a>\
				<ul>\
					<li v-for="achievementGrouping in dog.Achievements">\
                        <input type="text" class="form-control" v-model="achievementGrouping.Grouping"/>\
                        <a @click="addAchievement(achievementGrouping)">Add Achievement</a>\
					    <ul>\
						    <li v-for="achievement in achievementGrouping.Achievements">\
                                <input type="text" class="form-control" v-model="achievement.Name"/>\
                                <a @click="achievementGrouping.Achievements.splice(achievement)">remove</a>\
                            </li>\
                        </ul>\
					</li>\
				</ul>\
            </div>\
            <div class="form-group">\
                <button v-if="dog.Sire == null" @click="addSire" class="button btn-primary">Add Sire</button>\
                <div v-else>\
                    <strong>Sire</strong>\
                    <div class="form-group">\
                        <strong>Full Name</strong><br/>\
                        <input type="text" class="form-control" v-model="dog.Sire.Name"/><br/>\
                    </div>\
                    <div class="form-group">\
                        <strong>Nickname</strong><br/>\
                        <input type="text" class="form-control" v-model="dog.Sire.Nickname"/><br/>\
                    </div>\
                    <div class="form-group">\
                        <strong>Grading</strong><br/>\
                        <input type="text" class="form-control" v-model="dog.Sire.Grading"/><br/>\
                    </div>\
                </div>\
            </div>\
            <div class="form-group">\
                <button v-if="dog.Dame == null" @click="addDame" class="button btn-primary">Add Dame</button>\
                <div v-else>\
                    <strong>Dame</strong>\
                    <div class="form-group">\
                        <strong>Full Name</strong><br/>\
                        <input type="text" class="form-control" v-model="dog.Dame.Name"/><br/>\
                    </div>\
                    <div class="form-group">\
                        <strong>Nickname</strong><br/>\
                        <input type="text" class="form-control" v-model="dog.Dame.Nickname"/><br/>\
                    </div>\
                    <div class="form-group">\
                        <strong>Grading</strong><br/>\
                        <input type="text" class="form-control" v-model="dog.Dame.Grading"/><br/>\
                    </div>\
                </div>\
            </div>\
            <button class="button btn-success" @click="saveDog">Save</button>\
        </div>\
    </div>',
    methods:
    {
        deleteDog: function () {
            $.delete("dogs/" + this.dog.rowid, this.setDeleted);

        },
        saveDog: function () {
            $.put("dogs/" + this.dog.rowid, this.dog, this.stopEditingDog);
        },
        addAchievement: function (grouping) {
            grouping.Achievements.push({ Name: "" });
        },
        addGrouping: function (dog) {
            dog.Achievements.push({ Grouping: "", Achievements: [] });
        },
        stopEditingDog: function () {
            this.editing = false;
        },
        addSire: function () {
            this.dog.Sire = {
                Name: '',
                Nickname: '',
                Grading: ''
            }
        },
        addDame: function () {
            this.dog.Dame = {
                Name: '',
                Nickname: '',
                Grading: ''
            }
        },
        editDog: function () {
            this.editing = true;
        },
        setDeleted: function () {
            this.deleted = true;
        },
        forceUpdate: function () {
            this.$forceUpdate();
        }
    },
    data: function () {
        return {
            deleted: false,
            editing: false
        }
    },
    created: function () {
        this.dog.Images = [];
        this.dog.Dame = this.dog.Dame||null;
        this.dog.Sire = this.dog.Sire||null;
        var dog = this.dog;
        var forceUpdate = this.forceUpdate;
        $.get("/Images/" + dog.Nickname, function (retdata) {
            dog.Images = retdata || [];
            forceUpdate();
        });
    }
}

);