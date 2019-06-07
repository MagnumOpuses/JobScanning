import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import {getCenter} from 'ol/extent.js';
import OlLayerTile from "ol/layer/Tile";
import OlSourceWMTS from "ol/source/WMTS";
import {Fill, Style } from 'ol/style.js';
import 'ol/ol.css';
import './custom.css';

import mapStyling from './styling';
import mapLayers from './layers';
import api from '../../api/api';
import {colorCodeValue, capitalize,areaSelected} from './helpers'
const styling = new mapStyling();
const layers = new mapLayers();

class MapComponent extends Component 
{
  constructor(props) 
  {
    super(props);
  
    this.state = 
    { 
      center: [
        Number(process.env.REACT_APP_MAP_START_LON), 
        Number(process.env.REACT_APP_MAP_START_LAT)
      ], 
      zoom: Number(process.env.REACT_APP_MAP_START_ZOOM), 
      extent: [],
      q: '',
      location: '',
      level: 'county',
      total: 0,
      height: '400px',
      width: 'auto'
    };

    if(this.props.height !== undefined){
      this.state.height = this.props.height;
    }
    if(this.props.width !== undefined){
      this.state.width = this.props.width;
    }

    this.selected = 
    {
      county: new areaSelected(),
      municipality: new areaSelected()
    };

    const LmMap = new OlLayerTile(
      {
      source: new OlSourceWMTS(
        {
          url: layers.layer,
          layer: 'topowebb_nedtonad',
          format: 'image/png',
          matrixSet: '3857',
          tileGrid: layers.tileGrid3857,
          version: '1.0',
          tited: true,
          style: 'default',
          crossOrigin: 'anonymous'
        }
      ),
      name: 'Karta',
      zIndex: 0
    });

    const groundLayers = [ LmMap ];
    this.topLayers = 
    [ 
      layers.heatmap, 
      layers.municipality, 
      layers.municipalitySelected, 
      layers.county, 
      layers.countySelected, 
      layers.selected,
      layers.hover 
    ];
    /*
    layers.Heatmap.getSource().on('addfeature', function(event) 
      {

        var level = event.feature.get('level');
        switch(level) {
          case 'high':
            level = 1;
            break;
          case 'medium':
            level = .5;
            break;
          default:
            level = .1;
          break;
        }
        event.feature.set('weight', Math.random());  // set weight on point 0 -> 1
      }
    );
    */

    this.olmap = new OlMap(
      {
        target: null,
        layers: [...groundLayers, ...this.topLayers],
        view: new OlView(
          {
            center: this.state.center,
            zoom: this.state.zoom,
            extent: [-20037508.342789, -20037508.342789, 20037508.342789, 20037508.342789],
            minZoom: 4.8
          })
      }
    );

  }

  updateMap() 
  {
    console.log('updating map');
    const map = this.olmap;
    if(this.state.extent.length === 4) 
    {
      map.getView().fit(
        this.state.extent, 
        {
          'size': map.getSize(), 
          'duration': 1000
        } 
      );
    }
    else 
    {
      map.getView().animate(
        {
          center: this.state.center,
          zoom: this.state.zoom,
          duration: 1000
        }
      );
    }
    this.setState({ extent: ''});
  }
  
  toggleLevel(level = 'county')
  {
    this.setState({ level: level });
    if(level === 'municipality')
    {
      //console.log('swiching to municipality level');
      layers.municipality.setStyle(styling.default);
      layers.municipalitySelected.setVisible(true);
      layers.county.setStyle(styling.clean);
      layers.countySelected.setVisible(false);
      layers.heatmap.setVisible(false);
      layers.selected.setVisible(true);
    } 
    else if(level === 'heatmap')
    {
      //console.log('swiching to heatmap')
      layers.county.setStyle(styling.clean);
      layers.countySelected.setVisible(false);
      layers.municipality.setStyle(styling.clean);
      layers.municipalitySelected.setVisible(false);
      layers.heatmap.setVisible(true);
      layers.hover.getSource().clear();
      layers.selected.setVisible(false);
    
    }
    else
    {
      //console.log('swiching to county level');
      
      //console.log('unselect municipality');
      this.removeMark(this.selected.municipality.name, 'selected');
      this.removeMark('', 'municipalitySelected');
      this.selected.municipality = new areaSelected();
      if(this.selected.county.name.length > 0)
      {
        this.setState({ location: this.selected.county.name });
      }

      layers.municipality.setStyle(styling.clean);
      layers.municipalitySelected.setVisible(false);
      layers.county.setStyle(styling.default);
      layers.countySelected.setVisible(true);
      layers.heatmap.setVisible(false);
      layers.selected.setVisible(true);
    }

    this.populate();	
  }

  findFeature(featureName, layers = ['county', 'municipality'])
  {
    if(featureName === '') return false;
    featureName = capitalize(featureName);
    let found = {};
    layers.forEach(layerName => {
      let layer = this.findLayerByValue('name', layerName);
      layer.getSource().forEachFeature(function(feature)
      {
        if(found.feature) return;
        if(
            feature.get('name') === featureName || 
            feature.get('short_name') === featureName
          )  
        {
          found = {
            feature: feature,
            level: layerName
          }
        }
      });
    });
    return found;

  }

  findFeatures(array, area = this.state.level)
  {
    let marks = [];
    let found = false;
    array.forEach(fetchedRow => {
      found = this.findFeature(fetchedRow.name, [area]);
      if(found.feature)
      {
        marks.push({
          feature: found.feature,
          text: fetchedRow.value.toString(),
          color: colorCodeValue(fetchedRow.value.toString())
        });
      }
    });
    if(marks.length) {
      this.addMarks(
        marks, 
        { 
          layerExtent: true, 
          layer: area + 'Selected',
          clear: true
        }
      );
    }

  }

  async loadValues(area) 
  {
    const resp = await api(this.state.q);
    if(resp.data.result !== undefined && resp.data.result[area] !== undefined)
    {
      this.setState({ total: resp.data.results.total });
      this.findFeatures(resp.data.results[area]);
    }
  }

  handleChange() 
  {
    const jtv = this.jobTechVaribles;
    if(
      jtv.getAttribute('data-location') !== undefined &&
      this.state.location !== jtv.getAttribute('data-location')
      )
    {
      let found = {};
      found = this.findFeature(jtv.getAttribute('data-location'));
      if(found.feature)
      {
        this.setState({ location: jtv.getAttribute('data-location') });
        if(this.state.level === 'county') this.toggleLevel('municipality');
        this.addSelect(found.feature, found.level);
      } 
      else
      {
        console.log('can not find : ' + this.state.location);
      }
    }
    if(
      jtv.getAttribute('data-q') !== undefined &&
      this.state.q !== jtv.getAttribute('data-q')
      )
    {
      this.setState({ q: jtv.getAttribute('data-q') });
      this.loadValues(this.state.level);
    }
    if(
      jtv.getAttribute('data-mode') !== undefined &&
      ( 
        jtv.getAttribute('data-mode') === 'heatmap' ||
        jtv.getAttribute('data-mode') === 'county' ||
        jtv.getAttribute('data-mode') === 'municipality'
      ))
    {
      this.toggleLevel(jtv.getAttribute('data-mode'));
    }
  }

  populate()
  {
    const parent = this;
    setTimeout(function()
    {
      if(parent.props.mapData.result)
      {
        console.log(['populate data from props',parent.props.mapData.result]);
        parent.setState({ total: parent.props.mapData.total });
        parent.findFeatures(parent.props.mapData.result);
      }
      else
      {
        console.log('populate data from api');
        parent.loadValues(parent.state.level);		
      }
    }, 2000);

  }

  globalJobTechVariables()
  {
    this.jobTechVaribles = document.getElementById('jobTechVaribles');
    if(!this.jobTechVaribles) {
      let jobTechVaribles = document.createElement("div");
      jobTechVaribles.setAttribute('id','jobTechVaribles');
      this.jobTechVaribles = document.body.appendChild(jobTechVaribles);
    }

    this.handleChange = this.handleChange.bind(this);
    document.body.addEventListener('change', this.handleChange);
  }

  isElementResized(ElementId)
  {
    const e = document.getElementById(ElementId);
    if(!this.mapHeight)
    {
      this.mapHeight = e.offsetHeight;
      this.mapWidth = e.offsetWidth; 
    }
    else 
    {
      if(
        e &&
        (
          this.mapHeight !== e.offsetHeight ||
          this.mapWidth !== e.offsetWidth 
        )
        )
      {
        this.olmap.updateSize();
        this.mapHeight = e.offsetHeight;
        this.mapWidth = e.offsetWidth; 
      }
    }
  }

  componentDidMount() 
  {
    this.isElementResized("map");
    this.globalJobTechVariables();
    this.handleChange();

    const parent = this;
    const map = this.olmap;
    let hovered;
    map.setTarget('map');

    if( this.props.mode !== undefined ) this.toggleLevel(this.props.mode);
    if( this.props.location !== undefined ) this.setState({ location: this.props.location });
    if( this.props.mode === undefined && this.props.location === undefined) 
    {
      this.populate();
    }

    map.on('moveend', (evt) => 
    {
      let center = map.getView().getCenter();
      let zoom = map.getView().getZoom();
      this.setState({ center, zoom });

    });

    map.on('pointermove', function(evt) 
    {
      if(evt.dragging) return;

      let pixel = map.getEventPixel(evt.originalEvent);
      let feature = map.forEachFeatureAtPixel(pixel, function(feature) 
      {
        if(parent.state.level === 'county' && feature.get('admin_level') === '4') return feature;
        if(parent.state.level === 'municipality' && feature.get('admin_level') === '7') return feature;
      });

      if (feature !== hovered) 
      {
        if (hovered) layers.hover.getSource().removeFeature(hovered);
        if (feature) 
        {
          feature = feature.clone();
          feature.setStyle(function(feature) 
          {
            styling.label.getText().setText(feature.get('name'));
            return [styling.label,styling.highlight];
          });
          layers.hover.getSource().addFeature(feature);
        }
        hovered = feature;
      }

    });

    map.on('click', function(evt) 
    {
      let found = false;
      map.forEachFeatureAtPixel(evt.pixel, function(feature) 
      {
        if(feature !== undefined)
        {
          // admin_level 4 = county
          if(feature.get('admin_level') === '4' )
          {
            if(parent.state.level === 'county')
            {
              parent.addSelect(feature, 'county');
              parent.toggleLevel('municipality');
              found = true;
            }
            else
            {
              // if we select a municipality from other county, we select that county when zooming out
              parent.addSelect(feature, 'county', false);
            }

          };

          // admin_level 7 = municipality
          if(
              parent.selected.municipality.name !== feature.get('name') && 
              feature.get('admin_level') === '7' &&
              parent.state.level === 'municipality' &&
              found !== true     
            )
          {
            //console.log([ feature.get('admin_level'), feature.get('name')]);
            parent.addSelect(feature, 'municipality');
            found = true;

          };
        
        }
      });

    });

  }

  shouldComponentUpdate(nextProps, nextState) 
  {
    const parent = this;
    if(nextState.level != "heatmap"){
      setTimeout(function(){parent.isElementResized("map")},300);
    }
    if(nextProps.mapData)
    {
      if(nextProps.mapData.total !== this.state.total)
      {
        console.log('updating mapresults');
        nextState.total = nextProps.mapData.total ;
        this.findFeatures(nextProps.mapData.result); 
      }
    }

    if(
      nextProps.location !== undefined &&  
      nextProps.location !== this.state.location
      )
    {
      nextState.location = nextProps.location;
      //console.log('finding location : ' + nextProps.location);
      if(nextProps.location.length < 2)
      {

        this.olmap.getView().animate(
          {
            center: [
              process.env.REACT_APP_MAP_START_LON , 
              process.env.REACT_APP_MAP_START_LAT 
            ],
            zoom: process.env.REACT_APP_MAP_START_ZOOM,
            duration: 1000
          }
        );
  
        this.selected = 
        {
          county: new areaSelected(),
          municipality: new areaSelected()
        };
        this.removeMark('','selected');

      }
      let found = this.findFeature(nextProps.location);
      if(found.feature) 
      {
        console.log(['location found', found]);
        nextState.extent = found.feature.getGeometry().getExtent();
        this.addSelect(found.feature, found.level);

      }
    }

    if(this.jobTechVaribles)
    {
      // If the jobTechVaribles is not the same as the map, update them
      const jvt = this.jobTechVaribles;
      if(jvt.getAttribute('data-location') !== this.state.location)
      {
        jvt.setAttribute('data-location', this.state.location);
      }
      if(jvt.getAttribute('data-q') !== this.state.q)
      {
        jvt.setAttribute('data-q', this.state.q);
      }
    }

    if(
      nextState.location !== undefined && 
      nextState.location !== null  && 
      nextState.location !== "null"  && 
      nextState.location !== this.state.location)
    {
      if(nextState.location.length > 1) 
      {
        this.props.setLocationAndFetch(nextState.location);
      }
    }

    // let center = this.olmap.getView().getCenter();
    // let zoom = this.olmap.getView().getZoom();
  
    // if(
    //   center === nextState.center && 
    //   zoom === nextState.zoom  
    //   ) return false;

    return false;
  }
  
  addSelect(feature, type, selectIt = true) {
    console.trace();
    if(this.selected[type].name.length > 0)
    {
      //select one county or municipality at the time
      this.removeMark(this.selected[type].name, 'selected');
    }
    feature = feature.clone();
    layers.selected.getSource().addFeature(feature);
    if(type === 'county') 
    {
      this.selected[type].name = feature.get('name');
      // TODO set total to selected county. Marks might needs to be global within comp.
      // https://trello.com/c/CSnzPUAU/85-f%C3%A4rger-p%C3%A5-kartan
    }
    else 
    {    
      feature.setStyle([
        styling.highlight, 
        styling.selected
      ]);
      this.selected[type].name = feature.get('short_name');
    }
    console.log('adding feature ' + this.selected[type].name + ' to ' + type);
    feature.setId(this.selected[type].name);
    if(selectIt) 
    {
      if(this.state.level !== type) this.toggleLevel(type);
      let extent = feature.getGeometry().getExtent();
      this.setState(
        { 
          location: this.selected[type].name,
          center: getCenter(extent), 
          extent: extent 
        }
      );
    }
    this.updateMap();
  }

  addMarks(marks, opt) 
  {
    //console.log('adding marks');
    const standardsOpt = {
      layerExtent: false,
      layer: '',
      clear: false,
      zoomResult: false,
    } 
    let options = Object.assign(standardsOpt, opt);
    if(this.state.level === 'county') options.zoomResult = true;
    const selectedLayer = this.findLayerByValue('name', options.layer);

    if(options.clear) selectedLayer.getSource().clear();
    let feature = {};
    marks.forEach(function(mark){
      feature = mark.feature.clone();
      selectedLayer.getSource().addFeature(feature);

      feature.setStyle(function() 
      {
        let fill = new Style({
          fill: new Fill({
            color: mark.color
          })
        });
        styling.label.getText().setText(mark.text);
        return [styling.circle,styling.label,fill];
      });
    });

    let extent = [];
    if(options.layerExtent) extent = selectedLayer.getSource().getExtent();
    if(!options.layerExtent) extent = feature.getGeometry().getExtent();
    if(options.zoomResult) {
      this.setState(
        { 
          center: getCenter(extent), 
          extent: extent 
        }
      );
    }

  }

  removeMark(featureName, layer) 
  {
    const selectedLayer = this.findLayerByValue('name', layer);
    if(featureName === '')
    {
      selectedLayer.getSource().clear();
    }
    else
    {
      const feature = selectedLayer.getSource().getFeatureById(featureName);
      if (feature) selectedLayer.getSource().removeFeature(feature);
    }
  }

  findLayerByValue(key, name)
  {
    let found = {};
    this.topLayers.forEach((layer) => 
    {
      if(layer.get(key) === name) found = layer; 
    });
    return found;
  }

  toggleLayer(layer, value='') 
  {
    if(Number.isInteger(layer)) layer = this.topLayers[layer];
    if(value.length < 1) 
    {
      layer.setVisible(!layer.getVisible());
      //console.log('layer vis toggled');
    }
    else 
    {
      layer.setVisible(value);
      //console.log('layer vis set to ' + value);
    }
  }

  render() 
  {
    return (
        <div id="map" style={{ width: this.state.width, height: this.state.height }}>
          <ul>
            <li><a href="#"  onClick={e => this.toggleLevel('county')}>Län</a></li>
            <li><a href="#"  onClick={e => this.toggleLevel('municipality')}>Kommun</a></li>
          </ul>
        </div>
    );
  }
}
/*  links to toggle layers

      <ul>
        {this.topLayers.map((layer, i) => {     
          return (<li key={i}><a href="#"  onClick={e => this.toggleLayer(i)}>{layer.get('name')}</a></li>) 
        })}
      </ul>

*/ 
export default MapComponent;