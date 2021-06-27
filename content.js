const addCheckBox = () => {
    let items = [...document.querySelector("#toc > div").querySelectorAll("span")];
    let headings = [...document.body.querySelectorAll(".wiki-heading")];

    items.forEach((item) => {
        item.appendChild(generateToWatchCheckbox(item, headings));
    });

    let checkboxes = items.map(e => e.querySelector("input"));
    onclickMethodLinker(checkboxes, headings);
}

window.onload = addCheckBox

function getToHideNodes(index, nodes, isHead) {
    return nodes
        .filter(e => isHead ? e.innerText.startsWith(index) : e.parentNode.innerText.startsWith(index))
        .map(e => isHead ? e.nextSibling : e);
}

function generateToWatchCheckbox(contentsSpanElement, headings) {
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = true;

    return checkbox;
}

function onclickMethodLinker(checkboxes, headings) {
    checkboxes.forEach(checkbox => {
        checkbox.onclick = () => {
            getToHideNodes(checkbox.parentNode.innerText.split(" ")[0], headings, isHead = true)
                    .forEach(e => e.style.display = checkbox.checked ? "block" : "none");
            getToHideNodes(checkbox.parentNode.innerText.split(" ")[0], checkboxes, isHead = false)
                    .forEach(e => e.checked = checkbox.checked);
        };
    })
}