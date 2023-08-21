const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Shopping_cart', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    estado_pedido: {
      type: DataTypes.ENUM(
        'Solicitud',
        'En Proceso',
        'Pago Aprobado',
        'En Preparación',
        'En Tránsito',
        'Entregado',
        'Cancelado',
        'Rechazado',
        'Pendiente de Pago',
        'En Espera de Confirmación',
        'Retrasado',
        'Devuelto',
        'Problemas de Entrega',
        'En Espera de Stock',
        'En Espera de Personalización'
      ),
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
};