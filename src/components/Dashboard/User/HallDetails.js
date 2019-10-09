import React, { PureComponent } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";


class HallDetails extends PureComponent {
    render() {
        return (
            <div>
                 <Tabs>
    <TabList>
      <Tab>Mario</Tab>
      <Tab >Luigi</Tab>
      <Tab>Peach</Tab>
      <Tab>Yoshi</Tab>
      <Tab>Toad</Tab>
    </TabList>

    <TabPanel>
      <p>
        One
      </p>
     
    </TabPanel>

    <TabPanel>
      <p>Two</p>
      
    </TabPanel>

    <TabPanel>
      <p>Three </p>
     
    </TabPanel>

    <TabPanel>
      <p>
       Four
      </p>

     
    </TabPanel>

    <TabPanel>
      <p>
       Five
      </p>
      
    </TabPanel>
  </Tabs>
            </div>
        )
    }
}

export default HallDetails;