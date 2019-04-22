import React from 'react';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import TrendingIcon from '@material-ui/icons/TrendingUp';
import PopularIcon from '@material-ui/icons/Favorite';
import RecentIcon from '@material-ui/icons/Sort';
import SectionTabsMaker from "../../../../components/SectionTabsMaker/SectionTabsMaker";

const style = {
  marginBotton: 0,
  maxWidth: 500,
  boxShadow: '0px 2px 2px lightgray',
  border: 'none',
};
const tabRoutes = [
  '', '/trending', '/popular', '/recent'
];
const tabIcons = [
  HomeIcon, TrendingIcon, PopularIcon, RecentIcon
];
const tabLabels = [
  'Home', 'Trending', 'Popular', 'Recent'
];

const MobileNavigationPanel = () => (
  <SectionTabsMaker
    style={style}
    tabRoutes={tabRoutes}
    tabIcons={tabIcons}
    tabLabels={tabLabels}
  />
);

export default MobileNavigationPanel;