canvas_top = document.createElement('canvas')
ctx_top = canvas_top.getContext('2d')
canvas_top.width=300;
canvas_top.height=300;
document.body.appendChild(canvas_top)
canvas_top.style.border = '1px solid red'

canvas_side = document.createElement('canvas')
ctx_side = canvas_side.getContext('2d')
canvas_side.width=300;
canvas_side.height=300;
document.body.appendChild(canvas_side)
canvas_side.style.border = '1px solid red'

const A = 5;
const B = A-1;
const S = 300;

make_grid = ()=>{
ctx_top.fillStyle = 'rgba(255,0,255,0.1)';
  for(let i = 0; i<=S; i+=A)
   for(let j = 0; j<=S; j+=A)
    ctx_top.fillRect(i,j,B,B)
ctx_top.fillStyle = 'red';

ctx_side.fillStyle = 'rgba(255,0,255,0.1)';
  for(let i = 0; i<=S; i+=A)
   for(let j = 0; j<=S; j+=A)
    ctx_side.fillRect(i,j,B,B)
ctx_side.fillStyle = 'red';

}

pixel = (x,y)=>{
ctx_top.fillRect(Math.floor(x)*A,Math.floor(y)*A,B,B);
}

line = (a, b) => {
  let dx = b[0] - a[0];
  let dy = b[1] - a[1];

  let k = dy / dx;
  let b_intercept = a[1] - k * a[0];

  
  for(let i = Math.min(a[0],b[0]); i < Math.max(a[0],b[0]); i++)
   pixel(i,k*i+b_intercept)
 
 if(dx*dx < 0.8)
 for(let i = Math.min(a[1],b[1]);i<Math.max(a[1],b[1]);i++)
 pixel(a[0],i);
   

};

triangle = (a,b,c)=>{
 line(a,b);
 line(b,c);
 line(c,a);
 let min_x = Math.min(a[0],b[0],c[0]);
 let max_x = Math.max(a[0],b[0],c[0]);
 let min_y = Math.min(a[1],b[1],c[1]);
 let max_y = Math.max(a[1],b[1],c[1]);
  
 let area = (a, b, c) =>
  Math.abs(
    (a[0] * (b[1] - c[1]) +
     b[0] * (c[1] - a[1]) +
     c[0] * (a[1] - b[1])) / 2
  );

 let in_triangle = (p)=>((area(a,b,p)+area(a,c,p)+area(b,c,p)-0.1)<area(a,b,c));

 for(let i = min_x; i < max_x; i++)
  for(let j = min_y; j < max_y; j++)
   if(in_triangle([i,j]))
    pixel(i,j)
}

shearX = (p, f) => [p[0] + f * p[1], p[1]];
shearY = (p, f) => [p[0], p[1] + f * p[0]];


camera = (x,y,lx,ly)=>{
  let dx = lx-x;
  let dy = ly-y;
  let len = Math.sqrt(dx*dx+dy*dy);
  let u = [dx/len*15,dy/len*15];
  let a = [x,y];
  let b = [x+u[0],y+u[1]];
  
  let p0 = [u[1]/2,-u[0]/2];
  let p1 = [-p0[0],-p0[1]];

   c = [p0[0]+b[0],p0[1]+b[1]];
   d = [p1[0]+b[0],p1[1]+b[1]];

  
  line(a,b);
  line(c,d);
}


 cross_point = (a, b, c, d) => {

    let k = (a[1] - b[1]) / (a[0] - b[0]);
    let b0 = a[1] - k * a[0];

    let m = (c[1] - d[1]) / (c[0] - d[0]);
    let r = c[1] - m * c[0];

    if (k === m) 
      return null; 
 
   let cx = (r - b0) / (k - m);
   let cy = k * cx + b0;
  
  let minX = Math.min(c[0], d[0]), maxX = Math.max(c[0], d[0]);
  let minY = Math.min(c[1], d[1]), maxY = Math.max(c[1], d[1]);

  if (cx < minX || cx > maxX || cy < minY || cy > maxY) 
    return null; 
  

  return [cx, cy];
};



make_grid();
X = 0; Y = 0;
render = (x,y)=>{
  ctx_top.fillStyle = 'green';
  pixel(x,y);
  ctx_top.fillStyle = 'blue';
  line([X,Y],[x,y]);
  ctx_top.fillStyle = 'green';
  pixel(x,y);
  let point = cross_point([X,Y],[x,y],c,d);
 if(point)
  pixel(point[0],point[1])
  ctx_top.fillStyle = 'red';
}


canvas_top.onmousemove = (e) => {
  ctx_top.clearRect(0, 0, 300, 300);
  ctx_side.clearRect(0, 0, 300, 300);
  make_grid();
  X = e.offsetX/A;
  Y = e.offsetY/A;
  camera(X,Y,25,25);
  pixel(25,25);
  render(25,30);
  

};