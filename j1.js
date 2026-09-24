// Restaurant data
const restaurants = [
  { id:1, name:"Chapathi", cuisines:"South Indian,Fast Food", rating:4.2, time:25, img:"chapathi.jpg"},
  { id:2, name:"Chicken_65", cuisines:"South Indian,Chinese,Mughlai,Fast Food", rating:3.8, time:30, img:"chicken_65.jpg" },
  { id:3, name:"Chicken Biriyani", cuisines:"South Indian,Chinese,Sweets", rating:3.4, time:26, img:"chicken_biriani.jpg" },
  { id:4, name:"Chicken Noodles", cuisines:"South Indian,Chinese,North Indian", rating:3.9, time:50, img:"chicken_noodles.jpg" },
  { id:5, name:"Chicken Rice", cuisines:"Chinese,Fast Food", rating:4.0, time:44, img:"chicken_rice.jpg"},
  { id:6, name:"Dosa", cuisines:"South Indian,American", rating:4.1, time:63, img:"dosa.jpg" },
  { id:7, name:"Egg Curry", cuisines:"South Indian,Thai", rating:4.1, time:47, img:"egg_curry.jpg" },
  { id:8, name:"Fish Curry", cuisines:"South Indian,Italian,Healthy Food", rating:4.4, time:51, img:"fish_curry.jpg" },
  { id:9, name:"Grap soup", cuisines:"South Indian,Chinese,Continental,Snacks", rating:4.1, time:31, img:"grab_soup.jpg" },
  { id:10, name:"Grill", cuisines:"South Indian,American", rating:4.2, time:25, img:"grill.jpg" },
  { id:11, name:"Mutton Biriyani", cuisines:"South Indian,Fast Food", rating:4.3, time:33, img:"mutton_biriyani.jpg" },
  { id:12, name:"Mutton Leg soup", cuisines:"South Indian,Fast Food", rating:3.8, time:42, img:"Mutton_leg_soup.jpg" },
  { id:13, name:"Parotta", cuisines:"South Indian,Continental", rating:4.1, time:67, img:"parotta.jpg" },
  { id:14, name:"Poori", cuisines:"South Indian,Mughlai,Street Food,Fast Food", rating:4.1, time:43, img:"poori.jpg" },
  { id:15, name:"Prawn Masala", cuisines:"South Indian,Fast Food", rating:3.9, time:45, img:"prawn_masala.jpg" },
  { id:16, name:"Idly", cuisines:"South Indian,Thai,Chinese,Fast Food", rating:3.7, time:41, img:"idly.jpg" }
];


const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');

let selectedItems = [];

// Escape HTML
function escapeHtml(text){
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Render cards
function renderCards(list){
  grid.innerHTML = '';
  if(!list.length){
    grid.innerHTML = '<div class="no-results">No restaurants found.</div>';
    return;
  }

  const favIds = JSON.parse(localStorage.getItem('favourites')) || [];

  list.forEach(r => {
    const card = document.createElement('article');
    card.className = 'card';
    const isFav = favIds.includes(r.id);
    const isSelected = selectedItems.includes(r.id);

    card.innerHTML = `
      <div class="media" style="background-image:url('${r.img}');">
        <div class="corner" title="favourite">♡</div>
      </div>
      <div class="card-body">
        <div>
          <div class="title-row">
            <div>
              <div class="title">${escapeHtml(r.name)}</div>
              <div class="cuisines">${escapeHtml(r.cuisines)}</div>
            </div>
            <div style="text-align:right">
              <div class="badge" aria-hidden="true">★ ${r.rating.toFixed(1)}</div>
              <div style="height:6px"></div>
            </div>
          </div>
          <div class="meta">
            <div class="badge time">⏱ ${r.time} Mins</div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn" onclick="viewDetails(${r.id})">View</button>
          <button class="btn fave" aria-pressed="${isFav}" onclick="toggleFav(event, ${r.id})">${isFav ? 'Remove favourite' : 'Add to favourites'}</button>
          <label style="margin-left:8px;"><input type="checkbox" class="select-item" ${isSelected ? 'checked' : ''} onchange="toggleSelect(${r.id}, this)"> Select</label>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// View details
function viewDetails(id){
  const r = restaurants.find(x=>x.id===id);
  alert(r ? `${r.name}\nCuisines: ${r.cuisines}\nRating: ${r.rating}\nTime: ${r.time} mins` : 'Not found');
}

// Toggle favourite
function toggleFav(ev, id){
  const btn = ev.currentTarget;
  let favIds = JSON.parse(localStorage.getItem('favourites')) || [];
  const pressed = btn.getAttribute('aria-pressed') === 'true';

  if(pressed){
    favIds = favIds.filter(f => f !== id);
    btn.textContent = 'Add to favourites';
    btn.style.color = 'var(--accent)';
  } else {
    favIds.push(id);
    btn.textContent = 'Remove favourite';
    btn.style.color = '#c62828';
  }

  btn.setAttribute('aria-pressed', String(!pressed));
  localStorage.setItem('favourites', JSON.stringify(favIds));
}

// Toggle selection
function toggleSelect(id, checkbox){
  if(checkbox.checked){
    if(!selectedItems.includes(id)) selectedItems.push(id);
  } else {
    selectedItems = selectedItems.filter(x=>x!==id);
  }
  updateOrderButton();
}

// Filter & sort
function filterAndSort(){
  const q = searchInput.value.trim().toLowerCase();
  let list = restaurants.filter(r => !q || r.name.toLowerCase().includes(q) || r.cuisines.toLowerCase().includes(q));

  const sort = sortSelect.value;
  list.sort((a,b)=>{
    switch(sort){
      case 'rating-desc': return b.rating - a.rating;
      case 'rating-asc': return a.rating - b.rating;
      case 'time-asc': return a.time - b.time;
      case 'time-desc': return b.time - a.time;
      case 'name-asc': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  renderCards(list);
}

// Floating order button
const orderBtn = document.createElement('button');
orderBtn.id = 'order-btn';
orderBtn.textContent = 'Order';
orderBtn.onclick = showCheckout;
document.body.appendChild(orderBtn);
orderBtn.style.display = 'none';

function updateOrderButton(){
  orderBtn.style.display = selectedItems.length ? 'block' : 'none';
}

// Checkout modal
function showCheckout(){
  const items = restaurants.filter(r=>selectedItems.includes(r.id));
  if(!items.length) return;
  let html = '<div class="checkout"><h3>Confirm Your Order</h3><ul>';
  items.forEach(r=>{
    html += `<li>${r.name} - ${r.cuisines} - ★${r.rating}</li>`;
  });
  html += `</ul><button onclick="confirmOrder()">Confirm Order</button> <button onclick="closeCheckout()">Cancel</button></div>`;

  const modal = document.createElement('div');
  modal.id = 'checkout-modal';
  modal.innerHTML = html;
  document.body.appendChild(modal);
}

function closeCheckout(){
  const modal = document.getElementById('checkout-modal');
  if(modal) modal.remove();
}

function confirmOrder(){
  const items = restaurants.filter(r => selectedItems.includes(r.id));

  if(items.length === 0) return;

  fetch('order.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'items=' + encodeURIComponent(JSON.stringify(items))
  })
  .then(res => res.json())
  .then(data => {
    if(data.status === 'success'){
      alert('Order saved successfully!');
      selectedItems = [];
      updateOrderButton();
      closeCheckout();
      renderCards(restaurants);
    } else {
      alert('Error saving order: ' + data.message);
    }
  })
  .catch(err => {
    alert('Request failed: ' + err);
  });
}


// Event listeners
searchInput.addEventListener('input', filterAndSort);
sortSelect.addEventListener('change', filterAndSort);
searchInput.addEventListener('keydown', (e) => { if(e.key==='Enter') filterAndSort(); });

// Initial render
renderCards(restaurants);




