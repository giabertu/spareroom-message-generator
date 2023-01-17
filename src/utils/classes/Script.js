//Collection of classes that will run scripts in active tab

function getPropertyDescription(){
  return document.querySelector('.detaildesc').textContent + ' New flatmate preferences: ' + document.querySelector(".feature--household-preferences").children[1].textContent;
}


export { getPropertyDescription }