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

    var listval = document.getElementById("list-val");
    listval.innerHTML = "";

    for (var i = startIndex; i < endIndex && i < data.length; i++) {
        var ul = document.createElement("ul");

        var li1 = document.createElement("li");
        li1.innerHTML = data[i].id;
        ul.appendChild(li1);

        var li2 = document.createElement("li");
        li2.innerHTML = data[i].title;
        ul.appendChild(li2);

        var li3 = document.createElement("li");
        li3.innerHTML = data[i].price;
        ul.appendChild(li3);

        var li4 = document.createElement("li");
        li4.innerHTML = data[i].category;
        ul.appendChild(li4);

        listval.appendChild(ul);
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
