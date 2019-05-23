
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

class GoalChart extends Component {

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
    var egyConv = 0;
    var egyAwarness = 0;
    var usaConv = 0;
    var usaAwarness = 0;
    console.log(campaigns);
      var egypt = campaigns.EGY;
      var usa = campaigns.USA;
      for(var i = 0; i < egypt.length ; i++){
        if(egypt[i]["goal"].toUpperCase()=="Awareness".toUpperCase()){
         
            egyAwarness++;
           
        }
        else if(egypt[i]["goal"].toUpperCase()=="Conversion".toUpperCase()){
            egyConv++;
        }
      }

      for(var i = 0; i < usa.length ; i++){
        if(usa[i]["goal"].toUpperCase()=="Awareness".toUpperCase()){
            usaAwarness++;
        }
        else if(usa[i]["goal"].toUpperCase()=="Conversion".toUpperCase()){
         
          usaConv++;
        }
      }

     
      var data = [
        {
          name: 'USA', Awareness: usaAwarness, Conversion: usaConv
        },
        {
          name: 'EGYPT', Awareness: egyAwarness, Conversion: egyConv
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
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Awareness" fill="#8884d8" />
        <Bar dataKey="Conversion" fill="#82ca9d" />
      </BarChart>
      </ResponsiveContainer>

         </Grid>

      
        
    </Grid>);
  }
}

export default GoalChart;
