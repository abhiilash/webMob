
/**
  * Register Api
  */
export function register(formData) {
  return dispatch => { fetch(`http://68.183.48.101:3333/users/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
     return dispatch({
        type: 'registerData',
        data
      });
    })
    .catch((error) => {
        throw error
    })
  }
}

export function getUser(data) {
  const page = data.page
  const token = 'bearer' +' '+ data.token
  return dispatch => { fetch(`http://68.183.48.101:3333/users/list?page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      },
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
     return dispatch({
        type: 'userData',
        data
      });
    })
    .catch((error) => {
        throw error
    })
  }
}



