const FAMLY_URL = "https://tryfamly.co/api/daycare/tablet/group";

const ACCESS_TOKEN = "";
const GROUP_ID = "";
const INSTITUTION_ID = "";

 async function getChildren(){ 
  return fetch(`${FAMLY_URL}?accessToken=${ACCESS_TOKEN}&groupId=${GROUP_ID}&institutionId=${INSTITUTION_ID}`  
  )
  .then(res=>res.json())  
}
export { getChildren };