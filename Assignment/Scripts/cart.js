function load() {
    if (sessionStorage.getItem('listAdded') != null) {
        var listAddedString = sessionStorage.getItem('listAdded');
        var listAdded = JSON.parse(listAddedString);
        var htmlContent = '';
        var totalPrice = 0;
        for (key in listAdded) {
            if (Object.prototype.hasOwnProperty.call(listAdded, key)) {
                var unitTotalPrice = listAdded[key].price * listAdded[key].quantity;
                htmlContent += '    <tr>\n' +
                    '        <td>\n' +
                    listAdded[key].name +
                    '        </td>\n' +
                    '        <td>\n' +
                    '            <img src="' +
                    listAdded[key].img +
                    '" alt="Alternate Text" width="100px"/>\n' +
                    '        </td>\n' +
                    '        <td>\n' +
                    listAdded[key].price +
                    '        </td>\n' +
                    '        <td>\n' +
                    '<button class="btn-minus">-</button>\n' +
                    '            <input type="text" name="quantity" value="' + listAdded[key].quantity + '" size="1" style="text-align: center;"/>\n' +
                    '            <div class="d-none">' + key + '</div>\n' +
                    '            <button class="btn-add">+</button>' +
                    '        </td>\n' +
                    '        <td>\n' +
                    unitTotalPrice +
                    '        </td>\n' +
                    '        <td>\n' +
                    '            <button class="btn-delete">Xóa</button>' +
                    '        </td>\n' +
                    '    </tr>';
                totalPrice += unitTotalPrice;
            }
        }
        htmlContent += '    <tr>\n' +
            '        <td colspan="3"></td>\n' +
            '        <td colspan="1" class="font-weight-bold">Total price:</td>\n' +
            '        <td colspan="2">' + totalPrice + '</td>\n' +
            '    </tr>';
        $('#list-cart').html(htmlContent);
        let currentId = 0;
        function updateQuantity() {
            if (listAdded[currentId].quantity < 1) {
                delete listAdded[currentId];
                if (Object.keys(listAdded).length < 1) {
                    sessionStorage.removeItem('listAdded');
                }
            }
            sessionStorage.setItem('listAdded', JSON.stringify(listAdded));
            load();
        }
        $('input[name ="quantity"]').on('keypress', function (e) {
            if (e.which === 13) {
                currentId = $(this).next().text();
                listAdded[currentId].quantity = parseInt($(this).val());
                updateQuantity();
            }
        });
        $('.btn-add').click(function () {
            currentId = $(this).prev().text();
            listAdded[currentId].quantity++;
            updateQuantity();
        });
        $('.btn-minus').click(function () {
            currentId = $(this).next().next().text();
            listAdded[currentId].quantity--;
            updateQuantity();
        });
        $('.btn-delete').click(function () {
            currentId = $(this).parent().prev().prev().children().eq(2).text();
            listAdded[currentId].quantity = 0;
            updateQuantity();
        });
    } else {
        alert('Chưa có sản phẩm nào trong giỏ hàng');
    }
}

load();