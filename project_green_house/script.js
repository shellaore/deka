(function(){
  const rub = n => n.toLocaleString('ru-RU') + ' ₽';

  const PAINS = [
    { t:'«Эко» на упаковке, а в составе — сульфаты', s:'Маркетинг вместо честного состава' },
    { t:'Снова забыли докупить нужное', s:'Заканчивается в самый неподходящий момент' },
    { t:'Каким брендам вообще можно верить?', s:'Слишком много громких обещаний' },
    { t:'Не хочется переплачивать за слово на этикетке', s:'«Натуральное» часто значит «дороже»' }
  ];
  const STEPS = [
    { n:'1', t:'Выбираете товары или готовый набор', s:'Соберите коробку сами или возьмите подобранный набор' },
    { n:'2', t:'Настраиваете периодичность', s:'Раз в месяц или раз в два месяца — как удобно' },
    { n:'3', t:'Получаете коробку домой', s:'Доставка по расписанию, ничего не нужно помнить' },
    { n:'4', t:'Меняете состав в любой момент', s:'Добавляйте, убирайте, ставьте на паузу одним кликом' }
  ];
  const BENEFITS = [
    'Состав проверен независимой лабораторией',
    'Экономия до 20% при подписке',
    'Многоразовая и перерабатываемая упаковка',
    'Подходит аллергикам и детям',
    'Доставка по расписанию — ничего не забудете',
    'Меняйте или отменяйте подписку в любой момент'
  ];
  const CATS = [
    { key:'all', label:'Все' }, { key:'kitchen', label:'Для кухни' },
    { key:'bath', label:'Для ванной' }, { key:'laundry', label:'Для стирки' }
  ];
  const PRODUCTS = [
    { id:'p1', name:'Гель для посуды «Цитрус»', cat:'kitchen', price:390, badge:'best', img:'фото · гель' },
    { id:'p2', name:'Таблетки для посудомойки', cat:'kitchen', price:690, badge:'', img:'фото · таблетки' },
    { id:'p3', name:'Спрей для ванной комнаты', cat:'bath', price:420, badge:'new', img:'фото · спрей' },
    { id:'p4', name:'Твёрдое мыло для рук', cat:'bath', price:290, badge:'', img:'фото · мыло' },
    { id:'p5', name:'Гель для стирки «Без запаха»', cat:'laundry', price:790, badge:'best', img:'фото · гель' },
    { id:'p6', name:'Кондиционер для белья', cat:'laundry', price:650, badge:'', img:'фото · флакон' },
    { id:'p7', name:'Эко-губки, 3 шт', cat:'kitchen', price:240, badge:'', img:'фото · губки' },
    { id:'p8', name:'Пятновыводитель', cat:'laundry', price:540, badge:'new', img:'фото · пятновыв.' }
  ];
  const SIZES = [
    { key:'mini', label:'Мини', f:0.72 }, { key:'std', label:'Стандарт', f:1 }, { key:'big', label:'Большая', f:1.5 }
  ];
  const PLANS = [
    { key:'once', name:'Разовая покупка', base:1990, per:'разово', note:'Просто попробовать, без подписки',
      save:'', features:['Свободный выбор товаров','Доставка 1–3 дня','Без автосписаний'], popular:false, cta:'Купить разово' },
    { key:'monthly', name:'Подписка · раз в месяц', base:1690, per:'месяц', note:'−15% и ничего не нужно помнить',
      save:'Экономия 15%', features:['Скидка 15% на весь состав','Меняйте набор когда угодно','Бесплатная доставка','Пауза в один клик'], popular:true, cta:'Оформить подписку' },
    { key:'bimonthly', name:'Подписка · раз в 2 месяца', base:1490, per:'2 месяца', note:'Максимальная выгода −20%',
      save:'Экономия 20%', features:['Скидка 20% на весь состав','Реже доставки — больше экономия','Бесплатная доставка','Отмена в любой момент'], popular:false, cta:'Оформить подписку' }
  ];
  const FAQS = [
    { q:'Как проверить, что состав действительно безопасен?', a:'Каждую партию тестирует независимая лаборатория — протокол с результатами лежит в карточке товара и в самой коробке. Никакого «эко» только на словах.' },
    { q:'Можно ли изменить состав коробки?', a:'Да, в любой момент в личном кабинете: добавляйте, убирайте товары или меняйте бренды. Изменения применяются к следующей доставке.' },
    { q:'Сколько длится доставка?', a:'По крупным городам — 1–3 дня. Точную дату и периодичность вы выбираете сами при оформлении.' },
    { q:'Как отменить подписку?', a:'В один клик в кабинете — без звонков и удержаний. Можно поставить на паузу, если хотите просто пропустить доставку.' },
    { q:'Подходит ли детям и аллергикам?', a:'Да. Составы без агрессивных ПАВ, отдушек и красителей; линейка для чувствительной кожи помечена отдельно.' },
    { q:'Что с упаковкой?', a:'Многоразовая коробка и тара, которую мы забираем и перерабатываем. Минимум пластика — и тот вторичный.' }
  ];

  const state = { cat:'all', cart:{}, size:'std', faq:0 };

  function renderPains(){
    document.getElementById('painsGrid').innerHTML = PAINS.map(p => `
      <div class="pain-card">
        <span class="quote">„</span>
        <div class="t">${p.t}</div>
        <div class="s">${p.s}</div>
      </div>`).join('');
  }
  function renderSteps(){
    document.getElementById('stepsGrid').innerHTML = STEPS.map(st => `
      <div class="step-card">
        <span class="num">${st.n}</span>
        <div class="t">${st.t}</div>
        <div class="s">${st.s}</div>
      </div>`).join('');
  }
  function renderBenefits(){
    document.getElementById('benefitsList').innerHTML = BENEFITS.map(b => `
      <div class="benefit-item"><span class="check">✓</span><span class="txt">${b}</span></div>`).join('');
  }
  function renderFilters(){
    document.getElementById('filtersRow').innerHTML = CATS.map(c => `
      <button class="filter-pill ${state.cat===c.key?'active':''}" data-cat="${c.key}">${c.label}</button>`).join('');
    document.querySelectorAll('.filter-pill').forEach(btn=>{
      btn.addEventListener('click', ()=>{ state.cat = btn.dataset.cat; renderFilters(); renderCatalog(); });
    });
  }
  function cartCount(){ return Object.values(state.cart).reduce((a,b)=>a+b,0); }
  function renderCatalog(){
    const items = PRODUCTS.filter(p => state.cat==='all' || p.cat===state.cat);
    document.getElementById('catalogGrid').innerHTML = items.map(p=>{
      const qty = state.cart[p.id]||0;
      const badge = p.badge==='best' ? '<span class="product-badge best">Бестселлер</span>'
                  : p.badge==='new' ? '<span class="product-badge new">Новинка</span>' : '';
      return `
      <div class="product-card">
        <div class="product-img">
          <div class="hatch"></div>
          <div class="caption">${p.img}</div>
          ${badge}
        </div>
        <div class="product-body">
          <div class="name">${p.name}</div>
          <div class="product-foot">
            <span class="price">${rub(p.price)}</span>
            <button class="add-btn ${qty>0?'in-cart':''}" data-id="${p.id}">${qty>0?('В корзине · '+qty):'В корзину'}</button>
          </div>
        </div>
      </div>`;
    }).join('');
    document.querySelectorAll('.add-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.dataset.id;
        state.cart[id] = (state.cart[id]||0)+1;
        renderCatalog();
        document.getElementById('cartBadge').textContent = cartCount();
      });
    });
  }
  function renderSizeToggle(){
    document.getElementById('sizeToggle').innerHTML = SIZES.map(s=>`
      <button class="${state.size===s.key?'active':''}" data-size="${s.key}">${s.label}</button>`).join('');
    document.querySelectorAll('#sizeToggle button').forEach(btn=>{
      btn.addEventListener('click', ()=>{ state.size = btn.dataset.size; renderSizeToggle(); renderPlans(); });
    });
  }
  function renderPlans(){
    const f = (SIZES.find(s=>s.key===state.size)||{f:1}).f;
    document.getElementById('plansGrid').innerHTML = PLANS.map(pl=>{
      const price = Math.round(pl.base * f / 10) * 10;
      const ribbon = pl.popular ? '<span class="plan-ribbon">Выгодный выбор</span>' : '';
      const save = pl.save ? `<span class="plan-save">${pl.save}</span>` : '';
      const feats = pl.features.map(f=>`<li><span class="check">✓</span>${f}</li>`).join('');
      return `
      <div class="plan-card ${pl.popular?'popular':''}">
        ${ribbon}
        <div>
          <div class="name">${pl.name}</div>
          <div class="note">${pl.note}</div>
        </div>
        <div class="plan-price-row">
          <span class="plan-price">${rub(price)}</span>
          <span class="plan-per">/ ${pl.per}</span>
        </div>
        ${save}
        <div class="plan-divider"></div>
        <ul class="plan-features">${feats}</ul>
        <button class="plan-cta">${pl.cta}</button>
      </div>`;
    }).join('');
  }
  function renderFaq(){
    document.getElementById('faqList').innerHTML = FAQS.map((q,i)=>`
      <div class="faq-item ${state.faq===i?'open':''}" data-i="${i}">
        <button class="faq-q"><span>${q.q}</span><span class="sign">${state.faq===i?'–':'+'}</span></button>
        <div class="faq-a">${q.a}</div>
      </div>`).join('');
    document.querySelectorAll('.faq-q').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const item = btn.closest('.faq-item');
        const i = Number(item.dataset.i);
        state.faq = state.faq===i ? -1 : i;
        renderFaq();
      });
    });
  }

  renderPains(); renderSteps(); renderBenefits();
  renderFilters(); renderCatalog();
  renderSizeToggle(); renderPlans();
  renderFaq();

  document.getElementById('subscribeForm').addEventListener('submit', e=>{
    e.preventDefault();
    document.getElementById('finalSub').classList.add('subscribed');
  });
})();
