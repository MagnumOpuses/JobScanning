
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
      e.getAttribute('data-height') !== e.offsetHeight ||
      e.getAttribute('data-width') !== e.offsetWidth 
      )
    {
      return true;
      e.setAttribute('data-height', e.offsetHeight);
      e.setAttribute('data-width', e.offsetWidth); 
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
