export function colorCodeValue(value)
{

  const predefinedColor = 
  [
    process.env.REACT_APP_COLOR1,
    process.env.REACT_APP_COLOR2,
    process.env.REACT_APP_COLOR3,
    process.env.REACT_APP_COLOR4,
  ];

  let one4th = 5 // this.state.total / 4;
  let x = 3;
  if (value <= (one4th * 3)) x = 2;
  if (value <= (one4th * 2)) x = 1;
  if (value <= one4th) x = 0;
  return predefinedColor[x];
}

export function capitalize(s)
{
  var splitStr = s.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

export function isElementResized(ElementId)
{
  const e = document.getElementById(ElementId);
  if(!e) return false;
  if(!e.getAttribute('data-height'))
  {
    e.setAttribute('data-height', e.offsetHeight);
    e.setAttribute('data-width', e.offsetWidth); 
  }
  else 
  {
    if(
      Number(e.getAttribute('data-height')) !== e.offsetHeight ||
      Number(e.getAttribute('data-width')) !== e.offsetWidth 
      )
    {
      e.setAttribute('data-height', e.offsetHeight);
      e.setAttribute('data-width', e.offsetWidth);   
      return true;
    }
  }
  return false;
}

export function globalDivElement(id)
{
  let e = document.getElementById(id);
  if(!e) {
    let el = document.createElement("div");
    el.setAttribute('id',id);
    e = document.body.appendChild(el);
  }

  return e;
}

export class areaSelected {
  zoom = 0;
  name = '';

}

export function getElementAttribute(attr,id = 'jobTechVaribles')
{
  const e = document.getElementById(id);
  if(!e) return false;
  if(!e.getAttribute('data-' + attr)) return false;
  return e.getAttribute('data-' + attr);

}

export function offseter()
{
  const zoom = Math.round(getElementAttribute('zoom'));
  if(zoom < 4) return false;
  if(zoom > 10) return 500;
  const offsets = 
  {
    5 : 50000,
    6 : 28000,
    7 : 12000,
    8 : 9000,
    9 : 4300,
    10 : 2500
  }
  return offsets[zoom];
}

export function isMobile(type)
{
  switch (type) {
    case 'Android':
      return navigator.userAgent.match(/Android/i);
    case 'BlackBerry':
      return navigator.userAgent.match(/BlackBerry/i);
    case 'iOS':
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    case 'Opera':
      return navigator.userAgent.match(/Opera Mini/i);
    case 'Windows':
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    default:
      return (isMobile('Android') || isMobile('BlackBerry') || isMobile('iOS') || isMobile('Opera') || isMobile('Windows'));
  }
}

export function featureFromArea(feature, level)
{
  if (level === 'county' && feature.get('admin_level') === '4') return feature;
  if (level === 'municipality' && feature.get('admin_level') === '7') return feature;
  return false;
}