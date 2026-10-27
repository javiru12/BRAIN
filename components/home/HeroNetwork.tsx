/** Fondo decorativo del hero: red de nodos conectados (relaciones, sistemas, personas). */
export default function HeroNetwork() {
  const nodes = [
    [120, 80],
    [260, 40],
    [420, 110],
    [560, 60],
    [700, 140],
    [180, 240],
    [340, 290],
    [500, 240],
    [660, 300],
    [240, 420],
    [420, 460],
    [600, 420],
    [760, 480],
  ]
  const links: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [1, 6],
    [2, 7],
    [4, 8],
    [5, 6],
    [6, 7],
    [7, 8],
    [5, 9],
    [6, 10],
    [7, 11],
    [8, 12],
    [9, 10],
    [10, 11],
    [11, 12],
  ]
  return (
    <div className="hero__bg" aria-hidden="true">
      <svg viewBox="0 0 860 540" preserveAspectRatio="xMidYMid slice">
        {links.map(([a, b], i) => (
          <line key={i} className="net-line" x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} style={{ animationDelay: `${-i * 1.3}s` }} />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} className={`net-node${i % 3 === 0 ? ' net-node--pulse' : ''}`} cx={x} cy={y} r={i % 3 === 0 ? 5 : 3.5} style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
      </svg>
    </div>
  )
}
