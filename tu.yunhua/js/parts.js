const drawAnimalList = (a,empty_phrase='Here is no any bulldog. Click the plug button to add your first bulldog.') => {
   $("#list-page .animallist")
      .html(a.length?makeAnimalList(a):empty_phrase);
}


const makeAnimalList = templater(o=>`
<div class="animallist-item js-animal-jump" data-id="${o.id}">
      
   <div class="animallist-image">
      <img src="${o.img}" alt="">
   </div>


   <div class="animallist-description">
      <div class="animallist-name">${o.name}</div>
      <div class="animallist-type">Type: ${o.type}</div>
      <div class="animallist-breed">Breed: ${o.breed}</div>
   </div>
</div>
`);


const makeUserProfile = templater(o=>`
<div class="profile-image">
   <img src="${o.img}" alt="">
   <div class="floater right bottom" >
      <a href="#user-upload-page" ><img class="icon" style="width: 2em; height: 2em;" src="./img/add_profile_photo.png"></a>
   </div>
</div>
<div class="profile-body">
   <div class="profile-name">${o.name}</div>
   <div class="profile-email" style="margin-bottom: 10px;"><strong>Email</strong>: ${o.email}</div>
   <div class="profile-location"><strong>Location</strong>: San Francisco, CA</div>
</div>



`);


// <p><a href="#settings-page">Settings</a></p> 


const makeAnimalProfile = templater(o=>`
<div class="profile-image">
   <img src="${o.img}" alt="">
</div>
<div class="profile-body">
   <div class="profile-name">${o.name}</div>
   <div class="profile-type" style="margin-bottom: 10px;">Type: ${o.type}</div>
   <div class="profile-breed">Breed: ${o.breed}</div>
</div>
   <div class="profile-description">Description: ${o.description}</div>

<div style="display: inline-block;width: 30%;border-width: 0;background-color: var(--color-neutral-light);font: inherit;padding: 0.7em 1em;margin-left: 8.2em;outline: 0;text-align: center;border-radius: 1em;font-weight: 700;margin-top: 0.5em;     margin-bottom: 0.5em;
">
   <a href="#" class="js-animal-delete" data-id="${o.id}">Delete</a>
</div>
`);




const makeAnimalPopup = o=>`
<div class="display-flex">
<div>
   <img src="${o.img}" alt="" style="width:140px;height:140px;padding-top: 1.5em;">
</div>
<div style="padding-left:1em;padding-top: 1.5em;}">
   <div class="profile-name">${o.name}</div>
   <div><strong>Type</strong>: ${o.type}</div>
   <div style="margin-top: 0.5em;}"><strong>Breed</strong>: ${o.breed}</div>
   <div>
      <div class="map-popup-photo">
         <a href="#" class="form-button js-animal-jump" data-id="${o.animal_id}">Know More</a> 
      </div>
   </div>
</div>
</div>

`;








const FormControl = ({namespace,name,displayname,type,placeholder,value}) => {
   return `<div class="form-control">
      <label for="${namespace}-${name}" class="form-label">${displayname}</label>
      <input id="${namespace}-${name}" type="${type}" class="form-input" data-role="none" placeholder="${placeholder}" value="${value}">
   </div>`;
}


const makeAnimalEditForm = o => `

<div>
   <input type="hidden" id="animal-edit-image" value="${o.img}">
   <label class="image-uploader thumbnail picked" style="background-image:url('${o.img}')">
      <input type="file" data-role="none" id="animal-edit-upload">
   </label>
</div>


${FormControl({
   namespace:"animal-edit",
   name:"name",
   displayname:"Name",
   type:"text",
   placeholder:"Type An Animal Name",
   value:o.name
})}
${FormControl({
   namespace:"animal-edit",
   name:"type",
   displayname:"Type",
   type:"text",
   placeholder:"Choose An Animal Type",
   value:o.type
})}
${FormControl({
   namespace:"animal-edit",
   name:"breed",
   displayname:"Breed",
   type:"text",
   placeholder:"Type Animal Breed",
   value:o.breed
})}

<div class="form-control">
   <label for="animal-edit-description" class="form-label">Description</label>
   <textarea id="animal-edit-description" class="form-input-describe" data-role="none" placeholder="Type animal description">${o.description}</textarea>
</div>
`;


const makeUserEditForm = o => `
${FormControl({
   namespace:"user-edit",
   name:"username",
   displayname:"Username",
   type:"text",
   placeholder:"Type Your Username",
   value:o.username
})}
${FormControl({
   namespace:"user-edit",
   name:"name",
   displayname:"Full Name",
   type:"text",
   placeholder:"Type Your Full Name",
   value:o.name
})}
${FormControl({
   namespace:"user-edit",
   name:"email",
   displayname:"Email",
   type:"text",
   placeholder:"Type Your Email",
   value:o.email
})}
`;






const filterList = (animals,type) => {
   let a = [...(new Set(animals.map(o=>o[type])))];
   return templater(o=>`<div class="filter" data-field="${type}" data-value="${o}">${o[0].toUpperCase()+o.substr(1)}</div>`)(a);
}

const makeFilterList = (animals) => {
   return `
   <div class="filter" style="padding-left: 1em; padding-right: 1em;" data-field="type" data-value="all">All</div> 

   ${filterList(animals,'breed')} 
   `;
}




const makeUploaderImage = (el,name,folder='') => {
   $(el).parent().css({'background-image':`url('${folder+name}')`}).addClass("picked")
      .prev().val(folder+name)
}

