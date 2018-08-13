
getCustomer(1, (customer) => {
  console.log('Customer: ', customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log('Top movies: ', movies);
      sendEmail(customer.email, movies, () => {
        console.log('Email sent...')
      });
    });
  }
});


//ProcessMoviesByCustomer(1);



async function ProcessMoviesByCustomer(customerId) 
{
  try{
    const customer = await getCustomerAsync(customerId);
    if(customer.isGold){
      const movies = await getTopMoviesAsync(customer);
      console.log(movies);
      const emailSent = await sendEmailAsync(customer.email, movies);
      if(emailSent)
        console.log('E-mail sent');
    } else {
      console.log('Customer isn`t gold');
    }
  }
  catch(err) {
    console.log('Something went wrong', err.message);
  }
}

function getCustomer(id, callback) {
  setTimeout(() => {
    callback({ 
      id: 1, 
      name: 'Mosh Hamedani', 
      isGold: true, 
      email: 'email' 
    });
  }, 4000);  
}

function getCustomerAsync(id) {
  return new Promise((resolve, reject) => {
    console.log('Obtaining client of id', id);
    setTimeout(() => {
      resolve({
        id: id, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      })
    }, 2000);
  });
}


function getTopMovies(callback) {
  setTimeout(() => {
    callback(['movie1', 'movie2']);
  }, 4000);
}


function getTopMoviesAsync(customer) {
  return new Promise((resolve, reject) => {
    console.log('Obtaining top movies of', customer.name);
    setTimeout(() => {
        resolve(['movie1', 'movie2']);
    }, 2000);
  });
}


function sendEmail(email, movies, callback) {
  setTimeout(() => {
    callback();
  }, 4000);
}

function sendEmailAsync(email, movies) {
  return new Promise((resolve, reject) => {
    console.log('Sending e-mail');
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}