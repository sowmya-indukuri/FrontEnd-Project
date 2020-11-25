import React from 'react';
import InputBox from './InputBox';
import TableBox from './TableBox';
import GraphBox from './GraphBox';
import './App.css';


class App extends React.Component {
  state = {
    table_Values: [],
    graphData: [],
    activeStockValue: '',
    showFilterDOM: false,
    showFilterData: false,
    show_Table: false,
    showGraphData: false,
    lsArray: [],  
    option: []
  };
  componentDidUpdate(){
    this.state.graphData.map((graphData, index) => {
        document.querySelector('#myChart-' + graphData.stockValue).style.display = "none";
        if(index === this.state.graphData.length - 1){
            document.querySelector('#myChart-' + graphData.stockValue).style.display = "block";
        }
    }); 
  };
  getResults = (data) => {
    if(data !== "Symbol not supported"){
        this.setState({ 
          table_Values: this.state.table_Values.concat(data),
            showFilterDOM: true,
            show_Table: true
        });
        console.log(this.state.table_Values);
    };
  };
  checkStockCode = (stockValue) => {
    this.state.graphData.map((graphData, index) => {
        document.querySelector('#myChart-' + graphData.stockValue).style.display = "none";
        if(index === this.state.graphData.length - 1){
            document.querySelector('#myChart-' + stockValue).style.display = "block";
        }
    }); 
  }
  render(){
    let graphCardDOM=''
    if(this.state.showGraphData){
      // loop through the data and make each graph
      graphCardDOM = this.state.graphData.map((graphData, index) => {
          if(graphData.response !== "no_data"){
              return (
                  <GraphBox
                      key = { index }
                      tableData = { this.state.tableData }
                      showGraphData = { this.state.showGraphData }
                      showActiveStockCode = { this.state.activeStockValue }
                      graphData = { graphData }
                      filteredData = { this.state.filteredData }
                      showFilterData = { this.state.showFilterData }>
                  </GraphBox>
              );
          }else{
              return(
                  <p key={ index } 
                     className="no-graph-data-message">
                      No Data Currently Available. Markets are closed during weekends 
                      and public holidays. Please filter by previous date.
                  </p>
              )
          };
      });
    };

    let optionSelectDOM='';
    optionSelectDOM = this.state.graphData.map((graphData, index) => {
      return (
          <option 
          value={ graphData.stockValue } 
          key={ index }
          selected={ this.state.graphData[this.state.graphData.length - 1] === graphData ? "selected" : "" }>
            { graphData.stockValue }
          </option>
      )
  });

    return (
      <div className="main-container">
        <div className="heading-container">
          <div className="item-heading">
              <h5>Stock Price Dashboard</h5>

          </div>

        </div>
        
        <div className="input-container">
          <div class="item-input">
            <InputBox 
            getResults = { this.getResults }> 
            </InputBox>

          </div>
          
        </div>
        <div className="input-container">
          <div class="grid-item item0">
          { 
            this.state.showGraphData ?
            <div>
            <select className="custom-select main__chart-select" onChange={ (e) => this.checkStockCode(e.target.value) }>
              { optionSelectDOM }
            </select>
            { graphCardDOM }
            </div>
            : 
            <p>No stocks found</p>
          }   
          </div>
          <div class="grid-item item1">
                <TableBox 
                show_Table = { this.state.show_Table }
                table_Values = { this.state.table_Values }>
                </TableBox>
          </div> 
          

            
                      
            {/* <TableBox 
            show_Table = { this.state.show_Table }
            table_Values = { this.state.table_Values }>
            </TableBox> */}

         

          

        </div>
        
          
          
      </div>
      
    );

  }
  
}

export default App;
