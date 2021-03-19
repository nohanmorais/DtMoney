import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { createServer, Model } from 'miragejs';


createServer({

  models: {
    transaction: Model,
  },

seeds(server) {
  server.db.loadData({
    transactions: [
      {
        id: 1,
        title: 'Assessoria LCS',
        type: 'deposit',
        category: 'Trafego',
        amount: 1350,
        createdAt: new Date('2021-03-05T09:00:00'),
      },
      {
        id: 2,
        title: 'Rocketseat',
        type: 'withdraw',
        category: 'Estudos',
        amount: 165,
        createdAt: new Date('2021-03-11T09:00:00'),
      },
    ]
  })
},

  routes() {
    //http://localhost:3000/api/transactions
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
