import React from "react";
import searchIcon from "../assets/Icons/search-24px.svg";
import chevronIcon from "../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../assets/Icons/delete_outline-24px.svg";
import editIcon from "../assets/Icons/edit-24px.svg";

const Warehouses = ({ warehouses }) => {
  const warehouseList = warehouses.map((warehouse) => {
    return (
      <div className="warehouses__item" key={warehouse.id}>
        <div className="warehouses__item-left-container">
          <p className="warehouses__label">WAREHOUSE</p>
          <a className="warehouses__link">
            <h3 className="warehouses__text-location">{warehouse.name}</h3>
            <img src={chevronIcon} alt="" className="warehouses__icon" />
          </a>
          <p className="warehouses__label">ADDRESS</p>
          <p className="warehouses__text-address">
            {warehouse.address}, {warehouse.city}, {warehouse.country}
          </p>
        </div>

        <div className="warehouses__item-right-container">
          <p className="warehouses__label">CONTACT NAME</p>
          <p className="warehouses__text-contact-name">
            {warehouse.contact.name}
          </p>
          <p className="warehouses__label">CONTACT INFORMATION</p>
          <p className="warehouses__text-contact-phone">
            {warehouse.contact.phone}
          </p>
          <p className="warehouses__text-contact-email">
            {warehouse.contact.email}
          </p>
        </div>

        <div className="warehouses__item-icons-container">
          <img src={deleteIcon} alt="" className="warehouses__icon" />
          <img src={editIcon} alt="" className="warehouses__icon" />
        </div>
      </div>
    );
  });

  return (
    <main className="warehouses">
      <section className="warehouses__header-container">
        <h1 className="warehouses__heading">Warehouses</h1>
        <label htmlFor="search" className="warehouses__search-label">
          <input
            type="search"
            className="warehouses__searchbar"
            name="search"
            placeholder="Search..."
          />
          <img src={searchIcon} alt="" className="warehouses__search-icon" />
        </label>
        <button className="warehouses__button">+ Add New Warehouse</button>
      </section>

      <section className="warehouses__list">{warehouseList}</section>
    </main>
  );
};

export default Warehouses;
