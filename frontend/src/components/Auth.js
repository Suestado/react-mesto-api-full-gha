const baseURL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
  if(res.ok) {
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
    })
      .then(checkResponse)
  );
}

export function getToken(jwt) {
  return (
    fetch(`${baseURL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    })
      .then(checkResponse)
  );
}
