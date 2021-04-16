import React, { Component, useState, useCallback } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Route, Switch, useRouteMatch,useHistory } from "react-router-dom";
import LeftMenu from '../../LeftMenu'
import MainRoutes from "./MainRoutes"
import { AppProvider, TopBar, Frame, Layout, ContextualSaveBar } from '@shopify/polaris';
import { ArrowLeftMinor, ConversationMinor, ProductsMajor, HomeMajor, OrdersMajor, CollectionsMajor, InventoryMajor } from '@shopify/polaris-icons';

import '@shopify/polaris/dist/styles.css';
import { Navigation } from '@shopify/polaris';


export default function Dashboard() {
  let match = useRouteMatch();
  const [searchFieldValue, setSearchFieldValue] = useState('');
  const history = useHistory();

  const handleSearchChange = useCallback(
    (searchFieldValue) => setSearchFieldValue(searchFieldValue),
    [],
  );
  const theme = {
    colors: {
      topBar: {
        background: '#fff',
        margin: '10px 10px'
      },
    },
    logo: {
      width: 124,
      topBarSource: '/logo.png',
      url: 'https://vapejuicedepot.com',
      accessibilityLabel: 'Vape Juice Depot',
      contextualSaveBarSource: '/logo.png',
    },
  };

  const searchFieldMarkup = (
    <TopBar.SearchField
      placeholder="Search"
      value={searchFieldValue}
      onChange={handleSearchChange}
    />
  );
  const topBarMarkup = <TopBar searchField={searchFieldMarkup} />;

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Back to Shopify',
            icon: ArrowLeftMinor,
          },
        ]}
      />
      <Navigation.Section
        separator
        title="Prodify"
        items={[
          {
            // url: `${match.url}`,
            onClick:()=>{
              history.push(`/dashboard/`)
            },
            label: 'Dashboard',
            icon: HomeMajor,
          },
          {
            // url: `${match.url}`,
            onClick:()=>{
              history.push(`/dashboard/States`)
            },
            label: 'States',
            icon: HomeMajor,
          },
          {
            // url: `${match.url}`,
            onClick:()=>{
              history.push(`/dashboard/Taxes`)
            },
            label: 'Taxes',
            icon: HomeMajor,
          },
          {
            // url: `${match.url}`,
            onClick:()=>{
              history.push(`/dashboard/StateTaxes`)
            },
            label: 'StateTaxes',
            icon: HomeMajor,
          },
          {
            // url: `${match.url}/Settings`,
            onClick:()=>{
              history.push(`/dashboard/Settings`)
            },
            label: 'Settings',
            icon: OrdersMajor,
          },
        ]}
        action={{
          icon: ConversationMinor,
          accessibilityLabel: 'Contact support',
          //   onClick: toggleModalActive,
        }}
      />
    </Navigation>
  );

  return (<div style={{ height: '250px' }}>
    <AppProvider
      theme={theme}
      i18n={{
        Polaris: {
          Frame: { skipToContent: 'Skip to content' },
          ContextualSaveBar: {
            save: 'Save',
            discard: 'Discard',
          },
          DropZone:  {
            FileUpload: {
              actionTitleImage: "Add media",
              actionHintImage: "or drop files to upload"
            }
          },
          TopBar: {
            SearchField: {
              clearButtonLabel: 'Clear',
              search: 'Search',
            },
          },
        },
      }}
    >
      <Frame topBar={topBarMarkup} navigation={navigationMarkup}>
        <Layout.Section>
          <MainRoutes />
        </Layout.Section>
      </Frame>
    </AppProvider>
  </div>)
}