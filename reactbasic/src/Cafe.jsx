import React, { useState } from 'react'

const Cafe = () => {
  const [pizzaQty, setPizzaQty] = useState(0);
  const [burgerQty, setBurgerQty] = useState(0);
  const [friesQty, setFriesQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalBill, setFinalBill] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const subTotal = (pizzaQty * 1000) + (burgerQty * 500) + (friesQty * 300);
    const discountValue = subTotal * 0.05; 
    const final = subTotal - discountValue;

    setTotal(subTotal);
    setDiscount(discountValue);
    setFinalBill(final);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Cafe Billing App</h1>
      <form onSubmit={handleSubmit}>
        <p>Pizza (RS.1000)</p>
        <input 
          type="number" 
          placeholder="Enter Quantity" 
          value={pizzaQty} 
          onChange={(e) => setPizzaQty(Number(e.target.value))} 
        />
        <br />

        <p>Burger (RS.500)</p>
        <input 
          type="number" 
          placeholder="Enter Quantity" 
          value={burgerQty} 
          onChange={(e) => setBurgerQty(Number(e.target.value))} 
        />
        <br />

        <p>Fries (RS.300)</p>
        <input 
          type="number" 
          placeholder="Enter Quantity" 
          value={friesQty} 
          onChange={(e) => setFriesQty(Number(e.target.value))} 
        />
        <br />

        <button 
          type="submit" 
          style={{
            border: "2px solid black", 
            borderRadius: "5px", 
            padding: "5px 10px",
            background: "lightblue", 
            marginTop: "10px"
          }}
        >
          Submit
        </button>
      </form>

      <h1>SubTotal: {total}</h1>
      <h1>Discount: {discount}</h1>
      <h1>Final Bill: {finalBill}</h1>
    </div>
  )
}

export default Cafe
