import { Fill, Stroke, Style, Text, Circle as CircleStyle } from 'ol/style.js';

class mapStyling 
{
  clean = new Style(
  {
    fill: new Fill(
    {
      color: 'rgba(255,255,255, 0)'
    }),
    stroke: new Stroke(
    {
      color: 'rgba(255,255,255, 0)',
      width: 0
    })
  });

  circle = new Style(
  {
    image: new CircleStyle(
    {
      radius: 16,
      stroke: new Stroke(
      {
        color: 'rgba(0,0,0, 1)',
        width: 1
      }),
      fill: new Fill(
      {
        color: 'rgba(255,255,255, 1)'
      })
    }),
    geometry: function(feature)
    {
      let retPoint;
      if (feature.getGeometry().getType() === 'MultiPolygon') 
      {
        retPoint =  feature.getGeometry().getPolygon(0).getInteriorPoint();
      } 
      else if (feature.getGeometry().getType() === 'Polygon') 
      {
        retPoint = feature.getGeometry().getInteriorPoint();
      }
      return retPoint;
    }
  });

  label = new Style(
  {
    geometry: function(feature)
    {
      let retPoint;
      if (feature.getGeometry().getType() === 'MultiPolygon') 
      {
        retPoint =  feature.getGeometry().getPolygon(0);
      } 
      else if (feature.getGeometry().getType() === 'Polygon') 
      {
        retPoint = feature.getGeometry();
      }
      return retPoint;
    },
    text: new Text(
    {
      font: 'bold 16px Open-sans,sans-serif',
      overflow: true,
      placement : "point",
      fill: new Fill(
      {
        color: '#000'
      }),
      stroke: new Stroke(
      {
        color: '#ccc',
        width: 2
      })
    })
  });

  default = new Style(
  {
    fill: new Fill(
    {
      color: 'rgba(236,241,240, 0)'
    }),
    stroke: new Stroke(
    {
      color: 'rgba(70,70,70, 1)',
      width: 1
    })
  });

  highlight = new Style(
  {
    fill: new Fill(
    {
      color: 'rgba(0,132,121,0.5)'
    }),
    stroke: new Stroke(
    {
      color: 'rgba(2,222,204, 1)',
      width: 3
    }),
    text: new Text(
    {
      font: 'bold 12px Calibri,sans-serif',
      overflow: true,
      fill: new Fill(
      {
        color: 'rgba(0,0,0, 1)',
      }),
    })
  });

  selected = new Style(
  {
    stroke: new Stroke(
    {
      color: 'rgba(70,70,70, 1)',
      width: 3
    })
  });

}

export default mapStyling;