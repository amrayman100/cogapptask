
import './App.css';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
    FormControl,
    InputLabel,
    Input,
    Button,
    TextField
  } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      marginTop:30
    },
    input: {
      display: "none"
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        marginBottom:20,
      },
      dense: {
        marginTop: 19,
      },
      menu: {
        width: 200,
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },

      success: {
        backgroundColor: green[600],
      },
      error: {
        backgroundColor: theme.palette.error.dark,
      },
      info: {
        backgroundColor: theme.palette.primary.dark,
      },
      warning: {
        backgroundColor: amber[700],
      },
      icon: {
        fontSize: 20,
      },
      iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
      },
      message: {
        display: 'flex',
        alignItems: 'center',
      },
      success: {
        backgroundColor: green,
      },
    
  });

  
class AddCampaign extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            country:"",
            category:"",
            budget:0,
            goal:"",
            open: false,
            message: ''
        
        };
     }

     
     handleClose = (event, reason) => {
        this.setState({open:false})
        if (reason === 'clickaway') {
          return;
        }
     }
  

     handleChange = (event) => {
       
     }

     handleSubmit = async e => {
         
        e.preventDefault();
        const response = await fetch('/campaign/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name : this.state.name , country : this.state.country , 
            category : this.state.category , budget : this.state.budget , goal : this.state.goal
         }),
        });
      
        const body = await response.text();
       
        this.setState({open:true , message: body})
        
    
    
     }

     render() {
        const { classes } = this.props;
        
       
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
             
             
            }}
          >
            <form style={{ width: "50%" }} onSubmit={this.handleSubmit}>
              <h2>Add New Campaign</h2>
    
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="name">Campaign Name</InputLabel>
                <Input id="name" type="text"  value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })} />
              </FormControl>
              <FormControl  fullWidth>
                 <InputLabel htmlFor="country-simple">Country</InputLabel>
                <Select
             value={this.state.country}
             onChange={e => this.setState({ country: e.target.value })} 
            inputProps={{
              name: 'country',
              id: 'country-simple',
            }}
          >
           
            <MenuItem value="EGY">EGY</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
        
          </Select>

        </FormControl>

        <FormControl  fullWidth>
                 <InputLabel htmlFor="goal-simple">Goal</InputLabel>
                <Select
             value={this.state.goal}
             onChange={e => this.setState({ goal: e.target.value })} 
            inputProps={{
              name: 'goal',
              id: 'goal-simple',
            }}
          >
        
            <MenuItem value="Conversion">Conversion</MenuItem>
            <MenuItem value="Awarness">Awarness</MenuItem>
        
          </Select>

        </FormControl>
        
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="goal">Budget</InputLabel>
                <Input id="budget" type="Number"  value={this.state.budget}
                onChange={e => this.setState({ budget: e.target.value })} />
              </FormControl>
    
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="category">Category</InputLabel>
                <Input id="category"  type="text"  value={this.state.category}
            onChange={e => this.setState({ category: e.target.value })}  />
              </FormControl>
    
              <Button type="submit" className = {classes.button} variant="contained" color="primary" size="medium">
                Add Campaign
              </Button>
            </form>
            <Snackbar
        ContentProps={{
            classes: {
                root: classes.success
            }
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={this.state.message}
        autoHideDuration={3000}
        open={this.state.open}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'snackbar-message-id',
        }}
      />
       
            </div>
           
        );
      }
}

export default withStyles(styles)(AddCampaign);
