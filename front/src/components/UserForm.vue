<template>
	<form
		@submit.prevent="userInfoSubmit"
		@keydown="clearError($event.target.name)"
		@change="clearError($event.target.name)">
		<div class="form-group">
			<!-- Input Label -->
			<label
				for="name"> {{ 'Name' }} </label>
			<!-- Input Text -->
			<input
				v-model="form.name"
				id="name"
				name="name"
				type="text"
				:class="hasError('name') ? 'is-invalid' : ''"
				class="form-control">
			<template v-if="hasError('name')">
				<span
					class="invalid-feedback animated fadeIn"
					v-text="errors['name']" />
			</template>
		</div>
		<div class="form-group">
			<!-- Input Label -->
			<label
				for="age"> {{ 'Age' }} </label>
			<!-- Input Text -->
			<input
				v-model="form.age"
				id="age"
				name="age"
				type="text"
				:class="hasError('age') ? 'is-invalid' : ''"
				class="form-control">
			<template v-if="hasError('age')">
				<span
					class="invalid-feedback animated fadeIn"
					v-text="errors['age']" />
			</template>
		</div>
		<div class="form-group">
			<!-- Input Label -->
			<label
				for="country"
				class="label">{{ 'Country' }}</label>
			<select
				id="country"
				v-model="form.country"
				name="country"
				class="form-control"
				:class="hasError('country') ? 'is-invalid' : ''"
				@change="countryChange($event.target.value)">
				<option :value="''">{{ '' }}</option>
				<option
					v-for="country in countries"
					:value="country.id"
					:key="country.id">{{ country.nombre }}</option>
			</select>
			<template v-if="hasError('country')">
				<span
					class="invalid-feedback animated fadeIn"
					v-text="errors['country']" />
			</template>
		</div>
		<div class="form-group">
			<!-- Input Label -->
			<label
				for="state"
				class="label">{{ 'State' }}</label>
			<select
				id="state"
				:disabled="isCountryEmpty"
				v-model="form.state"
				name="state"
				class="form-control"
				:class="hasError('state') ? 'is-invalid' : ''"
				@change="stateChange($event.target.value)">
				<option :value="''">{{ '' }}</option>
				<option
					v-for="state in states"
					:value="state.id"
					:key="state.id">{{ state.nombre }}</option>
			</select>
			<template v-if="hasError('state')">
				<span
					class="invalid-feedback animated fadeIn"
					v-text="errors['state']" />
			</template>
		</div>
		<div class="form-group">
			<!-- Input Label -->
			<label
				for="city"
				class="label">{{ 'City' }}</label>
			<select
				id="city"
				:disabled="isStateEmpty"
				v-model="form.city"
				name="city"
				class="form-control"
				:class="hasError('city') ? 'is-invalid' : ''">
				<option :value="''">{{ '' }}</option>
				<option
					v-for="city in cities"
					:value="city.id"
					:key="city.id">{{ city.nombre }}</option>
			</select>
			<template v-if="hasError('city')">
				<span
					class="invalid-feedback animated fadeIn"
					v-text="errors['city']" />
			</template>
		</div>
		<p v-if="messageErrors">
			<span
				class="small text-danger animated fadeIn"
				v-text="messageErrors" />
		</p>
		<button
				:disabled="hasAnyError()"
				class="btn btn-primary">{{ 'Submit' }}</button>
	</form>
</template>

<script>
export default {
  name: "UserForm",
  props: {
		form: {
			type: Object,
			default () {
				return {}
			}
		},
		errors: {
			type: Object,
			default () {
				return {}
			}
		},
		messageErrors: {
			type: String,
			default () {
				return ''
			}
		},
		countries: {
			type: Array,
			default () {
				return []
			}
		},
		states: {
			type: Array,
			default () {
				return []
			}
		},
		cities: {
			type: Array,
			default () {
				return []
			}
		},
	},
	data () {
		return {
		}
	},
	computed:{
		isCountryEmpty(){
			if (this.form.country === ''){
				return true
			}
			return false
		},
		isStateEmpty(){
			if (this.form.state === ''){
				return true
			}
			return false
		}
	},
	methods:{
		hasError (field) {
			if (typeof this.errors[field] !== 'undefined') { return true }
			return false
		},
		hasAnyError () {
			if (Object.keys(this.errors).length > 0) { return true }
			return false
		},
		clearError (field) {
			if (field) {
				delete this.errors[field]
			}
		},
		userInfoSubmit () {
			this.$emit('requestData', this.form)
		},
		countryChange (countryId) {
			this.form.state = ''
			this.form.city = ''
			this.$emit('requestStates', countryId)
		},
		stateChange (stateId) {
			this.form.city = ''
			this.$emit('requestCities', stateId)
		}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
