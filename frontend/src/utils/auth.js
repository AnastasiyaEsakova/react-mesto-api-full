export class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
    };
    this._handleReturnPromise = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ошибка: ${res.status} ${res.statusText} :(`);
    };
  }
  register = (password, email) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ password, email }),
    })
      .then((res) => this._handleReturnPromise(res))
      .then((res) => {
        return res;
      });
  }
  authorize = (password, email) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ password, email }),
    })
      .then((res) => this._handleReturnPromise(res))
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        return data;
      });
  };
  getContent = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
      .then((res) => this._handleReturnPromise(res))
      .then((data) => data);
  };
  signOut = () => {
    return fetch(`${this._baseUrl}/signout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
    .then((res) => this._handleReturnPromise(res))
    .then((data) => data);
  }
}
// const auth = new Auth("https://api.mesto.esakova.nomoredomains.xyz");
const auth = new Auth("http://localhost:8080");
export default auth;
