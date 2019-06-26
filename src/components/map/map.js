import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import {getCenter} from 'ol/extent.js';
import {Fill, Style } from 'ol/style.js';
import 'ol/ol.css';
import './custom.css';

import mapStyling from './styling';
import mapLayers from './layers';
import api from '../../api/api';
import {
  colorCodeValue, 
  capitalize,
  areaSelected, 
  isElementResized,
  globalDivElement,
  isMobile
} from './helpers'

import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';

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
      level: 'municipality',
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

    this.olmap = new OlMap(
      {
        target: null,
        layers: [...layers.ground, ...layers.top],
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
    const duration = 1000;
    const map = this.olmap;
    if(this.state.extent.length === 4) 
    {
      map.getView().fit(
        this.state.extent, 
        {
          'size': map.getSize(), 
          'duration': duration
        } 
      );
      this.setState({ extent: ''});
    }
    else 
    {
      map.getView().animate(
        {
          center: this.state.center,
          zoom: this.state.zoom,
          duration: duration
        }
      );
    }
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
      found = this.findFeature(fetchedRow.name);
      if(found.feature)
      {
        marks.push({
          feature: found.feature,
          level: found.level,
          text: fetchedRow.value.toString(),
          color: colorCodeValue(fetchedRow.value.toString())
        });
      }
    });
    if(marks.length) {
      this.addMarks(
        marks, 
        { 
          layerExtent: false, 
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
    let location = jtv.getAttribute('data-location');
    let q = jtv.getAttribute('data-q');
    let zoom = jtv.getAttribute('data-zoom');
    if(
      location !== undefined &&
      location !== this.state.location
      )
    {
      let found = {};
      found = this.findFeature(location);
      if(found.feature)
      {
        this.setState({ location: location });
        if(found.level !== 'county') this.addSelect(found.feature, found.level);
      } 
      else
      {
        console.log('can not find : ' + location);
      }
    }
    if(
      q !== undefined &&
      q !== this.state.q 
      )
    {
      this.setState({ q: q });
      this.loadValues(this.state.level);
    }
    if(
      zoom !== undefined &&
      zoom !== this.olmap.zoom
      )
    {
      this.setState({ zoom: zoom });
    }
  }

  toListingFromSnackbar()
  {
    this.props.sidemenu(true);
    this.props.closeSnackbar(this.snackKey);
  }

  componentDidMount() 
  {
    if(isElementResized("map")) this.olmap.updateSize();
    this.jobTechVaribles = globalDivElement('jobTechVaribles');

    this.handleChange = this.handleChange.bind(this);
    document.body.addEventListener('change', this.handleChange);
    this.handleChange();

    const that = this;
    const map = this.olmap;

    this.hovered = '';
    map.setTarget('map');

    if( this.props.location !== undefined ) this.setState({ location: this.props.location });
    if( 
      this.props.mode === undefined && 
      this.props.location === undefined &&
      this.props.mapData.result === undefined
      ) 
    {
      this.loadValues(this.state.level);
    }
    map.once('rendercomplete', function()
    { 
      that.mapLoaded = true;
    });

    map.on('pointermove', function(evt) 
    {
      if(evt.dragging) return;

      let pixel = map.getEventPixel(evt.originalEvent);
      let feature = map.forEachFeatureAtPixel(pixel, function(feature) 
      {
        if(that.featureFromArea(feature)) return feature;
      });

      if (feature && feature !== this.hovered) 
      {
        if (this.hovered) layers.hover.getSource().removeFeature(this.hovered);
        feature = feature.clone();
        feature.setStyle(function(feature) 
        {
          styling.labelLower.getText().setText(feature.get('name'));
          return [styling.labelLower,styling.highlight];
        });
        layers.hover.getSource().addFeature(feature);
        this.hovered = feature;
      } 
      else if (!feature)
      {
        layers.hover.getSource().clear();
        this.hovered = '';
      }

    });

    map.on('click', function(evt) 
    {
      let found = false;
      map.forEachFeatureAtPixel(evt.pixel, function(feature) 
      {
        if(feature !== undefined)
        {
          if(
              that.selected.municipality.name !== feature.get('name') && 
              that.featureFromArea(feature, 'municipality') &&
              found !== true     
            )
          {
            if(isMobile())
            {
              let msg = feature.get('name') ;
              that.snackKey = that.props.enqueueSnackbar(
                msg, 
                { 
                  autoHideDuration: 5000,
                  action: (
                    <Button onClick={() => that.toListingFromSnackbar() }>
                        Tryck här för att se annonser
                    </Button>
                  ),
                }
              );
            }

            that.addSelect(feature, 'municipality');
            found = true;
          };
        
        }
      });

    });

  }

  featureFromArea(feature, level = this.state.level)
  {
    if (level === 'county' && feature.get('admin_level') === '4') return feature;
    if (level === 'municipality' && feature.get('admin_level') === '7') return feature;
    return false;
  }

  shouldComponentUpdate(nextProps, nextState) 
  {
    const that = this;
    let wait = 1000;
    if(this.mapLoaded) wait = 0;
    setTimeout(function(){
      if(isElementResized("map"))
      {
        //console.log('element resized');
        that.olmap.updateSize();
      }
    },300);

    if(nextProps.mapData)
    {
      if(nextProps.mapData.total !== this.state.total)
      {
        nextState.total = nextProps.mapData.total ;
        setTimeout(function()
        {
          that.findFeatures(nextProps.mapData.result); 
        }, wait);
      }
    }

    if(
      nextProps.location !== undefined &&  
      nextProps.location !== this.state.location
      )
    {
      nextState.location = nextProps.location;
      setTimeout(function(){  // React is faster then ol, ol is not finnished
        let found = that.findFeature(nextProps.location);
        if(found.feature && found.level !== 'county') 
        {
          that.addSelect(found.feature, found.level);
        }
      },wait);
    }

    if(this.jobTechVaribles)
    {
      // If the jobTechVaribles is not the same as the map, update them
      const jvt = this.jobTechVaribles;
      if(jvt.getAttribute('data-location') !== nextState.location)
      {
        jvt.setAttribute('data-location', nextState.location);
      }
      if(jvt.getAttribute('data-q') !== nextState.q)
      {
        jvt.setAttribute('data-q', nextState.q);
      }
      if(jvt.getAttribute('data-zoom') !== nextState.zoom)
      {
        jvt.setAttribute('data-zoom', nextState.zoom);
      }
    }

    if(
      nextState.location !== undefined && 
      nextState.location !== null  && 
      nextState.location !== "null"  && 
      nextState.location !== this.state.location &&
      nextState.location.length > 1)
    {
      this.props.setLocationAndFetch(nextState.location);
    }

    if(nextState.level !== this.state.level) return true;

    return false;
  }
  
  addSelect(feature, type, selectIt = true) {
    if(this.selected[type].name.length > 0 &&
      feature.get('name') !== this.selected[type].name)
    {
      //select one county or municipality at the time
      this.removeMark(this.selected[type].name, 'selected');
    }
    feature = feature.clone();
    layers.selected.getSource().addFeature(feature);
    if(type === 'county') 
    {
      this.selected[type].name = feature.get('name');
    }
    else 
    {    
      feature.setStyle([
        styling.highlight, 
        styling.selected
      ]);
      this.selected[type].name = feature.get('short_name');
    }
    feature.setId(this.selected[type].name);
    if(selectIt) 
    {
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
      clear: false,
      zoomResult: false,
    } 
    let options = Object.assign(standardsOpt, opt);
    if(this.state.level === 'county') options.zoomResult = true;
    if(options.clear) {
      layers.county.getSource().clear();
      layers.municipalityValues.getSource().clear();
      layers.municipality.getSource().clear();
    }
    let feature = {};
    let numFeature = {};
    marks.forEach(function(mark){
      feature = mark.feature.clone();
      feature.set('innerText', mark.text);
      numFeature = mark.feature.clone();

      if (mark.level === 'municipality')
      {
        layers.municipalityValues.getSource().addFeature(numFeature);
        layers.municipality.getSource().addFeature(feature);
      }
      feature.setStyle(function() 
      {
        let fill = new Style({
          fill: new Fill({
            color: mark.color
          })
        });
        return [fill];
      });
      numFeature.setStyle(function() 
      {
        styling.labelUpper.getText().setText(mark.text);
        return [styling.circle,styling.labelUpper];
      });
    });

    let extent = [];
    //if(options.layerExtent) extent = selectedLayer.getSource().getExtent();
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
    layers.top.forEach((layer) => 
    {
      if(layer.get(key) === name) found = layer; 
    });
    return found;
  }

  render() 
  {
    return (
        <div id="map" style={{ width: this.state.width, height: this.state.height }}>
        </div>
    );
  }
}

export default withSnackbar(MapComponent);