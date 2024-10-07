"use client";
import { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const DateRangeScreen = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [topN, setTopN] = useState(0); 
    const [salesData, setSalesData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalSales, setTotalSales] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);
    
    const handleClosePopup = () => setShowPopup(false);
    const handleOpenPopup = () => setShowPopup(true);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setLoading(true); 
    
        try {
            const response = await fetch(`/api/sales/data-range/?startDate=${startDate}&endDate=${endDate}&topN=${topN}`);
            const result = await response.json();
            if (response.ok) {
                setSalesData(result.topProducts);
                setTotalSales(result.totalSales); 
                setTotalRevenue(result.totalRevenue); 
                setTotalProfit(result.totalProfit); 
                setLoading(false);
            } else {
                setError(result.error);
                setLoading(false);
            }
        } catch (err) {
            setError('Error fetching sales data');
            setLoading(false);
        }
    
        handleClosePopup(); 
    };

    useEffect(() => {
        if (!salesData) return;

        const ctx = document.getElementById('chart');
        new Chart(ctx, {
          type: 'line',
          data: {
              labels: salesData.map(product => product.productName), 
              datasets: [{
                  label: 'Total Sold',
                  data: salesData.map(product => product.totalSold), 
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: false,
              }, {
                  label: 'Total Revenue',
                  data: salesData.map(product => product.totalRevenue), 
                  borderColor: 'rgba(153, 102, 255, 1)',
                  backgroundColor: 'rgba(153, 102, 255, 0.2)',
                  fill: false,
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });      
    }, [salesData]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    
    return (
        <section>
            <h2 className="mb-4">Ventas por Producto</h2>
            <Button variant="primary" onClick={handleOpenPopup}>
                Show Popup
            </Button>
            <Modal show={showPopup} onHide={handleClosePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Sales Data Range</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Top N Products</Form.Label>
                            <Form.Control
                                type="number"
                                min={1}
                                value={topN}
                                onChange={(e) => setTopN(parseInt(e.target.value))}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Get Sales Data
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <section className='d-flex mb-3'>
                <div className='border rounded-10 border-color-1 p-4 ms-auto d-flex align-items-center' style={{ width: 250 }}>
                    <div>
                    <div className=''><strong>Total summary</strong></div>  
            <div className='small-text'>{`Ventas: ${totalSales}`}</div>  {/* Fila para Ventas */}
            <div className='small-text'>{`Ingresos: ${totalRevenue}`}</div>  {/* Fila para Ingresos */}
            <div className='small-text'>{`Ganancias: ${totalProfit}`}</div>  {/* Fila para Ganancias */}
        </div>
                    <i className="bi bi-cart ms-auto fs-4"></i>
                </div>
            </section>
            <section style={{ height: 500 }}>
                <canvas id="chart"></canvas>
            </section>

            {loading && <p>Cargando datos...</p>}
            {error && <p>Error: {error}</p>}
        </section>
    );
};

export default DateRangeScreen;
