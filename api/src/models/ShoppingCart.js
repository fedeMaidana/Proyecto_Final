const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Shopping_cart', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    quantity: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    unit_prices: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: true,
    },
    total: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: true,
    },
    name: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
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