import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Analysis from './Analysis'
import Campaign from './Campaign';
import AddCampaign from './AddCampaign';
import CampaignsList from './CampaignsList';




var post =false;
const MainRoutes = () => (

  
 
  <main>
    <Switch>
      <Route exact path='/' 
    render={(props) => <Analysis {...props} post={false} />}/>
    </Switch>

    <Switch>
      <Route exact path='/campaign' 
    render={(props) => <Campaign/>}/>
    </Switch>

    <Switch>
      <Route exact path='/Addcampaign' 
    render={(props) => <AddCampaign/>}/>
    </Switch>

    <Switch>
      <Route exact path='/campaignslist' 
    render={(props) => <CampaignsList/>}/>
    </Switch>
    
  </main>
)

export default MainRoutes