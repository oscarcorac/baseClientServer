<template>
	<div class="animated fadeIn">
		<div class="row">
			<div ref="success" v-if="successMessage" class="ml-auto mr-5 alert alert-success" role="alert">
				{{successMessage}}
			</div>
		</div>
		<div class="container" style="max-width: 400px">
			<div class="card">
				<div class="h4 card-header text-uppercase font-weight-bold">
					{{'Register Form'}}
				</div>
				<div class="card-body">
					<b-icon v-if="loading" icon="three-dots" animation="cylon" font-scale="4"></b-icon>
					<user-data-form 
						v-if="!loading" 
						:errors="errors" 
						:message-errors="messageErrors" 
						:form="form"
						:countries="countries"
						:states="states"
						:cities="cities" 
						class="mb-3"
						@requestData="requestNewUser" 
						@requestStates="requestStates" 
						@requestCities="requestCities"/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

import UserDataForm from '../components/UserForm'
import Auth from '@/services/Auth'

export default {
	name: 'NewUser',
	components: {
		UserDataForm
	},
	data () {
		return {
			auth: Auth,
			form: {
				name: '',
				age: '',
				country: '',
				state: '',
				city: ''
			},
			errors: {},
			messageErrors: '',
			countries: [],
			states: [],
			cities: [],
			loading: false,
			successMessage: ''
		}
	},
	computed: {
	},
	mounted () {
		this.auth.getCountries().then((response) => {
			return response.json() 
		}).catch(() => {
			this.handleUnsuccess()
		}).then((data) => {
			this.countries = data
		})
	},
	methods: {
		requestNewUser (payload) {
			this.loading = true
			this.auth.register(payload).then((response) => {
				const { data } = response
				const apiPayload = {
					nombre: data.name,
					edad: data.age,
					ciudadId: data.city
				}
				this.auth.saveUser(apiPayload).then((response) => {
					return response.json() 
				}).catch(() => {
					this.handleUnsuccess()
				}).then((data) => {
					this.successMessage = data.resultado
					this.loading = false
				})
			}).catch((error) => {
				this.handleUnsuccess()
				if (typeof error.response !== 'undefined') {
					this.errors = error.response.data.errors.fields
					this.messageErrors = error.response.data.errors.message
				} else {
					this.errors = {}
					this.messageErrors = ''
				}
			})
		},
		requestStates (payload) {
			this.auth.getStates(payload).then((response) => {
				return response.json() 
			}).catch((error) => {
				console.log(error)
			}).then((data) => {
				this.states = data
			})
		},
		requestCities (payload) {
			this.auth.getCities(payload).then((response) => {
				return response.json() 
			}).catch((error) => {
				console.log(error)
			}).then((data) => {
				this.cities = data
			})
		},
		handleUnsuccess(value){
			this.successMessage = ''
			this.loading = false
		}
	}
}
</script>
