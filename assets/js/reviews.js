/* Maharaja Readymade — customer reviews
   Part of the site's plain-JavaScript bundle; no build step, no dependencies. */

var reviewsData = [
  { stars: 5, text: "Maharaja Readymade made my daughter's wedding absolutely magical. The bridal lehenga collection is unmatched in Bulandshahr. Nitesh ji personally helped us choose the perfect outfit.", name: "Priya Sharma", location: "Bulandshahr", initials: "PS" },
  { stars: 5, text: "I have been buying my formal wear from Maharaja for over 15 years. The quality of Park Avenue and Van Heusen shirts here is genuine, and the prices are very reasonable.", name: "Rahul Verma", location: "Khurja", initials: "RV" },
  { stars: 4.5, text: "The kids section is wonderful! I found beautiful ethnic wear for my children for Diwali. The staff is patient and helps you find exactly what you need.", name: "Anjali Gupta", location: "Bulandshahr", initials: "AG" },
  { stars: 5, text: "Best place for wedding shopping in entire Western UP. We bought groom sherwani, bridal lehenga, and outfits for the whole family. Everything under one roof!", name: "Vikas Singh", location: "Aligarh", initials: "VS" },
  { stars: 5, text: "The alteration service is excellent. I bought a suit and they altered it perfectly within a day. The attention to detail is what keeps me coming back.", name: "Neha Agarwal", location: "Bulandshahr", initials: "NA" },
  { stars: 5, text: "From Jockey innerwear to Monte Carlo winter wear, I get everything here. The store has grown so much over the years but the personal touch remains the same.", name: "Amit Kumar", location: "Sikandrabad", initials: "AK" },
  { stars: 5, text: "My go-to store for festive shopping. The ladies wear collection is updated regularly with the latest trends. Love the new arrivals every season!", name: "Sunita Mishra", location: "Bulandshahr", initials: "SM" },
  { stars: 4.5, text: "Great collection of accessories — belts, wallets, perfumes. I also bought spectacles from here. Good quality products at genuine prices.", name: "Ravi Kumar", location: "Greater Noida", initials: "RK" }
];

function renderReviews() {
  var grid = document.getElementById('reviews-grid');
  if (!grid || grid.children.length > 0) return;
  var html = '';
  reviewsData.forEach(function(r) {
    var starsHtml = '';
    for (var s = 0; s < 5; s++) {
      if (s < Math.floor(r.stars)) starsHtml += '<i class="fas fa-star"></i>';
      else if (s < r.stars) starsHtml += '<i class="fas fa-star-half-alt"></i>';
      else starsHtml += '<i class="far fa-star"></i>';
    }
    html += '<div class="review-card card-3d reveal revealed">' +
      '<div class="review-stars">' + starsHtml + '</div>' +
      '<p class="review-text">"' + r.text + '"</p>' +
      '<div class="review-author">' +
        '<div class="review-avatar">' + r.initials + '</div>' +
        '<div><div class="review-name">' + r.name + '</div><div class="review-location">' + r.location + '</div></div>' +
      '</div></div>';
  });
  grid.innerHTML = html;
  initCard3DTilt(Array.prototype.slice.call(grid.querySelectorAll('.card-3d')));
  var now = new Date();
  var timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  var ts = document.getElementById('reviews-timestamp');
  if (ts) ts.textContent = 'Last updated: Today at ' + timeStr;
}
