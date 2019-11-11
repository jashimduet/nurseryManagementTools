const FAMLY_URL = "https://tryfamly.co/api/daycare/tablet/group";

const ACCESS_TOKEN = "234ffdb8-0889-4be3-b096-97ab1679752c";
const GROUP_ID = "11fc220c-ebba-4e55-9346-cd1eed714620";
const INSTITUTION_ID = "fb6c8114-387e-4051-8cf7-4e388a77b673";

 async function getChildren(){ 
  return fetch(`${FAMLY_URL}?accessToken=${ACCESS_TOKEN}&groupId=${GROUP_ID}&institutionId=${INSTITUTION_ID}`  
  )
  .then(res=>res.json())  
}
export { getChildren };