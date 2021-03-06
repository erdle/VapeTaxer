const main_template = (data) => `<style>
    table,
    th,
    td {
        border: 1px solid black;
        border-collapse: collapse;
        min-height:30px;
    }

    th {
        font-weight: 500;
    }

    .header-notice {
        font-size: 0.58em;
        text-align: left;
    }

    .table-name {
        font-weight: bold;
    }

    td div {
        text-align: center;
    }

    table {
        margin-bottom: 15px;
    }

    .sales_table tr{
        height:30px;
    }
    
    .sales_table th {
        font-weight: bold;
    }
</style>

<body style="font-family: 'Arial';padding: 20px;">
    <div>
        <div style="text-align: left;">FTA</div>
        <div style="text-align: center;">Tobacco Tax Section</div>
        <div style="  text-align: center;">PA-2: State <strong>TOBACCO PACT</strong> Act Report for</div>
        <div style="float: right;"><div style="
    text-align: center;
">${data.state}</div><div style="
    margin: 5px 40px 10px 40px;
    border-top: solid 1px;
    width: 200px;
    text-align: center;
">(Identify the state)</div></div>
    </div>
    <div style="float: right;">
        <div class="table-name">Part 1 - Identify Your Business</div>
        <table style="width:100%; font-size:0.8em">
            <tbody style="
">
                <tr>
                    <th colspan="4">
                        <div class="header-notice">Name - please print</div>
                        <div>${data.shop.full_name}</div>
                    </th>
                    <th>
                        <div class="header-notice">Reporting Period - MM/DD/YYYY</div>
                        <div>${(new Date(data.period.from)).toLocaleDateString()} - ${(new Date(data.period.to)).toLocaleDateString()}</div>
                    </th>
                    <th>
                        <div class="header-notice">State Identification Number</div>
                        <div>${data.shop.state}</div>
                    </th>
                </tr>
                <tr>
                    <td width: 30%;>
                        <div class="header-notice">Location Address - number and street</div>
                        <div>${data.shop.address}</div>
                    </td>
                    <td>
                        <div class="header-notice">City</div>
                        <div>${data.shop.city}</div>
                    </td>
                    <td>
                        <div class="header-notice">State - province</div>
                        <div>${data.shop.state}</div>
                    </td>
                    <td>
                        <div class="header-notice">Zip Code - Postal Code</div>
                        <div>${data.shop.zip}</div>
                    </td>
                    <td>
                        <div class="header-notice">Country - Territory</div>
                        <div>${data.shop.territory}</div>
                    </td>
                    <td>
                        <div class="header-notice">Federal Employee Identification Number</div>
                        <div>${data.shop.emp_number}</div>
                    </td>
                </tr>

                <tr>
                    <td width: 30%;>
                        <div class="header-notice">Mailing Address</div>
                        <div>${data.shop.mailing_address}</div>
                    </td>
                    <td>
                        <div class="header-notice">City</div>
                        <div>${data.shop.mailing_city}</div>
                    </td>
                    <td>
                        <div class="header-notice">State - province</div>
                        <div>${data.shop.mailing_state}</div>
                    </td>
                    <td>
                        <div class="header-notice">Zip Code - Postal Code</div>
                        <div>${data.shop.mailing_zip}</div>
                    </td>
                    <td>
                        <div class="header-notice">Country - Territory</div>
                        <div>${data.shop.mailing_territory}</div>
                    </td>
                    <td>
                        <div class="header-notice">Email Address</div>
                        <div>${data.shop.email}</div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="table-name">Part 2 - Identify Your Sales</div>
        <table style="width:100%;" class="sales_table">
            <tbody style=" font-size: 0.65em;">
                <tr>
                    <th style="  width: 20%;">
                        <div>Customer name</div>
                    </th>
                    <th style=" width: 20%;">
                        <div>Address</div>
                    </th>
                    <th>
                        <div>Type</div>
                    </th>
                    <th>
                        <div>Brand Family</div>
                    </th>
                    <th>
                        <div>Invoice Date</div>
                    </th>
                    <th>
                        <div>Invoice Number</div>
                    </th>
                    <th>
                        <div>Quantity</div>
                    </th>
                    <th>
                        <div>RYO Total Weight</div>
                    </th>
                    <th>
                        <div>OTP Total Weight (oz)</div>
                    </th>
                    <th>
                        <div>Retail Sale Price($)</div>
                    </th>
                    <th>
                        <div>Manufacturer's/ Wholesale List Price</div>
                    </th>
                </tr>
                ${data.sale_items.map((item, index) => sale_item_template(item, index)).join("")}
                ${totals_template(data.totals)}
            </tbody>
        </table>

        <div class="table-name">Part 3 - Identify Your Delivery Service - Required for Delivery Sellers ONLY</div>
        <table style="width:100%;" class="sales_table">
            <tbody style=" font-size: 0.65em;">
                <tr>
                    <th>
                        <div>Delivery Service Name</div>
                    </th>
                    <th>
                        <div>Address</div>
                    </th>
                    <th>
                        <div>Phone number</div>
                    </th>
                </tr>
                ${data.delivery_services.map((item, index) => delivery_service_template(item)).join("")}
            </tbody>
        </table>

        <div class="table-name">Part 4 - Sign Below</div>
        <div style="font-size:0.65em;font-style: italic;">DECLARATION: I declare under penalties of perjury that I have examined this report and all attachments and to the best of my knowledge and belief it is true, correct and complete.</div>
        <table style="width:100%;">
            <tbody style=" font-size: 0.65em;">
                <tr>
                    <th>
                        <div class="header-notice">Signature of Responsible Party</div>
                        <div style="visibility:hidden">-</div>
                    </th>
                    <th>
                        <div class="header-notice">Responsible Party???s Name ??? please print</div>
                        <div>${data.shop.resp.name}</div>
                    </th>
                    <th>
                        <div class="header-notice">Title</div>
                        <div>${data.shop.resp.title}</div>
                    </th>
                    <th>
                        <div class="header-notice">Phone number</div>
                        <div>${data.shop.resp.phone_number}</div>
                    </th>
                    <th>
                        <div class="header-notice">Date</div>
                        <div>5/10/21</div>
                    </th>
                </tr>
            </tbody>
        </table>
        <div style="float:left;font-size:0.65em">CG_PA-2 Rev. 1-16</div>
        <div style="float:right;font-size:0.65em">Federation of Tax Administrators</div>
    </div>
</body>`

const sale_item_template = (data, index) => ` <tr>
        <td><div>${data.customer_name}</div></td>
        <td><div>${data.address}</div></td>
        <td><div>4</div></td>
        <td><div>${data.brand_family}</div></td>
        <td><div>${data.invoice_date}</div></td>
        <td><div>${data.invoice_number}</div></td>
        <td><div>${data.quantity}</div></td>
        <td><div>N/A</div></td>
        <td><div>${data.weight}</div></td>
        <td><div>$${Math.round(data.sales_price* 100) / 100}</div></td>
        <td><div>$${Math.round(data.cost* 100) / 100}</div></td>
    </tr>`

const totals_template = (totals) => `<tr>
        <td style="visibility:collapse"></td>
        <td style="visibility:collapse"></td>
        <td style="visibility:collapse"></td>
        <td style="visibility:collapse"></td>
        <td style="visibility:collapse"></td>
        <td style="visibility:collapse"></td>
        <td style="visibility:collapse;border: none;"></td>
        <td style="border-bottom: 1px solid white;border-left: 1px solid white;font-size:1em;text-align: center;"><strong>Totals</strong></td>
        <td><div>${Math.round(totals.weight* 100) / 100}</div></td>
        <td><div>$${Math.round(totals.price * 100) / 100}</div></td>
        <td><div>$${Math.round(totals.cost * 100) / 100}</div></td>
    </tr>`

const delivery_service_template = (data) => ` <tr>
    <td><div>${data.name}</div></td>
    <td><div>${data.address}</div></td>
    <td><div>${data.pone_number}</div></td>
</tr>`

module.exports = { main_template, sale_item_template, totals_template }