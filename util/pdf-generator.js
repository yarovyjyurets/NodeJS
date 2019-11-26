const PDFDocument = require('pdfkit');

function generateHeader(doc) {
  doc
    .image("/Users/yurii_yarovyi/Documents/Playground/udemy/util/logo.png", 50, 45, { width: 75 })
    .fillColor("#444444")
    .fontSize(20)
    .text("NODE-SHOP Inc.", 135, 67)
    .fontSize(10)
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("Ukraine, Lviv, 77777", 200, 80, { align: "right" })
    .moveDown();
}
function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your money!",
      50,
      720,
      { align: "center", width: 500 }
    );
}
function generateCustomerInformation(doc, order) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;
  doc
    .fontSize(10)
    .text("Invoice Number: ", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(order._id, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Total Amount:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(order.totalPrice),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(order.userInfo.email, 300, customerInformationTop)
    .moveDown();

  generateHr(doc, 252);
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}
function formatCurrency(dolars) {
  return "$" + (dolars / 1).toFixed(2);
}
function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}
function generateTableRow(doc, y, item, description, unitCost, quantity, lineTotal) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateInvoiceTable(doc, order) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < order.Products.length; i++) {
    const item = order.Products[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.title,
      item.description,
      formatCurrency(item.price),
      item.quantity,
      formatCurrency(item.price * item.qty)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(order.totalPrice)
  );
}

const createInvoice = (order) => {
  let doc = new PDFDocument({ margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, order);
  generateInvoiceTable(doc, order);
  generateFooter(doc);

  doc.end();

  return doc;
}

module.exports = {
  createInvoice
}