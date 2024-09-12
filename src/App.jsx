import { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import './App.scss';

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ]);
  const [selectedSchema, setSelectedSchema] = useState('');

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  // Add a new schema to the blue box
  const handleAddSchema = () => {
    if (selectedSchema) {
      const selectedOption = availableSchemas.find(schema => schema.value === selectedSchema);
      setSelectedSchemas([...selectedSchemas, selectedOption]);
      setAvailableSchemas(availableSchemas.filter(schema => schema.value !== selectedSchema));
      setSelectedSchema(''); // Reset the schema selection
    }
  };

  // Handle saving the segment and sending the data to the server using axios
  const handleSaveSegment = (e) => {
    e.preventDefault()
    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.map(schema => ({ [schema.value]: schema.label }))
    };

    console.log('Payload to send:', payload);

    // Use axios to send data to the webhook URL
    axios.post('https://webhook.site/1e32c80d-31fe-4cdb-b036-caca16b90515', payload)
      .then(response => {
        console.log('Successfully sent data to webhook:', response.data);
      })
      .catch(error => {
        console.error('Error sending data to webhook:', error);
      });

    // Close the modal after saving
    handleModalClose();
  };

  return (
    <section className='home_section'>
      <Container>
        <Row>
          <Col lg={12}>
            <div className='save_segment_col'>
              <button className='common_btn' onClick={handleModalShow}>Save Segment</button>
            </div>
          </Col>

          <Modal
            show={modalShow}
            onHide={handleModalClose}
            backdrop="static"
            keyboard={false}
            centered
            size='lg'
            className='popup_modal'
          >
            <Modal.Body>

              <form onSubmit={(e) => handleSaveSegment(e)}>
                <div className='popup_cntr'>
                  <input
                    type='text'
                    placeholder='Enter The Segment Name'
                    value={segmentName}
                    onChange={(e) => setSegmentName(e.target.value)}
                    required
                  />

                  <select
                    value={selectedSchema}
                    onChange={(e) => setSelectedSchema(e.target.value)}
                    placeholder='Add schema to segment'

                  >
                    <option value='' disabled>Select Schema</option>
                    {availableSchemas.map(schema => (
                      <option key={schema.value} value={schema.value}>
                        {schema.label}
                      </option>
                    ))}
                  </select>

                  <button type='button' className='common_btn mb-3' onClick={handleAddSchema}>
                    +Add new schema
                  </button>

                  {selectedSchemas.length > 0 && <div className='blue_box'>
                    {selectedSchemas.map((schema, index) => (
                      <div key={index} className='schema_item'>
                        {schema.label}
                      </div>
                    ))}
                  </div>
                  }

                  <button className='common_btn' type='submit'>
                    Save Segment
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </Row>
      </Container>
    </section>
  );
}

export default App;
