render = (x,y,z,cx,cy,cz,lx,ly,lz)=>{
  let rx = render_2d(x,z,cx,cz,lx,lz);
  let ry = render_2d(z,y,cz,cy,lz,ly);

 return [rx,ry]
}

render_2d = (x,y,cx,cy,lx,ly)=>{
  
}

rotate_point = (x, y, ox, oy, angle) => {
  let cosA = Math.cos(angle);
  let sinA = Math.sin(angle);

  let dx = x - ox;
  let dy = y - oy;

  let rx = dx * cosA - dy * sinA;
  let ry = dx * sinA + dy * cosA;

  return [rx + ox, ry + oy];
};

