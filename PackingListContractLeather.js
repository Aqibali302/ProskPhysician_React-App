import React, { Fragment } from "react";


import {
  Grid,
  
} from "@material-ui/core";

class PackingListContract1 extends React.Component {
  constructor(props) {
    super(props);

    //this.submitForm = this.submitForm.bind(this);
    //this.validate = this.validate.bind(this);
    this.LoadData = this.LoadData.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      record_id: this.props.match.params.record_id,

      /**Invoice ID */
      invoice_id: [],
      customer_id: [],
      date_contract: [],
      contract_no: [],

      /*Customer Related fields */
      selected_customer: [],
      customer_zipcode: [],
      customer_country: [],
      customer_province: [],
      customer_city: [],
      customer_office: [],
      customer_building: [],

      /**Agents Related fields */
      selected_agent: [],
      agent_zipcode: [],
      agent_country: [],
      agent_province: [],
      agent_city: [],
      agent_office: [],
      agent_building: [],

      /*Products States */
      products_selected: [],
      color_code: [],
      products_data: [],
      start_szie_range: [],
      end_size_range: [],
      currency_type: [],
      amount_val: [],
      quantity_val: [],
      uom_val: [],
      selection_range: [],
      total_amount: [],
      total_quantity: [],

      /**After products states */
      price_basis: "",
      shipping_mode: "",
      port_from: [],
      port_to: [],
      delivery_date: [],
      delivery_condition: [],
      insurance: [],
      packing: [],
      payment_terms: [],
      terms_and_conditions: [],

      sub_categories_dropdown: [],
      groups_dropdown: [],

      size_range_start: false,
      size_range_start_val: "",
      size_range_start_error: "",

      size_range_end: false,
      size_range_end_val: "",
      size_range_end_error: "",

      substance_range_start: false,
      substance_range_start_val: "",
      substance_range_start_error: "",

      substance_range_end: false,
      substance_range_end_val: "",
      substance_range_end_error: "",

      selected_selection_id: [],
    };
  }

  LoadData = (index) => {
    const data = new FormData();
    data.append("id", this.state.record_id);

    let url =
      localStorage.getItem("url") +
      "/hsa/common/C21InventorySalesPackingByPackingBatchIdView?packingBatchId=" +
      this.state.record_id;
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(
        (json) => {
          if (json.CODE == 1) {
            this.setState({
              //record_id: json.DATA[0].id,
              contract_no: json.DATA[0].contractId,
              date_contract: json.DATA[0].createdOnDate,

              
              port_from: json.DATA[0].contract[0].portFromLabel,
              port_to: json.DATA[0].contract[0].portToLabel,
             
              color_code: json.DATA[0].contract[0].items,
              // /**Products*/
              products_selected: json.DATA[0].contract[0].items[0].itemLabel,
              size_range_start_val:
                json.DATA[0].contract[0].items[0].sizeRangeStart,
              size_range_end_val:
                json.DATA[0].contract[0].items[0].sizeRangeEnd,
              substance_range_start_val:
                json.DATA[0].contract[0].items[0].substanceRangeStart,
              substance_range_end_val:
                json.DATA[0].contract[0].items[0].substanceRangeEnd,

              products_data: json.DATA,
              selected_selection_id: json.DATA[0].selectionId,

              
              uom_val: json.DATA[0].contract[0].items[0].uomTypeLabel,
              
            });
            // alert(this.state.selected_agent +":"+json.DATA[0].agentLabel)
            window.print();
          } else if (json.error === 1) {
            alert(json.error_message);
          } else if (json.success === 0 && json.redirect_url !== "") {
            window.location = json.redirect_url;
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          alert(error);
        }
      );
  };

  renderSelectionRanges(itemId) {
    return this.state.products_data.map((dt, i) => {
      if (itemId == dt.itemId) {
        const len = dt.selectionRanges.length - 1;
        return dt.selectionRanges.map((dt1, i) => {
          return (
            <span>
              {dt1.selectionRangeLabel + (len !== i ? "/" : "")} <br />
            </span>
          );
        });
      }
    });
  }

  renderWeightageRanges(itemId) {
    return this.state.products_data.map((dt, i) => {
      const len = dt.selectionRanges.length - 1;
      if (itemId == dt.itemId) {
        return dt.selectionRanges.map((dt1, i) => {
          if (len != 0) {
            return (
              <span>
                {(i == 0 ? "About(" : "") +
                  dt1.selectionRangeWeightage +
                  (len !== i ? "%/" : "%)")}{" "}
                <br />
              </span>
            );
          }
        });
      }
    });
  }

  

  renderTotalCartons(selectionId) {
    let sumCartons = 0;
    const { products_data } = this.state;
    const lastIndex = this.state.products_data.length - 1;
    return this.state.products_data.map((dt, i) => {
      if (selectionId == dt.selectionId) console.log(sumCartons);

      sumCartons = Number(sumCartons) + Number(products_data.length);

      return (
        <Fragment>
          {i == lastIndex && (
            <span>
              {sumCartons} {dt.packingTypeLabel}
            </span>
          )}
        </Fragment>
      );
    });
  }

  renderOverallTotalCartons() {
    let sumCartons = 0;
    var sameCarton = 0;
    const { products_data } = this.state;
    const lastIndex = this.state.products_data.length - 1;
    return this.state.products_data.map((dt, i) => {
      // sumCartons = Number(sumCartons) + Number(i);

      for (let i = 0; i < products_data.length; i++) {
        sumCartons = Number(products_data.length);
      }
      return (
        <Fragment>
          {i == lastIndex && (
            <span>
              {sumCartons} {dt.packingTypeLabel}
            </span>
          )}
        </Fragment>
      );
    });
  }

  renderOverallTotalSizePieces() {
    let sumSizePieces = 0;
    const lastIndex = this.state.products_data.length - 1;

    return this.state.products_data.map((dt, i) => {
      sumSizePieces = Number(sumSizePieces) + Number(dt.sidesPieces);
      return (
        <Fragment>{i == lastIndex && <span>{sumSizePieces}</span>}</Fragment>
      );
    });
  }

  renderOverallTotalMeasurement() {
    let sumMeasurement = 0;
    const lastIndex = this.state.products_data.length - 1;
    return this.state.products_data.map((dt, i) => {
      sumMeasurement = Number(sumMeasurement) + Number(dt.measurement);
      return (
        <Fragment>{i == lastIndex && <span>{sumMeasurement}</span>}</Fragment>
      );
    });
  }

  renderTotalSizePieces(selectionId) {
    let sumSizePieces = 0;
    const lastIndex = this.state.products_data.length - 1;

    return this.state.products_data.map((dt, i) => {
      if (selectionId == dt.selectionId)
        sumSizePieces = Number(sumSizePieces) + Number(dt.sidesPieces);
      return (
        <Fragment>{i == lastIndex && <span>{sumSizePieces}</span>}</Fragment>
      );
    });
  }

  renderTotalMeasurement(selectionId) {
    let sumMeasurement = 0;
    const lastIndex = this.state.products_data.length - 1;
    return this.state.products_data.map((dt, i) => {
      if (selectionId == dt.selectionId)
        sumMeasurement = Number(sumMeasurement) + Number(dt.measurement);
      return (
        <Fragment>{i == lastIndex && <span>{sumMeasurement}</span>}</Fragment>
      );
    });
  }

  renderTotalNetWeight(selectionId) {
    let netWeight = 0;
    const lastIndex = this.state.products_data.length - 1;
    return this.state.products_data.map((dt, i) => {
      netWeight = Number(netWeight) + Number(dt.netWeight);
      return <Fragment>{i == lastIndex && <span>{netWeight}</span>}</Fragment>;
    });
  }

  renderTotalGrossWeight(selectionId) {
    let grossWeight = 0;
    const lastIndex = this.state.products_data.length - 1;
    return this.state.products_data.map((dt, i) => {
      grossWeight = Number(grossWeight) + Number(dt.grossWeight);
      return (
        <Fragment>{i == lastIndex && <span>{grossWeight}</span>}</Fragment>
      );
    });
  }

  renderTableColumns() {
    var lastSelectionIndex = 0;
    var selectedColor = 0;
    var total_size_pieces = 0;
    var total_measurement = 0;
    var count = 0;
    var showSummary = false;
    var totalSides = 0;
    var totalMeasurement = 0;
    const lastIndex = this.state.products_data.length - 1;
    const secondLastIndex = this.state.products_data.length - 3;
    const firstIndex =
      this.state.products_data.length - this.state.products_data.length;

    return this.state.products_data.map((dt, i) => {
      //const len = this.state.total_amount.lastIndexOf;

      if (showSummary) {
        // count = 1;
        // totalSides = dt.sidesPieces;
        // totalMeasurement = dt.measurement;
        // console.log(totalSides + ":" + totalMeasurement);
      }
      if (dt.selectionId !== lastSelectionIndex && i != 0) {
        showSummary = true;
      } else {
        // count++;
        //count=0;
        showSummary = false;
      }
      if ((dt.selectionId == lastSelectionIndex && i != 0) || i == 0) {
        count++;
        totalSides += dt.sidesPieces;
        totalMeasurement += dt.measurement;
      }

      //showSummary = false;
      console.log(
        lastSelectionIndex + "=" + dt.selectionId + ":" + showSummary
      );
      lastSelectionIndex = dt.selectionId;

      return (
        <Fragment>
          <span style={{ fontWeight: "bold" }}>{dt.itemLabel}</span>

          {i == firstIndex && (
            <Fragment>
              <tr>
                <th
                  colSpan="2"
                  style={{
                    border: "1px solid black",
                    textAlign: "left",
                  }}
                >
                  SIZE: {this.state.size_range_start_val}/
                  {this.state.size_range_end_val} SP PCS
                </th>
                <th
                  colSpan="1"
                  style={{
                    border: "1px solid black",
                    textAlign: "left",
                  }}
                ></th>
                <th
                  colSpan="1"
                  style={{
                    border: "1px solid black",
                    textAlign: "left",
                  }}
                ></th>
                <th
                  colSpan="2"
                  style={{
                    border: "1px solid black",
                    textAlign: "left",
                  }}
                ></th>
              </tr>
              <tr>
                <th
                  colSpan="2"
                  style={{
                    border: "1px solid black",
                    textAlign: "left",
                  }}
                >
                  SUB: {this.state.substance_range_start_val}/
                  {this.state.substance_range_end_val} MM
                </th>

                <th
                  colSpan="4"
                  style={{
                    border: "1px solid black",
                    textAlign: "left",
                  }}
                >
                  
                  {this.state.products_selected}
                </th>
              </tr>
            </Fragment>
          )}

         
          {i == firstIndex && (
            <tr>
              <th
                colSpan="4"
                style={{
                  border: "1px solid black",
                  textAlign: "left",
                }}
              >
                COLOR: {dt.colorTypeLabel}
              </th>
              <th
                colSpan="2"
                style={{
                  border: "1px solid black",
                  textAlign: "left",
                }}
              ></th>
            </tr>
          )}
          {showSummary && (
            <Fragment>
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {
                    
                    count
                  }
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {
                    
                    totalSides
                  }
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {totalMeasurement}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
              </tr>
              <span style={{ display: "none" }}>{(count = 1)}</span>
              <span style={{ display: "none" }}>
                {(totalSides = dt.sidesPieces)}
              </span>
              <span style={{ display: "none" }}>
                {(totalMeasurement = dt.measurement)}
              </span>
            </Fragment>
          )}
          <tr>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              {dt.cartonNo} {dt.packingTypeLabel}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              {dt.sidesPieces}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              {dt.measurement} {this.state.uom_val}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {dt.selectionLabel}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              {dt.grossWeight} KGs
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
              }}
            >
              {dt.netWeight} KGs
            </td>
          </tr>
          {i == lastIndex && false && (
            <Fragment>
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {this.renderTotalCartons()}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {this.renderTotalSizePieces()}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {this.renderTotalMeasurement()}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
              </tr>
            </Fragment>
          )}

          

          {i == lastIndex && (
            <tr>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {count}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {this.renderTotalSizePieces(dt.selectionId)}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {this.renderTotalMeasurement(dt.selectionId)}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
              ></td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
              ></td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
              ></td>
            </tr>
          )}

          
          {i == lastIndex && (
            <Fragment>
              <tr>
                <td
                  colSpan="3"
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  SUMMARY
                </td>

                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {" "}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
              </tr>
              {this.renderTotalSummaryColumns()}
              {/* <tr>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {this.renderOverallTotalCartons()}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {this.renderOverallTotalSizePieces()}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {this.renderOverallTotalMeasurement()}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
              </tr> */}
            </Fragment>
          )}

          {i == lastIndex && (
            <Fragment>
              <tr>
                <td
                  colSpan="3"
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  TOTAL
                </td>

                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {this.renderOverallTotalCartons()}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {this.renderOverallTotalSizePieces()}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {this.renderOverallTotalMeasurement()}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
              </tr>
            </Fragment>
          )}
          {i == lastIndex && (
            <Fragment>
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {this.renderTotalGrossWeight()}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {this.renderTotalNetWeight()}
                </td>
              </tr>
            </Fragment>
          )}
        </Fragment>
      );
    });
  }

  renderTotalSummaryColumns() {
    var lastSelectionIndex = 0;
    var total_size_pieces = 0;
    var total_measurement = 0;
    var count = 0;
    var showSummary = false;
    var totalSides = 0;
    var totalMeasurement = 0;
    const lastIndex = this.state.products_data.length - 1;
    const secondLastIndex = this.state.products_data.length - 3;
    const firstIndex =
      this.state.products_data.length - this.state.products_data.length;
    return this.state.products_data.map((dt, i) => {
      //const len = this.state.total_amount.lastIndexOf;

      if (showSummary) {
        // count = 1;
        // totalSides = dt.sidesPieces;
        // totalMeasurement = dt.measurement;
        // console.log(totalSides + ":" + totalMeasurement);
      }
      if (dt.selectionId !== lastSelectionIndex && i != 0) {
        showSummary = true;
      } else {
        // count++;
        //count=0;
        showSummary = false;
      }
      if ((dt.selectionId == lastSelectionIndex && i != 0) || i == 0) {
        count++;
        totalSides += dt.sidesPieces;
        totalMeasurement += dt.measurement;
      }

      //showSummary = false;
      console.log(
        lastSelectionIndex + "=" + dt.selectionId + ":" + showSummary
      );
      lastSelectionIndex = dt.selectionId;

      return (
        <Fragment>
          <span style={{ fontWeight: "bold" }}>{dt.itemLabel}</span>

         

          {showSummary && (
            <Fragment>
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {
                    //this.renderTotalCartons()
                    count
                  }
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {
                    //this.renderTotalSizePieces()
                    totalSides
                  }
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {totalMeasurement}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                  }}
                ></td>
              </tr>
              <span style={{ display: "none" }}>{(count = 1)}</span>
              <span style={{ display: "none" }}>
                {(totalSides = dt.sidesPieces)}
              </span>
              <span style={{ display: "none" }}>
                {(totalMeasurement = dt.measurement)}
              </span>
            </Fragment>
          )}

          {i == lastIndex && (
            <tr>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {count}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {this.renderTotalSizePieces(dt.selectionId)}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {this.renderTotalMeasurement(dt.selectionId)}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
              ></td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
              ></td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
              ></td>
            </tr>
          )}
        </Fragment>
      );
    });
  }

  

  componentDidMount() {
    
    
    if (this.state.record_id != 0) {
      this.LoadData();
    }
  }

  render() {
    return (
      <Grid container item xs={12} sm={12}>
        <div style={{ width: "100%" }}>
          <span style={{ float: "right" }}>{this.state.date_contract}</span>
        </div>

        <div style={{ width: "100%", marginTop: "-60px" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            H. SADAR ALI AKHTAR ALI (PVT.) LTD
          </p>

          <p
            style={{
              textAlign: "center",
              fontSize: "15px",
              marginTop: "-28px",
            }}
          >
            <strong>14, G.T ROAD,HIDE MARKET,LAHORE,PAKISTAN</strong>
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: "15px",
              marginTop: "-18px",
            }}
          >
            <strong> {this.renderTotalCartons()}s </strong>
          </p>

          <div style={{ marginTop: "px", amarginLeft: "18px" }}>
            <span
              style={{ borderBottom: "1px solid black", width: "200px" }}
            ></span>

            <br />
            <span
              style={{
                float: "right",
                //fontWeight: "bold",
                paddingRight: "10px",
                marginTop: "-15px",
              }}
            >
              CON # {this.state.contract_no}
            </span>
            <span
              style={{
                paddingRight: "5px",
                whiteSpace: "nowrap",
                display: "block",
                marginTop: "-20px",
              }}
            >
              PACKING NO:{" "}
              <span
                style={{
                  paddingLeft: "23px",
                  paddingRight: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                {this.state.record_id}
              </span>
            </span>
            <span>
              <span
                style={{
                  paddingRight: "5px",
                  whiteSpace: "nowrap",
                  //fontWeight: 'bold',
                }}
              >
                SHIPPED FROM:{" "}
              </span>
              <span
                style={{
                  paddingLeft: "2px",
                  paddingRight: "5px",
                  whiteSpace: "nowrap",
                }}
              >
                {this.state.port_from} TO {this.state.port_to}
              </span>
            </span>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          
          <table style={{ borderCollapse: "collapse" }}>
            <tr>
              <th
                style={{
                  border: "1px solid black",
                  backgroundColor: "#808080",
                  color: "white",
                  textAlign: "center",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                CARTONS
              </th>
              <th
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  backgroundColor: "#808080",
                  color: "white",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                SIDE/PCS
              </th>
              <th
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  backgroundColor: "#808080",
                  color: "white",
                }}
              >
                MEASUREMENT
              </th>
              <th
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  backgroundColor: "#808080",
                  color: "white",
                }}
              >
                SELECTION
              </th>
              <th
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  backgroundColor: "#808080",
                  color: "white",
                }}
              >
                GROSS WEIGHT
              </th>
              <th
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  padding: "5px",
                  backgroundColor: "#808080",
                  color: "white",
                }}
              >
                NET WEIGHT
              </th>
            </tr>

            {this.renderTableColumns()}
          </table>
        </div>
      </Grid>
    );
  }
}

export default PackingListContract1;
