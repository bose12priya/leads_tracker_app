 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
 import { getDatabase ,
            ref,
            push,
            onValue,
            remove
 } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-964a7-default-rtdb.asia-southeast1.firebasedatabase.app/",
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

//creating a reference to the database
const referenceInDB = ref(database, "leads")

//listening to changes in the database
onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
    
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML=""
})

inputBtn.addEventListener("click", function() {
    //push the value of the input field to the database
    push(referenceInDB ,inputEl.value)
    inputEl.value = ""
})


