import axios from 'axios';

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    paramsOrData._token = localStorage.getItem('token')

    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData})).data;
        // axios sends query string data via the "params" key,
        // and request body data via the "data" key,
        // so the key we need depends on the HTTP verb
    }

    catch(err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async findCompany(search) {
    let res = await this.request('companies', search);
    return res;
  }

  static async getCompanies() {
    let res = await this.request('companies');
    return res.companies
  }

  static async getJobs() {
    let res = await this.request('jobs');
    return res.jobs
  }

  static async findJob(search) {
    let res = await this.request('jobs', search)
    return res;
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.jobs
  }

  static async login(username, password) {
    let res = await this.request('login', {username, password}, 'post');
    return res
  }

  static async register(data) {
    let res = await this.request('users', data, 'post');
    return res
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res
  }

  static async update(username, data) {
    let res = await this.request(`users/${username}`, data, 'patch')
    return res
  }

  static async apply(id) {
    let res = await this.request(`jobs/${id}/apply`, {}, 'post')
    return res
  }
}

export default JoblyApi;