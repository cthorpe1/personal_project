export const getPhotos = filters => {
  return fetch('http://localhost:8000/app/photos', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('token')}`
    },
    method: "POST",
    body: JSON.stringify(filters)
  })
    .then(res => res.json())
}

export const addPhotoRef = photoObject => {
  return fetch('http://localhost:8000/app/photos/new', {
    headers: {
      'Content-Type': 'application/json',
       'Authorization': `JWT ${localStorage.getItem('token')}`
    },
    method: 'POST',
    body: JSON.stringify(photoObject)
  })
}