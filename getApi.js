var err = {
    done: 4,
    ok: 200
};

function sendRequest(method, url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === err.ok) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send(data ? JSON.stringify(data) : null);
}

function details() {
    try {
        sendRequest("GET", "https://dummy.restapiexample.com/api/v1/employees", null, response => {
            var tbody = document.getElementById("apiTable").querySelector("tbody");
            tbody.innerHTML = " ";
            response.data.forEach(data => {
                tbody.innerHTML += "<tr><td>" + response.status + "</td><td>" + data.id + "</td><td>" +
                    data.employee_name + "</td><td>" + data.employee_salary + "</td><td>" + data.employee_age +
                    "</td><td>" + data.profile_image + "</td></tr>";
                apiTable.appendChild(tbody);
            });
        });
    }
    catch (error) {
        console.log(error);
    }
}

