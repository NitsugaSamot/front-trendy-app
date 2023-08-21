const validation = (form) => {
    let errors = {};
  
    if (!form.price) errors.price = "Insert a price";
    else if (form.price < 100 || form.price > 100000)
      errors.price = "The price must be between 100 and 10000";
    else if (isNaN(form.price)) errors.price = "Should be number";
  
    if (!form.description) errors.description = "You must write a description";
    else if (form.description.lenght < 10 || form.description.lenght > 400)
      errors.description = "The description must have between 10 and 400 caracters";
  
    if (!form.brand) errors.brand = "Write a brand";
    else if (form.brand.lenght < 3 || form.brand.lenght > 20)
      errors.brand = "The brand name must have between 3 and 20 caracters";

    return errors;
  };
  
  
  export default validation;