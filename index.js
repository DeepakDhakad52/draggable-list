const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

// Original Array
const orderedArray = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",];

// Store Items
const listItems = [];

// Index of drag item
let draggableStartIndex;

// UI Rendering
createList();

// Insert list item into DOM
function createList() {
  [...orderedArray]
  .sort((a,b) => Math.random() - Math.random())
  .forEach((person, index) => {
    const listItem = document.createElement("li");

    listItem.setAttribute("data-index", index);
    listItem.innerHTML = `
      <span class='number'>${index + 1}</span>
      <div class='draggable' draggable=true>
        <p class='person-name'>${person}</p>
        <i class= "fas fa-grip-lines"></i>
      </div>
    `;

    listItems.push(listItem);
    draggableList.appendChild(listItem);
  });

  addEventListeners();
}

// Handler function for drag events
function dragStart() {
  draggableStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  console.log("dragDrop");
  const draggableEndIndex = +this.getAttribute('data-index');
  console.log(draggableEndIndex);
  
  swapItems(draggableStartIndex, draggableEndIndex);
  this.classList.remove('over');
}
function dragEnter() {
  this.classList.add('over');
}
function dragLeave() {
  this.classList.remove('over');
}

// Swap List Items
function swapItems(fromIndex, endIndex){
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[endIndex].querySelector('.draggable');
  
  listItems[fromIndex].appendChild(itemTwo);
  listItems[endIndex].appendChild(itemOne);
}

// Add Event Listener to all draggable items
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListitems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  })

  dragListitems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  })
}

// Check the order of list Item
check.addEventListener('click', () => {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();
    if(personName !== orderedArray[index]){
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  })
})