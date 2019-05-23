
import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CategoryChart from './CategoryChart';
import GoalChart from './GoalChart';

const styles = theme => ({
 
    button: {
      marginTop:10,
      margin: theme.spacing.unit,
    },
  });

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null,
      cat: true,
      s : "out"
    };

    this.byCategory = this.byCategory.bind(this);
    this.byGoal = this.byGoal.bind(this);
  }
  async componentDidMount() {
    
  
    fetch("/report/?dims=country,goal&fields=name,country,category,goal")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result,
          s : "in"
        
          
          
        });
        
      },
      
      (error) => {
        this.setState({
          isLoaded: "error",
          s : "error"
          
        });
      }
    )
 
  }



  byGoal(e) {
    this.setState({
     cat:false
    });
  }
  
  byCategory(e) {
    this.setState({
        cat:true
       });
  }
  


  render() {
    const { classes, theme } = this.props;
    const { error, isLoaded, items , cat } = this.state;
    var egySports = 0;
    var egyTech = 0;
    var usaSports = 0;
    var usaTech = 0;
    if (error) {
      return <div>Error: {error.message}</div>;
      
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if(cat) {


        
        return (

            <Grid container spacing={24}>
      
              <Grid item xs={12}>
              <h1 className= "header">Analysis By Country And Category</h1>
           
              </Grid>
               <Grid item xs={12}>
              
              <CategoryChart campaigns = {this.state.items}></CategoryChart>
            
            
            <Button variant="contained" color="primary" className={classes.button}
             onClick={this.byCategory}
            >
              By Category
            </Button>
      
            <Button variant="contained" color="primary" className={classes.button}
             onClick={this.byGoal}
            >
              By Goal
            </Button>
      
               </Grid>
      
            
              
          </Grid>);


  }

  else if(!cat) {
    return (

        <Grid container spacing={24}>
  
          <Grid item xs={12}>
          <h1 className= "header">Analysis By Country And Goal</h1>
       
          </Grid>
           <Grid item xs={12}>
          
          <GoalChart campaigns = {this.state.items}></GoalChart>
        
       
        <Button variant="contained" color="primary" className={classes.button}
         onClick={this.byCategory}
        >
          By Category
        </Button>
  
        <Button variant="contained" color="primary" className={classes.button}
         onClick={this.byGoal}
        >
          By Goal
        </Button>
  
           </Grid>
  
        
          
      </Grid>);

  }

        
    
  }
}

export default withStyles(styles)(Analysis);
