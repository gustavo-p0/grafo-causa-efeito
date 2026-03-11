import { useState } from "react";

// ── palette ──────────────────────────────────────────────────────────────────
const P = {
  bg: "#0a0f1e",
  surface: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.07)",
  blue: "#3b82f6",
  blueD: "#1d4ed8",
  purple: "#a855f7",
  green: "#22c55e",
  red: "#ef4444",
  yellow: "#f59e0b",
  text: "#e2e8f0",
  muted: "#64748b",
  subtle: "#94a3b8",
};

// ── tiny components ───────────────────────────────────────────────────────────
const Tag = ({ color, children }) => (
  <span
    style={{
      background: color + "22",
      border: `1px solid ${color}55`,
      color,
      borderRadius: 6,
      padding: "2px 10px",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1,
      fontFamily: "monospace",
    }}
  >
    {children}
  </span>
);

const Card = ({ children, style }) => (
  <div
    style={{
      background: P.surface,
      border: `1px solid ${P.border}`,
      borderRadius: 14,
      padding: "20px 24px",
      ...style,
    }}
  >
    {children}
  </div>
);

const H2 = ({ children }) => (
  <h2
    style={{
      fontSize: 18,
      fontWeight: 700,
      color: P.text,
      margin: "0 0 4px",
    }}
  >
    {children}
  </h2>
);

const Sub = ({ children }) => (
  <p
    style={{
      color: P.muted,
      fontSize: 13,
      margin: "0 0 16px",
    }}
  >
    {children}
  </p>
);

const Pill = ({ color, children }) => (
  <span
    style={{
      background: color + "18",
      border: `1px solid ${color}44`,
      color,
      borderRadius: 20,
      padding: "3px 12px",
      fontSize: 12,
      fontWeight: 600,
    }}
  >
    {children}
  </span>
);

// ── SECTION 1 – Conceito ──────────────────────────────────────────────────────
function ConceptSection() {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <Tag color={P.blue}>CONCEITO</Tag>
        <H2>O que é o Grafo de Causa e Efeito?</H2>
      </div>
      <p
        style={{
          color: P.subtle,
          lineHeight: 1.8,
          fontSize: 14,
          margin: 0,
        }}
      >
        O{" "}
        <strong style={{ color: P.text }}>Grafo de Causa e Efeito</strong> é
        uma técnica de teste funcional (caixa-preta) que modela as relações
        lógicas entre as <em style={{ color: P.blue }}>entradas</em> do sistema
        (causas) e as <em style={{ color: P.green }}>saídas/ações</em>{" "}
        observáveis (efeitos). A partir do grafo, deriva-se uma{" "}
        <strong style={{ color: P.yellow }}>Tabela de Decisão</strong> que
        lista todas as combinações relevantes de entradas a serem testadas.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 12,
          marginTop: 18,
        }}
      >
        {[
          {
            icon: "⚡",
            color: P.blue,
            title: "Causas",
            desc: "Condições de entrada — qualquer estímulo que provoque reação no sistema (valor lógico V/F).",
          },
          {
            icon: "💥",
            color: P.green,
            title: "Efeitos",
            desc: "Ações ou saídas observáveis — respostas do sistema às combinações de causas.",
          },
          {
            icon: "🔗",
            color: P.yellow,
            title: "Operadores",
            desc: "AND, OR, NOT ligam causas a efeitos, expressando as regras de negócio.",
          },
        ].map((c) => (
          <div
            key={c.title}
            style={{
              background: c.color + "0f",
              border: `1px solid ${c.color}33`,
              borderRadius: 10,
              padding: "14px 16px",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
            <div
              style={{
                color: c.color,
                fontWeight: 700,
                fontSize: 13,
                marginBottom: 4,
              }}
            >
              {c.title}
            </div>
            <div
              style={{
                color: P.muted,
                fontSize: 12,
                lineHeight: 1.6,
              }}
            >
              {c.desc}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── SECTION 2 – Operadores ────────────────────────────────────────────────────
function OperatorsSection() {
  const ops = [
    {
      op: "AND",
      color: P.green,
      symbol: "∧",
      desc: "O efeito só ocorre se TODAS as causas forem verdadeiras.",
      ex: "Acesso permitido = C1(usuário ok) AND C2(senha ok) AND C3(botão)",
      table: [
        ["V", "V", "V"],
        ["V", "F", "F"],
        ["F", "V", "F"],
        ["F", "F", "F"],
      ],
      heads: ["C1", "C2", "Saída"],
    },
    {
      op: "OR",
      color: P.blue,
      symbol: "∨",
      desc: "O efeito ocorre se PELO MENOS UMA causa for verdadeira.",
      ex: "Mensagem de erro = NOT C1 OR NOT C2",
      table: [
        ["V", "V", "V"],
        ["V", "F", "V"],
        ["F", "V", "V"],
        ["F", "F", "F"],
      ],
      heads: ["C1", "C2", "Saída"],
    },
    {
      op: "NOT",
      color: P.red,
      symbol: "¬",
      desc: "Inverte o valor da causa — verdadeiro vira falso e vice-versa.",
      ex: "Erro = NOT(usuário_correto)",
      table: [
        ["V", "F"],
        ["F", "V"],
      ],
      heads: ["Entrada", "Saída"],
    },
  ];
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4,
        }}
      >
        <Tag color={P.yellow}>OPERADORES</Tag>
        <H2>Operadores Lógicos do Grafo</H2>
      </div>
      <Sub>
        Cada aresta do grafo carrega um operador que define como a causa
        influencia o efeito.
      </Sub>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
        }}
      >
        {ops.map((o) => (
          <div
            key={o.op}
            style={{
              background: o.color + "0d",
              border: `1px solid ${o.color}33`,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  background: o.color,
                  color: "#fff",
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 16,
                }}
              >
                {o.symbol}
              </span>
              <span
                style={{
                  color: o.color,
                  fontWeight: 800,
                  fontSize: 15,
                }}
              >
                {o.op}
              </span>
            </div>
            <p
              style={{
                color: P.subtle,
                fontSize: 12,
                lineHeight: 1.6,
                margin: "0 0 10px",
              }}
            >
              {o.desc}
            </p>
            <p
              style={{
                color: P.muted,
                fontSize: 11,
                fontStyle: "italic",
                margin: "0 0 10px",
                lineHeight: 1.5,
              }}
            >
              {o.ex}
            </p>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 11,
              }}
            >
              <thead>
                <tr>
                  {o.heads.map((h) => (
                    <th
                      key={h}
                      style={{
                        color: o.color,
                        textAlign: "center",
                        padding: "3px 4px",
                        borderBottom: `1px solid ${o.color}33`,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {o.table.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      background:
                        i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                    }}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          textAlign: "center",
                          padding: "3px 4px",
                          color:
                            cell === "V"
                              ? P.green
                              : cell === "F"
                              ? P.red
                              : P.text,
                          fontWeight: 700,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── SECTION 3 – Passos ────────────────────────────────────────────────────────
function StepsSection() {
  const steps = [
    {
      n: 1,
      color: P.blue,
      title: "Identificar Causas e Efeitos",
      desc: "Liste todas as condições de entrada (causas) e as saídas/ações esperadas (efeitos). Atribua um identificador (C1, C2… / E1, E2…) a cada um.",
    },
    {
      n: 2,
      color: P.purple,
      title: "Desenhar o Grafo",
      desc: "Conecte causas aos efeitos com os operadores lógicos adequados (AND, OR, NOT). O grafo representa visualmente as regras de negócio.",
    },
    {
      n: 3,
      color: P.yellow,
      title: "Adicionar Restrições",
      desc: "Anote restrições sintáticas: E (exclusivo), I (inclusivo), O (one-only), R (requires). Eliminam combinações impossíveis.",
    },
    {
      n: 4,
      color: P.green,
      title: "Converter em Tabela de Decisão",
      desc: "Para cada efeito = V, rastreie o grafo para trás e enumere todas as combinações de causas que o ativam. 2ⁿ combinações para n causas.",
    },
    {
      n: 5,
      color: P.red,
      title: "Simplificar",
      desc: "Elimine combinações inconsistentes ou impossíveis (ex.: duas causas mutuamente exclusivas com valor V). Reduza o número de colunas.",
    },
    {
      n: 6,
      color: P.blue,
      title: "Gerar Casos de Teste",
      desc: "Cada coluna válida da tabela vira um caso de teste, com os valores de entrada e a saída esperada correspondente.",
    },
  ];
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4,
        }}
      >
        <Tag color={P.purple}>METODOLOGIA</Tag>
        <H2>Passos para Construir o Grafo</H2>
      </div>
      <Sub>
        Siga esta sequência para derivar casos de teste de forma sistemática.
      </Sub>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {steps.map((s) => (
          <div
            key={s.n}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              background: s.color + "08",
              border: `1px solid ${s.color}22`,
              borderRadius: 10,
              padding: "12px 16px",
            }}
          >
            <div
              style={{
                minWidth: 32,
                height: 32,
                borderRadius: "50%",
                background: s.color,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 14,
              }}
            >
              {s.n}
            </div>
            <div>
              <div
                style={{
                  color: s.color,
                  fontWeight: 700,
                  fontSize: 13,
                  marginBottom: 3,
                }}
              >
                {s.title}
              </div>
              <div
                style={{
                  color: P.muted,
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── SECTION 4 – Exemplo interativo (Login) ────────────────────────────────────
const loginCauses = [
  { id: "C1", label: "Usuário correto", x: 50, y: 90 },
  { id: "C2", label: "Senha correta", x: 50, y: 210 },
  { id: "C3", label: "Botão 'Entrar'", x: 50, y: 330 },
];
const loginEffects = [
  {
    id: "E1",
    label: "Acesso permitido",
    x: 530,
    y: 140,
    type: "success",
  },
  {
    id: "E2",
    label: "Mensagem de erro",
    x: 530,
    y: 290,
    type: "error",
  },
];
const loginEdges = [
  { from: "C1", to: "E1", op: "AND", dashed: false },
  { from: "C2", to: "E1", op: "AND", dashed: false },
  { from: "C3", to: "E1", op: "AND", dashed: false },
  { from: "C1", to: "E2", op: "NOT", dashed: true },
  { from: "C2", to: "E2", op: "NOT", dashed: true },
  { from: "C3", to: "E2", op: "AND", dashed: false },
];
const loginCases = [
  {
    id: 1,
    vals: { C1: 1, C2: 1, C3: 1 },
    out: { E1: 1, E2: 0 },
    label: "Acesso OK",
    color: P.green,
  },
  {
    id: 2,
    vals: { C1: 0, C2: 1, C3: 1 },
    out: { E1: 0, E2: 1 },
    label: "Usuário errado",
    color: P.red,
  },
  {
    id: 3,
    vals: { C1: 1, C2: 0, C3: 1 },
    out: { E1: 0, E2: 1 },
    label: "Senha errada",
    color: P.red,
  },
  {
    id: 4,
    vals: { C1: 0, C2: 0, C3: 1 },
    out: { E1: 0, E2: 1 },
    label: "Ambos errados",
    color: P.red,
  },
  {
    id: 5,
    vals: { C1: 1, C2: 1, C3: 0 },
    out: { E1: 0, E2: 0 },
    label: "Sem clicar",
    color: P.muted,
  },
];

function nc(node) {
  return { x: node.x + 60, y: node.y + 28 };
}

function GraphSVG({ activeTC }) {
  const tc = activeTC ? loginCases.find((c) => c.id === activeTC) : null;
  const activeNodes = tc
    ? new Set([
        ...Object.entries(tc.vals)
          .filter(([, v]) => v)
          .map(([k]) => k),
        ...Object.entries(tc.out)
          .filter(([, v]) => v)
          .map(([k]) => k),
      ])
    : new Set();

  function edgeActive(e) {
    if (!tc) return false;
    if (e.to === "E1" && tc.out.E1) return true;
    if (e.to === "E2" && tc.out.E2 && e.from === "C3" && !e.dashed)
      return tc.vals.C3 === 1;
    if (e.to === "E2" && tc.out.E2 && e.dashed) return tc.vals[e.from] === 0;
    return false;
  }

  const allNodes = [...loginCauses, ...loginEffects];
  const nodeColor = (id) => {
    if (id.startsWith("C")) return P.blue;
    return loginEffects.find((e) => e.id === id)?.type === "success"
      ? P.green
      : P.red;
  };

  return (
    <svg width="100%" viewBox="0 0 680 440" style={{ display: "block" }}>
      {/* Dividers */}
      <text
        x="110"
        y="22"
        fill={P.muted}
        fontSize="11"
        textAnchor="middle"
        fontFamily="monospace"
      >
        CAUSAS
      </text>
      <text
        x="590"
        y="22"
        fill={P.muted}
        fontSize="11"
        textAnchor="middle"
        fontFamily="monospace"
      >
        EFEITOS
      </text>
      <line
        x1="210"
        y1="10"
        x2="210"
        y2="420"
        stroke="#1e293b"
        strokeWidth="1"
        strokeDasharray="4,4"
      />

      {/* Edges */}
      {loginEdges.map((e, i) => {
        const src = allNodes.find((n) => n.id === e.from);
        const dst = allNodes.find((n) => n.id === e.to);
        const s = nc(src),
          d = nc(dst);
        const mx = (s.x + d.x) / 2 + (e.dashed ? -35 : 35);
        const my = (s.y + d.y) / 2 - 10;
        const dx = d.x - mx,
          dy = d.y - my,
          len = Math.sqrt(dx * dx + dy * dy);
        const ex = d.x - (dx / len) * 38,
          ey = d.y - (dy / len) * 22;
        const active = edgeActive(e);
        const col = active ? (e.dashed ? P.red : P.green) : "#1e3a5f";
        const id = `a${i}`;
        return (
          <g key={i}>
            <defs>
              <marker
                id={id}
                markerWidth="7"
                markerHeight="7"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L0,6 L7,3 z" fill={col} />
              </marker>
            </defs>
            <path
              d={`M${s.x},${s.y} Q${mx},${my} ${ex},${ey}`}
              fill="none"
              stroke={col}
              strokeWidth={active ? 2.5 : 1.5}
              strokeDasharray={e.dashed ? "6,3" : "none"}
              markerEnd={`url(#${id})`}
              style={{
                transition: "stroke 0.3s, stroke-width 0.3s",
              }}
            />
            <text
              x={(s.x + ex) / 2 + (e.dashed ? -14 : 14)}
              y={(s.y + ey) / 2 - 6}
              fill={active ? P.yellow : "#334155"}
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
              textAnchor="middle"
              style={{ transition: "fill 0.3s" }}
            >
              {e.op}
            </text>
          </g>
        );
      })}

      {/* Nodes */}
      {allNodes.map((node) => {
        const c = nodeColor(node.id);
        const isActive = activeNodes.has(node.id);
        return (
          <g
            key={node.id}
            transform={`translate(${node.x},${node.y})`}
            style={{
              filter: isActive ? `drop-shadow(0 0 8px ${c})` : "none",
              transition: "filter 0.3s",
            }}
          >
            <rect
              width="120"
              height="56"
              rx="10"
              fill={c + "18"}
              stroke={c}
              strokeWidth={isActive ? 2.5 : 1.5}
              style={{
                transition: "stroke-width 0.3s",
              }}
            />
            <text
              x="60"
              y="18"
              textAnchor="middle"
              fill={c}
              fontSize="12"
              fontWeight="800"
              fontFamily="monospace"
            >
              {node.id}
            </text>
            {node.label.split(" ").map((w, i, arr) => (
              <text
                key={i}
                x="60"
                y={30 + i * 13}
                textAnchor="middle"
                fill={c + "cc"}
                fontSize="10.5"
                fontFamily="sans-serif"
              >
                {arr.length === 1 ? w : i === 0 ? w : w}
              </text>
            ))}
          </g>
        );
      })}

      {/* Operator legend */}
      <g transform="translate(220,400)">
        <line x1="0" y1="8" x2="22" y2="8" stroke={P.green} strokeWidth="2" />
        <text
          x="26"
          y="12"
          fill={P.muted}
          fontSize="10"
          fontFamily="monospace"
        >
          AND (sólido)
        </text>
        <line
          x1="100"
          y1="8"
          x2="122"
          y2="8"
          stroke={P.red}
          strokeWidth="2"
          strokeDasharray="5,3"
        />
        <text
          x="126"
          y="12"
          fill={P.muted}
          fontSize="10"
          fontFamily="monospace"
        >
          NOT (tracejado)
        </text>
      </g>
    </svg>
  );
}

function ExampleSection() {
  const [activeTC, setActiveTC] = useState(null);
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4,
        }}
      >
        <Tag color={P.green}>EXEMPLO RESOLVIDO</Tag>
        <H2>Sistema de Login</H2>
      </div>
      <Sub>
        3 causas · 2 efeitos · 5 casos de teste. Clique num caso para iluminar o
        caminho.
      </Sub>

      {/* Causas & Efeitos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            background: P.blue + "0a",
            border: `1px solid ${P.blue}22`,
            borderRadius: 10,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              color: P.blue,
              fontWeight: 700,
              fontSize: 12,
              marginBottom: 8,
            }}
          >
            ⚡ CAUSAS (Entradas)
          </div>
          {[
            ["C1", "Usuário fornecido é correto"],
            ["C2", "Senha fornecida é correta"],
            ["C3", "Botão 'Entrar' pressionado"],
          ].map(([id, desc]) => (
            <div
              key={id}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  color: P.blue,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  minWidth: 24,
                }}
              >
                {id}
              </span>
              <span style={{ color: P.muted, fontSize: 13 }}>{desc}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: P.green + "0a",
            border: `1px solid ${P.green}22`,
            borderRadius: 10,
            padding: "12px 16px",
          }}
        >
          <div
            style={{
              color: P.green,
              fontWeight: 700,
              fontSize: 12,
              marginBottom: 8,
            }}
          >
            💥 EFEITOS (Saídas)
          </div>
          {[
            ["E1", "Acesso permitido ao site", "success"],
            ["E2", "Mensagem de erro exibida", "error"],
          ].map(([id, desc, t]) => (
            <div
              key={id}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  color: t === "success" ? P.green : P.red,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  minWidth: 24,
                }}
              >
                {id}
              </span>
              <span style={{ color: P.muted, fontSize: 13 }}>{desc}</span>
            </div>
          ))}
          <div
            style={{
              marginTop: 12,
              color: P.muted,
              fontSize: 12,
              fontStyle: "italic",
            }}
          >
            Regra: E1 = C1 AND C2 AND C3
            <br />
            Regra: E2 = (NOT C1 OR NOT C2) AND C3
          </div>
        </div>
      </div>

      {/* Graph */}
      <div
        style={{
          background: "rgba(0,0,0,0.2)",
          borderRadius: 12,
          padding: "8px 4px",
          marginBottom: 16,
        }}
      >
        <GraphSVG activeTC={activeTC} />
      </div>

      {/* Test cases */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
          }}
        >
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.04)" }}>
              {[
                "Caso",
                "C1 Usuário",
                "C2 Senha",
                "C3 Botão",
                "E1 Acesso",
                "E2 Erro",
                "Resultado",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "9px 12px",
                    color: P.muted,
                    fontWeight: 600,
                    textAlign: "center",
                    borderBottom: `1px solid ${P.border}`,
                    fontSize: 11,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loginCases.map((tc) => {
              const on = activeTC === tc.id;
              return (
                <tr
                  key={tc.id}
                  onClick={() => setActiveTC(on ? null : tc.id)}
                  style={{
                    background: on ? tc.color + "18" : "transparent",
                    cursor: "pointer",
                    borderBottom: `1px solid ${P.border}`,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!on)
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (!on)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <td
                    style={{
                      padding: "9px 12px",
                      textAlign: "center",
                      color: P.blue,
                      fontWeight: 700,
                      fontFamily: "monospace",
                    }}
                  >
                    TC{tc.id}
                  </td>
                  {["C1", "C2", "C3"].map((k) => (
                    <td
                      key={k}
                      style={{
                        padding: "9px 12px",
                        textAlign: "center",
                        fontSize: 15,
                        color: tc.vals[k] ? P.green : P.red,
                        fontWeight: 700,
                      }}
                    >
                      {tc.vals[k] ? "V" : "F"}
                    </td>
                  ))}
                  {["E1", "E2"].map((k) => (
                    <td
                      key={k}
                      style={{
                        padding: "9px 12px",
                        textAlign: "center",
                        fontSize: 15,
                        color: tc.out[k] ? P.green : P.red,
                        fontWeight: 700,
                      }}
                    >
                      {tc.out[k] ? "V" : "F"}
                    </td>
                  ))}
                  <td
                    style={{
                      padding: "9px 12px",
                      textAlign: "center",
                    }}
                  >
                    <Pill color={tc.color}>{tc.label}</Pill>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ── SECTION 5 – Tabela de Decisão ────────────────────────────────────────────
function DecisionTableSection() {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4,
        }}
      >
        <Tag color={P.yellow}>TABELA DE DECISÃO</Tag>
        <H2>Como construir a Tabela</H2>
      </div>
      <Sub>
        A tabela é derivada do grafo e lista explicitamente cada combinação de
        causas e seus efeitos.
      </Sub>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <div>
          <p
            style={{
              color: P.subtle,
              fontSize: 13,
              lineHeight: 1.8,
            }}
          >
            Com <strong style={{ color: P.text }}>n causas</strong>, a tabela
            terá até <strong style={{ color: P.yellow }}>2ⁿ combinações</strong>
            . Cada coluna representa uma regra de decisão que será convertida em
            caso de teste.
          </p>
          <div
            style={{
              background: "rgba(245,158,11,0.08)",
              border: `1px solid ${P.yellow}33`,
              borderRadius: 10,
              padding: "12px 14px",
              marginTop: 8,
            }}
          >
            <div
              style={{
                color: P.yellow,
                fontWeight: 700,
                fontSize: 12,
                marginBottom: 6,
              }}
            >
              📐 Fórmula
            </div>
            <div
              style={{
                color: P.text,
                fontSize: 14,
                fontFamily: "monospace",
                textAlign: "center",
              }}
            >
              Total de combinações = 2ⁿ
            </div>
            <div
              style={{
                color: P.muted,
                fontSize: 12,
                marginTop: 8,
              }}
            >
              3 causas → 2³ = 8 combinações
              <br />
              5 causas → 2⁵ = 32 combinações
              <br />
              8 causas → 2⁸ = 256 combinações
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              color: P.subtle,
              fontSize: 12,
              marginBottom: 8,
            }}
          >
            Tabela do exemplo (Login) — 2³ = 8, simplificada para 5:
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 12,
            }}
          >
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                {["", "TC1", "TC2", "TC3", "TC4", "TC5"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "6px 8px",
                      color: P.muted,
                      textAlign: "center",
                      borderBottom: `1px solid ${P.border}`,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["C1", 1, 0, 1, 0, 1],
                ["C2", 1, 1, 0, 0, 1],
                ["C3", 1, 1, 1, 1, 0],
                ["──", "──", "──", "──", "──", "──"],
                ["E1", 1, 0, 0, 0, 0],
                ["E2", 0, 1, 1, 1, 0],
              ].map((row, i) => {
                if (row[0] === "──")
                  return (
                    <tr key={i}>
                      <td
                        colSpan={6}
                        style={{
                          borderBottom: `1px solid ${P.border}`,
                          padding: 0,
                        }}
                      />
                    </tr>
                  );
                const isCause = row[0].startsWith("C");
                return (
                  <tr
                    key={i}
                    style={{
                      background:
                        i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                    }}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          padding: "6px 8px",
                          textAlign: "center",
                          color:
                            j === 0
                              ? isCause
                                ? P.blue
                                : P.green
                              : cell === 1
                              ? isCause
                                ? P.subtle
                                : P.green
                              : cell === 0
                              ? isCause
                                ? P.border
                                : P.red
                              : P.border,
                          fontWeight: j === 0 ? 700 : 600,
                          fontFamily: j === 0 ? "monospace" : "inherit",
                        }}
                      >
                        {j === 0 ? cell : cell === 1 ? "V" : "F"}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

// ── SECTION 6 – Simplificação ─────────────────────────────────────────────────
function SimplificationSection() {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4,
        }}
      >
        <Tag color={P.red}>SIMPLIFICAÇÃO</Tag>
        <H2>Quando e Como Simplificar</H2>
      </div>
      <Sub>
        Nem todas as 2ⁿ combinações são válidas. Regras de restrição eliminam
        casos impossíveis.
      </Sub>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 12,
        }}
      >
        {[
          {
            sym: "E",
            color: P.red,
            name: "Exclusivo (E)",
            desc: "No máximo UMA das causas pode ser V. Ex.: C1='A' e C2='B' — o 1º char não pode ser ambos ao mesmo tempo.",
          },
          {
            sym: "I",
            color: P.blue,
            name: "Inclusivo (I)",
            desc: "PELO MENOS UMA causa deve ser V. Elimina o caso em que todas são F simultaneamente.",
          },
          {
            sym: "O",
            color: P.yellow,
            name: "One-Only (O)",
            desc: "EXATAMENTE UMA causa é V. Mais restritivo que E — combina exclusividade com obrigatoriedade.",
          },
          {
            sym: "R",
            color: P.green,
            name: "Requer (R)",
            desc: "Se C1=V então C2 DEVE ser V. C1 requer C2. Elimina combinações onde C1=V e C2=F.",
          },
        ].map((r) => (
          <div
            key={r.sym}
            style={{
              background: r.color + "0a",
              border: `1px solid ${r.color}33`,
              borderRadius: 10,
              padding: "12px 14px",
              display: "flex",
              gap: 12,
            }}
          >
            <span
              style={{
                background: r.color,
                color: "#fff",
                borderRadius: 8,
                minWidth: 30,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 14,
                fontFamily: "monospace",
              }}
            >
              {r.sym}
            </span>
            <div>
              <div
                style={{
                  color: r.color,
                  fontWeight: 700,
                  fontSize: 13,
                  marginBottom: 3,
                }}
              >
                {r.name}
              </div>
              <div
                style={{
                  color: P.muted,
                  fontSize: 12,
                  lineHeight: 1.6,
                }}
              >
                {r.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 14,
          background: "rgba(239,68,68,0.07)",
          border: `1px solid ${P.red}33`,
          borderRadius: 10,
          padding: "12px 16px",
        }}
      >
        <div
          style={{
            color: P.red,
            fontWeight: 700,
            fontSize: 12,
            marginBottom: 4,
          }}
        >
          ⚠️ No exemplo do Login
        </div>
        <p
          style={{
            color: P.muted,
            fontSize: 13,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Aplicamos restrição{" "}
          <strong style={{ color: P.red }}>E (Exclusivo)</strong> implícita: sem
          o botão pressionado (C3=F), as combinações de C1 e C2 não produzem
          nenhum efeito observável — 3 das 8 combinações são eliminadas,
          restando <strong style={{ color: P.text }}>5 casos de teste</strong>{" "}
          significativos.
        </p>
      </div>
    </Card>
  );
}

// ── SECTION 7 – Vantagens e Limitações ───────────────────────────────────────
function ProConSection() {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4,
        }}
      >
        <Tag color={P.subtle}>AVALIAÇÃO</Tag>
        <H2>Vantagens e Limitações</H2>
      </div>
      <Sub>
        Como qualquer técnica, o Grafo de Causa e Efeito tem pontos fortes e
        fracos.
      </Sub>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
        }}
      >
        <div
          style={{
            background: P.green + "0a",
            border: `1px solid ${P.green}22`,
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              color: P.green,
              fontWeight: 700,
              fontSize: 13,
              marginBottom: 10,
            }}
          >
            ✅ Vantagens
          </div>
          {[
            "Cobre todas as combinações lógicas de entradas.",
            "Detecta inconsistências e ambiguidades na especificação.",
            "Derivação sistemática — menos chance de esquecer casos.",
            "Tabela de decisão é autoexplicativa para revisão.",
            "Combina bem com Particionamento de Equivalência.",
          ].map((v, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 7,
              }}
            >
              <span style={{ color: P.green, marginTop: 1 }}>•</span>
              <span
                style={{
                  color: P.muted,
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: P.red + "0a",
            border: `1px solid ${P.red}22`,
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              color: P.red,
              fontWeight: 700,
              fontSize: 13,
              marginBottom: 10,
            }}
          >
            ❌ Limitações
          </div>
          {[
            "Explosão combinatorial: 2ⁿ cresce muito rápido.",
            "Difícil de usar com mais de 10-15 causas.",
            "Não cobre aspectos não-funcionais (performance, segurança).",
            "Requer especificação precisa das regras de negócio.",
            "Construção manual pode ser trabalhosa e propensa a erros.",
          ].map((v, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 7,
              }}
            >
              <span style={{ color: P.red, marginTop: 1 }}>•</span>
              <span
                style={{
                  color: P.muted,
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [section, setSection] = useState("all");
  const sections = [
    { id: "all", label: "Tudo" },
    { id: "concept", label: "Conceito" },
    { id: "ops", label: "Operadores" },
    { id: "steps", label: "Passos" },
    { id: "example", label: "Exemplo" },
    { id: "table", label: "Tabela" },
    { id: "simp", label: "Simplificação" },
    { id: "procon", label: "Avaliação" },
  ];

  const show = (id) => section === "all" || section === id;

  return (
    <div
      style={{
        background: P.bg,
        minHeight: "100vh",
        padding: "24px 16px",
        fontFamily: "'Segoe UI',sans-serif",
        color: P.text,
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: 5,
              color: P.blue,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            PUC Minas · Teste de Software · Material de Estudo
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: P.text,
              margin: 0,
            }}
          >
            Grafo de Causa e Efeito
          </h1>
          <p
            style={{
              color: P.muted,
              fontSize: 14,
              marginTop: 6,
            }}
          >
            Guia completo — do conceito à geração de casos de teste
          </p>
        </div>

        {/* Nav */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              style={{
                background: section === s.id ? P.blue : "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  section === s.id ? P.blue : P.border
                }`,
                color: section === s.id ? "#fff" : P.muted,
                borderRadius: 20,
                padding: "6px 16px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Sections */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {show("concept") && <ConceptSection />}
          {show("ops") && <OperatorsSection />}
          {show("steps") && <StepsSection />}
          {show("example") && <ExampleSection />}
          {show("table") && <DecisionTableSection />}
          {show("simp") && <SimplificationSection />}
          {show("procon") && <ProConSection />}
        </div>

        <div
          style={{
            textAlign: "center",
            color: P.border,
            fontSize: 11,
            marginTop: 24,
          }}
        >
          Prof. Cleiton Tavares · PUC Minas · Engenharia de Software
        </div>
      </div>
    </div>
  );
}

