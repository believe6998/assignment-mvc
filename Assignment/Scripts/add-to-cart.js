$("select").val($('input[name ="categoryId"]').val());
$('#categories').on("change", function () {
    let selected = $('option:selected', this).attr('value');
    $('input[name ="categoryId"]').val(selected);
    $('#btn-filter').click();
});

$('.btn-add').click(function () {
    let id = $(this).next().text();
    let tr = $(this).parent().parent().children();
    let name = tr.eq(0).text().trim();
    let price = tr.eq(2).text().trim();
    let img = tr.eq(3).children().attr("src");
    let product = {
        'id': id,
        'img': img,
        'price': price,
        'name': name,
        'quantity': 1
    }
    var listAdded = {};
    if (sessionStorage.getItem('listAdded') != null) {
        let listAddedString = sessionStorage.getItem('listAdded');
        listAdded = JSON.parse(listAddedString);
        let currentAdd = listAdded[id];
        if (currentAdd != null) {
            product.quantity += currentAdd.quantity;
        }
    }
    listAdded[product.id] = product;
    sessionStorage.setItem('listAdded', JSON.stringify(listAdded));
    alert("Đã thêm vào giỏ hàng!");
});