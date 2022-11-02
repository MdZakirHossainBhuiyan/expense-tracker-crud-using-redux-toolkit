import React from 'react';
import './App.css';
import Balance from './Componets/Balance';
import Form from './Componets/Form';
import Layout from './Componets/Layout';
import Transactions from './Componets/Transactions/Transactions';

function App() {
  return (
    <Layout>
      <Balance/>
      <Form/>
      <Transactions/>
    </Layout>
  );
}

export default App;
