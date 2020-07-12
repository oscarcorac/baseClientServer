//	@ means a relative path to src folder
import Api from '@/services/Api'

export default {
	register (credentials) {
		return Api().post('register', credentials)
	},
	getCountries() {
		return fetch('http://localhost:8080/servicio/paises', {
			method: "GET", cache: 'default', headers: {
				'Content-Type': 'application/json'
			}
		});
	},
	getStates(payload) {
		return fetch('http://localhost:8080/servicio/estados', {
			method: "POST", body: payload, headers: {
				'Content-Type': 'application/json'
			}
		});
	},
	getCities(payload) {
		return fetch('http://localhost:8080/servicio/ciudades', {
			method: "POST", body: payload, headers: {
				'Content-Type': 'application/json'
			}
		});
	},
	saveUser(payload) {
		return fetch('http://localhost:8080/servicio/guardar', {
			method: "POST", body: JSON.stringify(payload), headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
