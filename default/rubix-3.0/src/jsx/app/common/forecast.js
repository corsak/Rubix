import React, { Component } from 'react';
import {Line,Bar} from 'react-chartjs';
import _ from 'underscore';


function mean(data,prop){
  return _.reduce(data,function(acc,d) { return acc+d[prop];},0)/data.length;
}

function a (xbar,ybar,b) {
  return (ybar-(b*xbar));
}

function b (xmean,ymean,data) {
  return (_.reduce(data,function(acc,d) { return acc + ((d.year-xmean)*(d.y-ymean));  },0)/
  (_.reduce(data,function(acc,d){ return acc + Math.pow(d.year-xmean,2);},0)));
}

function y (x,data) {
  var xbar = mean(data,"year");
  var ybar = mean(data,"y");
  var bop = b(xbar,ybar,data);
  return parseInt(a(xbar,ybar,bop)+ (bop*x));
}

function y1 (a,b,x) {
  return parseInt(a+(b*x));
}


function labour_rate_persons_data(){

  return [{"year":1,"y":9.4},{"year":3,"y":3.55},{"year":4,"y":4.6},{"year":5,"y":4.15}];

}

function getY(year,data) {
  return y(year,data);
}

function getData(labeldata,dataarray){
  return { labels: labeldata,
    datasets:[
      {
        label: "original",
        //fillColor: "rgba(220,220,220,0.2)",
        //strokeColor: "rgba(220,220,220,1)",
        //pointColor: "rgba(220,220,220,1)",
        //pointrokeColor: "#fff",
        //pointHighlightFill: "#fff",
        //pointHighlightStroke: "rgba(220,220,220,1)",
        fillColor: "rgba(128,170,212,0.7)"//"#80AAD4"//"rgba(151,187,205,0.2)"
        ,strokeColor: "#0054A9"//"rgba(151,187,205,1)",
        ,pointColor: "#0054A9"//"rgba(151,187,205,1)",
        ,pointStrokeColor: "#0054A9"//"#fff",
        ,pointHighlightFill: "#0054A9"//"#fff",
        ,pointHighlightStroke: "#0054A9"//"rgba(151,187,205,1)",
        , data: dataarray
      }


    ]};
}

var options = { bezierCurve: true,datasetFill:true,pointDot:true};
var baroptions = {barValueSpacing:20,showTooltips:false,
  onAnimationComplete:function(){

    var ctx = this.chart.ctx;
    ctx.font = this.scale.font;
    ctx.fillStyle = this.scale.textColor
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";

    this.datasets.forEach(function (dataset) {
      dataset.bars.forEach(function (bar) {
        ctx.fillText(bar.value, bar.x, bar.y - 5);
      });
    })
  }};

var url1 = "http://localhost:8091/";

export class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {data: props.data,tdata:[],bdata:this.props.bdata,knobval:30};
  }
  componentDidMount() {

    $('#dates').val(2014);
    var fvalues = getFilterValues(this.props.type);
    if(fvalues.year > 0) {
      $.ajax({
        url: url1 + getChartType(fvalues.type),
        dataType: 'json',
        cache: false,
        success: function (data) {
          var dt = data.filter(function (i) {
            return i.type === fvalues.datatype;
          });
          var maxminDates = getMinDateAndMaxDateInGivenData(_.map(dt,function(d){return d.year}));
          var newdata = (fvalues.year >= maxminDates[0] && fvalues.year <= maxminDates[1])? getPresentData(dt,fvalues):PredictData(dt,fvalues);
          this.setState({tdata:newdata[0],data:newdata[1],bdata:barChartData(newdata[0]),knobval:newdata[1].datasets[0].data[newdata[1].datasets[0].data.length-1]});
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(xhr);
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  }
  handleDataType(){
    var fvalues = getFilterValues(this.props.type);
    if(fvalues.year > 0) {
      $.ajax({
        url: url1 + getChartType(fvalues.type),
        dataType: 'json',
        cache: false,
        success: function (data) {
          var dt = data.filter(function (i) {
            return i.type === fvalues.datatype;
          });
          var maxminDates = getMinDateAndMaxDateInGivenData(_.map(dt,function(d){return d.year}));
          var newdata = (fvalues.year >= maxminDates[0] && fvalues.year <= maxminDates[1])? getPresentData(dt,fvalues):PredictData(dt,fvalues);
          this.setState({tdata:newdata[0],data:newdata[1],bdata:barChartData(newdata[0]),knobval:newdata[1].datasets[0].data[newdata[1].datasets[0].data.length-1]});
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(xhr);
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  }
  onChange(){
    var fvalues = getFilterValues(this.props.type);
    if(fvalues.year > 0) {
      $.ajax({
        url: url1 + getChartType(fvalues.type),
        dataType: 'json',
        cache: false,
        success: function (data) {
          var dt = data.filter(function (i) {
            return i.type === fvalues.datatype;
          });
          var maxminDates = getMinDateAndMaxDateInGivenData(_.map(dt,function(d){return d.year}));
          var newdata = (fvalues.year >= maxminDates[0] && fvalues.year <= maxminDates[1])? getPresentData(dt,fvalues):PredictData(dt,fvalues);
          this.setState({tdata:newdata[0],data:newdata[1],bdata:barChartData(newdata[0]),knobval:newdata[1].datasets[0].data[newdata[1].datasets[0].data.length-1]});
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(xhr);
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  }
  casteHandle(){
    var fvalues = getFilterValues(this.props.type);
    if(fvalues.year > 0) {
      $.ajax({
        url: url1 + getChartType(fvalues.type),
        dataType: 'json',
        cache: false,
        success: function (data) {
          var dt = data.filter(function (i) {
            return i.type === fvalues.datatype;
          });
          var maxminDates = getMinDateAndMaxDateInGivenData(_.map(dt,function(d){return d.year}));
          var newdata = (fvalues.year >= maxminDates[0] && fvalues.year <= maxminDates[1])? getPresentData(dt,fvalues):PredictData(dt,fvalues);
          this.setState({tdata:newdata[0],data:newdata[1],bdata:barChartData(newdata[0]),knobval:newdata[1].datasets[0].data[newdata[1].datasets[0].data.length-1]});
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(xhr);
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  }
  genderHandle(){
    var fvalues = getFilterValues(this.props.type);
    if(fvalues.year > 0) {
      $.ajax({
        url: url1 + getChartType(fvalues.type),
        dataType: 'json',
        cache: false,
        success: function (data) {
          var dt = data.filter(function (i) {
            return i.type === fvalues.datatype;
          });
          var maxminDates = getMinDateAndMaxDateInGivenData(_.map(dt,function(d){return d.year}));
          var newdata = (fvalues.year >= maxminDates[0] && fvalues.year <= maxminDates[1])? getPresentData(dt,fvalues):PredictData(dt,fvalues);
          this.setState({tdata:newdata[0],data:newdata[1],bdata:barChartData(newdata[0]),knobval:newdata[1].datasets[0].data[newdata[1].datasets[0].data.length-1]});
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(xhr);
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  }
  geoHandle(){
    var fvalues = getFilterValues(this.props.type);
    if(fvalues.year > 0) {
      $.ajax({
        url: url1 + getChartType(fvalues.type),
        dataType: 'json',
        cache: false,
        success: function (data) {
          var dt = data.filter(function (i) {
            return i.type === fvalues.datatype;
          });
          var maxminDates = getMinDateAndMaxDateInGivenData(_.map(dt,function(d){return d.year}));
          var newdata = (fvalues.year >= maxminDates[0] && fvalues.year <= maxminDates[1])? getPresentData(dt,fvalues):PredictData(dt,fvalues);
          this.setState({tdata:newdata[0],data:newdata[1],bdata:barChartData(newdata[0]),knobval:newdata[1].datasets[0].data[newdata[1].datasets[0].data.length-1]});
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(xhr);
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  }
  render() {
    return (
        <Container id="graph">
        <PanelContainer noOverflow controlStyles='bg-orange75 fg-white'>
        <Panel horizontal className='force-collapse'>
        <PanelLeft className='col-xs-6'>
        <PanelHeader className='bg-orange75 fg-white center text-center'>

        <h4>Labour Force Parameters</h4>
    </PanelHeader>
    <PanelBody style={{padding:10}}>
  <Filter handleDataType={this.handleDataType.bind(this)}
    data={this.state.data} tdata={this.state.tdata} casteHandle={this.casteHandle.bind(this)}
    genderHandle={this.genderHandle.bind(this)} geoHandle={this.geoHandle.bind(this)}></Filter>


    <FormGroup>
    <Label>Year</Label>
    <div>
    <ComboBox dates={yearsData(2012,2030)} onChange={this.onChange.bind(this)} tdata={this.state.tabledata}></ComboBox>
    </div>
    </FormGroup>
    </PanelBody>
    </PanelLeft>
    <PanelRight className='col-xs-6 text-center'>
        <PanelHeader className='bg-orange75 fg-white center text-center'>

        <h4>{this.props.type} Trend</h4>
    </PanelHeader>
    <PanelBody style={{padding:10}}>
  <input type='text' value={this.state.knobval} className='dial autosize' data-width='100%' data-fgcolor='#F09FA6' disabled />
    </PanelBody>
    </PanelRight>
    </Panel>
    </PanelContainer>
    <PanelContainer noOverflow controlStyles='bg-orange75 fg-white'>
        <Panel>
        <PanelHeader className='bg-orange75 fg-white center text-center'>

        <h4>Labour Force Parameter Trend</h4>

    </PanelHeader>
    <PanelBody>

    <Line id="chart" data={this.state.data} options={options}  style={{"height" : "250px", "width" : "100%"}}
    margin="10" redraw></Line>

    </PanelBody>
    </Panel>
    </PanelContainer>


    <PanelContainer noOverflow controlStyles='bg-orange75 fg-white'>
        <Panel>
        <PanelHeader className='bg-orange75 fg-white center text-center'>

        <h4>Comparative Labour Force Parameters</h4>

    </PanelHeader>
    <PanelBody>

    <title>Guess what?</title>
    <style type="text/css" dangerouslySetInnerHTML={{__html: "\n<!--\n.side { vertical-align:absbottom; display:inline }\n-->\n" }} />
  <h6 className="side" style={{color:"rgb(141,211,199)"}}> SC-MALE </h6>
    <h6 className="side" style={{color:"rgb(251,180,174)"}}>: SC-FEMALE </h6>
    <h6 className="side" style={{color:"rgb(190,186,218)"}}>: SC-PERSON </h6>

    <h6 className="side" style={{color:"rgb(251,128,114)"}}>: ST-MALE  </h6>
    <h6 className="side" style={{color:"rgb(128,177,211)"}}>: ST-FEMALE </h6>
    <h6 className="side" style={{color:"rgb(253,180,98)"}}>: ST-PERSON </h6>

    <h6 className="side" style={{color:"rgb(179,222,105)"}}>: OBC-MALE </h6>
    <h6 className="side" style={{color:"rgb(252,205,229)"}}>: OBC-FEMALE </h6>
    <h6 className="side" style={{color:"rgb(217,217,217)"}}>: OBC-PERSON </h6>
    <h6 className="side" style={{color:"rgb(188,128,189)"}}>: OTHERS-MALE </h6>
    <h6 className="side" style={{color:"rgb(204,235,197)"}}>: OTHERS-FEMALE </h6>
    <h6 className="side" style={{color:"rgb(255,237,111)"}}>: OTHERS-PERSON</h6>

    <Bar id="bchart" data={this.state.bdata} options={baroptions}  style={{"height":"250px" , "width" : "100%"}} redraw>
    </Bar>



    </PanelBody>
    </Panel>
    </PanelContainer>

    <DataTable tabledata={this.state.tdata} type={this.props.title}></DataTable>

    </Container>

  );
  }
}

export class Filter extends Component {
  render() {
    return (

        <Container>
        <Form>

        <FormGroup>
        <Label>Gender</Label>
        <div>
        <Radio inline id= "male" value='option1' name="gen"  onClick={this.props.genderHandle.bind(this)}>
    Male
    </Radio>
    <Radio inline id="female"  value='option2'  name="gen" onClick={this.props.genderHandle.bind(this)}>
    Female
    </Radio>
    <Radio inline id="person"  value='option3' defaultChecked name="gen" onClick={this.props.genderHandle.bind(this)}>
    Person
    </Radio>
    </div>
    </FormGroup>


    <FormGroup>
    <Label>Social Group</Label>
    <div>
    <Radio inline id= "SC" value='option1' name="cat"  onClick={this.props.casteHandle.bind(this)}>
    SC
    </Radio>
    <Radio inline id="ST"  value='option2'  name="cat" onClick={this.props.casteHandle.bind(this)}>
    ST
    </Radio>
    <Radio inline id="OBC"  value='option3'  name="cat" onClick={this.props.casteHandle.bind(this)}>
    OBC
    </Radio>
    <Radio inline id="OTHERS"  value='option3'  name="cat" onClick={this.props.casteHandle.bind(this)}>
    OTHERS
    </Radio>
    <Radio inline id="OVERALL"  value='option3' defaultChecked  name="cat" onClick={this.props.casteHandle.bind(this)}>
    OVERALL
    </Radio>
    </div>
    </FormGroup>

    <FormGroup>
    <Label>Category</Label>
    <div>
    <Radio inline  id="rural" value='option1' name="geo"  onClick={this.props.geoHandle.bind(this)}>
    RURAL
    </Radio>
    <Radio inline id="urban"  value='option2'  name="geo" onClick={this.props.geoHandle.bind(this)}>
    URBAN
    </Radio>
    <Radio inline id="rural_urban"  value='option3' defaultChecked  name="geo" onClick={this.props.geoHandle.bind(this)}>
    RURAL+URBAN
    </Radio>
    </div>
    </FormGroup>
    <FormGroup>
    <Label>Approach</Label>
    <div>
    <Radio inline  id="UPS" value='option1' defaultChecked name="datatype"  onClick={this.props.handleDataType.bind(this)}>
    UPS
    </Radio>
    <Radio inline id="UPSS"  value='option2'  name="datatype" onClick={this.props.handleDataType.bind(this)}>
    UPSS
    </Radio>
    </div>
    </FormGroup>
    </Form>
    </Container>
  );
  }
}

export class ComboBox extends Component{
  render(){
    var optionsarray = this.props.dates.map(function(d){
      return <option key={d.val} value={d.val}>{d.lbl}</option>
    });
    return (<select id="dates" onChange={this.props.onChange.bind(this)}>{optionsarray}</select>);
  }
}

function getFilterValues(type) {
  var Gen = $('input[name=gen]:checked')[0];
  return {
    gen: [Gen.id],
    type: type,
    cat: $('input[name=cat]:checked')[0].id,
    geo:$('input[name=geo]:checked')[0].id,
    datatype: $('input[name=datatype]:checked')[0].id,
    year: $('#dates').val()
  };
}

function yearsData (start,end) {
  var cmbData = [{lbl:"select",val:0}];
  for(var i = start;i<=end;i++)
    cmbData.push({lbl:i-1+"-"+i,val:i});
  return cmbData;
}

function getPreviousData(cattype,prop,data) {
  return _.map(data,function(x){ return {"year":x["year"],"y":x[prop]};});
}

function getPredictedData(sampledata,year){
  var types = ["SC","ST","OBC","OTHERS","OVERALL"];
  var props = ["rural_male","rural_female","rural_person","urban_male","urban_female","urban_person",
    "rural_urban_male","rural_urban_female","rural_urban_person"];
  var predictedData = [];
  _.each(types,function(obj){
    var transobj = {"caste":obj,"year":year};
    var dat = _.filter(sampledata,function(d) { return d.caste === obj});
    _.each(props,function(k) {
      var preData = getPreviousData(obj,k,dat);
      var yval = getY(year,preData);
      transobj[k] = (yval < 0) ? 0 : yval;
    });
    predictedData.push(transobj);
  });
  return predictedData;
}

export class DataTable extends Component {
  componentDidMount() {
    $('.tablesaw').table();




    $('.dial').knob();
    $('.knob').knob({
      draw: function() {
        // 'tron' case
        if(this.$.data('skin') == 'tron') {
          var a = this.angle(this.cv)  // Angle
              , sa = this.startAngle          // Previous start angle
              , sat = this.startAngle         // Start angle
              , ea                            // Previous end angle
              , eat = sat + a                 // End angle
              , r = true;

          this.g.lineWidth = this.lineWidth;

          this.o.cursor
          && (sat = eat - 0.3)
          && (eat = eat + 0.3);

          if(this.o.displayPrevious) {
            ea = this.startAngle + this.angle(this.value);
            this.o.cursor
            && (sa = ea - 0.3)
            && (ea = ea + 0.3);
            this.g.beginPath();
            this.g.strokeStyle = this.previousColor;
            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
            this.g.stroke();
          }

          this.g.beginPath();
          this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
          this.g.stroke();

          this.g.lineWidth = 2;
          this.g.beginPath();
          this.g.strokeStyle = this.o.fgColor;
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
          this.g.stroke();

          return false;
        }
      }
    });





  }
  render(){
    var rows = [];
    this.props.tabledata.forEach(function(dat) {
      rows.push(<Row data={dat}/>);
    });
    return (

        <PanelContainer noOverflow controlStyles='bg-orange75 fg-white'>
        <Panel>
        <PanelHeader className='bg-orange75 fg-white center text-center'>
        <h4>{this.props.type}</h4>
    </PanelHeader>
    <PanelBody>

    <Table striped bordered className='tablesaw'>
        <thead>
        <th>Social Group</th>
    <th colSpan={3}>Rural</th>
        <th  colSpan={3}>Urban</th>
        <th  colSpan={3}>Rural+Urban</th>
        <tr>
        <th ></th>
        <th>Male</th>
        <th>Female</th>
        <th >Person</th>
        <th>Male</th>
        <th>Female</th>
        <th>Person</th>
        <th>Male</th>
        <th>Female</th>
        <th>Person</th>
        </tr>
        </thead>
        <tbody>


        {rows}

        </tbody>
        </Table>


        </PanelBody>
        </Panel>
        </PanelContainer>


  );
  }
}


export class Row extends Component {
  render(){
    var d = this.props.data;
    return (<tr>
        <td>{d.caste}</td>
    <td><p className="dataCell">{d.rural_male}</p></td>
    <td><p className="dataCell">{d.rural_female}</p></td>
    <td><p className="dataCell">{d.rural_person}</p></td>
    <td><p className="dataCell">{d.urban_male}</p></td>
    <td><p className="dataCell">{d.urban_female}</p></td>
    <td><p className="dataCell">{d.urban_person}</p></td>
    <td><p className="dataCell">{d.rural_urban_male}</p></td>
    <td><p className="dataCell">{d.rural_urban_female}</p></td>
    <td><p className="dataCell">{d.rural_urban_person}</p></td>
    </tr>);
  }
}

function getChartType(chartType) {
  switch (chartType){
    case "Labour Force Participation Rate":
      return "lfpr";
      break;
    case "Worker Population":
      return "wpr";
      break;
    case "Unemployment Rate":
      return "umr";
      break;
    default:
      return "pur";
  }
}

function genYears(selyear,min) {
  var years = [];
  for(var i = min;i<selyear;i++)
    years.push(i);
  return years;
}

function getMinDateAndMaxDateInGivenData(data){
  return [_.min(data),_.max(data)];
}

function getPresentData(data,fvalues) {
  var cData = _.filter(data,function(d) { return d.year <= fvalues.year && d.caste == fvalues.cat;});
  var sortedData = (fvalues.datatype == "UPSS" || fvalues.cat == "OVERALL")? cData : cData.sort(function(a){ return a.year;});
  var labels = [];
  var axisData = [];
  _.each(sortedData,function(c){
    labels.push(c.year.toString());
    axisData.push(c[fvalues.geo+"_"+fvalues.gen]);
  });
  return [_.filter(data,function(d) { return d.year == fvalues.year}),getData(labels,axisData)];
}

function PredictData(data,fvalues) {
  var predictData = getPredictedData(data,fvalues.year);
  var eDataYears = getMinDateAndMaxDateInGivenData(_.map(data,function(d){return d.year}));
  var filteredData = _.filter(data,function(d){ return d.caste == fvalues.cat});
  var fdata =  (fvalues.datatype == "UPSS" || fvalues.cat=="OVERALL")?_.map(filteredData,function(x) { return {"year":x.year,"y":x[fvalues.geo+'_'+fvalues.gen]};})
      : _.map(filteredData.sort(function (i) { return i.year;}),function(x) { return {"year":x.year,"y":x[fvalues.geo+'_'+fvalues.gen]};});
  var xmean = mean(fdata,"year");
  var ymean = mean(fdata,"y");
  var b1 = b(xmean,ymean,fdata);
  var a1 = a(xmean,ymean,b1);
  var labels = _.map(fdata,function(d){ return d.year.toString()});
  var axisdata = _.map(fdata,function(d){ return d.y});
  for(var i = eDataYears[1]+1;i<=fvalues.year;i++) {
    labels.push(i.toString());
    var yval = y1(a1,b1,i);
    axisdata.push((yval<0)?0:yval);
  }
  return [predictData,getData(labels,axisdata)];
}

function barChartData(data) {
  var datasets = [];
  var bsettings = barSettings();
  var labels = ["rural","urban","rural_urban"];
  var casts =  ["SC","ST","OBC","OTHERS"];
  var gen = ["male","female","person"]
  _.each(casts,function(c){
    var catobj = _.find(data, function (x) { return x.caste == c; });
    _.each(gen,function(g){
      var data = [];
      _.each(labels,function(l){
        data.push(catobj[l+"_"+g]);
      });
      datasets.push(createDataObj(bsettings[c+'-'+g],data));
    });
  });

  return {
    labels:  ["Rural","Urban","Rural + Urban"],
    datasets: datasets
  };
}

function createDataObj(csettings, data) {

  return {
    label: csettings[0],
    fillColor: csettings[1],
    strokeColor: csettings[2],
    highlightFill: csettings[3],
    highlightStroke: csettings[4],
    data: data
  }
}

function barSettings() {
  return {
    "SC-person": ["SC-Person", "rgba(190,186,218,0.5)", "rgba(190,186,218,0.5)", "rgba(190,186,218,0.5)", "rgba(190,186,218,0.5)"],
    "ST-person": ["ST-Person", "rgb(253,180,98)", "rgb(253,180,98)", "rgb(253,180,98)", "rgb(253,180,98)"],
    "OBC-person": ["OBC-Person", "rgb(217,217,217)", "rgb(217,217,217)", "rgb(217,217,217)", "rgb(217,217,217)"],
    "OTHERS-person": ["OTHERS-Person", "rgb(255,237,111)", "rgb(255,237,111)", "rgb(255,237,111)", "rgb(255,237,111)"],
    "SC-male":["SC-Male", "rgb(141,211,199)", "rgb(141,211,199)", "rgb(141,211,199)", "rgb(141,211,199)"],
    "SC-female":["SC-Female","rgb(251,180,174)", "rgb(251,180,174)", "rgb(251,180,174)", "rgb(251,180,174)"],
    "ST-male":["ST-Male","rgb(251,128,114)", "rgb(251,128,114) ", "rgb(251,128,114) ", "rgb(251,128,114)"],
    "ST-female":["ST-Female","rgb(128,177,211)", "rgb(128,177,211)", "rgb(128,177,211)", "rgb(128,177,211)"],
    "OBC-male":["OBC-Male","rgb(179,222,105)", "rgb(179,222,105)", "rgb(179,222,105)", "rgb(179,222,105)"],
    "OBC-female":["OBC-Female","rgb(252,205,229)", "rgb(252,205,229)", "rgb(252,205,229)", "rgb(252,205,229)"],
    "OTHERS-male":["Others-Male","rgb(188,128,189)", "rgb(188,128,189)", "rgb(188,128,189)", "rgb(188,128,189)"],
    "OTHERS-female":["Others-Female","rgb(204,235,197)", "rgb(204,235,197)", "rgb(204,235,197)", "rgb(204,235,197)"]
  };
}