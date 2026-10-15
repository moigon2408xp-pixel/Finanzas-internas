/**
 * MOI & VAL — SISTEMA INTEGRAL DE FINANZAS & HOGAR 2026
 * Ultra Premium Edition: Interactivo, Explicativo y Ergonómico.
 */

document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY_DEBTS = 'MOI_DEBTS_DATA_2026';
  const STORAGE_KEY_PRODUCTS = 'VAL_MOI_PRODUCTS_2026';
  const STORAGE_KEY_SETTINGS = 'MOI_VAL_SETTINGS_2026';
  const STORAGE_KEY_ESPACIO = 'MOI_ESPACIO_DATA_2026';
  const STORAGE_KEY_MERCADO = 'MOI_MERCADO_WEEKLY_2026';

  let settings = {
    salaryMoi: 600,
    salaryVal: 200,
    tasaBcv: 870,
    tasaBinance: 1015,
    pasajesSemana: 15,
    comidaSemana: 25,
    otrosSemana: 10
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (saved) settings = { ...settings, ...JSON.parse(saved) };
  } catch (e) {}

  // 1. DEUDAS CON FECHAS ESPECÍFICAS DE PAGO
  const defaultDebts = [
    { id: 'd1', concepto: 'Universidad (Trimestre 1/3)', monto: 200, tasa: 'BCV', cuotaMes: 200, mes: 'Octubre 2026', fechaPago: '15 de Octubre 2026', estado: 'Pendiente' },
    { id: 'd7', concepto: 'Ubii Pagos', monto: 50, tasa: 'BCV', cuotaMes: 50, mes: 'Octubre 2026', fechaPago: '30 de Octubre 2026', estado: 'Pendiente' },
    { id: 'd4_1', concepto: 'Préstamo 6 Meses (Cuota 1/6)', monto: 450, tasa: 'BCV', cuotaMes: 80, mes: 'Octubre 2026', fechaPago: '30 de Octubre 2026', estado: 'Pendiente' },
    { id: 'd2', concepto: 'Universidad (Trimestre 2/3)', monto: 200, tasa: 'BCV', cuotaMes: 200, mes: 'Noviembre 2026', fechaPago: '15 de Noviembre 2026', estado: 'Pendiente' },
    { id: 'd6', concepto: 'Crece', monto: 110, tasa: 'BCV', cuotaMes: 110, mes: 'Noviembre 2026', fechaPago: '15 de Noviembre 2026', estado: 'Pendiente' },
    { id: 'd5', concepto: 'Préstamo Binance (~$190)', monto: 190, tasa: 'Binance', cuotaMes: 190, mes: 'Noviembre 2026', fechaPago: '30 de Noviembre 2026', estado: 'Pendiente' },
    { id: 'd4_2', concepto: 'Préstamo 6 Meses (Cuota 2/6)', monto: 370, tasa: 'BCV', cuotaMes: 80, mes: 'Noviembre 2026', fechaPago: '30 de Noviembre 2026', estado: 'Pendiente' },
    { id: 'd3', concepto: 'Universidad (Trimestre 3/3)', monto: 200, tasa: 'BCV', cuotaMes: 200, mes: 'Diciembre 2026', fechaPago: '15 de Diciembre 2026', estado: 'Pendiente' },
    { id: 'd4_3', concepto: 'Préstamo 6 Meses (Cuota 3/6)', monto: 290, tasa: 'BCV', cuotaMes: 80, mes: 'Diciembre 2026', fechaPago: '30 de Diciembre 2026', estado: 'Pendiente' },
    { id: 'd4_4', concepto: 'Préstamo 6 Meses (Cuota 4/6)', monto: 210, tasa: 'BCV', cuotaMes: 80, mes: 'Enero 2027', fechaPago: '30 de Enero 2027', estado: 'Pendiente' }
  ];

  // 2. METAS DEL HOGAR CON VAL (75% / 25%)
  const defaultProducts = [
    { id: 'p1', nombre: 'Nevera Familiar', costo: 450, estado: 'Pendiente' },
    { id: 'p2', nombre: 'Cocina a Gas 4 Hornillas', costo: 150, estado: 'Pendiente' },
    { id: 'p3', nombre: 'Lavadora Automática', costo: 300, estado: 'Pendiente' },
    { id: 'p4', nombre: 'Mesa de Comedor + 4 Sillas', costo: 120, estado: 'Pendiente' },
    { id: 'p5', nombre: 'Cama Queen + Colchón Ortopédico', costo: 280, estado: 'Pendiente' }
  ];

  // 3. MEJORAS DE MI ESPACIO & SETUP (100% TRANSPORTABLES)
  const defaultEspacio = [
    { id: 'e1', nombre: 'Silla Ergonómica Transpirable (Soporte Lumbar)', costo: 95, prioridad: 'Alta', fechaObjetivo: 'Noviembre 2026', estado: 'Pendiente' },
    { id: 'e2', nombre: 'Mesa / Escritorio Moderno Minimalista (120 cm)', costo: 80, prioridad: 'Media', fechaObjetivo: 'Diciembre 2026', estado: 'Pendiente' },
    { id: 'e3', nombre: 'Aire Acondicionado Portátil / Split Desmontable', costo: 240, prioridad: 'Alta', fechaObjetivo: 'Enero 2027', estado: 'Pendiente' },
    { id: 'e4', nombre: 'Juego de Sábanas de Algodón + Almohadas Confort', costo: 25, prioridad: 'Alta', fechaObjetivo: 'Octubre 2026', estado: 'Pendiente' },
    { id: 'e5', nombre: 'Renovación Guardarropa Cápsula (Estético / Estilizado)', costo: 120, prioridad: 'Media', fechaObjetivo: 'Diciembre 2026', estado: 'Pendiente' }
  ];

  // 4. MERCADO SEMANAL DIGNO (~$25/SEMANA)
  const defaultMercado = [
    { id: 'm1', cat: 'Proteína', nombre: '1 Cartón de Huevos (30 und)', porcion: '2 huevos diarios en desayuno', costo: 4.50, comprado: false },
    { id: 'm2', cat: 'Proteína', nombre: '1.5 kg Pechuga / Muslo de Pollo', porcion: 'Almuerzos lun a vie', costo: 5.50, comprado: false },
    { id: 'm3', cat: 'Proteína', nombre: '1/2 kg Carne Molida de Res', porcion: 'Comidas de fin de semana', costo: 3.50, comprado: false },
    { id: 'm4', cat: 'Proteína', nombre: '1/2 kg Queso Semiduro / Paisa', porcion: 'Arepas / Cenas', costo: 2.50, comprado: false },
    { id: 'm5', cat: 'Carbohidratos', nombre: '1 kg Arroz Blanco + 1 kg Harina PAN', porcion: 'Base de comidas', costo: 2.50, comprado: false },
    { id: 'm6', cat: 'Carbohidratos', nombre: '1 Paquete de Avena en Hojuelas', porcion: 'Desayunos con avena y cambur', costo: 1.50, comprado: false },
    { id: 'm7', cat: 'Carbohidratos', nombre: '1 Mano de Plátanos (Verde y Maduro)', porcion: 'Patacones / Plátano horneado', costo: 2.00, comprado: false },
    { id: 'm8', cat: 'Micronutrientes', nombre: 'Verduras Básicas (Tomate, Cebolla, Pimentón, Papa)', porcion: 'Guisos y ensaladas', costo: 3.00, comprado: false }
  ];

  function loadData(key, def) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : def;
    } catch (e) {
      return def;
    }
  }

  function saveData(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  let debts = loadData(STORAGE_KEY_DEBTS, defaultDebts);
  let products = loadData(STORAGE_KEY_PRODUCTS, defaultProducts);
  let espacio = loadData(STORAGE_KEY_ESPACIO, defaultEspacio);
  let mercado = loadData(STORAGE_KEY_MERCADO, defaultMercado);

  let currentDebtFilter = 'all';

  // Inicializar inputs
  const elSalaryMoi = document.getElementById('inpSalaryMoi');
  if (elSalaryMoi) elSalaryMoi.value = settings.salaryMoi;
  const elSalaryVal = document.getElementById('inpSalaryVal');
  if (elSalaryVal) elSalaryVal.value = settings.salaryVal;
  const elTasaBcv = document.getElementById('tasaBcv');
  if (elTasaBcv) elTasaBcv.value = settings.tasaBcv;
  const elTasaBinance = document.getElementById('tasaBinance');
  if (elTasaBinance) elTasaBinance.value = settings.tasaBinance;
  const elPasajes = document.getElementById('inpPasajesSemana');
  if (elPasajes) elPasajes.value = settings.pasajesSemana;
  const elComida = document.getElementById('inpComidaSemana');
  if (elComida) elComida.value = settings.comidaSemana;
  const elOtros = document.getElementById('inpOtrosSemana');
  if (elOtros) elOtros.value = settings.otrosSemana;

  // NAVEGACIÓN DE PESTAÑAS
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // FILTROS DE DEUDAS POR MES
  document.querySelectorAll('.filter-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDebtFilter = btn.dataset.filter;
      renderDebtsTable();
    });
  });

  // FORMATOS MONETARIOS
  const fmtUsd = n => `$${Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const fmtBs = n => `${Number(n || 0).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs`;

  // ACTUALIZACIÓN GLOBAL
  function updateAll() {
    settings.salaryMoi = Number(document.getElementById('inpSalaryMoi').value) || 0;
    settings.salaryVal = Number(document.getElementById('inpSalaryVal').value) || 0;
    settings.tasaBcv = Number(document.getElementById('tasaBcv').value) || 870;
    settings.tasaBinance = Number(document.getElementById('tasaBinance').value) || 1015;
    settings.pasajesSemana = Number(document.getElementById('inpPasajesSemana').value) || 0;
    settings.comidaSemana = Number(document.getElementById('inpComidaSemana').value) || 0;
    settings.otrosSemana = Number(document.getElementById('inpOtrosSemana').value) || 0;
    saveData(STORAGE_KEY_SETTINGS, settings);

    renderDebtsTable();
    renderEspacioTable();
    renderProductsTable();
    renderTimelineAndDates();
    renderMercadoTable();
    updateKPIs();
    updateConverter();
  }

  // 1. TABLA DEUDAS EDITABLE CON FILTRO
  function renderDebtsTable() {
    const tbody = document.getElementById('debtsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    let totMonto = 0;
    let totCuota = 0;

    const filteredDebts = debts.filter(d => {
      if (currentDebtFilter === 'all') return true;
      const f = currentDebtFilter.toLowerCase();
      const m = (d.mes || '').toLowerCase();
      const fp = (d.fechaPago || '').toLowerCase();
      return m.includes(f) || fp.includes(f);
    });

    filteredDebts.forEach(d => {
      totMonto += Number(d.monto) || 0;
      totCuota += Number(d.cuotaMes) || 0;

      const tr = document.createElement('tr');
      const isPaid = d.estado === 'Pagado';
      const statusBadge = isPaid
        ? '<span class="badge-status badge-pagado"><i class="fas fa-check"></i> Pagado</span>'
        : '<span class="badge-status badge-pendiente"><i class="fas fa-hourglass-half"></i> Pendiente</span>';

      tr.innerHTML = `
        <td><strong style="cursor:pointer;" onclick="editarCampoDeuda('${d.id}', 'concepto')" title="Clic para editar">${d.concepto}</strong></td>
        <td><span style="cursor:pointer; font-family:var(--font-mono);" onclick="editarCampoDeuda('${d.id}', 'monto')">${fmtUsd(d.monto)}</span></td>
        <td><span class="badge-status" style="background:#1e293b; color:#38bdf8; border:1px solid rgba(56,189,248,0.3);">${d.tasa}</span></td>
        <td><span style="cursor:pointer; font-family:var(--font-mono); font-weight:700; color:#ef4444;" onclick="editarCampoDeuda('${d.id}', 'cuotaMes')">${fmtUsd(d.cuotaMes)}</span></td>
        <td><span style="cursor:pointer; color:var(--text-muted);" onclick="editarCampoDeuda('${d.id}', 'fechaPago')">${d.fechaPago || d.mes}</span></td>
        <td><span onclick="toggleEstadoDeuda('${d.id}')">${statusBadge}</span></td>
        <td style="text-align:center;">
          <button class="btn-action-icon" title="Editar Completo" onclick="editarDeudaCompleta('${d.id}')"><i class="fas fa-edit"></i></button>
          <button class="btn-action-icon" title="Eliminar" onclick="eliminarDeuda('${d.id}')"><i class="fas fa-trash"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    const totD = document.getElementById('totDeudaGlobal');
    if (totD) totD.textContent = fmtUsd(totMonto);
    const totC = document.getElementById('totCuotaGlobal');
    if (totC) totC.textContent = fmtUsd(totCuota);
  }

  // 2. TABLA ESPACIO & SETUP
  function renderEspacioTable() {
    const tbody = document.getElementById('espacioTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    let totCost = 0;

    espacio.forEach(item => {
      totCost += Number(item.costo) || 0;
      const tr = document.createElement('tr');

      let statusBadge = '';
      if (item.estado === '¡Comprado!') {
        statusBadge = '<span class="badge-status badge-pagado"><i class="fas fa-check"></i> ¡Listo!</span>';
      } else if (item.estado === 'En Ahorro') {
        statusBadge = '<span class="badge-status badge-pendiente"><i class="fas fa-piggy-bank"></i> Ahorrando</span>';
      } else {
        statusBadge = '<span class="badge-status" style="background:rgba(255,255,255,0.05); color:#94a3b8; border:1px solid rgba(255,255,255,0.1);"><i class="fas fa-clock"></i> Pendiente</span>';
      }

      const prioClass = item.prioridad === 'Alta' ? 'badge-alta' : 'badge-media';

      tr.innerHTML = `
        <td><strong style="cursor:pointer;" onclick="editarCampoEspacio('${item.id}', 'nombre')">${item.nombre}</strong></td>
        <td><span style="cursor:pointer; font-family:var(--font-mono);" onclick="editarCampoEspacio('${item.id}', 'costo')">${fmtUsd(item.costo)}</span></td>
        <td><span class="badge-status ${prioClass}">${item.prioridad}</span></td>
        <td><span style="cursor:pointer; color:var(--text-muted);" onclick="editarCampoEspacio('${item.id}', 'fechaObjetivo')">${item.fechaObjetivo}</span></td>
        <td><span onclick="toggleEstadoEspacio('${item.id}')">${statusBadge}</span></td>
        <td style="text-align:center;">
          <button class="btn-action-icon" title="Editar" onclick="editarEspacioCompleto('${item.id}')"><i class="fas fa-edit"></i></button>
          <button class="btn-action-icon" title="Eliminar" onclick="eliminarEspacio('${item.id}')"><i class="fas fa-trash"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    const totEl = document.getElementById('totEspacioCost');
    if (totEl) totEl.textContent = fmtUsd(totCost);
  }

  // 3. TABLA PAREJA (MOI & VAL 75/25)
  function renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    let totCost = 0;
    let totMoi = 0;
    let totVal = 0;

    products.forEach(p => {
      const c = Number(p.costo) || 0;
      const cMoi = c * 0.75;
      const cVal = c * 0.25;

      totCost += c;
      totMoi += cMoi;
      totVal += cVal;

      const tr = document.createElement('tr');
      let badge = '';
      if (p.estado === '¡Comprado!') badge = '<span class="badge-status badge-pagado"><i class="fas fa-check"></i> ¡Comprado!</span>';
      else if (p.estado === 'En Ahorro') badge = '<span class="badge-status badge-pendiente"><i class="fas fa-piggy-bank"></i> Ahorrando</span>';
      else badge = '<span class="badge-status" style="background:rgba(255,255,255,0.05); color:#94a3b8; border:1px solid rgba(255,255,255,0.1);"><i class="fas fa-clock"></i> Pendiente</span>';

      tr.innerHTML = `
        <td><strong style="cursor:pointer;" onclick="editarCampoProducto('${p.id}', 'nombre')">${p.nombre}</strong></td>
        <td><span style="cursor:pointer; font-family:var(--font-mono);" onclick="editarCampoProducto('${p.id}', 'costo')">${fmtUsd(p.costo)}</span></td>
        <td style="color:#38bdf8; font-family:var(--font-mono); font-weight:700;">${fmtUsd(cMoi)}</td>
        <td style="color:#f472b6; font-family:var(--font-mono); font-weight:700;">${fmtUsd(cVal)}</td>
        <td><span onclick="toggleEstadoProducto('${p.id}')">${badge}</span></td>
        <td style="text-align:center;">
          <button class="btn-action-icon" title="Editar" onclick="editarProductoCompleto('${p.id}')"><i class="fas fa-edit"></i></button>
          <button class="btn-action-icon" title="Eliminar" onclick="eliminarProducto('${p.id}')"><i class="fas fa-trash"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    const elCost = document.getElementById('totProdCost');
    if (elCost) elCost.textContent = fmtUsd(totCost);
    const elMoi = document.getElementById('totProdMoi');
    if (elMoi) elMoi.textContent = fmtUsd(totMoi);
    const elVal = document.getElementById('totProdVal');
    if (elVal) elVal.textContent = fmtUsd(totVal);
  }

  // 4. CRONOGRAMA & FECHAS ESPECÍFICAS DE PAGO
  function renderTimelineAndDates() {
    const tContainer = document.getElementById('timelineContainer');
    if (tContainer) {
      tContainer.innerHTML = '';
      const monthlyPlans = [
        { mes: 'Octubre 2026', compromisos: '$250 ($200 Univ + $50 Ubii)', ahorro: '$150', foco: 'Liquidación Ubii + Univ 1/3' },
        { mes: 'Noviembre 2026', compromisos: '$500 (Univ 2/3 + Crece + Binance)', ahorro: '$0 (Mes de Esfuerzo)', foco: 'Salir de Binance y Crece' },
        { mes: 'Diciembre 2026', compromisos: '$280 (Univ 3/3 + Cuota Préstamo)', ahorro: '$120', foco: 'Graduación / Universidad 100% Pagada' },
        { mes: 'Enero 2027', compromisos: '$80 (Solo cuota mensual)', ahorro: '$320', foco: '¡LIBERTAD TOTAL! 0 Deudas Cortas' }
      ];

      monthlyPlans.forEach(p => {
        const card = document.createElement('div');
        card.className = 'timeline-month-card';
        card.innerHTML = `
          <div class="timeline-month-header">
            <span class="timeline-month-title">${p.mes}</span>
            <span style="font-size:0.75rem; color:#10b981; font-weight:700;">Capacidad: ${p.ahorro}</span>
          </div>
          <div class="timeline-item-row">
            <span>Compromisos:</span>
            <strong>${p.compromisos}</strong>
          </div>
          <div style="font-size:0.8rem; color:#38bdf8; margin-top:8px; font-weight:600;">
            <i class="fas fa-bullseye"></i> ${p.foco}
          </div>
        `;
        tContainer.appendChild(card);
      });
    }

    const fBody = document.getElementById('fechasPagoTableBody');
    if (!fBody) return;
    fBody.innerHTML = '';

    const cortes = [
      { fecha: '15 de Octubre 2026', items: 'Universidad (Trimestre 1/3)', monto: 200, bcv: 200 * settings.tasaBcv },
      { fecha: '30 de Octubre 2026', items: 'Ubii Pagos ($50) + Cuota Préstamo 1/6 ($80)', monto: 130, bcv: 130 * settings.tasaBcv },
      { fecha: '15 de Noviembre 2026', items: 'Universidad (Trimestre 2/3 - $200) + Crece ($110)', monto: 310, bcv: 310 * settings.tasaBcv },
      { fecha: '30 de Noviembre 2026', items: 'Préstamo Binance ($190) + Cuota Préstamo 2/6 ($80)', monto: 270, bcv: 270 * settings.tasaBcv },
      { fecha: '15 de Diciembre 2026', items: 'Universidad (Trimestre 3/3 - Finiquito)', monto: 200, bcv: 200 * settings.tasaBcv },
      { fecha: '30 de Diciembre 2026', items: 'Cuota Préstamo 3/6 ($80)', monto: 80, bcv: 80 * settings.tasaBcv },
      { fecha: '30 de Enero 2027', items: 'Cuota Préstamo 4/6 ($80) — ¡Superávit Libre!', monto: 80, bcv: 80 * settings.tasaBcv }
    ];

    const weeklyAllowance = settings.pasajesSemana + settings.comidaSemana + settings.otrosSemana;

    cortes.forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color:var(--accent-sky);">${c.fecha}</strong></td>
        <td>${c.items}</td>
        <td><strong style="color:#ef4444; font-family:var(--font-mono);">${fmtUsd(c.monto)}</strong></td>
        <td style="color:var(--text-muted); font-family:var(--font-mono);">${fmtBs(c.bcv)}</td>
        <td><span class="badge-status badge-pagado">$${weeklyAllowance}/sem protegido</span></td>
      `;
      fBody.appendChild(tr);
    });
  }

  // 5. MERCADO SEMANAL INTERACTIVO
  function renderMercadoTable() {
    const tbody = document.getElementById('mercadoTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    let totDolares = 0;

    mercado.forEach(m => {
      totDolares += Number(m.costo) || 0;
      const tr = document.createElement('tr');
      const bsPrice = (Number(m.costo) || 0) * settings.tasaBcv;

      tr.innerHTML = `
        <td style="text-align:center;">
          <input type="checkbox" style="width:18px; height:18px; cursor:pointer;" ${m.comprado ? 'checked' : ''} onchange="toggleItemMercado('${m.id}')">
        </td>
        <td>
          <span style="font-size:0.75rem; text-transform:uppercase; padding:2px 6px; border-radius:4px; background:rgba(255,255,255,0.06); color:#38bdf8; margin-right:6px;">${m.cat}</span>
          <strong style="${m.comprado ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${m.nombre}</strong>
        </td>
        <td style="color:var(--text-muted); font-size:0.85rem;">${m.porcion}</td>
        <td style="color:#10b981; font-weight:700; font-family:var(--font-mono);">${fmtUsd(m.costo)}</td>
        <td style="color:var(--text-muted); font-size:0.85rem; font-family:var(--font-mono);">${fmtBs(bsPrice)}</td>
      `;
      tbody.appendChild(tr);
    });

    const totDolaresEl = document.getElementById('totMercadoDolares');
    if (totDolaresEl) totDolaresEl.textContent = fmtUsd(totDolares);

    const totBsEl = document.getElementById('totMercadoBs');
    if (totBsEl) totBsEl.textContent = fmtBs(totDolares * settings.tasaBcv);
  }

  // 6. ACTUALIZAR KPIS & FLUJO DE DINERO
  function updateKPIs() {
    const salMoi = settings.salaryMoi;
    const weeklyLiving = (settings.pasajesSemana + settings.comidaSemana + settings.otrosSemana) * 4.0; // 4 semanas

    let cuotasOct = 0;
    debts.forEach(d => {
      if (d.estado !== 'Pagado' && (d.mes.includes('Octubre') || (d.fechaPago && d.fechaPago.includes('Octubre')))) {
        cuotasOct += Number(d.cuotaMes) || 0;
      }
    });

    const remMoi = salMoi - cuotasOct - weeklyLiving;

    const elSal = document.getElementById('kpiMoiIngreso');
    if (elSal) elSal.textContent = fmtUsd(salMoi);
    const elComp = document.getElementById('moiCompromisosMes');
    if (elComp) elComp.textContent = fmtUsd(cuotasOct);
    const elVida = document.getElementById('moiGastosVidaMes');
    if (elVida) elVida.textContent = fmtUsd(weeklyLiving);

    const remEl = document.getElementById('moiAhorroLibreMes');
    if (remEl) {
      remEl.textContent = fmtUsd(remMoi);
      remEl.style.color = remMoi >= 0 ? '#10b981' : '#ef4444';
    }

    const totSemEl = document.getElementById('dispTotalSemanal');
    if (totSemEl) totSemEl.textContent = fmtUsd(settings.pasajesSemana + settings.comidaSemana + settings.otrosSemana);

    // Actualizar Barra de Flujo Visual
    const totalIncome = salMoi > 0 ? salMoi : 600;
    const pctVida = Math.min(100, Math.max(5, (weeklyLiving / totalIncome) * 100));
    const pctDeudas = Math.min(100 - pctVida, Math.max(5, (cuotasOct / totalIncome) * 100));
    const pctAhorro = Math.max(0, 100 - pctVida - pctDeudas);

    const bVida = document.getElementById('barSegVida');
    const bDeudas = document.getElementById('barSegDeudas');
    const bAhorro = document.getElementById('barSegAhorro');
    if (bVida) bVida.style.width = `${pctVida}%`;
    if (bDeudas) bDeudas.style.width = `${pctDeudas}%`;
    if (bAhorro) bAhorro.style.width = `${pctAhorro}%`;

    const fVida = document.getElementById('flowStatVida');
    const fDeudas = document.getElementById('flowStatDeudas');
    const fAhorro = document.getElementById('flowStatAhorro');
    if (fVida) fVida.innerHTML = `${fmtUsd(weeklyLiving)} <span style="font-size:0.75rem; font-weight:normal; color:#94a3b8;">($${settings.pasajesSemana + settings.comidaSemana + settings.otrosSemana}/sem)</span>`;
    if (fDeudas) fDeudas.innerHTML = `${fmtUsd(cuotasOct)} <span style="font-size:0.75rem; font-weight:normal; color:#94a3b8;">(Mes activo)</span>`;
    if (fAhorro) {
      fAhorro.innerHTML = `${fmtUsd(remMoi)} <span style="font-size:0.75rem; font-weight:normal;">(${remMoi >= 0 ? 'Libre' : 'Déficit'})</span>`;
      fAhorro.style.color = remMoi >= 0 ? '#10b981' : '#f43f5e';
    }
  }

  // MODAL EXPLICATIVO
  const btnHelp = document.getElementById('btnHelpModal');
  if (btnHelp) {
    btnHelp.addEventListener('click', () => {
      Swal.fire({
        title: '💎 Guía Rápida del Sistema',
        html: `
          <div style="text-align:left; font-size:0.9rem; color:#cbd5e1; line-height:1.6;">
            <p><strong style="color:#38bdf8;">1. Tu Sueldo y Tasas (Arriba):</strong> Ajusta tu sueldo o la tasa BCV cuando varíen. Todo el sistema se recalcula al instante.</p>
            <p style="margin-top:10px;"><strong style="color:#f59e0b;">2. Tu Presupuesto de Vida ($50/sem):</strong> $15 de pasajes para ir a Airtek + $25 de mercado digno + $10 imprevistos. Este dinero es <em>sagrado</em> para que nunca pases necesidad.</p>
            <p style="margin-top:10px;"><strong style="color:#f43f5e;">3. Método Bola de Nieve (Deudas):</strong> Pagamos primero lo prioritario de Octubre (Universidad + Ubii). En Noviembre liquidamos Crece y Binance. En Enero 2027 eres 100% libre de deudas cortas.</p>
            <p style="margin-top:10px;"><strong style="color:#10b981;">4. Pestaña de Cronograma:</strong> Te indica exactamente cuánto dinero necesitas tener en la cuenta en cada quincena límite (15 y 30 de cada mes).</p>
          </div>
        `,
        confirmButtonText: '¡Entendido!',
        confirmButtonColor: '#0284c7'
      });
    });
  }

  // FUNCIONES GLOBALES / WINDOW
  window.toggleItemMercado = function(id) {
    const item = mercado.find(x => x.id === id);
    if (item) {
      item.comprado = !item.comprado;
      saveData(STORAGE_KEY_MERCADO, mercado);
      renderMercadoTable();
    }
  };

  const btnResetMercado = document.getElementById('btnResetMercado');
  if (btnResetMercado) {
    btnResetMercado.addEventListener('click', () => {
      mercado.forEach(m => m.comprado = false);
      saveData(STORAGE_KEY_MERCADO, mercado);
      renderMercadoTable();
      Swal.fire({
        icon: 'success',
        title: 'Semana Reiniciada',
        text: 'Se han desmarcado los alimentos para tu nuevo ciclo semanal.',
        timer: 1500,
        showConfirmButton: false
      });
    });
  }

  window.editarCampoDeuda = async function(id, campo) {
    const d = debts.find(x => x.id === id);
    if (!d) return;

    const { value: nuevoVal } = await Swal.fire({
      title: `Editar ${campo}`,
      input: (campo === 'monto' || campo === 'cuotaMes') ? 'number' : 'text',
      inputValue: d[campo],
      showCancelButton: true
    });

    if (nuevoVal !== undefined && nuevoVal !== null) {
      d[campo] = (campo === 'monto' || campo === 'cuotaMes') ? Number(nuevoVal) : nuevoVal;
      saveData(STORAGE_KEY_DEBTS, debts);
      updateAll();
    }
  };

  window.toggleEstadoDeuda = function(id) {
    const d = debts.find(x => x.id === id);
    if (d) {
      d.estado = d.estado === 'Pagado' ? 'Pendiente' : 'Pagado';
      saveData(STORAGE_KEY_DEBTS, debts);
      updateAll();
    }
  };

  window.eliminarDeuda = function(id) {
    debts = debts.filter(x => x.id !== id);
    saveData(STORAGE_KEY_DEBTS, debts);
    updateAll();
  };

  window.editarDeudaCompleta = async function(id) {
    const d = debts.find(x => x.id === id);
    if (!d) return;

    const { value: formValues } = await Swal.fire({
      title: 'Editar Deuda / Compromiso',
      html:
        `<input id="sw-conc" class="swal2-input" placeholder="Concepto" value="${d.concepto}">` +
        `<input id="sw-monto" type="number" class="swal2-input" placeholder="Monto Total ($)" value="${d.monto}">` +
        `<input id="sw-cuota" type="number" class="swal2-input" placeholder="Cuota Mensual ($)" value="${d.cuotaMes}">` +
        `<input id="sw-fecha" class="swal2-input" placeholder="Fecha Específica de Pago" value="${d.fechaPago || d.mes}">`,
      focusConfirm: false,
      preConfirm: () => [
        document.getElementById('sw-conc').value,
        document.getElementById('sw-monto').value,
        document.getElementById('sw-cuota').value,
        document.getElementById('sw-fecha').value
      ]
    });

    if (formValues && formValues[0]) {
      d.concepto = formValues[0];
      d.monto = Number(formValues[1]) || 0;
      d.cuotaMes = Number(formValues[2]) || 0;
      d.fechaPago = formValues[3];
      saveData(STORAGE_KEY_DEBTS, debts);
      updateAll();
    }
  };

  // ESPACIO EDITORS
  window.editarCampoEspacio = async function(id, campo) {
    const e = espacio.find(x => x.id === id);
    if (!e) return;

    const { value: nuevoVal } = await Swal.fire({
      title: `Editar ${campo}`,
      input: campo === 'costo' ? 'number' : 'text',
      inputValue: e[campo],
      showCancelButton: true
    });

    if (nuevoVal !== undefined && nuevoVal !== null) {
      e[campo] = campo === 'costo' ? Number(nuevoVal) : nuevoVal;
      saveData(STORAGE_KEY_ESPACIO, espacio);
      updateAll();
    }
  };

  window.toggleEstadoEspacio = function(id) {
    const e = espacio.find(x => x.id === id);
    if (e) {
      const estados = ['Pendiente', 'En Ahorro', '¡Comprado!'];
      const nextIdx = (estados.indexOf(e.estado) + 1) % estados.length;
      e.estado = estados[nextIdx];
      saveData(STORAGE_KEY_ESPACIO, espacio);
      updateAll();
    }
  };

  window.eliminarEspacio = function(id) {
    espacio = espacio.filter(x => x.id !== id);
    saveData(STORAGE_KEY_ESPACIO, espacio);
    updateAll();
  };

  window.editarEspacioCompleto = async function(id) {
    const e = espacio.find(x => x.id === id);
    if (!e) return;

    const { value: formValues } = await Swal.fire({
      title: 'Editar Mejora de Espacio',
      html:
        `<input id="sw-e-nom" class="swal2-input" placeholder="Artículo" value="${e.nombre}">` +
        `<input id="sw-e-cost" type="number" class="swal2-input" placeholder="Costo ($)" value="${e.costo}">` +
        `<input id="sw-e-fec" class="swal2-input" placeholder="Fecha Objetivo" value="${e.fechaObjetivo}">`,
      focusConfirm: false,
      preConfirm: () => [
        document.getElementById('sw-e-nom').value,
        document.getElementById('sw-e-cost').value,
        document.getElementById('sw-e-fec').value
      ]
    });

    if (formValues && formValues[0]) {
      e.nombre = formValues[0];
      e.costo = Number(formValues[1]) || 0;
      e.fechaObjetivo = formValues[2];
      saveData(STORAGE_KEY_ESPACIO, espacio);
      updateAll();
    }
  };

  const btnNuevoEspacio = document.getElementById('btnNuevoItemEspacio');
  if (btnNuevoEspacio) {
    btnNuevoEspacio.addEventListener('click', async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Añadir Mejora Transportable de Espacio / Setup',
        html:
          '<input id="sw-ne-nom" class="swal2-input" placeholder="Elemento (ej: Silla Ergonómica)">' +
          '<input id="sw-ne-cost" type="number" class="swal2-input" placeholder="Costo Estimado ($)">' +
          '<input id="sw-ne-fec" class="swal2-input" placeholder="Fecha Objetivo (ej: Noviembre 2026)">',
        focusConfirm: false,
        preConfirm: () => [
          document.getElementById('sw-ne-nom').value,
          document.getElementById('sw-ne-cost').value,
          document.getElementById('sw-ne-fec').value
        ]
      });

      if (formValues && formValues[0]) {
        espacio.push({
          id: 'e_' + Date.now(),
          nombre: formValues[0],
          costo: Number(formValues[1]) || 0,
          prioridad: 'Media',
          fechaObjetivo: formValues[2] || 'Diciembre 2026',
          estado: 'Pendiente'
        });
        saveData(STORAGE_KEY_ESPACIO, espacio);
        updateAll();
      }
    });
  }

  // PRODUCTOS (PAREJA)
  window.editarCampoProducto = async function(id, campo) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    const { value: nuevoVal } = await Swal.fire({
      title: `Editar ${campo}`,
      input: campo === 'costo' ? 'number' : 'text',
      inputValue: p[campo],
      showCancelButton: true
    });

    if (nuevoVal !== undefined && nuevoVal !== null) {
      p[campo] = campo === 'costo' ? Number(nuevoVal) : nuevoVal;
      saveData(STORAGE_KEY_PRODUCTS, products);
      updateAll();
    }
  };

  window.toggleEstadoProducto = function(id) {
    const p = products.find(x => x.id === id);
    if (p) {
      const estados = ['Pendiente', 'En Ahorro', '¡Comprado!'];
      const nextIdx = (estados.indexOf(p.estado) + 1) % estados.length;
      p.estado = estados[nextIdx];
      saveData(STORAGE_KEY_PRODUCTS, products);
      updateAll();
    }
  };

  window.eliminarProducto = function(id) {
    products = products.filter(x => x.id !== id);
    saveData(STORAGE_KEY_PRODUCTS, products);
    updateAll();
  };

  window.editarProductoCompleto = async function(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    const { value: formValues } = await Swal.fire({
      title: 'Editar Meta de Pareja',
      html:
        `<input id="sw-p-nom" class="swal2-input" placeholder="Artículo" value="${p.nombre}">` +
        `<input id="sw-p-cost" type="number" class="swal2-input" placeholder="Costo ($)" value="${p.costo}">`,
      focusConfirm: false,
      preConfirm: () => [
        document.getElementById('sw-p-nom').value,
        document.getElementById('sw-p-cost').value
      ]
    });

    if (formValues && formValues[0]) {
      p.nombre = formValues[0];
      p.costo = Number(formValues[1]) || 0;
      saveData(STORAGE_KEY_PRODUCTS, products);
      updateAll();
    }
  };

  const btnNuevoProd = document.getElementById('btnNuevoProducto');
  if (btnNuevoProd) {
    btnNuevoProd.addEventListener('click', async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Añadir Meta del Hogar (Moi & Val)',
        html:
          '<input id="sw-prod" class="swal2-input" placeholder="Artículo (ej: Nevera)">' +
          '<input id="sw-costo" type="number" class="swal2-input" placeholder="Costo Total ($)">',
        focusConfirm: false,
        preConfirm: () => [
          document.getElementById('sw-prod').value,
          document.getElementById('sw-costo').value
        ]
      });

      if (formValues && formValues[0]) {
        products.push({
          id: 'p_' + Date.now(),
          nombre: formValues[0],
          costo: Number(formValues[1]) || 0,
          estado: 'Pendiente'
        });
        saveData(STORAGE_KEY_PRODUCTS, products);
        updateAll();
      }
    });
  }

  const btnNuevaD = document.getElementById('btnNuevaDeuda');
  if (btnNuevaD) {
    btnNuevaD.addEventListener('click', async () => {
      const { value: formValues } = await Swal.fire({
        title: 'Añadir Compromiso / Deuda',
        html:
          '<input id="sw-conc" class="swal2-input" placeholder="Concepto (ej: Tarjeta)">' +
          '<input id="sw-monto" type="number" class="swal2-input" placeholder="Monto Total ($)">' +
          '<input id="sw-cuota" type="number" class="swal2-input" placeholder="Cuota Mensual ($)">' +
          '<input id="sw-fecha" class="swal2-input" placeholder="Fecha Específica (ej: 15-Nov)">',
        focusConfirm: false,
        preConfirm: () => [
          document.getElementById('sw-conc').value,
          document.getElementById('sw-monto').value,
          document.getElementById('sw-cuota').value,
          document.getElementById('sw-fecha').value
        ]
      });

      if (formValues && formValues[0]) {
        debts.push({
          id: 'd_' + Date.now(),
          concepto: formValues[0],
          monto: Number(formValues[1]) || 0,
          tasa: 'BCV',
          cuotaMes: Number(formValues[2]) || Number(formValues[1]),
          fechaPago: formValues[3] || 'Noviembre 2026',
          estado: 'Pendiente'
        });
        saveData(STORAGE_KEY_DEBTS, debts);
        updateAll();
      }
    });
  }

  // Listeners de Inputs de configuración
  ['inpSalaryMoi', 'inpSalaryVal', 'tasaBcv', 'tasaBinance', 'inpPasajesSemana', 'inpComidaSemana', 'inpOtrosSemana'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateAll);
  });

  // Conversor en vivo
  function updateConverter() {
    const convInput = document.getElementById('convUsd');
    if (!convInput) return;
    const usd = Number(convInput.value) || 0;
    const bcv = Number(document.getElementById('tasaBcv').value) || 870;
    const binance = Number(document.getElementById('tasaBinance').value) || 1015;

    const bcvTotal = usd * bcv;
    const binanceTotal = usd * binance;
    const brecha = Math.abs(binanceTotal - bcvTotal);

    const rBcv = document.getElementById('resBcvBs');
    if (rBcv) rBcv.textContent = fmtBs(bcvTotal);
    const rBin = document.getElementById('resBinanceBs');
    if (rBin) rBin.textContent = fmtBs(binanceTotal);
    const rBre = document.getElementById('resBrecha');
    if (rBre) rBre.textContent = fmtBs(brecha);
  }

  const convUsdEl = document.getElementById('convUsd');
  if (convUsdEl) convUsdEl.addEventListener('input', updateConverter);

  // ==========================================
  // SERVICE WORKER & PWA INSTALLATION LOGIC
  // ==========================================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('[PWA] Service Worker registrado con éxito:', reg.scope))
        .catch(err => console.log('[PWA] Fallo registro SW:', err));
    });
  }

  let deferredPrompt = null;
  const btnInstallPwa = document.getElementById('btnInstallPwa');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (btnInstallPwa) {
      btnInstallPwa.style.display = 'inline-flex';
      btnInstallPwa.classList.add('pulse-glow');
    }
  });

  if (btnInstallPwa) {
    btnInstallPwa.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          Swal.fire({
            icon: 'success',
            title: '¡App Instalada!',
            text: 'Moi & Val Finanzas se ha agregado a tu pantalla de inicio / escritorio.',
            background: '#0f172a',
            color: '#f8fafc'
          });
          btnInstallPwa.style.display = 'none';
        }
        deferredPrompt = null;
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Instalación PWA',
          html: `
            <div style="text-align:left; font-size:0.95rem; line-height:1.6; color:#cbd5e1;">
              <p><strong>En Android / Chrome:</strong> Toca los 3 puntos (⋮) y selecciona <em>"Instalar aplicación"</em> o <em>"Agregar a la pantalla principal"</em>.</p>
              <p style="margin-top:8px;"><strong>En iOS (iPhone/Safari):</strong> Toca el botón <em>Compartir</em> (ícono de cuadro con flecha) y elige <em>"Agregar al inicio"</em>.</p>
              <p style="margin-top:8px;"><strong>En PC / Windows:</strong> Haz clic en el ícono de instalación en la barra de direcciones de Chrome/Edge.</p>
            </div>
          `,
          background: '#0f172a',
          color: '#f8fafc'
        });
      }
    });
  }

  // ==========================================
  // RESPALDO EN LÍNEA & ARCHIVO JSON
  // ==========================================
  const STORAGE_KEY_CLOUD_URL = 'MOI_VAL_CLOUD_URL_2026';
  const btnBackupSync = document.getElementById('btnBackupSync');
  const fileBackupInput = document.getElementById('fileBackupInput');

  function getFullBackupPayload() {
    return {
      version: '2026.1',
      exportDate: new Date().toISOString(),
      settings: JSON.parse(localStorage.getItem(STORAGE_KEY_SETTINGS) || '{}'),
      debts: JSON.parse(localStorage.getItem(STORAGE_KEY_DEBTS) || '[]'),
      products: JSON.parse(localStorage.getItem(STORAGE_KEY_PRODUCTS) || '[]'),
      espacio: JSON.parse(localStorage.getItem(STORAGE_KEY_ESPACIO) || '[]'),
      mercado: JSON.parse(localStorage.getItem(STORAGE_KEY_MERCADO) || '[]')
    };
  }

  function restoreFullBackup(data) {
    if (!data || typeof data !== 'object') throw new Error('Formato de datos inválido');
    if (data.settings) localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(data.settings));
    if (data.debts) localStorage.setItem(STORAGE_KEY_DEBTS, JSON.stringify(data.debts));
    if (data.products) localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(data.products));
    if (data.espacio) localStorage.setItem(STORAGE_KEY_ESPACIO, JSON.stringify(data.espacio));
    if (data.mercado) localStorage.setItem(STORAGE_KEY_MERCADO, JSON.stringify(data.mercado));
    
    // Recargar variables en memoria
    debts = loadData(STORAGE_KEY_DEBTS, defaultDebts);
    products = loadData(STORAGE_KEY_PRODUCTS, defaultProducts);
    espacio = loadData(STORAGE_KEY_ESPACIO, defaultEspacio);
    mercado = loadData(STORAGE_KEY_MERCADO, defaultMercado);
    settings = { ...settings, ...loadData(STORAGE_KEY_SETTINGS, {}) };
    
    updateAll();
  }

  if (btnBackupSync) {
    btnBackupSync.addEventListener('click', () => {
      const savedCloudUrl = localStorage.getItem(STORAGE_KEY_CLOUD_URL) || '';

      Swal.fire({
        title: '☁️ Respaldo & Nube — Moi & Val',
        html: `
          <div style="text-align:left; font-size:0.95rem; color:#cbd5e1; display:flex; flex-direction:column; gap:12px;">
            <p>Guarda y sincroniza todos tus datos (deudas, mercado, sueldos y metas) para no perder nada aunque cambies de teléfono o borres el navegador.</p>
            
            <div style="background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:12px;">
              <strong style="color:#38bdf8;"><i class="fas fa-file-download"></i> Opción 1: Archivo Local de Respaldo</strong>
              <div style="display:flex; gap:8px; margin-top:8px;">
                <button type="button" id="swBtnExportJson" class="swal2-confirm swal2-styled" style="background:#0284c7; flex:1; font-size:0.85rem; padding:8px 12px; margin:0;">
                  📥 Descargar .JSON
                </button>
                <button type="button" id="swBtnImportJson" class="swal2-confirm swal2-styled" style="background:#475569; flex:1; font-size:0.85rem; padding:8px 12px; margin:0;">
                  📤 Subir / Restaurar
                </button>
              </div>
            </div>

            <div style="background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:12px;">
              <strong style="color:#10b981;"><i class="fas fa-cloud"></i> Opción 2: Sincronización en la Nube (Google Sheets / API)</strong>
              <p style="font-size:0.8rem; color:#94a3b8; margin:4px 0 8px 0;">Pega la URL de tu Google Apps Script o endpoint JSON para sincronizar en tiempo real entre tu PC y tu teléfono:</p>
              <input id="swCloudUrl" class="swal2-input" placeholder="https://script.google.com/macros/s/.../exec" value="${savedCloudUrl}" style="margin:0; width:100%; font-size:0.85rem;">
              <div style="display:flex; gap:8px; margin-top:10px;">
                <button type="button" id="swBtnCloudPush" class="swal2-confirm swal2-styled" style="background:#059669; flex:1; font-size:0.85rem; padding:8px 12px; margin:0;">
                  ☁️ Subir a Nube
                </button>
                <button type="button" id="swBtnCloudPull" class="swal2-confirm swal2-styled" style="background:#d97706; flex:1; font-size:0.85rem; padding:8px 12px; margin:0;">
                  🔄 Bajar de Nube
                </button>
              </div>
            </div>
          </div>
        `,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        showConfirmButton: false,
        background: '#0f172a',
        color: '#f8fafc',
        didOpen: () => {
          // Descargar JSON
          document.getElementById('swBtnExportJson').addEventListener('click', () => {
            const payload = getFullBackupPayload();
            const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const now = new Date().toISOString().slice(0, 10);
            a.href = url;
            a.download = `Moi_Val_Finanzas_Respaldo_${now}.json`;
            a.click();
            URL.revokeObjectURL(url);
            Swal.fire({
              icon: 'success',
              title: '¡Respaldo Descargado!',
              text: 'Guarda este archivo en tu Google Drive o envíatelo por WhatsApp.',
              background: '#0f172a',
              color: '#f8fafc'
            });
          });

          // Subir JSON
          document.getElementById('swBtnImportJson').addEventListener('click', () => {
            fileBackupInput.click();
          });

          // Subir a Nube
          document.getElementById('swBtnCloudPush').addEventListener('click', async () => {
            const url = document.getElementById('swCloudUrl').value.trim();
            if (!url) {
              Swal.showValidationMessage('Ingresa una URL válida de sincronización');
              return;
            }
            localStorage.setItem(STORAGE_KEY_CLOUD_URL, url);
            try {
              Swal.showLoading();
              const payload = getFullBackupPayload();
              const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              Swal.hideLoading();
              Swal.fire({
                icon: 'success',
                title: '¡Datos en la Nube!',
                text: 'Se han sincronizado tus deudas, mercado y configuración con éxito.',
                background: '#0f172a',
                color: '#f8fafc'
              });
            } catch (err) {
              Swal.fire({
                icon: 'error',
                title: 'Error de Red',
                text: 'No se pudo conectar con el servidor: ' + err.message,
                background: '#0f172a',
                color: '#f8fafc'
              });
            }
          });

          // Bajar de Nube
          document.getElementById('swBtnCloudPull').addEventListener('click', async () => {
            const url = document.getElementById('swCloudUrl').value.trim();
            if (!url) {
              Swal.showValidationMessage('Ingresa una URL válida de sincronización');
              return;
            }
            localStorage.setItem(STORAGE_KEY_CLOUD_URL, url);
            try {
              Swal.showLoading();
              const res = await fetch(url);
              const data = await res.json();
              restoreFullBackup(data);
              Swal.hideLoading();
              Swal.fire({
                icon: 'success',
                title: '¡Datos Actualizados!',
                text: 'Se restauró el estado más reciente desde la nube.',
                background: '#0f172a',
                color: '#f8fafc'
              });
            } catch (err) {
              Swal.fire({
                icon: 'error',
                title: 'Error al Bajar',
                text: 'No se pudieron descargar los datos: ' + err.message,
                background: '#0f172a',
                color: '#f8fafc'
              });
            }
          });
        }
      });
    });
  }

  // Listener para el selector de archivos
  if (fileBackupInput) {
    fileBackupInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target.result);
          restoreFullBackup(parsed);
          Swal.fire({
            icon: 'success',
            title: '¡Restauración Exitosa!',
            text: 'Todos tus datos y fechas de pago han sido cargados.',
            background: '#0f172a',
            color: '#f8fafc'
          });
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Archivo Inválido',
            text: 'No se pudo leer el archivo JSON: ' + err.message,
            background: '#0f172a',
            color: '#f8fafc'
          });
        }
      };
      reader.readAsText(file);
      fileBackupInput.value = '';
    });
  }

  updateAll();
  updateConverter();
});
