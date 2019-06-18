
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
  if (typeof s !== 'string') return ''
  s = s.toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1)
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

  const offsets = 
  {
    5 : 50000,
    6 : 28000,
    7 : 12000,
    8 : 7000,
    9 : 3000,
    10 : 1500,
    11 : 1000,
    12 : 800,
    13 : 300,
    14 : 150,
    15 : 100
  }

  if(zoom > 15) return 50;
  return offsets[zoom];
}