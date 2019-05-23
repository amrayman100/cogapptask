
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
  import Table from '@material-ui/core/Table';
  import TableBody from '@material-ui/core/TableBody';
  import TableCell from '@material-ui/core/TableCell';
  import TableHead from '@material-ui/core/TableHead';
  import TableRow from '@material-ui/core/TableRow';
  import Paper from '@material-ui/core/Paper';




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
      root:{
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      }
   
    
  });

  
class CampaignsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: null,
          cat: true,
          s : "out"
        };
    
    
      }
      async componentDidMount() {
               
        
        await fetch("/getcampaigns/")
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
    
    
     render() {
        const { classes  } = this.props;
        const { items , error , isLoaded } = this.state;
        console.log(items);
        if (error) {
          return <div>Error: {error.message}</div>;
          
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else 
    
       
        return (
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Campaign</TableCell>
                    <TableCell align="right">Country</TableCell>
                    <TableCell align="right">Budget</TableCell>
                    <TableCell align="right">Goal</TableCell>
                    <TableCell align="right">Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map(row => (
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.country}</TableCell>
                      <TableCell align="right">{row.budget}</TableCell>
                      <TableCell align="right">{row.goal}</TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          );
      }
    
    
}

export default withStyles(styles)(CampaignsList);
