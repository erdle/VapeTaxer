import React, { Component, useState, useEffect } from 'react';

import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory, useRouteMatch } from "react-router-dom";
import { Card, DataTable, Page, Icon, Button, ButtonGroup, Link } from '@shopify/polaris';
import { toArrayOfProps, Column } from "../../../utils/dataTableHelper"
import { PlusMinor } from '@shopify/polaris-icons';
import { syncAllProducts, getPaged } from '../../../services/products'
import ProductsList from './List'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const history = useHistory();
  let grid = null;
  let match = useRouteMatch();

  const [syncInProgress, setSyncInProgress] = useState(false);

  const onSyncProducts = () => {
    setSyncInProgress(true)
    syncAllProducts().then(data => { setSyncInProgress(false) }).catch(e => { })
  }

  const actions = <ButtonGroup>
    {/* <Button loading={syncInProgress} onClick={onSyncProducts}>Sync products</Button> */}
    <Button primary onClick={() => {
      history.push(`/dashboard/Listings/create`)
    }}>Validate</Button>
  </ButtonGroup>

  return (
    <Page title="Products"
      fullWidth
      primaryAction={actions}
    >
      <Card>
        <ProductsList producstGetter={getPaged} />
      </Card>
    </Page>
  );
}

export default Products;
