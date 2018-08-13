// const p = Promise.resolve({id: 1});
// p.then(id => console.log(id));  
// const p2 = Promise.reject(new Error('Reason for rejection'));
// p2.catch(err => console.log(err));

const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Getting values of p3...');
        resolve(3);
    }, 2000)
});


const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Getting values of p4...');
        resolve(4);
        // reject(new Error('Message of error'));
    }, 2000)
});


//Return when all promises are fulfilled
// Promise
//     .all([p3,p4])
//     .then(result => console.log(result))
//     // .catch(err => console.log('Error:', err.message));

//Return when the first promisse is fulfilled, wherever it is
// Promise
//     .race([p3,p4])
//     .then(result => console.log(result));



