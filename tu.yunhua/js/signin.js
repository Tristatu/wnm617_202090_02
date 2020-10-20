

const makeWarning = (target,message) => {
   $(target).addClass("active")
      .find(".message").html(message);
   setTimeout(()=>{
      $(target).removeClass("active")
   },2000);
}



const checkSigninForm = () => {
   let user = $("#signin-username").val();
   let pass = $("#signin-password").val();

   console.log(user,pass)
   if(user=="" || pass=="") {
      makeWarning("#warning-modal","Login Falied. PleaseType a Username and Password");
      return;
   }

   if(user == 'user' && pass == 'pass') {
      // logged in
      console.log('success');
      sessionStorage.userId = 3;
      $("#signin-form")[0].reset();
   } else {
      // not logged in
      console.log('failure');
      sessionStorage.removeItem('userId');

      // DO SOMETHING HERE
      makeWarning("#warning-modal","Sign In Failed");
   }

   checkUserId();
}


const checkUserId = () => {
   let p = ['#signin-page','#signup-page',''];


   if(sessionStorage.userId === undefined) {
      // not logged in
      if(!p.some(o=>window.location.hash===o))
         $.mobile.navigate("#signin-page");
   } else {
      // logged in
      if(p.some(o=>window.location.hash===o))
         $.mobile.navigate("#recent-page");
   }
}