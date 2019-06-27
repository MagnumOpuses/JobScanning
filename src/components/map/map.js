import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import {getCenter} from 'ol/extent.js';
import {Fill, Style } from 'ol/style.js';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';

import mapStyling from './styling';
import mapLayers from './layers';
import {
  colorCodeValue, 
  capitalize,
  areaSelected, 
  isElementResized,
  globalDivElement,
  isMobile,
  featureFromArea
} from './helpers'

import 'ol/ol.css';
import './custom.css';

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

    if(this.props.height) this.state.height = this.props.height;
    if(this.props.width) this.state.width = this.props.width;

    this.oneSec = 1000;
    this.selected = { municipality: new areaSelected() };
    this.olmap = new OlMap(
      {
        target: null,
        layers: [...layers.ground, ...layers.top],
        view: new OlView(
          {
            center: this.state.center,
            zoom: this.state.zoom,
            extent: [-20037508.342789, -20037508.342789, 20037508.342789, 20037508.342789],
            minZoom: 4.8,
            maxZoom: 10
          })
      }
    );

  }

  updateMap() 
  {
    if(this.state.extent.length === 4) 
    {
      this.olmap.getView().fit(
        this.state.extent, 
        {
          'size': this.olmap.getSize(), 
          'duration': this.oneSec
        } 
      );
      this.setState({ extent: ''});
    }
    else 
    {
      this.olmap.getView().animate(
        {
          center: this.state.center,
          zoom: this.state.zoom,
          duration: this.oneSec
        }
      );
    }
  }
  
  findFeature(featureName)
  {
    if(!featureName) return false;
    featureName = capitalize(featureName);
    let found = {};
    layers.municipality.getSource().forEachFeature(function(feature)
    {
      if(found.feature) return true; // fastest way to stop forEach
      if(
          feature.get('name') === featureName || 
          feature.get('short_name') === featureName
        )  
      {
        found = {
          feature: feature,
          level: 'municipality'
        }
      }
    });
    return found;
  }

  findFeatures(array)
  {
    let marks = [];
    array.forEach(fetchedRow => {
      let found = this.findFeature(fetchedRow.name);
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
    if(marks.length) this.addMarks( marks, true );
  }

  handleChange() 
  {
    const jtv = this.jobTechVaribles;
    let location = jtv.getAttribute('data-location');
    let q = jtv.getAttribute('data-q');
    let zoom = jtv.getAttribute('data-zoom');
    if( location && location !== this.state.location )
    {
      let found = this.findFeature(location);
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
    if( q !== undefined && q !== this.state.q )
    {
      this.setState({ q: q });
    }
    if( zoom !== undefined && zoom !== this.olmap.zoom)
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
    const that = this;
    const map = this.olmap;
    this.hovered = '';

    map.setTarget('map');
    if(isElementResized("map")) map.updateSize();
    this.jobTechVaribles = globalDivElement('jobTechVaribles');

    this.handleChange = this.handleChange.bind(this);
    document.body.addEventListener('change', this.handleChange);
    this.handleChange();

    if(this.props.location) this.setState({ location: this.props.location });

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
        if(featureFromArea(feature, that.state.level)) return feature;
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
        if(feature && that.selected.municipality.name !== feature.get('short_name') && featureFromArea(feature, 'municipality') )
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
      });
    });
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
    this.jobTechVaribles = globalDivElement('jobTechVaribles');
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
      if(jvt.getAttribute('data-zoom') !== nextState.zoom)
      {
        jvt.setAttribute('data-zoom', nextState.zoom);
      }
    }

    if(
      nextState.location  && 
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
      feature.get('short_name') !== this.selected[type].name)
    {
      //select one municipality at the time
      //this.removeMark(this.selected[type].name, 'selected');
      const feature = layers.selected.getSource().getFeatureById(this.selected[type].name);
      if (feature) layers.selected.getSource().removeFeature(feature);
    }
    feature = feature.clone();
    layers.selected.getSource().addFeature(feature);
    feature.setStyle([
      styling.highlight, 
      styling.selected
    ]);
    this.selected[type].name = feature.get('short_name');

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

  addMarks(marks, clear = false) 
  {
    if(clear) {
      layers.municipalityValues.getSource().clear();
      layers.municipality.getSource().clear();
    }
    marks.forEach(function(mark){
      let feature = mark.feature.clone();
      let numFeature = mark.feature.clone();
      feature.set('innerText', mark.text);
      layers.municipality.getSource().addFeature(feature);
      layers.municipalityValues.getSource().addFeature(numFeature);

      feature.setStyle(function() 
      {
        let fill = new Style({
          fill: new Fill({color: mark.color})
        });
        return [fill];
      });
      numFeature.setStyle(function() 
      {
        styling.labelUpper.getText().setText(mark.text);
        return [styling.circle,styling.labelUpper];
      });
    });

  }

  render() 
  {
    return (
      <div id="map" style={{ 
        width: this.state.width, 
        height: this.state.height }}>
      </div>
    );
  }
}

export default withSnackbar(MapComponent);