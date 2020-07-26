export const getMarkers = user => {
  return fetch('http://localhost:8000/app/markers', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('token')}`
    },
    method: "POST",
    body: JSON.stringify(user)
  })
    .then(res => res.json())
}

export const getMarkerById = (id) => {
  return fetch(`http://localhost:8000/app/markers/${id}`)
    .then(res => {
      if (res.status === 404) {
        return 'no match';
      }else {
        return res.json()
      }
    })
}

export const addMarker = markerObject => {
  return fetch('http://localhost:8000/app/markers/new', {
    headers: {
      'Content-Type': 'application/json',
       'Authorization': `JWT ${localStorage.getItem('token')}`
    },
    method: 'POST',
    body: JSON.stringify(markerObject)
  })
}

export const deleteMarker = (id) => {
  return fetch(`http://localhost:8000/app/markers/${id}/delete`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
  })
}