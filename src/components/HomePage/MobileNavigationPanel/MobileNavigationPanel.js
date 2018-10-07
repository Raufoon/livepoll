import React from 'react';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import TrendingIcon from '@material-ui/icons/TrendingUp';
import PopularIcon from '@material-ui/icons/Favorite';
import RecentIcon from '@material-ui/icons/Sort';
import SectionTabsMaker from "../../utils/SectionTabsMaker/SectionTabsMaker";

const MobileNavigationPanel = () => (
  <SectionTabsMaker
    tabRoutes={[
      '/', '/trending', '/popular', '/recent'
    ]}
    tabIcons={[
      HomeIcon, TrendingIcon, PopularIcon, RecentIcon
    ]}
    tabLabels={[
      'Home', 'Trending', 'Popular', 'Recent'
    ]}
  />
);

export default MobileNavigationPanel;