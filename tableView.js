var currentPage = 1;
var dataPerPage = 5;
var data;

window.onload = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fakestoreapi.com/products", true);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            showPage(data, currentPage);
        }
    };

    document.getElementById("next").addEventListener("click", function () {
        currentPage += 1;
        showPage(data, currentPage);
    });
    document.getElementById("previous").addEventListener("click", function () {
        currentPage -= 1;
        showPage(data, currentPage);
    });
};

function showPage(data, page) {
    var startIndex = (page - 1) * dataPerPage;
    var endIndex = startIndex + dataPerPage;

    var tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    for (var i = startIndex; i < endIndex && i < data.length; i++) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.innerHTML = data[i].id;
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = data[i].title;
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.innerHTML = data[i].price;
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.innerHTML = data[i].category;
        tr.appendChild(td4);

        tableBody.appendChild(tr);
    }

    document.getElementById("page-number").innerHTML =
        "Page " + page + " of " + Math.ceil(data.length / dataPerPage);

    if (currentPage < 1) {
        document.getElementById("previous").disabled = true;
    } else if (currentPage === Math.ceil(data.length / dataPerPage)) {
        document.getElementById("next").disabled = true;
    } else if (currentPage > 0) {
        document.getElementById("next").disabled = false;
    }
}
