export const getTrips = (filters) => {
  return fetch('http://localhost:8000/app/trips', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('token')}`
    },
    method: "POST",
    body: JSON.stringify(filters)
  })
    .then(res => res.json())
}

export const addTrip = tripObject => {
  return fetch('http://localhost:8000/app/trips/new', {
    headers: {
      'Content-Type': 'application/json',
       'Authorization': `JWT ${localStorage.getItem('token')}`
    },
    method: 'POST',
    body: JSON.stringify(tripObject)
  })
}