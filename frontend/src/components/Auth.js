const baseURL = 'https://api.suestado.nomoredomains.work';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
}

export function registration(email, password) {
  return (
    fetch(`${baseURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'password': password,
        'email': email,
      }),
      credentials: 'include',
    })
      .then(checkResponse)
  );
}

export function authorization(email, password) {
  return (
    fetch(`${baseURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'password': password,
        'email': email,
      }),
      credentials: 'include',
    })
      .then(checkResponse)
  );
}

export function getToken() {
  return (
    fetch(`${baseURL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(checkResponse)
  );
}

export function logOut() {
  return (
    fetch(`${baseURL}/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(checkResponse)
  );
}
