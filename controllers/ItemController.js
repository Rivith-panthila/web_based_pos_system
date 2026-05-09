import {addItemData,getAllItems,updateItem,deleteItem,generateNextItemCode} from "../model/ItemModel.js";


const itemForm = $('#itemForm');
const saveItemBtn = $('#saveItemBtn');
const itemModal = new bootstrap.Modal($('#itemModal')[0]);

// Table Load Function
function loadItems() {

    $('#itemsTable tbody').empty();

    const itemList = getAllItems();

    itemList.forEach(item => {

        $('#itemsTable tbody').append(`
            <tr>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>
                    <button class="btn btn-sm btn-primary item-edit-action">
                        Edit
                    </button>

                    <button class="btn btn-sm btn-danger item-delete-action">
                        Delete
                    </button>
                </td>
            </tr>
        `);

    });

    }

// Add Item Modal Open
$('#addItemBtn').on('click', function () {

    itemForm[0].reset();

    let nextCode = generateNextItemCode();

    $('#itemCode').val(nextCode).attr('readonly', true);

    $('#itemModal .modal-title').text("Add Item");

    saveItemBtn.text("Save Item");

    itemModal.show();

});

// Edit Button
$('#itemsTable').on('click', '.item-edit-action', function () {

    let row = $(this).closest('tr');

    $('#itemCode').val(row.find('td:eq(0)').text()).attr('readonly', true);

    $('#itemName').val(row.find('td:eq(1)').text());

    $('#itemPrice').val(row.find('td:eq(2)').text());

    $('#itemQuantity').val(row.find('td:eq(3)').text());

    $('#itemModal .modal-title').text("Edit Item");

    saveItemBtn.text("Update Item");

    itemModal.show();

});

// Save / Update Button
saveItemBtn.on('click', function () {

    let code = $('#itemCode').val();

    let name = $('#itemName').val().trim();

    let price = $('#itemPrice').val().trim();

    let quantity = $('#itemQuantity').val().trim();

    if (code && name && price && quantity) {

        if (saveItemBtn.text() === "Save Item") {

            addItemData(code, name, price, quantity);

        } else {

            updateItem(code, name, price, quantity);

        }

        itemModal.hide();

        loadItems();

    } else {

        alert("Please fill in all fields.");

    }

});

// Delete Button
$('#itemsTable').on('click', '.item-delete-action', function () {

    let code = $(this).closest('tr').find('td:eq(0)').text();

    if (confirm("Are you sure you want to delete Code: " + code + "?")) {

        deleteItem(code);

        loadItems();

    }

});

// Initial Load
loadItems();