import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react'
class Footer extends Component {
  render() {
    return (
      <div class="footer">
      <Grid columns='equal' divided inverted padded>
      <Grid.Row color='black' textAlign='center'>
        <Grid.Column>
          <Segment color='black' inverted>
            Copyright © 2018 Divya,Kaushik.
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment color='black' inverted>
            
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment color='black' inverted>
          Privacy Policy and Cookie Policy
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </div>
    )
  }
}
export default Footer;