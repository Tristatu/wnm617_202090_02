

const query = (options) => {
   // Fetch is a Promise
   return fetch('data/api.php',{
      method:'POST',
      body:JSON.stringify(options),
      header:{'Content-Type':'application/json'}
   }).then(d=>d.json())
}

// query({type:'users_all'}).then(d=>console.log(d))


// currying functions
const templater = f => a =>
   (Array.isArray(a)?a:[a])
   .reduce((r,o,i,a)=>r+f(o,i,a),'');