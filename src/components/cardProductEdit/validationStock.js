const validationStock = (stock) => {
    let errors = {};
  
      if (stock.s.blanco < 0) errors.stock = 'The value cannot be negative.'
    if (stock.s.negro < 0) errors.stock = 'The value cannot be negative.'
    if (stock.s.gris < 0) errors.stock = 'The value cannot be negative.'
  
    if (stock.m.blanco < 0) errors.stock = 'The value cannot be negative.'
    if (stock.m.negro < 0) errors.stock = 'The value cannot be negative.'
    if (stock.m.gris < 0) errors.stock = 'The value cannot be negative.'
  
    if (stock.l.blanco < 0) errors.stock = 'The value cannot be negative.'
    if (stock.l.negro < 0) errors.stock = 'The value cannot be negative.'
    if (stock.l.gris < 0) errors.stock = 'The value cannot be negative.'
  
    if (stock.xl.blanco < 0) errors.stock = 'The value cannot be negative.'
    if (stock.xl.negro < 0) errors.stock = 'The value cannot be negative.'
    if (stock.xl.gris < 0) errors.stock = 'The value cannot be negative.'
  
  
  if (isNaN(stock.s.blanco) || stock.s.blanco.includes('-') || stock.s.blanco.includes('+') || stock.s.blanco.includes('e')) errors.stock = "Should be a positive integer";
  if (isNaN(stock.s.negro) || stock.s.negro.includes('-') || stock.s.negro.includes('+') || stock.s.negro.includes('e')) errors.stock = "Should be a positive integer";
  if (isNaN(stock.s.gris) || stock.s.gris.includes('-') || stock.s.gris.includes('+') || stock.s.gris.includes('e')) errors.stock = "Should be a positive integer";
  
  if (isNaN(stock.m.blanco) || stock.m.blanco.includes('-') || stock.m.blanco.includes('+') || stock.m.blanco.includes('e')) errors.stock = "Should be a positive integer";
  if (isNaN(stock.m.negro) || stock.m.negro.includes('-') || stock.m.negro.includes('+') || stock.m.negro.includes('e')) errors.stock = "Should be a positive integer";
  if (isNaN(stock.m.gris) || stock.m.gris.includes('-') || stock.m.gris.includes('+') || stock.m.gris.includes('e')) errors.stock = "Should be a positive integer";
  
  if (isNaN(stock.l.blanco) || stock.l.blanco.includes('-') || stock.l.blanco.includes('+') || stock.l.blanco.includes('e')) errors.stock = "Should be a positive integer";
  if (isNaN(stock.l.negro) || stock.l.negro.includes('-') || stock.l.negro.includes('+') || stock.l.negro.includes('e')) errors.stock = "Should be a positive integer";
  if (isNaN(stock.l.gris) || stock.l.gris.includes('-') || stock.l.gris.includes('+') || stock.l.gris.includes('e')) errors.stock = "Should be a positive integer";
  
  if (isNaN(stock.xl.blanco) || stock.xl.blanco.includes('-') || stock.xl.blanco.includes('+') || stock.xl.blanco.includes('e')) errors.stock = "Should be a positive integer";
  if (isNaN(stock.xl.negro) || stock.xl.negro.includes('-') || stock.xl.negro.includes('+') || stock.xl.negro.includes('e')) errors.stock = "Should be a positive integer";
  if (isNaN(stock.xl.gris) || stock.xl.gris.includes('-') || stock.xl.gris.includes('+') || stock.xl.gris.includes('e')) errors.stock = "Should be a positive integer";
  
    if((stock.s.blanco + stock.s.negro + stock.s.gris + stock.m.blanco + stock.m.negro + stock.m.gris + stock.l.blanco + stock.l.negro + stock.l.gris + stock.xl.blanco + stock.xl.negro + stock.xl.gris) < 1) errors.stock = "You must enter at least one value in the stock input fields."
  
    return errors;
  };
  
  
  export default validationStock;