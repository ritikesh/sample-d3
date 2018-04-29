const Sequelize = require('sequelize');
const sequelize = require("./../config/db");

const Inventory = sequelize.define('inventory', {
    product_id: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    location: {
      type: Sequelize.STRING
    },
    current_quantity: {
      type: Sequelize.INTEGER
    },
    unit_cost: {
      type: Sequelize.DECIMAL(10, 2)
    },
    current_value: {
      type: Sequelize.DECIMAL(10, 2)
    }
});

Inventory.group_by = function(filter_type) {
  if( filter_type != 'day' && filter_type != 'week') {
    filter_type = 'day'
  }
  return Inventory.findAll({
    group: 'custom_date',
    attributes: [ 
      [Sequelize.fn('SUM', Sequelize.col('current_value')), 'value'], 
      [sequelize.literal(`extract(${filter_type} FROM date)`), 'custom_date']
    ],
    order: sequelize.col('custom_date')
  })
}

module.exports = Inventory;