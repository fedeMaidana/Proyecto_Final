import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Pago Cancelado</h1>
      <p className="text-lg text-gray-600 mb-8">El pago ha sido cancelado.</p>
      <Link
        to="/home"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default PaymentCancel;

