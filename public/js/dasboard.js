
let e = "<hr/>";
function addTextInput(count) {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("id", "text" + count);
    x.setAttribute("placeholder", "Name");
    document.getElementById("myForm").appendChild(x)
}

function addNumInput(count) {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "number");
    x.setAttribute("id", "num" + count);
    x.setAttribute("placeholder", "Spend");
    document.getElementById("myForm").appendChild(x)
}

function getInputValue() {
    var members = parseInt(document.getElementById("members").value);
    document.getElementById("myForm").innerHTML = "";
    while (members--) {
        addTextInput(members);
        addNumInput(members);
        document.getElementById("myForm").innerHTML += e;
    }
    document.getElementById("save").style.visibility="visible";  
}


function calculate() {
    var members = parseInt(document.getElementById("members").value);
    var payments = {};
    while (members--) {
        var name = document.getElementById("text" + members).value;
        var spend = parseInt(document.getElementById("num" + members).value);
        payments[name] = spend;
    }
    var final = splitPayments(payments);
    e = "";
    for (let y = 0; y < final.length; y++) {
        e += `${final[y]}<br/>`;
    }
    var result = document.getElementById("Result");
    result.style.display = "block";
    result.innerHTML += e;
}

function splitPayments(payments) {
    const people = Object.keys(payments);
    const valuesPaid = Object.values(payments);

    const sum = valuesPaid.reduce((acc, curr) => curr + acc);
    const mean = sum / people.length;

    const sortedPeople = people.sort((personA, personB) => payments[personA] - payments[personB]);
    const sortedValuesPaid = sortedPeople.map((person) => payments[person] - mean);

    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;
    let k = 0;
    var final = [];
    while (i < j) {
        debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
        sortedValuesPaid[i] += debt;
        sortedValuesPaid[j] -= debt;

        final.push(` ${sortedPeople[i]} will pay ${debt} to ${sortedPeople[j]}`);

        if (sortedValuesPaid[i] === 0) {
            i++;
        }

        if (sortedValuesPaid[j] === 0) {
            j--;
        }

        k++;
    }
    return final;
}