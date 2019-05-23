import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AddCampaign from "./AddCampaign";
import CampaignsList from './CampaignsList';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
  tabs: {
  
    flexGrow: 1,
    backgroundColor:  "#ffffff",
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
    color: '#000000'
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    color: '#000000',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#000000',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#000000',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
  heading:{
   marginBottom:30
  }
  ,
});

class NavTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <NoSsr>
        <h1 className={classes.heading}>Campaigns Dashboard</h1>
        <div >
          <AppBar position="static">
            <Tabs className = {classes.tabs}classes={ {indicator: classes.tabsIndicator} }
             variant="fullWidth" value={value} onChange={this.handleChange}>
              <LinkTab 
               classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Add Campaign" href="page1" />
              <LinkTab 
               classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Campaigns List" href="page2" />
              
            </Tabs>
          </AppBar>
          {value === 0 && <AddCampaign/>}
          {value === 1 && <CampaignsList/>}
          
        </div>
      </NoSsr>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);