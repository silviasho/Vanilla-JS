const MISSION_DOM = {


    mission_name: document.getElementById("mission_name"),
    mission_date: document.getElementById("mission_date"),
    mission_hour: document.getElementById("mission_hour"),
    creatingSticyNoths: document.getElementById("creatingSticyNoths"),

}

// evry time the page refrsh draw will draw evrithing frome the local storage
const arrayOfData = loadFromLocalStorage('mission_data');
draw(arrayOfData)

function draw(inputArray) {
    clearCard()
    for (let index = 0; index < inputArray.length; index++) {
        drawCard(inputArray[index])
    }
}

function clearCard() {
    MISSION_DOM.creatingSticyNoths.innerHTML = ""
}

function drawCard(missions) {
    const { creatingSticyNoths } = MISSION_DOM
    const missionCard = createNote(missions);
    //mission it is the input arry/arry of data
    if (!missionCard) return;
    creatingSticyNoths.append(missionCard)

}

function createNote(mission) {
    const noteUI = document.querySelector("#creatingSticyNoths");
    const { mission_name, mission_date, mission_hour, mission_done, id } = mission;
    if (!mission_name && !mission_date || !mission_hour) return;




    const cardsHolder = document.createElement("div");
    cardsHolder.setAttribute("class", "card mission invisible");
    if (mission_done) {
        cardsHolder.style.opacity = "0.5"
    }




    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body mission-body");

    cardsHolder.style.width = "18rem";
    cardsHolder.append(cardBody)



    const card_mission_name = document.createElement("h3");
    card_mission_name.setAttribute("class", "card-subtitle mb-2 text-muted");
    card_mission_name.innerText = mission_name;
    cardBody.appendChild(card_mission_name);

    const footer = document.createElement("div");
    cardsHolder.append(footer)
    const card_mission_date = document.createElement("p");
    card_mission_date.setAttribute("class", "card-subtitle mb-2 text-muted");
    card_mission_date.innerText = mission_date;
    footer.appendChild(card_mission_date)

    const card_mission_hour = document.createElement("p");
    card_mission_hour.setAttribute("class", "card-subtitle mb-2 text-muted");
    card_mission_hour.innerText = mission_hour;
    footer.appendChild(card_mission_hour)

    const btnHolder = document.createElement("div");
    btnHolder.className = "btnHolder";

    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = "<i class='fa fa-trash'></i>";
    deleteButton.className = "btn btn-danger";
    deleteButton.addEventListener("click", function () {
        deleteCard(id);
    })
    btnHolder.appendChild(deleteButton)

    const doneButton = document.createElement("button");
    doneButton.className = "btn btn-warning";
    doneButton.innerHTML = '<i class="fa fa-check"></i>'
    doneButton.addEventListener("click", function () {
        toggleDone(id, cardsHolder);
    });
    btnHolder.appendChild(doneButton)

    cardsHolder.appendChild(btnHolder)

    cardsHolder.onmouseover = function () {
        btnHolder.style.visibility = "visible"
    }
    cardsHolder.onmouseleave = function () {
        btnHolder.style.visibility = "hidden"
    }

    noteUI.append(cardsHolder)

    setTimeout(function () {
        cardsHolder.classList.remove('invisible');
    }, 0);

}

function findIndex(data, id) {
    for (let index = 0; index < data.length; index++) {
        if (data[index].id === id) {

            return index
        }
    }
    //if the data doest have an element with the id return -1 
    return -1;
}

function toggleDone(id, element) {
    const index = findIndex(arrayOfData, id)
    if (index === -1) {
        return;
    }
    const mission = arrayOfData[index];
    mission.mission_done = !mission.mission_done;
    element.style.opacity = mission.mission_done ? '0.5' : '1';
    saveToLocalStorage("mission_data", arrayOfData);

}

function deleteCard(id) {
    if (id === undefined) return;
    const index = findIndex(arrayOfData, id);

    arrayOfData.splice(index, 1);
    saveToLocalStorage("mission_data", arrayOfData)
    draw(arrayOfData)
}

function validateMissionCard(mission_id) {
    return findIndex(arrayOfData, mission_id);
}

function addMission(event) {
    event.preventDefault();

    //! Function create ID
    const mission_id = Math.round(Math.random() * 999);
    const { mission_name, mission_date, mission_hour } = MISSION_DOM;
    const result = validateMissionCard(mission_id);
    if (result !== -1) {
        alert("mission alrdy axist")
        return
    }


    arrayOfData.push(new Mission(mission_name.value, mission_date.value, mission_hour.value, mission_id))
    saveToLocalStorage("mission_data", arrayOfData);
    draw(arrayOfData)

}

function Mission(_name, _date, _hour, _id, _done) {
    this.id = _id
    this.mission_name = _name
    this.mission_date = _date
    this.mission_hour = _hour;
    this.mission_done = false
    // this.mission_id = Math.round(Math.random() * 999)

}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
//this function bring back all data that saved to local as object
function loadFromLocalStorage(key) {
    const stringifiedData = localStorage.getItem(key);
    // if JSON.parse returns null, use default value of []
    return JSON.parse(stringifiedData) || [];
}

