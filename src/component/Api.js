const post = (formInput) => {
  fetch('http://localhost:3000/student', {
    method: 'POST',
    body: JSON.stringify({
      username: formInput.userName,
      email: formInput.email,
      password: formInput.password,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export { post };
