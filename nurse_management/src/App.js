import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import fetchData from "./Config/fetchData";
import { Button, Form, Modal, Spinner } from "react-bootstrap";

const App = () => {
  const [nurseData, setNurseData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [newData, setNewData] = useState({
    name: "",
    licenseNumber: "",
    dob: "",
    age: "",
    id: "",
  });

  const getApiData = async () => {
    try {
      const nurseData = await fetchData.list_data({});
      setNurseData(nurseData?.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getDeleteData = async (id) => {
    setLoading(true);
    try {
      var data = { id: id };
      const deletedData = await fetchData.delete_data(data);
      console.log("nurseData", nurseData);
      if (deletedData?.message == "Success") {
        getApiData();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const handleShow = (nurse) => {
    setNewData({
      name: nurse?.Name,
      licenseNumber: nurse?.LicenseNumber,
      dob: nurse?.DOB,
      age: nurse?.Age,
      id: nurse?.NurseID,
    });
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const handleData = async () => {
    setLoading(true);
    try {
      var data = {
        name: newData?.name,
        LicenseNumber: newData?.licenseNumber,
        dob: newData?.dob,
        age: newData?.age,
        id: newData?.id,
      };
      if (newData?.id != "" && newData?.id != undefined) {
        const updatenurseData = await fetchData.update_data(data);
        if (updatenurseData?.message == "Success") {
          getApiData();
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        const addnurseData = await fetchData.add_data(data);
        if (addnurseData?.message == "Success") {
          getApiData();
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  const downloadXLSFile = (data, headers) => {
    try {
      const outputFilename = `Nurse_data.xls`;
      let excelContent = headers.join("\t") + "\n";
      data.forEach((row) => {
        const rowData = headers.map((header) => row[header]);
        excelContent += rowData.join("\t") + "\n";
      });
      const blob = new Blob([excelContent], {
        type: "application/vnd.ms-excel",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = outputFilename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleDownload = () => {
    const headers = ["NurseID", "Name", "LicenseNumber", "DOB", "Age"];
    downloadXLSFile(nurseData, headers);
  };

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...nurseData].sort((a, b) => {
      const comparison = a[key] === b[key] ? 0 : a[key] < b[key] ? -1 : 1;
      return direction === "asc" ? comparison : -comparison;
    });

    setNurseData(sortedData);
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = nurseData
    ? nurseData.filter((nurse) => {
        return (
          nurse.NurseID.toString().includes(searchTerm) ||
          nurse.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nurse.LicenseNumber.includes(searchTerm) ||
          nurse.DOB.includes(searchTerm) ||
          nurse.Age.toString().includes(searchTerm)
        );
      })
    : [];
  return (
    <div style={{ marginTop: 10, marginBottom: 10 }}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="container-md">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1 }}>
              <Button
                variant="primary"
                onClick={() => handleShow("")}
                style={{ marginHorizontal: 30 }}
              >
                Add
              </Button>
            </div>
            <Button
              variant="success"
              onClick={() => handleDownload()}
              style={{ marginHorizontal: 30 }}
            >
              Download
            </Button>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" onClick={() => handleSort("NurseID")}>
                  ID
                </th>
                <th scope="col" onClick={() => handleSort("Name")}>
                  Name
                </th>
                <th scope="col" onClick={() => handleSort("LicenseNumber")}>
                  License Number
                </th>
                <th scope="col" onClick={() => handleSort("DOB")}>
                  DOB
                </th>
                <th scope="col" onClick={() => handleSort("Age")}>
                  Age
                </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((nurse) => (
                <tr key={nurse.NurseID}>
                  <td>{nurse.NurseID}</td>
                  <td>{nurse.Name}</td>
                  <td>{nurse.LicenseNumber}</td>
                  <td>{nurse.DOB}</td>
                  <td>{nurse.Age}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleShow(nurse)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => getDeleteData(nurse?.NurseID)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={newData.name}
                    onChange={(e) =>
                      setNewData({ ...newData, name: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="licenseNumber">
                  <Form.Label>License Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter license number"
                    value={newData.licenseNumber}
                    onChange={(e) =>
                      setNewData({ ...newData, licenseNumber: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="dob">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter date of birth"
                    value={newData.dob}
                    onChange={(e) =>
                      setNewData({ ...newData, dob: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter age"
                    value={newData.age}
                    onChange={(e) =>
                      setNewData({ ...newData, age: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleData}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default App;
