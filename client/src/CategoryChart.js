
import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
 
  button: {
    marginTop:10,
    margin: theme.spacing.unit,
  },
 
});

class CategoryChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
      
      };
    
  }
   componentDidMount() {
    
 
  }


  render() {
    const { classes, theme , campaigns } = this.props;
    const { error, isLoaded, items } = this.state;
    var egySports = 0;
    var egyTech = 0;
    var usaSports = 0;
    var usaTech = 0;
    
      var egypt = campaigns.EGY;
      var usa = campaigns.USA;
      for(var i = 0; i < egypt.length ; i++){
        if(egypt[i]["category"].toUpperCase()=="Sports".toUpperCase()){
          console.log(egypt["category"]);
            egySports++;
        }
        else if(egypt[i]["category"].toUpperCase()=="Technology".toUpperCase()){
          egyTech++;
        }
      }

      for(var i = 0; i < usa.length ; i++){
        if(usa[i]["category"].toUpperCase()=="Sports".toUpperCase()){
           usaSports++;
        }
        else if(usa[i]["category"].toUpperCase()=="Technology".toUpperCase()){
          usaTech++;
        }
      }

      
      var data2 = [
        {
          name: 'USA', Sports: usaSports, Technology: usaTech
        },
        {
          name: 'EGYPT', Sports: egySports, Technology: egyTech
        },
    
      ];
      

    

    return (

      
      <Grid container spacing={24}>

       
    <Grid item xs={12}>
    <ResponsiveContainer
        width="95%" height={400}
        
      >
    <BarChart
        className="plot"
        width={1000}
        height={200}
        data={data2}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Sports" fill="#8884d8" />
        <Bar dataKey="Technology" fill="#82ca9d" />
      </BarChart>
      </ResponsiveContainer>
         </Grid>

         

      
        
    </Grid>);
  }
}

export default CategoryChart;
