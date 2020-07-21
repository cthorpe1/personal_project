import React from 'react';
import styles from './MarkerDetail.module.css';

const MarkerDetail = props => {
  let currencies = Object.values(props.details.currencies);

  return (
    <div className={styles.Details}>
      <p><strong>Capital</strong>: {props.details.capital[0]}</p>
      <p><strong>Region</strong>: {props.details.region}</p>
      <p><strong>Subregion</strong>: {props.details.subregion}</p>
      <p><strong>Currencies: </strong>{currencies.map((currency,index) => {
        return <span key={index}>-{currency.name}-</span>
      })}</p>
      <p><strong>Description</strong>: {props.details.desc}</p>
    </div>
  )
};

export default MarkerDetail;