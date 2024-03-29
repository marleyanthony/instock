const fs = require("fs");
const path = require("path");

const warehouseFile = path.join(__dirname, "../db/warehouses.json");
const inventoryFile = path.join(__dirname, "../db/inventories.json");

function Warehouse(name, address, city, country, contact) {
  this.name = name;
  this.navLink = name.split(" ").join("");
  this.address = address;
  this.city = city;
  this.country = country;
  this.contact = contact;
}

function list() {
  const data = fs.readFileSync(warehouseFile);
  return JSON.parse(data);
}

const getWarehouseByName = (pathName) => {
  // console.log("pathName:", pathName);
  const warehouseData = JSON.parse(fs.readFileSync(warehouseFile));
  // console.log("warehouseData:", warehouseData);
  const warehouse = warehouseData.filter(({ navLink }) => navLink === pathName);
  // console.log("warehouse:", warehouse);
  return warehouse;
};

const getWarehouseInventory = (pathName) => {
  // console.log("name:", name);
  const inventoryData = JSON.parse(fs.readFileSync(inventoryFile));
  const warehouseInventory = inventoryData.filter((item) => {
    // console.log("item.warehouseName:", item.warehouseName);
    return item.warehouseName.split(" ").join("") === pathName;
  });
  // console.log("warehouseInventory:", warehouseInventory);
  return warehouseInventory;
};

const getItemDetails = (warehouseName, itemName) => {
  const inventoryData = JSON.parse(fs.readFileSync(inventoryFile));
  const item = inventoryData.filter((item) => {
    return (
      item.warehouseName.split(" ").join("") === warehouseName &&
      item.itemName.split(" ").join("") === itemName
    );
  });
  return item[0];
};

const updateWarehouse = (warehouseName, updatedData) => {
  const warehouses = JSON.parse(fs.readFileSync(warehouseFile));
  let match = warehouses.findIndex(
    (warehouse) => warehouse.navLink === warehouseName
  );
  if (!match) {
    return false;
  } else {
    warehouses[match] = updatedData;
    return warehouses;
  }
};

module.exports = {
  list,
  getWarehouseByName,
  getWarehouseInventory,
  getItemDetails,
  updateWarehouse,
};
