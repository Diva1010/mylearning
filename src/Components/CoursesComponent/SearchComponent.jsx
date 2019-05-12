import React , { Component } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import _ from 'lodash'

const source = {};
class SearchComponent extends Component {
    componentWillMount() {
        this.resetComponent()
        fetch('https://my-json-server.typicode.com/Diva1010/repo-json/techCourses', {
            method: 'GET'
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    source = json;
                });
            }
        });
      }
    
      resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })
    
      handleResultSelect = (e, { result }) => this.setState({ value: result.title })
    
      handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
    
        setTimeout(() => {
          if (this.state.value.length < 1) return this.resetComponent()
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = result => re.test(result.title)
    
          this.setState({
            isLoading: false,
            results: _.filter(source, isMatch),
          })
        }, 300)
      }
    
    render(){
        return(
            <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>{JSON.stringify(this.state, null, 2)}</pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>{JSON.stringify(source, null, 2)}</pre>
          </Segment>
        </Grid.Column>
      </Grid>
        )
    }
}

export default SearchComponent;