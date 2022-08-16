var x = {};

function get_all_customers(draw_last_only) {
  var customers_table = $("#customers"); //cache
  if (!draw_last_only) customers_table.find("tr:gt(0)").remove();
  $.ajax({ url: "/admins/customers/" }).then(
    function (_customers) {
      x.result = _customers;
      console.log(_customers);
      console.log(_customers.customers);
      $.each(_customers.customers, (i, customer) => {
        if (!draw_last_only || i == _customers.length - 1) {
          customers_table.append(
            `<tr>
             <td>${customer.id}</td>
             <td>${customer.first_name}</td>
             <td>${customer.last_name}</td>
             <td>${customer.address}</td>
             <td>${customer.phone_number}</td>
             <td>${customer.credit_card_number}</td>
             <td>${customer.user_id}</td>
             <td><button style="color:red" onclick="delete_customer(${customer.id})">X</button></td></tr>`
          );
        }
      });
    },
    function (err) {
      console.log(err);
    }
  );
}

function add_customer() {
  console.log("==========================");
  $.ajax({ url: "/admins/customers/" });
  customer = {
    first_name: $("#txt_fname").val(),
    last_name: $("#txt_lname").val(),
    address: $("#txt_address").val(),
    phone_number: $("#txt_phone").val(),
    credit_card_number: $("#txt_ccn").val(),
    username: $("#txt_username").val(),
    password: $("#txt_password").val(),
    email: $("#txt_email").val(),
  };
  $.ajax({
    type: "POST",
    url: "/admins/customers/",
    data: customer,
    success: function (data, status) {
      console.log("status", status);
      console.log("data", data);
      get_all_customers(true);
    },
    error: function (xhr, desc, err) {
      console.log(err);
    },
  });
}
function get_customer_by_id() {
  $.ajax({ url: "/admins/customers/" + $("#txt_id_u").val() }).then(function (
    one_customer
  ) {
    console.log(one_customer);
    $("#txt_fname_u").val(one_customer.customer.first_name);
    $("#txt_lname_u").val(one_customer.customer.last_name);
    $("#txt_address_u").val(one_customer.customer.address);
    $("#txt_phone_u").val(one_customer.customer.phone_number);
    $("#txt_ccn_u").val(one_customer.customer.credit_card_number);
  });
}

function update_customer() {
  customer = {
    id: $("#txt_id_u").val(),
    first_name: $("#txt_fname_u").val(),
    last_name: $("#txt_lname_u").val(),
    address: $("#txt_address_u").val(),
    phone_number: $("#txt_phone_u").val(),
    credit_card_number: $("#txt_ccn_u").val(),
  };
  $.ajax({
    type: "PUT",
    url: `/admins/customers/${customer.id}`,
    data: customer,
    success: function (data, status) {
      console.log("status", status);
      console.log("data", data);
      get_all_customers(true);
    },
    error: function (xhr, desc, err) {
      console.log(err);
    },
  });
}

function delete_customer(id) {
  console.log(`send ajax to delete where customer id = ${id}`);
  $.ajax({
    type: "DELETE",
    url: `/admins/customers/${id}`,
    success: function (data, status) {
      console.log("status", status);
      console.log("data", data);
      get_all_customers(false);
    },
    error: function (xhr, desc, err) {
      console.log(err);
    },
  });
}

$(document).ready(function () {
  $("#btn1").on("click", () => {
    get_all_customers(false);
  });
});
