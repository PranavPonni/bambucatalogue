'use strict';
(() => {
  const products = window.CATALOGUE_PRODUCTS;
  const categories = ['All designs', 'God figures', 'Temples & festive', 'Toys & fidgets', 'Gifts & keychains', 'Vases & planters', 'Home décor', 'Desk & everyday'];
  const state = {category: 'All designs', query: '', sort: 'featured'};
  const grid = document.querySelector('#product-grid');
  const dialog = document.querySelector('#product-dialog');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const yen = n => '¥' + Math.round(n).toLocaleString('en-US');
  const priceRange = p => p.priceEstimateYen.map(yen).join('–');
  const dimensions = p => p.proposedDimensionsCm.join(' × ') + ' cm';
  const message = p => `Hi! I'm interested in ${p.name} (${p.id}) from the Little Layers catalogue. Please confirm the available size, colour, print weight, and final price.\nPreferred colour: \nQuantity: `;
  const whatsapp = (number,p) => `https://wa.me/${number}?text=${encodeURIComponent(message(p))}`;
  // Viewport hides only the screenshot's app header; the supplied photo remains unchanged.
  let photoSequence = 0;
  const photo = (p,hero=false) => {
    const w=p.imageWidth || 1050, h=p.imageHeight || 1050;
    const top=Math.round(w * 0.1467), margin=Math.round(w * 0.0267);
    const crop=p.imageCrop || {x:margin,y:top,width:w-margin*2,height:h-top-margin*0.65};
    const clipId = `photo-clip-${++photoSequence}`;
    return `<svg viewBox="${crop.x} ${crop.y} ${crop.width} ${crop.height}" preserveAspectRatio="xMidYMid ${hero?'slice':'meet'}" role="img" aria-label="${escape(p.name)}"><title>${escape(p.name)}</title><defs><clipPath id="${clipId}"><rect x="${crop.x}" y="${crop.y}" width="${crop.width}" height="${crop.height}" /></clipPath></defs><image clip-path="url(#${clipId})" href="${p.image}" width="${w}" height="${h}" /></svg>`;
  };
  const card = p => `<article class="product-card" data-id="${p.id}">
    <button class="product-image" data-open="${p.id}" aria-label="View ${escape(p.name)} details">${photo(p)}<span class="image-expand">View details ↗</span></button>
    <div class="product-info"><div class="card-topline"><span>${escape(p.category)}</span><span>${p.id}</span></div><h3>${escape(p.name)}</h3>
    <dl><div><dt>Weight</dt><dd>${p.weightEstimate.join('–')} g <small>estimated</small></dd></div><div><dt>Dimensions</dt><dd>${dimensions(p)} <small>proposed</small></dd></div></dl>
    <div class="price-block"><p class="price-label">EST. PRICE</p><p class="price">${priceRange(p)}</p><p class="price-note">Final quote on enquiry</p></div>
    <button class="enquire" data-open="${p.id}" aria-label="Enquire about ${escape(p.name)}">Enquire about this <span aria-hidden="true">↗</span></button></div></article>`;
  function render(){
    let visible=products.filter(p => (state.category==='All designs'||p.category===state.category) && `${p.id} ${p.name} ${p.category} ${p.creator} ${p.description}`.toLowerCase().includes(state.query));
    if(state.sort==='name') visible.sort((a,b)=>a.name.localeCompare(b.name));
    if(state.sort==='price-low') visible.sort((a,b)=>a.priceEstimateYen[0]-b.priceEstimateYen[0] || a.priceEstimateYen[1]-b.priceEstimateYen[1]);
    if(state.sort==='price-high') visible.sort((a,b)=>b.priceEstimateYen[0]-a.priceEstimateYen[0] || b.priceEstimateYen[1]-a.priceEstimateYen[1]);
    grid.innerHTML=visible.map(card).join('');
    document.querySelector('#result-count').innerHTML=`Showing <strong>${visible.length}</strong> of ${products.length} designs`;
    document.querySelector('#empty-state').hidden=visible.length!==0;
    document.querySelectorAll('.category').forEach(b=>b.setAttribute('aria-pressed',b.dataset.category===state.category));
  }
  document.querySelector('#categories').innerHTML=categories.map(c=>`<button class="category" data-category="${escape(c)}" aria-pressed="${c===state.category}">${escape(c)}<span>${c==='All designs'?products.length:products.filter(p=>p.category===c).length}</span></button>`).join('');
  document.querySelector('#categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;state.category=b.dataset.category;render();});
  document.querySelector('#search').addEventListener('input',e=>{state.query=e.target.value.trim().toLowerCase();render();});
  document.querySelector('#sort').addEventListener('change',e=>{state.sort=e.target.value;render();});
  document.querySelector('#reset').addEventListener('click',()=>{state.category='All designs';state.query='';state.sort='featured';document.querySelector('#search').value='';document.querySelector('#sort').value='featured';render();document.querySelector('#search').focus();});
  let lastFocus;
  function openProduct(id){
    const p=products.find(p=>p.id===id);if(!p)return;
    lastFocus=document.activeElement;
    document.querySelector('#dialog-content').innerHTML=`<div class="dialog-layout"><div class="dialog-image">${photo(p)}</div><div class="dialog-details"><p class="eyebrow">${escape(p.category)} · ${p.id}</p><h2 id="dialog-title">${escape(p.name)}</h2><p class="dialog-description">${escape(p.description)}</p><dl class="dialog-specs"><div><dt>Estimated filament weight</dt><dd>${p.weightEstimate.join('–')} g</dd></div><div><dt>Proposed W × D × H</dt><dd>${dimensions(p)}</dd></div></dl><p class="price-label">EST. PRICE</p><p class="price">${priceRange(p)}</p><p class="price-note">Final quote on enquiry</p><p class="dialog-note"><strong>Specifications awaiting verification.</strong> This weight range is a planning estimate, not a Bambu Studio result. Dimensions are proposed, not measured. We’ll confirm the matching model, A1 mini print settings, and final quote before your order.</p><div class="dialog-actions"><a class="button primary" href="${whatsapp('818063769691',p)}" target="_blank" rel="noopener">WhatsApp Japan ↗</a><a class="button secondary" href="${whatsapp('919677139668',p)}" target="_blank" rel="noopener">WhatsApp India ↗</a></div><p class="creator">Design credit from screenshot: ${escape(p.creator)}</p><div class="source-links"><a href="${p.image}" target="_blank" rel="noopener">Full reference image ↗</a><a href="${escape(p.sourceUrl||p.searchUrl)}" target="_blank" rel="noopener">${p.sourceUrl?'Model listing':'Search MakerWorld'} ↗</a><a href="specifications.csv" download>Specification sheet ↓</a></div></div></div>`;
    dialog.showModal();document.body.style.overflow='hidden';document.querySelector('#close-dialog').focus();
  }
  grid.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b)openProduct(b.dataset.open);});
  document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';if(lastFocus?.isConnected)lastFocus.focus();});
  document.querySelector('#hero-vase').innerHTML=photo(products[0],true);
  document.querySelector('#hero-ganesh').innerHTML=photo(products[34],true);
  render();
})();
