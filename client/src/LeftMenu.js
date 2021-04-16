import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import StyleIcon from '@material-ui/icons/Style';
import Profile from "./Content/Dashboard/Profile"
import AttachmentIcon from '@material-ui/icons/Attachment';
import { Navigation } from '@shopify/polaris';
import { HomeMajor, OrdersMajor, ProductsMajor,CollectionsMajor } from '@shopify/polaris-icons';

export default function LeftMenu() {
  let match = useRouteMatch();
  return (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: `${match.url}`,
            label: 'Home',
            icon: HomeMajor,
          },
          {
            url: `${match.url}/Listings`,
            label: 'Listings',
            icon: OrdersMajor,
            badge: '15',
          },
          {
            url: `${match.url}/Colections`,
            label: 'Collections',
            icon: CollectionsMajor,
            badge: '2',
          },
        ]}
      />
    </Navigation>
  );
}