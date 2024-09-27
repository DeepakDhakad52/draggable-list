# Draggable List with Order Check

This project is a simple web application created using HTML, CSS, and JavaScript. It allows users to drag and drop list items to reorder them and check if the order is correct by clicking a button.

## Features

- **Drag and Drop**: Users can reorder the list items by dragging and dropping them.
- **Order Check**: Users can check if the list items are in the correct order by clicking the "Check Order" button.

## Code Explanation

### HTML Structure

The HTML structure includes a list (`<ul>`) with the id `draggable-list` and a button with the id `check`.

```html
<ul id="draggable-list"></ul>
<button id="check">Check Order</button>
```

### JavaScript

The JavaScript code handles the functionality of the drag-and-drop feature and the order check.

#### Variables

- `draggableList`: The unordered list element where the list items will be appended.
- `check`: The button element to check the order.
- `orderedArray`: An array containing the correct order of items.
- `listItems`: An array to store the list item elements.
- `draggableStartIndex`: A variable to store the index of the item being dragged.

#### Functions

1. **createList()**

   This function shuffles the `orderedArray` and creates list items (`<li>`) with draggable elements. Each list item is appended to the `draggableList`.

   ```javascript
   function createList() {
     [...orderedArray]
       .sort((a, b) => Math.random() - Math.random())
       .forEach((person, index) => {
         const listItem = document.createElement("li");

         listItem.setAttribute("data-index", index);
         listItem.innerHTML = `
           <span class='number'>${index + 1}</span>
           <div class='draggable' draggable=true>
             <p class='person-name'>${person}</p>
             <i class="fas fa-grip-lines"></i>
           </div>
         `;

         listItems.push(listItem);
         draggableList.appendChild(listItem);
       });

     addEventListeners();
   }
   ```

2. **Drag Event Handlers**

   These functions handle the drag-and-drop events.

   - `dragStart()`: Stores the index of the item being dragged.
   - `dragOver(e)`: Prevents the default behavior to allow dropping.
   - `dragDrop()`: Swaps the dragged item with the dropped item.
   - `dragEnter()`: Adds a visual indicator when an item is dragged over another item.
   - `dragLeave()`: Removes the visual indicator when the dragged item leaves another item.

   ```javascript
   function dragStart() {
     draggableStartIndex = +this.closest('li').getAttribute('data-index');
   }

   function dragOver(e) {
     e.preventDefault();
   }

   function dragDrop() {
     const draggableEndIndex = +this.getAttribute('data-index');
     swapItems(draggableStartIndex, draggableEndIndex);
     this.classList.remove('over');
   }

   function dragEnter() {
     this.classList.add('over');
   }

   function dragLeave() {
     this.classList.remove('over');
   }
   ```

3. **swapItems(fromIndex, endIndex)**

   This function swaps the positions of two list items.

   ```javascript
   function swapItems(fromIndex, endIndex) {
     const itemOne = listItems[fromIndex].querySelector('.draggable');
     const itemTwo = listItems[endIndex].querySelector('.draggable');

     listItems[fromIndex].appendChild(itemTwo);
     listItems[endIndex].appendChild(itemOne);
   }
   ```

4. **addEventListeners()**

   This function adds event listeners to the draggable elements and list items.

   ```javascript
   function addEventListeners() {
     const draggables = document.querySelectorAll('.draggable');
     const dragListitems = document.querySelectorAll('.draggable-list li');

     draggables.forEach(draggable => {
       draggable.addEventListener('dragstart', dragStart);
     });

     dragListitems.forEach(item => {
       item.addEventListener('dragover', dragOver);
       item.addEventListener('drop', dragDrop);
       item.addEventListener('dragenter', dragEnter);
       item.addEventListener('dragleave', dragLeave);
     });
   }
   ```

5. **Order Check**

   This function checks if the list items are in the correct order when the "Check Order" button is clicked.

   ```javascript
   check.addEventListener('click', () => {
     listItems.forEach((listItem, index) => {
       const personName = listItem.querySelector('.draggable').innerText.trim();
       if (personName !== orderedArray[index]) {
         listItem.classList.add('wrong');
       } else {
         listItem.classList.remove('wrong');
         listItem.classList.add('right');
       }
     });
   });
   ```

## How to Use

1. Open the HTML file in a web browser.
2. Drag and drop the list items to reorder them.
3. Click the "Check Order" button to see if the items are in the correct order.

---

If you have any more questions or need further assistance, just let me know and Don't forget to give a star to this Repo😊
