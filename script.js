// Adds an item to the list
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const chooseButton = document.getElementById('choose-button');
const itemList = document.getElementById('item-list');

let items = [];

addButton.addEventListener('click', () => {
    const newItem = itemInput.value.trim();
    if (newItem) {
        items.push({ name: newItem, weight: 1 });
        itemInput.value = '';
        updateItemList();
    }
});

// Updates the list of items displayed
function updateItemList() {
    itemList.innerHTML = '';
    items.forEach((itemObj, index) => {
        const li = document.createElement('li');

        const itemContent = document.createElement('span');
        itemContent.className = 'item-content';
        itemContent.textContent = itemObj.name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.addEventListener('click', () => {
            items.splice(index, 1);
            updateItemList();
        });

        const weightContainer = document.createElement('div');
        weightContainer.className = 'weight-controls';

        // Adds weight control buttons
        const minusBtn = document.createElement('button');
        minusBtn.textContent = '－';
        minusBtn.style.background = '#ff8a80';
        minusBtn.addEventListener('click', () => {
            if (itemObj.weight > 1) {
                itemObj.weight -= 1;
                weightSpan.textContent = itemObj.weight;
            }
        });

        const plusBtn = document.createElement('button');
        plusBtn.textContent = '＋';
        plusBtn.style.background = '#81d4fa';
        plusBtn.addEventListener('click', () => {
            itemObj.weight += 1;
            weightSpan.textContent = itemObj.weight;
        });

        const weightSpan = document.createElement('span');
        weightSpan.className = 'weight-display';
        weightSpan.textContent = itemObj.weight;

        weightContainer.appendChild(minusBtn);
        weightContainer.appendChild(weightSpan);
        weightContainer.appendChild(plusBtn);

        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';
        buttonGroup.appendChild(weightContainer);
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(itemContent);
        li.appendChild(buttonGroup);
        itemList.appendChild(li);
    });
}

// Handles the draw action and randomly selects an item
chooseButton.addEventListener('click', () => {
    if (items.length === 0) {
        alert("項目がありません。追加してください。");
        return;
    }

    let weightedArray = [];
    items.forEach((obj) => {
        for (let i = 0; i < obj.weight; i++) {
            weightedArray.push(obj.name);
        }
    });

    let highlightIndex = 0;
    const highlightDuration = 2000;
    const intervalTime = 100;
    const startTime = Date.now();

    const lis = itemList.querySelectorAll('li');
    lis.forEach((li) => li.classList.remove('highlight'));

    // Highlight effect during the random selection process
    const interval = setInterval(() => {
        lis.forEach((li) => li.classList.remove('highlight'));
        lis[highlightIndex % items.length].classList.add('highlight');
        highlightIndex++;

        if (Date.now() - startTime > highlightDuration) {
            clearInterval(interval);
            const randomIndex = Math.floor(Math.random() * weightedArray.length);
            const chosenItem = weightedArray[randomIndex];

            const finalIndex = items.findIndex((i) => i.name === chosenItem);
            lis.forEach((li) => li.classList.remove('highlight'));
            lis[finalIndex].classList.add('highlight');

            Swal.fire({
                //title: `結果: ${chosenItem}`,
                html: `
                <h2>結果</h2>
                <h1>${chosenItem}</h1>
                `,
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff",
                backdrop: `
                rgba(0,0,123,0.4)
                url("https://sweetalert2.github.io/images/nyan-cat.gif")
                left top
                no-repeat
              `
            });
        }
    }, intervalTime);
});

updateItemList();
