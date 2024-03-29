import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import close from "../assets/Icons/close-24px.svg";
import searchIcon from "../assets/Icons/search-24px.svg";
import sortIcon from "../assets/Icons/sort-24px.svg";
import chevronIcon from "../assets/Icons/chevron_right-24px.svg";
import deleteIcon from "../assets/Icons/delete_outline-24px.svg";
import editIcon from "../assets/Icons/edit-24px.svg";

Modal.setAppElement("#root");

class Warehouses extends React.Component {
  state = {
    searchTerm: null,
    searchResults: [],
  };

  componentWillUnmount() {
    this.setState({
      searchTerm: null,
      searchResults: null,
    });

    // console.log("component unmounted", this.state);
  }

  searchWarehouseData = (e) => {
    const searchTerm = e.target.value;
    // regex that will check if warehouse values contain the onChange input,
    // is also case insensitive and searches special characters! that was a hard one
    const regex = /\W/g;
    const searchTermRegex = RegExp(e.target.value.replace(regex, "\\$&"), "gi");
    const warehouses = this.props.warehouses;
    let searchResults = warehouses.filter((warehouse) => {
      return (
        searchTermRegex.test(Object.values(warehouse)) ||
        searchTermRegex.test(Object.values(warehouse.contact))
      );
    });

    this.setState({
      searchTerm,
      searchResults,
    });
  };

  setModalIsOpen(modalIsOpen) {
    this.setState({
      modalIsOpen,
    });
  }

  render() {
    let warehouses = this.props.warehouses;

    if (this.state.searchTerm !== null && this.state.searchResults.length > 0) {
      warehouses = this.state.searchResults;
    }

    const warehouseList = warehouses.map((warehouse) => {
      return (
        <div className="warehouses__item" key={warehouse.id}>
          <div className="warehouses__item-left-container">
            <p className="warehouses__label">WAREHOUSE</p>
            <Link
              to={`/warehouse/${warehouse.navLink}`}
              className="warehouses__link"
            >
              <h3 className="warehouses__text-location">{warehouse.name}</h3>
              <img
                src={chevronIcon}
                alt=""
                className="warehouses__icon warehouses__icon--chevron"
              />
            </Link>
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
            <div className="warehouses__contact-info-container">
              <p className="warehouses__label">CONTACT INFORMATION</p>
              <p className="warehouses__text-contact-phone">
                {warehouse.contact.phone}
              </p>
              <p className="warehouses__text-contact-email">
                {warehouse.contact.email}
              </p>
            </div>
          </div>

          <div className="warehouses__item-icons-container">
            <img
              src={deleteIcon}
              alt=""
              className="warehouses__icon"
              onClick={() => this.setModalIsOpen(true)}
            />
            <Link to="/editWarehouse" className="route-link">
              <img src={editIcon} alt="" className="warehouses__icon" />
            </Link>
          </div>
        </div>
      );
    });

    return (
      <main className="warehouses">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.setModalIsOpen(false)}
          className="inventory__modal"
          style={{ overlay: { backgroundColor: "rgba(19, 24, 44, 0.7)" } }}
        >
          <section className="delete-modal">
            <div className="delete-modal__tablet-wrapper">
              <img
                src={close}
                alt="close"
                className="delete-modal__close-btn"
                onClick={() => this.setModalIsOpen(false)}
              />
              <h1 className="delete-modal__header">
                Delete Television inventory item?
              </h1>
              <p className="delete-modal__warning">
                Please confirm that you'd like to delete Television from the
                inventory list. You won't be able to undo this action.
              </p>
              <div className="delete-modal__delete-action-btn-container">
                <button
                  className="delete-modal__cancel-btn"
                  onClick={() => this.setModalIsOpen(false)}
                >
                  Cancel
                </button>
                <button className="delete-modal__delete-btn">Delete</button>
              </div>
            </div>
          </section>
        </Modal>

        <section className="warehouses__header-container">
          <h1 className="warehouses__heading">Warehouses</h1>
          <div className="warehouses__search-add">
            <label htmlFor="search" className="warehouses__search-label">
              <input
                type="search"
                className="warehouses__searchbar"
                name="search"
                placeholder="Search..."
                onChange={(e) => this.searchWarehouseData(e)}
              />
              <img
                src={searchIcon}
                alt=""
                className="warehouses__search-icon"
              />
            </label>
            <Link to="/newWarehouse">
              <button className="warehouses__button">
                + Add New Warehouse
              </button>
            </Link>
          </div>
        </section>

        <section className="warehouses__list">
          <div className="warehouses__sort">
            <div className="warehouses__sort-left">
              <div className="warehouses__sort-category sort-warehouse">
                <p className="warehouses__sort-label">WAREHOUSE</p>
                <img
                  src={sortIcon}
                  alt=""
                  className="warehouses__icon warehouses__icon--sort"
                />
              </div>
              <div className="warehouses__sort-category sort-address">
                <p className="warehouses__sort-label">ADDRESS</p>
                <img
                  src={sortIcon}
                  alt=""
                  className="warehouses__icon warehouses__icon--sort"
                />
              </div>
            </div>
            <div className="warehouses__sort-right">
              <div className="warehouses__sort-category sort-name">
                <p className="warehouses__sort-label">CONTACT NAME</p>
                <img
                  src={sortIcon}
                  alt=""
                  className="warehouses__icon warehouses__icon--sort"
                />
              </div>
              <div className="warehouses__sort-category sort-info">
                <p className="warehouses__sort-label">CONTACT INFORMATION</p>
                <img
                  src={sortIcon}
                  alt=""
                  className="warehouses__icon warehouses__icon--sort"
                />
              </div>
            </div>
            <p className="warehouses__sort-label sort-actions">ACTIONS</p>
          </div>
          {/* if search is made & no results found, render an error, else render the full list */}
          {this.state.searchTerm && this.state.searchResults.length < 1 ? (
            <div className="warehouses__search-no-results">
              <h3 className="warehouses__text-address">No results found</h3>
            </div>
          ) : (
            warehouseList
          )}
        </section>
      </main>
    );
  }
}

export default Warehouses;
