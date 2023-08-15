


// const ConfirmationPage = () => {
//   // Manejador para el botón "Volver a Trendyspot"
//   const handleBack = () => {
//     window.location.href = 'http://localhost:5173';
//   };

//   return (
//     <div className="container mt-5">
//       <div className="jumbotron">
//         <h1 className="display-4">¡Compra completada con éxito!</h1>
//         <p className="lead">Gracias por comprar en Trendyspot. Tu pedido está siendo procesado y pronto lo recibirás en tu domicilio.</p>
//         <hr className="my-4" />
//         <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
//         <button className="btn btn-primary btn-lg" onClick={handleBack}>Volver a Trendyspot</button>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationPage;

const ConfirmationPage = () => {
    // Manejador para el botón "Volver a Trendyspot"
    const handleBack = () => {
      window.location.href = 'http://localhost:5173';
    };
  
    return (
      <div className="container mt-5">
        <div className="jumbotron">
          <h1 className="display-4">¡Compra completada con éxito!</h1>
          <p className="lead">Gracias por comprar en Trendyspot. Tu pedido está siendo procesado y pronto lo recibirás en tu domicilio.</p>
          <hr className="my-4" />
          <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
          <button className="btn btn-primary btn-lg" onClick={handleBack}>Volver a Trendyspot</button>
        </div>
      </div>
    );
  };
  
  export default ConfirmationPage;

