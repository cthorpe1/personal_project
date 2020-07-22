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